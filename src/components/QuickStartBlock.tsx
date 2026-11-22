import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

type Lang = 'en' | 'zh-cn';
type TabId = 'panel' | 'daemon';

const DATA = {
  en: {
    tabs: [
      { id: 'panel' as TabId, label: 'Web & Panel' },
      { id: 'daemon' as TabId, label: 'Daemon + Simulator' },
    ],
    copy: 'Copy',
    copied: 'Copied',
    code: {
      panel: `git clone https://github.com/PlateRelay/PlateRelay.git
cd PlateRelay
pnpm install

# Start web prototype (:5173) or panel server (:3000)
pnpm dev:web
pnpm dev:server`,
      daemon: `# 1. Panel server with dev enroll token
PLATERELAY_DEV_ENROLL_TOKEN=devtoken pnpm dev:server

# 2. Built-in 60x speed simulated printer
PYTHONPATH=src uv run python -m platerelay_sim run --count 1 --speed 60

# 3. LAN daemon enrolled to local panel
PLATERELAY_ENROLL_TOKEN=devtoken PLATERELAY_DEV_INSECURE=1 \\
  PYTHONPATH=src uv run python -m platerelay_daemon --data-dir ./.daemon-data run --panel http://localhost:3000`,
    },
  },
  'zh-cn': {
    tabs: [
      { id: 'panel' as TabId, label: '面板前后端' },
      { id: 'daemon' as TabId, label: 'Daemon + 模拟打印机' },
    ],
    copy: '复制',
    copied: '已复制',
    code: {
      panel: `git clone https://github.com/PlateRelay/PlateRelay.git
cd PlateRelay
pnpm install

# 启动前端原型 (:5173) 或面板后端 (:3000)
pnpm dev:web
pnpm dev:server`,
      daemon: `# 1. 启动面板后端（设置开发用注册令牌）
PLATERELAY_DEV_ENROLL_TOKEN=devtoken pnpm dev:server

# 2. 启动 60 倍速模拟打印机
PYTHONPATH=src uv run python -m platerelay_sim run --count 1 --speed 60

# 3. 启动局域网 Daemon 并注册到本地面板
PLATERELAY_ENROLL_TOKEN=devtoken PLATERELAY_DEV_INSECURE=1 \\
  PYTHONPATH=src uv run python -m platerelay_daemon --data-dir ./.daemon-data run --panel http://localhost:3000`,
    },
  },
};

export default function QuickStartBlock({ lang }: { lang: Lang }) {
  const [tab, setTab] = useState<TabId>('panel');
  const [copied, setCopied] = useState(false);
  const t = DATA[lang];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(t.code[tab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--pr-line)] bg-[var(--pr-card)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--pr-line)] bg-[var(--pr-sub)] px-3.5 py-2.5">
        <div className="flex items-center gap-1">
          {t.tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setTab(item.id);
                setCopied(false);
              }}
              className={`cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                tab === item.id
                  ? 'bg-[var(--pr-card)] text-[var(--pr-fg)] shadow-2xs'
                  : 'text-[var(--pr-muted)] hover:text-[var(--pr-fg)]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--pr-line)] bg-[var(--pr-card)] px-2.5 py-1 text-[11px] font-medium text-[var(--pr-fg2)] transition-colors hover:border-[var(--pr-line2)]"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" style={{ color: 'var(--pr-ok-t)' }} />
              <span>{t.copied}</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 text-[var(--pr-muted)]" />
              <span>{t.copy}</span>
            </>
          )}
        </button>
      </div>

      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-[var(--pr-fg)]">
        <code>{t.code[tab]}</code>
      </pre>
    </div>
  );
}
