#!/usr/bin/env node
/**
 * 图片压缩工具 —— 在保证「人眼看不出差别」的前提下压缩 public/images 下的图片。
 *
 * 原理：
 *  1. 对每张图片生成若干压缩候选（PNG 调色板量化 / JPEG mozjpeg 重编码）。
 *  2. 用 SSIM（结构相似度）逐一与原图对比，只保留 SSIM ≥ 阈值（默认 0.995）的候选。
 *     SSIM 越接近 1 越像原图，0.995 以上对人眼基本不可分辨。
 *  3. 在通过阈值的候选里挑体积最小的；若比原图还大或没有合格候选，则保留原图。
 *  4. 默认原地覆盖，可选生成 .bak 备份或仅试运行（--dry）。
 *
 * 用法：
 *   node scripts/compress-images.mjs [目录] [选项]
 *   npm run compress:images -- --dry            # 试运行，只报告不改文件
 *   npm run compress:images                     # 原地压缩
 *   npm run compress:images -- --backup         # 压缩并保留 .bak 备份
 *   npm run compress:images -- --min-ssim 0.99  # 放宽/收紧相似度阈值
 *   npm run compress:images -- --gif            # 一并处理 GIF（默认跳过，见下）
 *
 * 说明：
 *  - SVG 为矢量图，直接跳过。
 *  - GIF 多为动图，sharp 重编码有丢帧/变色风险，默认跳过；加 --gif 时仅对
 *    「静态单帧 GIF」做无损优化，动图始终跳过。
 */

import sharp from "sharp";
import { readdir, readFile, writeFile, stat, copyFile } from "node:fs/promises";
import { join, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// 参数解析
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
const opts = {
  dir: "public/images",
  dry: false,
  backup: false,
  gif: false,
  minSsim: 0.995,
};
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--dry") opts.dry = true;
  else if (a === "--backup") opts.backup = true;
  else if (a === "--gif") opts.gif = true;
  else if (a === "--min-ssim") opts.minSsim = parseFloat(argv[++i]);
  else if (a === "-h" || a === "--help") {
    console.log("用法: node scripts/compress-images.mjs [目录] [--dry] [--backup] [--gif] [--min-ssim <0-1>]");
    process.exit(0);
  } else if (!a.startsWith("-")) opts.dir = a;
}

// ---------------------------------------------------------------------------
// 工具函数
// ---------------------------------------------------------------------------
const KB = (n) => (n / 1024).toFixed(1) + " KB";
const pct = (from, to) => (((from - to) / from) * 100).toFixed(1) + "%";

/**
 * 计算两张图的 SSIM（结构相似度）。
 * 将两图缩放到同尺寸的灰度图，按 8×8 不重叠窗口计算局部 SSIM 后取平均。
 * 返回 0~1，越接近 1 越相似。
 */
async function ssim(bufA, bufB) {
  // 归一到相同尺寸（取原图尺寸），转灰度、去 alpha，拿原始像素。
  const metaA = await sharp(bufA).metadata();
  const w = metaA.width;
  const h = metaA.height;
  const toGray = (buf) =>
    sharp(buf)
      .resize(w, h, { fit: "fill" })
      .flatten({ background: "#ffffff" }) // 用白底压平 alpha，避免透明区干扰
      .greyscale()
      .raw()
      .toBuffer();
  const [a, b] = await Promise.all([toGray(bufA), toGray(bufB)]);

  const C1 = (0.01 * 255) ** 2;
  const C2 = (0.03 * 255) ** 2;
  const win = 8;
  let total = 0;
  let count = 0;

  for (let y = 0; y + win <= h; y += win) {
    for (let x = 0; x + win <= w; x += win) {
      let sumA = 0, sumB = 0, sumAA = 0, sumBB = 0, sumAB = 0;
      const n = win * win;
      for (let j = 0; j < win; j++) {
        const row = (y + j) * w + x;
        for (let i = 0; i < win; i++) {
          const va = a[row + i];
          const vb = b[row + i];
          sumA += va; sumB += vb;
          sumAA += va * va; sumBB += vb * vb; sumAB += va * vb;
        }
      }
      const muA = sumA / n;
      const muB = sumB / n;
      const varA = sumAA / n - muA * muA;
      const varB = sumBB / n - muB * muB;
      const cov = sumAB / n - muA * muB;
      const s =
        ((2 * muA * muB + C1) * (2 * cov + C2)) /
        ((muA * muA + muB * muB + C1) * (varA + varB + C2));
      total += s;
      count++;
    }
  }
  return count ? total / count : 1;
}

/** 生成 PNG 压缩候选：调色板量化（多档 quality）+ 无损兜底。 */
function pngCandidates() {
  return [
    { label: "png q65", make: (img) => img.png({ palette: true, quality: 65, effort: 8, compressionLevel: 9 }) },
    { label: "png q80", make: (img) => img.png({ palette: true, quality: 80, effort: 8, compressionLevel: 9 }) },
    { label: "png q90", make: (img) => img.png({ palette: true, quality: 90, effort: 8, compressionLevel: 9 }) },
    { label: "png lossless", make: (img) => img.png({ palette: false, effort: 9, compressionLevel: 9 }) },
  ];
}

