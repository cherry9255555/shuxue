"use client";

import { motion } from "motion/react";
import type { PlayerState } from "@/lib/progress";
import { xpProgress } from "@/lib/progress";

type Props = {
  player: PlayerState;
  compact?: boolean;
};

export default function XPBar({ player, compact = false }: Props) {
  const { current, max, ratio } = xpProgress(player);

  return (
    <div className={`flex items-center gap-3 ${compact ? "" : "w-full"}`}>
      <div className="font-magic text-xs text-[var(--gold-deep)] uppercase tracking-[0.25em] whitespace-nowrap">
        Lv.{player.level}
      </div>
      <div
        className="relative flex-1 h-3 rounded-full overflow-hidden"
        style={{
          background: "linear-gradient(90deg, rgba(255,255,255,0.6), rgba(231,212,243,0.5))",
          boxShadow: "inset 0 1px 2px rgba(74,25,66,0.15)",
        }}
      >
        <motion.div
          className="absolute left-0 top-0 bottom-0"
          initial={{ width: 0 }}
          animate={{ width: `${ratio * 100}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{
            background:
              "linear-gradient(90deg, var(--sakura-pink) 0%, var(--gold-dust) 50%, var(--sakura-deep) 100%)",
            boxShadow: "0 0 12px rgba(244,211,94,0.5)",
          }}
        />
        {/* 顶部高光 */}
        <span
          className="absolute inset-x-0 top-0 h-1/2 rounded-t-full pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.45), transparent)" }}
        />
      </div>
      {!compact && (
        <div className="text-xs font-magic tracking-wider text-[var(--ink-plum)] whitespace-nowrap">
          ✦ {current}<span className="text-[var(--moonstone)]"> / {max}</span>
        </div>
      )}
    </div>
  );
}
