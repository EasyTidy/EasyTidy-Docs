import { defineMiddleware } from "astro/middleware";

// 中文相关的 Accept-Language 标识
const ZH_LOCALES = ["zh", "zh-cn", "zh-hans", "zh-sg", "zh-my"];

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);

  // 仅在根路径 / 进行浏览器语言检测
  if (url.pathname !== "/") return next();

  // 已通过 cookie 标记过，不再重复检测（24 小时有效）
  if (context.cookies.has("lang-detected")) return next();

  // 读取 Accept-Language 并在末尾设置 cookie
  context.cookies.set("lang-detected", "1", {
    path: "/",
    maxAge: 86400,
    sameSite: "lax",
  });

  const acceptLang = context.request.headers.get("accept-language") || "";
  const langs = acceptLang
    .split(",")
    .map((l) => l.split(";")[0].trim().toLowerCase());

  for (const lang of langs) {
    if (ZH_LOCALES.includes(lang)) {
      return context.redirect("/zh-cn/");
    }
  }

  return next();
});
