// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  // 站点正式域名：用于生成 canonical 规范链接与 sitemap。
  site: "https://docs.easytidy.net",
  integrations: [
    starlight({
      title: "EasyTidy Pro Docs",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/EasyTidy",
        },
      ],
      // 自定义 Header：加入文档版本切换下拉框（默认 V2）。
      components: {
        Header: "./src/components/Header.astro",
      },
      // 路由中间件：为 V1 文档切换专属侧边栏，并将 canonical 指向 V2 等价页面以规避 SEO 冲突。
      routeMiddleware: "./src/routeData.ts",
      defaultLocale: "root",
      locales: {
        root: { label: "English", lang: "en" },
        "zh-cn": { label: "简体中文", lang: "zh-CN" },
      },
      head: [
        {
          // 客户端兜底：浏览器语言自动跳转（服务端中间件为首选方案）
          tag: "script",
          content: `(function () {
  try {
    if (location.pathname !== '/') return;
    if (localStorage.getItem('lang-detected')) return;
    localStorage.setItem('lang-detected', '1');
    var langs = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ''];
    for (var i = 0; i < langs.length; i++) {
      var l = (langs[i] || '').toLowerCase();
      if (l === 'zh' || l === 'zh-cn' || l === 'zh-hans' || l === 'zh-sg' || l === 'zh-my') {
        location.replace('/zh-cn/');
        return;
      }
    }
  } catch (e) {}
})();`,
        },
      ],
      sidebar: [
        {
          label: "Getting Started",
          translations: { "zh-CN": "开始使用" },
          collapsed: false,
          items: [
            {
              label: "Quick Start",
              translations: { "zh-CN": "快速入门" },
              slug: "getting-started",
            },
            {
              label: "Installation",
              translations: { "zh-CN": "安装指南" },
              slug: "install",
            },
          ],
        },
        {
          label: "Features Guide",
          translations: { "zh-CN": "功能指南" },
          collapsed: false,
          items: [
            {
              label: "Settings",
              translations: { "zh-CN": "常规设置" },
              slug: "guide/general",
            },
            {
              label: "Task Management",
              translations: { "zh-CN": "任务编排" },
              slug: "guide/task",
            },
            {
              label: "Advanced Rules",
              translations: { "zh-CN": "高级规则" },
              slug: "guide/filter",
            },
            {
              label: "Automation",
              translations: { "zh-CN": "自动化配置" },
              slug: "guide/automation",
            },
            {
              label: "Rules Reference",
              translations: { "zh-CN": "配置规则" },
              slug: "guide/rules",
            },
            {
              label: "Shortcuts",
              translations: { "zh-CN": "热键设置" },
              slug: "guide/shortcut",
            },
            {
              label: "AI Services",
              translations: { "zh-CN": "AI 服务" },
              slug: "guide/ai",
            },
          ],
        },
        {
          label: "More",
          translations: { "zh-CN": "更多" },
          items: [
            {
              label: "FAQ",
              translations: { "zh-CN": "常见问题" },
              slug: "faq",
            },
            {
              label: "About EasyTidy Pro",
              translations: { "zh-CN": "关于 EasyTidy Pro" },
              slug: "about",
            },
            {
              label: "Download",
              translations: { "zh-CN": "下载" },
              slug: "download",
            },
          ],
        },

        // ===== V1 文档侧边栏 =====
        // 这些分组仅在访问 /v1/ 路径时由 routeData 中间件保留显示。
        {
          label: "Getting Started",
          translations: { "zh-CN": "开始使用" },
          collapsed: false,
          items: [
            {
              label: "User Guide",
              translations: { "zh-CN": "使用指南" },
              slug: "v1",
            },
            {
              label: "Installation",
              translations: { "zh-CN": "安装指南" },
              slug: "v1/install",
            },
          ],
        },
        {
          label: "Features Guide",
          translations: { "zh-CN": "功能指南" },
          collapsed: false,
          items: [
            {
              label: "Settings",
              translations: { "zh-CN": "常规设置" },
              slug: "v1/guide/general",
            },
            {
              label: "Task Management",
              translations: { "zh-CN": "任务编排" },
              slug: "v1/guide/task",
            },
            {
              label: "Advanced Rules",
              translations: { "zh-CN": "高级规则" },
              slug: "v1/guide/filter",
            },
            {
              label: "Automation",
              translations: { "zh-CN": "自动化配置" },
              slug: "v1/guide/automation",
            },
            {
              label: "Rules Reference",
              translations: { "zh-CN": "配置规则" },
              slug: "v1/guide/rules",
            },
            {
              label: "Shortcuts",
              translations: { "zh-CN": "热键设置" },
              slug: "v1/guide/shortcut",
            },
            {
              label: "AI Services",
              translations: { "zh-CN": "AI 服务" },
              slug: "v1/guide/ai",
            },
          ],
        },
        {
          label: "More",
          translations: { "zh-CN": "更多" },
          items: [
            {
              label: "FAQ",
              translations: { "zh-CN": "常见问题" },
              slug: "v1/faq",
            },
            {
              label: "About EasyTidy",
              translations: { "zh-CN": "关于 EasyTidy" },
              slug: "v1/about",
            },
            {
              label: "Download",
              translations: { "zh-CN": "下载" },
              slug: "v1/download",
            },
          ],
        },
      ],
      customCss: ["./src/styles/global.css"],
    }),
    sitemap({
      // V1 文档的 canonical 已指向 V2，故从 sitemap 中排除 V1 页面，
      // 避免向搜索引擎提交会被规范化丢弃的重复内容 URL。
      filter: (page) => !/\/v1(\/|$)/.test(new URL(page).pathname),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare({
    // SVG/矢量资源无需栅格化优化，直接透传，避免 /_image 端点对 SVG 报 400。
    imageService: "passthrough",
  }),
});
