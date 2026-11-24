export type Lang = 'en' | 'zh-cn';

const en = {
  meta: {
    title: 'PlateRelay — Self-hosted 3D printing for shared spaces',
    description:
      'An open-source, self-hosted 3D printing platform for shared-printer environments such as hackathons, makerspaces, and university labs.',
  },
  nav: {
    docs: 'Docs',
    architecture: 'Architecture',
    roadmap: 'Roadmap',
    switchLang: '简体中文',
    switchLangShort: '中文',
    switchLangTitle: '切换为简体中文',
    toggleTheme: 'Toggle color theme',
    openMenu: 'Open menu',
  },
  footer: {
    tagline: 'Open-source shared 3D printing platform',
  },
  hero: {
    status: 'Early development · GPL-3.0',
    title: 'Self-hosted 3D printing\nfor shared spaces',
    subtitle:
      'An open-source, self-hosted 3D printing platform for shared-printer environments such as hackathons, makerspaces, and university labs—combining centralized multi-printer management with auditable review, scheduling, and fulfillment workflows while isolating users from physical hardware.',
    primary: 'Get Started',
    secondary: 'GitHub',
  },
  workflow: {
    eyebrow: 'How it works',
    title: 'From upload to pickup',
    subtitle: 'A complete fulfillment loop. Printers return to the queue only after the bed is cleared.',
    alt: 'Submit File, Manual Review, Queueing, Dispatch & Print, Shelve & Clear, QR Pickup; the printer is released back to the queue after the bed is cleared.',
  },
  features: {
    eyebrow: 'Features',
    title: 'Designed for shared printing, not private print farms',
    items: [
      {
        icon: 'pool',
        title: 'Built for shared fleets',
        desc: 'Designed for printers shared across many users, not single-owner private farms.',
      },
      {
        icon: 'shield',
        title: 'Hardware isolation',
        desc: 'Users submit files and pick up parts with a code. Printer networks, access codes and controls stay out of reach.',
      },
      {
        icon: 'audit',
        title: 'Review, scheduling & audit',
        desc: 'Manual review, rule-based queue scheduling, and audit logs with permission-scoped visibility.',
      },
      {
        icon: 'lock',
        title: 'Bed-clearance gate',
        desc: 'Printers are released only after parts are shelved and the bed is confirmed clear.',
      },
    ],
  },
  architecture: {
    eyebrow: 'Architecture',
    title: 'Printers stay on your LAN',
    subtitle: 'No inbound ports required.',
    alt: 'Browser connects to the panel over HTTPS and SSE; the daemon connects outbound to the panel over WSS and talks to printers over the LAN.',
    items: [
      {
        title: 'Management panel',
        desc: 'Submission, review, scheduling and pickup in the browser. Deploy it on any server.',
      },
      {
        title: 'LAN daemon',
        desc: 'Runs alongside your printers and connects outbound to the panel.',
      },
      {
        title: 'Device adapters',
        desc: 'A unified adapter interface keeps core workflows vendor-agnostic.',
      },
    ],
    link: 'Learn about the architecture',
  },
  roadmap: {
    eyebrow: '',
    title: 'Roadmap',
    subtitle: 'PlateRelay is in early development. No stable release yet.',
    doneLabel: 'Done',
    items: [
      {
        done: true,
        title: 'Core contracts & foundation',
        desc: 'OpenAPI and daemon protocol, core workflow engine, built-in printer simulator.',
      },
      {
        done: false,
        title: 'v1 release',
        desc: 'Bambu Lab driver, camera and timelapse, external auth and notifications, Docker Compose.',
      },
      {
        done: false,
        title: 'Multi-brand drivers',
        desc: 'Klipper / Moonraker, PrusaLink, OctoPrint.',
      },
      {
        done: false,
        title: 'Operations & cost',
        desc: 'Staging shelves, filament inventory, usage reports, cost tracking.',
      },
      {
        done: false,
        title: 'Open integrations',
        desc: 'REST API, personal access tokens, webhooks, auth and notification adapters.',
      },
    ],
    link: 'Get started',
  },
};

