"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import PlayerBadge from "./PlayerBadge";
import type { PlayerState } from "@/lib/progress";

type Props = {
  player: PlayerState | null;
};

export default function SiteHeader({ player }: Props) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-[var(--moon-cream)]/40 border-b border-[var(--surface-ring)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <Crest />
          <div className="hidden sm:block">
            <div className="font-display text-xl text-[var(--ink-plum)] leading-none">
              樱花魔法院
            </div>
            <div className="font-magic text-[10px] tracking-[0.3em] text-[var(--gold-deep)] uppercase">
              Sakura Mahou Gakuin
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 font-magic text-xs uppercase tracking-[0.25em] text-[var(--ink-plum)]">
          <NavLink href="/" active={isHome}>
            大厅
          </NavLink>
          <NavLink href="/codex" active={pathname === "/codex"}>
            公式典藏
          </NavLink>
          <NavLink href="/profile" active={pathname === "/profile"}>
            角色
          </NavLink>
        </nav>

        <div>
          {player && <PlayerBadge player={player} />}
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-full transition-colors ${
        active
          ? "bg-[var(--gold-dust)]/30 text-[var(--ink-plum)]"
          : "hover:bg-white/60 text-[var(--ink-plum)]/70"
      }`}
    >
      {children}
    </Link>
  );
}

function Crest() {
  return (
    <svg width="38" height="38" viewBox="0 0 40 40">
      <defs>
        <radialGradient id="crest-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff5cc" />
          <stop offset="60%" stopColor="#ffc4d6" />
          <stop offset="100%" stopColor="#7c5fbf" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="18" fill="url(#crest-bg)" stroke="#c9a227" strokeWidth="1.5" />
      <path
        d="M20 8 Q 23 14, 28 16 Q 23 18, 22 24 Q 20 20, 18 24 Q 17 18, 12 16 Q 17 14, 20 8 Z"
        fill="#fdf6f0"
        opacity="0.95"
      />
      <circle cx="20" cy="18" r="1.5" fill="#c9a227" />
    </svg>
  );
}
