"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import SiteHeader from "@/components/game/SiteHeader";
import StarRating from "@/components/game/StarRating";
import Ribbon from "@/components/theme/Ribbon";
import type { Realm } from "@/content/types";
import type { PlayerState } from "@/lib/progress";
import { lessonStars, load, realmProgress } from "@/lib/progress";

type Props = {
  realm: Realm;
};

export default function RealmPage({ realm }: Props) {
  const [player, setPlayer] = useState<PlayerState | null>(null);

  useEffect(() => {
    setPlayer(load());
  }, []);

  const bossUnlocked =
    realmProgress(player, realm.lessons.map((l) => l.key)).completed >=
    Math.ceil(realm.lessons.length * 0.6);

  return (
    <>
      <SiteHeader player={player} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-magic text-xs uppercase tracking-[0.3em] text-[var(--gold-deep)] hover:text-[var(--ink-plum)] transition-colors"
        >
          ← 返回大厅
        </Link>

        <header className="mt-6">
          <p className="font-magic text-xs uppercase tracking-[0.4em] text-[var(--gold-deep)]">
            ✧ {realm.subtitle} ✧
          </p>
          <h1 className="font-display text-5xl md:text-7xl mt-2 text-[var(--ink-plum)] leading-[1.05]">
            {realm.title}
          </h1>
          <p className="font-hand text-sm text-[var(--ink-plum)]/60 mt-1">
            {realm.motif}
          </p>
          <p className="mt-5 max-w-2xl font-body text-base text-[var(--ink-plum)]/85 leading-relaxed">
            {realm.description}
          </p>
        </header>

        <Ribbon text="课程列表 · Lessons" />

        <section className="grid gap-4">
          {realm.lessons.map((lesson, i) => {
            const stars = lessonStars(player, lesson.key);
            const cleared = stars > 0;
            return (
              <motion.div
                key={lesson.key}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
              >
                <Link
                  href={`/realm/${realm.slug}/${lesson.slug}`}
                  className="card-magic p-5 md:p-6 flex items-center gap-5 hover:scale-[1.01] transition-all group"
                >
                  {/* 序号徽章 */}
                  <div className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-display text-xl"
                    style={{
                      background: cleared
                        ? "linear-gradient(135deg, var(--gold-dust), var(--sakura-pink))"
                        : "rgba(231,212,243,0.6)",
                      color: cleared ? "#fff" : "var(--ink-plum)",
                      boxShadow: cleared
                        ? "0 8px 24px -8px rgba(244,211,94,0.5)"
                        : "inset 0 1px 2px rgba(74,25,66,0.1)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-display text-xl md:text-2xl text-[var(--ink-plum)]">
                      {lesson.title}
                    </div>
                    <div className="font-hand text-sm text-[var(--ink-plum)]/60">
                      {lesson.subtitle}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <StarRating value={stars} size={16} />
                    <span className="font-magic text-[10px] uppercase tracking-widest text-[var(--gold-deep)]">
                      {cleared ? "已通关" : "前往"}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* BOSS 卡 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4"
          >
            <Link
              href={bossUnlocked ? `/realm/${realm.slug}/boss` : "#"}
              aria-disabled={!bossUnlocked}
              className={`card-magic p-6 md:p-8 flex items-center gap-5 transition-all relative overflow-hidden ${
                bossUnlocked
                  ? "hover:scale-[1.01] shadow-[var(--shadow-magic)]"
                  : "pointer-events-none opacity-50 saturate-50"
              }`}
              style={{
                background:
                  "linear-gradient(135deg, rgba(45,27,105,0.92), rgba(20,9,58,0.95))",
                color: "var(--moon-cream)",
                border: "1px solid var(--gold-deep)",
              }}
            >
              <div className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  background:
                    "radial-gradient(circle at 80% 20%, rgba(244,211,94,0.4), transparent 60%)",
                }}
              />
              <div className="relative shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                style={{
                  background:
                    "radial-gradient(circle, var(--gold-dust), var(--gold-deep))",
                }}
              >
                ✦
              </div>
              <div className="relative flex-1">
                <div className="font-magic text-[10px] uppercase tracking-[0.4em] text-[var(--gold-dust)]">
                  BOSS · 章节守护者
                </div>
                <div className="font-display text-2xl md:text-3xl mt-1">
                  {realm.boss.title}
                </div>
                <p className="font-hand text-sm opacity-80 mt-1 max-w-xl">
                  {bossUnlocked
                    ? "完成所有课程后挑战这里，可解锁下一个结界。"
                    : `先通过至少 ${Math.ceil(realm.lessons.length * 0.6)} 节课程才能挑战。`}
                </p>
              </div>
              <StarRating value={lessonStars(player, realm.boss.key)} size={18} />
            </Link>
          </motion.div>
        </section>
      </main>
    </>
  );
}
