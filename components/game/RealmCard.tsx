"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Realm } from "@/content/types";
import type { PlayerState } from "@/lib/progress";
import { lessonStars, realmProgress } from "@/lib/progress";
import StarRating from "./StarRating";

type Props = {
  realm: Realm;
  player: PlayerState | null;
  unlocked: boolean;
  index: number;
};

export default function RealmCard({ realm, player, unlocked, index }: Props) {
  const lessonKeys = realm.lessons.map((l) => l.key);
  const { completed, total, ratio } = realmProgress(player, lessonKeys);
  const bossStars = lessonStars(player, realm.boss.key);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
    >
      <Link
        href={unlocked ? `/realm/${realm.slug}` : "#"}
        aria-disabled={!unlocked}
        className={`block group ${!unlocked ? "pointer-events-none" : ""}`}
      >
        <div
          className={`card-magic p-6 md:p-7 h-full transition-all relative overflow-hidden ${
            unlocked
              ? "hover:scale-[1.02] hover:shadow-[0_24px_60px_-20px_rgba(45,27,105,0.45)]"
              : "opacity-50 saturate-50"
          }`}
          style={{
            background: unlocked
              ? `linear-gradient(135deg, rgba(255,255,255,0.85) 0%, ${realm.accent}30 100%)`
              : "rgba(255,255,255,0.5)",
          }}
        >
          {/* 装饰角标 */}
          <div className="absolute top-3 right-3 font-magic text-[10px] tracking-[0.3em] text-[var(--gold-deep)]/70 uppercase">
            CH·{String(index + 1).padStart(2, "0")}
          </div>

          {/* 锁 / 完成度 */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-magic text-xs uppercase tracking-[0.3em] text-[var(--gold-deep)]">
              {unlocked ? "已开启" : "未解封"}
            </span>
            {unlocked && (
              <>
                <span className="text-[var(--moonstone)]">·</span>
                <span className="text-xs font-hand text-[var(--moonstone)]">
                  {completed} / {total + 1}
                </span>
              </>
            )}
          </div>

          <h2 className="font-display text-3xl md:text-4xl text-[var(--ink-plum)] leading-tight">
            {realm.title}
          </h2>
          <p className="font-magic text-xs tracking-[0.3em] text-[var(--gold-deep)] uppercase mt-1">
            {realm.subtitle}
          </p>
          <p className="text-sm font-hand text-[var(--ink-plum)]/70 mt-1">
            {realm.motif}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-[var(--ink-plum)]/85 font-body">
            {realm.description}
          </p>

          {/* 进度条 */}
          {unlocked && (
            <div className="mt-5">
              <div className="h-2 rounded-full bg-white/60 overflow-hidden border border-[var(--surface-ring)]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${ratio * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--sakura-pink), var(--gold-dust))",
                  }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="font-magic tracking-wider text-[var(--gold-deep)]">
                  BOSS 评级
                </span>
                <StarRating value={bossStars} max={3} size={14} />
              </div>
            </div>
          )}

          {!unlocked && (
            <div className="mt-5 text-xs font-hand text-[var(--ink-plum)]/60">
              ✦ 通关前一个结界的 BOSS 可解锁
            </div>
          )}

          {/* hover 箭头 */}
          {unlocked && (
            <div className="mt-5 flex items-center gap-2 font-magic text-sm text-[var(--ink-plum)] opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
              <span>进入结界</span>
              <span>→</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
