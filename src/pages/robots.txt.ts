import type { APIRoute } from "astro";

// 预渲染为静态 /robots.txt，无需运行时计算。
export const prerender = true;

/**
 * 动态生成 robots.txt：
 * - 指向 sitemap 索引（仅含 V2 地址，V1 已在 astro.config 中过滤）。
 * - 禁止搜索引擎抓取 V1 文档路径（含 /zh-cn/v1/），避免重复内容。
 *   V1 页面的 canonical 已指向 V2，此处再以 robots 规则双重保险。
 */
export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);

  const body = `User-agent: *
Allow: /
Disallow: /v1/
Disallow: /*/v1/

Sitemap: ${sitemapURL.href}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
