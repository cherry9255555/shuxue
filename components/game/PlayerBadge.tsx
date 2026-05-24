"use client";

import Link from "next/link";
import Avatar, { AVATAR_META } from "@/components/game/Avatar";
import XPBar from "@/components/game/XPBar";
import type { PlayerState } from "@/lib/progress";

type Props = {
  player: PlayerState | null;
};

export default function PlayerBadge({ player }: Props) {
  if (!player) return null;
  return (
    <Link
      href="/profile"
      className="flex items-center gap-3 card-magic px-4 py-3 hover:bg-white/90 transition-all"
    >
      <Avatar id={player.avatar} size={48} glow={false} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <div className="font-display text-base text-[var(--ink-plum)] truncate">
            {player.name}
          </div>
          <span className="text-[10px] font-magic text-[var(--gold-deep)] tracking-[0.2em] uppercase">
            {AVATAR_META[player.avatar].title}
          </span>
        </div>
        <div className="mt-1 w-44 sm:w-56">
          <XPBar player={player} />
        </div>
      </div>
    </Link>
  );
}