export type LandingStrings = typeof en;

const zhCn: LandingStrings = {
  meta: {
    title: 'PlateRelay — 为共享空间打造的自托管 3D 打印平台',
    description:
      '面向黑客松、创客空间、高校实验室等共享打印机场景的开源自托管 3D 打印平台。',
  },
  nav: {
    docs: '文档',
    architecture: '架构',
    roadmap: '路线图',
    switchLang: 'English',
    switchLangShort: 'EN',
    switchLangTitle: 'Switch to English',
    toggleTheme: '切换深浅色主题',
    openMenu: '打开菜单',
  },
  footer: {
    tagline: '开源自托管共享 3D 打印平台',
  },
  hero: {
    status: '早期开发中 · GPL-3.0',
    title: '为共享空间打造的\n自托管 3D 打印平台',
    subtitle:
      '面向黑客松、创客空间、高校实验室等共享打印机场景的开源自托管 3D 打印平台，提供多机集中管控以及可审计的审核、调度与成品交付流程，将用户与物理打印设备隔离。',
    primary: '开始使用',
    secondary: 'GitHub',
  },
  workflow: {
    eyebrow: '工作流程',
    title: '从提交到取件',
    subtitle: '完整的交付闭环，清床后打印机才回到队列。',
    alt: '提交打印文件、人工审核、队列调度、派单打印、入库与清床确认、凭码核销取件；清床后打印机释放回队列。',
  },
  features: {
    eyebrow: '核心特性',
    title: '为共享打印场景设计，而非私有打印农场',
    items: [
      {
        icon: 'pool',
        title: '面向共享打印资源',
        desc: '为多方共享的公共打印资源设计，而非单方私有集群。',
      },
      {
        icon: 'shield',
        title: '用户与设备隔离',
        desc: '用户仅需提交文件、凭码取件，无需接触打印机网络、访问码或控制界面。',
      },
      {
        icon: 'audit',
        title: '审核、调度与审计',
        desc: '人工审核与规则化队列调度，全部操作可审计，可见范围按权限配置。',
      },
      {
        icon: 'lock',
        title: '清床确认',
        desc: '成品入库并确认清床后才释放打印机，避免撞件与错拿。',
      },
    ],
  },
  architecture: {
    eyebrow: '架构',
    title: '打印机留在内网',
    subtitle: '无需开放入站端口。',
    alt: '浏览器通过 HTTPS 与 SSE 访问面板；daemon 通过 WSS 主动连接面板，并在局域网内与打印机通信。',
    items: [
      {
        title: '管理面板',
        desc: '在浏览器中完成提交、审核、调度与取件，可部署在任意服务器。',
      },
      {
        title: '局域网守护进程',
        desc: '与打印机部署在同一局域网，主动连接管理面板。',
      },
      {
        title: '设备适配层',
        desc: '统一适配器接口，核心流程与设备品牌解耦。',
      },
    ],
    link: '了解架构',
  },
  roadmap: {
    eyebrow: '',
    title: '路线图',
    subtitle: 'PlateRelay 处于早期开发阶段，尚未发布正式版本。',
    doneLabel: '已完成',
    items: [
      {
        done: true,
        title: '核心契约与基础框架',
        desc: 'OpenAPI 与 daemon 协议、核心工作流、内置模拟打印机。',
      },
      {
        done: false,
        title: 'v1 正式版',
        desc: '拓竹驱动、摄像头与延时摄影、外部登录与通知、Docker Compose 部署。',
      },
      {
        done: false,
        title: '多品牌驱动',
        desc: 'Klipper / Moonraker、PrusaLink、OctoPrint。',
      },
      {
        done: false,
        title: '运营与成本管理',
        desc: '成品暂存库位、耗材库存、用量报表与成本追踪。',
      },
      {
        done: false,
        title: '开放集成',
        desc: 'REST API、个人访问令牌、事件 Webhook、外部登录与通知适配。',
      },
    ],
    link: '快速开始',
  },
};

export const landing: Record<Lang, LandingStrings> = { en, 'zh-cn': zhCn };
