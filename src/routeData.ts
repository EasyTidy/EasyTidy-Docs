import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import type { StarlightRouteData } from "@astrojs/starlight/route-data";

const SITE = "https://docs.easytidy.net";

type SidebarEntry = StarlightRouteData["sidebar"][number];

/** 判断侧边栏条目（含子项）是否属于 V1 文档。 */
function isV1Entry(entry: SidebarEntry): boolean {
  if (entry.type === "link") {
    return /\/v1(\/|$)/.test(entry.href);
  }
  if (entry.type === "group") {
    return entry.entries.some(isV1Entry);
  }
  return false;
}

/** 当前路径是否为 V1 文档页面。 */
function isV1Path(pathname: string): boolean {
  return /(^|\/)v1(\/|$)/.test(pathname);
}

/**
 * 将 V1 页面路径映射到 V2 等价页面路径，用于 canonical 规范链接。
 * 例如 /v1/guide/general/ -> /guide/general/，/zh-cn/v1/ -> /zh-cn/getting-started/。
 */
function v1ToV2Path(pathname: string): string | null {
  const match = pathname.match(/^(\/zh-cn)?\/v1(\/.*)?$/);
  if (!match) return null;
  const locale = match[1] ?? "";
  let rest = match[2] ?? "/";
  // V1 首页（使用指南）对应 V2 的 getting-started。
  if (rest === "/" || rest === "") rest = "/getting-started/";
  return `${locale}${rest}`;
}

export const onRequest = defineRouteMiddleware((context) => {
  const route = context.locals.starlightRoute;
  const pathname = context.url.pathname;
  const onV1 = isV1Path(pathname);

  // 1) 按当前文档版本过滤侧边栏，避免 V1 / V2 分组互相混入。
  route.sidebar = route.sidebar.filter((entry) => isV1Entry(entry) === onV1);

  // 2) V1 页面：将 canonical 与 og:url 指向 V2 等价页面，
  //    把搜索权重归并到最新版文档，规避重复内容的 SEO 冲突。
  if (onV1) {
    const v2Path = v1ToV2Path(pathname);
    if (v2Path) {
      const canonicalHref = new URL(v2Path, SITE).href;
      for (const tag of route.head) {
        if (tag.tag === "link" && tag.attrs?.rel === "canonical") {
          tag.attrs.href = canonicalHref;
        }
        if (tag.tag === "meta" && tag.attrs?.property === "og:url") {
          tag.attrs.content = canonicalHref;
        }
      }
    }
  }
});
