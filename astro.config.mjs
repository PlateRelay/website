import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import starlightThemeBlack from 'starlight-theme-black';

export default defineConfig({
  site: 'https://platerelay.app',
  integrations: [
    starlight({
      title: 'PlateRelay',
      favicon: '/favicon.svg',
      logo: {
        src: './src/assets/logo.svg',
        alt: 'PlateRelay',
      },
      plugins: [
        starlightThemeBlack({
          navLinks: [
            {
              label: { en: 'Home', 'zh-cn': '首页', 'zh-CN': '首页' },
              link: '/',
            },
            {
              label: { en: 'Docs', 'zh-cn': '文档', 'zh-CN': '文档' },
              link: '/docs/overview/',
            },
            {
              label: { en: 'Architecture', 'zh-cn': '架构', 'zh-CN': '架构' },
              link: '/docs/architecture/',
            },
            {
              label: 'GitHub',
              link: 'https://github.com/PlateRelay/PlateRelay',
              attrs: { target: '_blank', rel: 'noopener noreferrer' },
            },
          ],
          footerText:
            'PlateRelay — Open-source self-hosted 3D printing platform · [GitHub](https://github.com/PlateRelay/PlateRelay) · GPL-3.0-only',
        }),
      ],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/PlateRelay/PlateRelay',
        },
      ],
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
        'zh-cn': {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      customCss: ['./src/styles/global.css'],
      sidebar: [
        {
          label: 'Getting Started',
          translations: { 'zh-CN': '开始使用' },
          items: [
            { slug: 'docs/overview' },
            { slug: 'docs/getting-started' },
            { slug: 'docs/contributing' },
          ],
        },
        {
          label: 'Architecture & Deployment',
          translations: { 'zh-CN': '架构与部署' },
          items: [
            { slug: 'docs/architecture' },
            { slug: 'docs/server' },
            { slug: 'docs/daemon' },
          ],
        },
      ],
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
