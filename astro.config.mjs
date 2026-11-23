import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import starlightThemeBlack from 'starlight-theme-black';

export default defineConfig({
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
              label: 'Home',
              link: '/',
            },
            {
              label: 'Docs',
              link: '/docs/overview/',
            },
            {
              label: 'Architecture',
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
      head: [
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: 'anonymous',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap',
          },
        },
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
        {
          label: 'Contributing',
          translations: { 'zh-CN': '参与贡献' },
          items: [{ slug: 'docs/contributing' }],
        },
      ],
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
