// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
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
      defaultLocale: "root",
      locales: {
        root: { label: "English", lang: "en" },
        "zh-cn": { label: "简体中文", lang: "zh-CN" },
      },
      head: [
        {
          // 根据浏览器语言自动跳转到对应语言版本；无匹配则保持英文。
          // 仅在站点根路径 `/` 生效，且只执行一次（用户手动切换后不再打扰）。
          tag: "script",
          content: `(function () {
  try {
    if (location.pathname !== '/') return;
    if (localStorage.getItem('starlight-lang-detected')) return;
    localStorage.setItem('starlight-lang-detected', '1');
    var langs = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ''];
    for (var i = 0; i < langs.length; i++) {
      var l = (langs[i] || '').toLowerCase();
      // 简体中文相关区域 -> /zh-cn/（繁体 zh-hant/zh-tw 等无对应语言，回退英文）
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
      ],
      customCss: ["./src/styles/global.css"],
    }),
    sitemap(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare({
    // SVG/矢量资源无需栅格化优化，直接透传，避免 /_image 端点对 SVG 报 400。
    imageService: "passthrough",
  }),
});