/** 生成 JPEG 压缩候选：mozjpeg 多档 quality。 */
function jpegCandidates() {
  return [
    { label: "jpeg q80", make: (img) => img.jpeg({ quality: 80, mozjpeg: true }) },
    { label: "jpeg q85", make: (img) => img.jpeg({ quality: 85, mozjpeg: true }) },
    { label: "jpeg q92", make: (img) => img.jpeg({ quality: 92, mozjpeg: true }) },
  ];
}

// ---------------------------------------------------------------------------
// 单文件处理
// ---------------------------------------------------------------------------
async function processFile(path) {
  const ext = extname(path).toLowerCase();
  const original = await readFile(path);
  const origSize = original.length;

  let candidates;
  if (ext === ".png") candidates = pngCandidates();
  else if (ext === ".jpg" || ext === ".jpeg") candidates = jpegCandidates();
  else if (ext === ".gif") {
    // 动图跳过；仅静态 GIF 走无损优化。
    const meta = await sharp(original).metadata();
    if ((meta.pages || 1) > 1) return { path, status: "skip", reason: "动图 GIF" };
    candidates = [{ label: "gif", make: (img) => img.gif({ effort: 10 }) }];
  } else {
    return { path, status: "skip", reason: "不支持的类型" };
  }

  // 逐候选生成 -> 校验体积更小 -> 校验 SSIM 达标 -> 取最优（体积最小且达标）。
  let best = null; // { buf, size, label, ssimScore }
  for (const c of candidates) {
    let buf;
    try {
      // animated:false 已隐含（单帧）；去除 metadata 省体积。
      buf = await c.make(sharp(original)).toBuffer();
    } catch {
      continue;
    }
    if (buf.length >= origSize) continue; // 没变小，忽略
    let score;
    try {
      score = await ssim(original, buf);
    } catch {
      continue;
    }
    if (score < opts.minSsim) continue; // 人眼可能看出差别，拒绝
    if (!best || buf.length < best.size) {
      best = { buf, size: buf.length, label: c.label, ssimScore: score };
    }
  }

  if (!best) return { path, status: "keep", reason: "无更优且达标的候选", origSize };

  if (!opts.dry) {
    if (opts.backup) await copyFile(path, path + ".bak");
    await writeFile(path, best.buf);
  }
  return {
    path,
    status: "compressed",
    origSize,
    newSize: best.size,
    label: best.label,
    ssimScore: best.ssimScore,
  };
}

// ---------------------------------------------------------------------------
// 主流程
// ---------------------------------------------------------------------------
async function main() {
  const root = resolve(process.cwd(), opts.dir);
  let entries;
  try {
    entries = await readdir(root, { withFileTypes: true });
  } catch {
    console.error(`目录不存在: ${root}`);
    process.exit(1);
  }

  const exts = new Set([".png", ".jpg", ".jpeg", ".gif"]);
  const files = entries
    .filter((e) => e.isFile() && exts.has(extname(e.name).toLowerCase()))
    .map((e) => join(root, e.name))
    .sort();

  console.log(`目录: ${root}`);
  console.log(`模式: ${opts.dry ? "试运行(不改动文件)" : opts.backup ? "原地压缩(保留 .bak)" : "原地压缩"}`);
  console.log(`SSIM 阈值: ${opts.minSsim}  |  GIF: ${opts.gif ? "静态帧无损" : "跳过"}\n`);

  let totalOrig = 0;
  let totalNew = 0;
  let nCompressed = 0;
  let nKept = 0;
  let nSkipped = 0;

  for (const f of files) {
    const name = f.split(/[\\/]/).pop();
    if (extname(f).toLowerCase() === ".gif" && !opts.gif) {
      nSkipped++;
      console.log(`  跳过  ${name}  (GIF, 用 --gif 处理静态帧)`);
      continue;
    }
    let r;
    try {
      r = await processFile(f);
    } catch (e) {
      nSkipped++;
      console.log(`  错误  ${name}  ${e.message}`);
      continue;
    }
    if (r.status === "compressed") {
      nCompressed++;
      totalOrig += r.origSize;
      totalNew += r.newSize;
      console.log(
        `  压缩  ${name}  ${KB(r.origSize)} → ${KB(r.newSize)}  (省 ${pct(r.origSize, r.newSize)}, ${r.label}, SSIM ${r.ssimScore.toFixed(4)})`
      );
    } else if (r.status === "keep") {
      nKept++;
      totalOrig += r.origSize;
      totalNew += r.origSize;
      console.log(`  保留  ${name}  (${r.reason})`);
    } else {
      nSkipped++;
      console.log(`  跳过  ${name}  (${r.reason})`);
    }
  }

  console.log("\n────────────── 汇总 ──────────────");
  console.log(`已压缩: ${nCompressed}  保留: ${nKept}  跳过: ${nSkipped}`);
  if (totalOrig > 0) {
    console.log(`处理体积: ${KB(totalOrig)} → ${KB(totalNew)}  (共省 ${pct(totalOrig, totalNew)})`);
  }
  if (opts.dry) console.log("（试运行，未写入任何文件）");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
