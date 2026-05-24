"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import SiteHeader from "@/components/game/SiteHeader";
import Ribbon from "@/components/theme/Ribbon";
import Tex from "@/components/ui/Tex";
import { realms } from "@/content";
import type { PlayerState } from "@/lib/progress";
import { load } from "@/lib/progress";

type FormulaEntry = {
  key: string;
  tex: string;
  caption: string;
  realmTitle: string;
  lessonTitle: string;
  collected: boolean;
};

function gatherAllFormulas(player: PlayerState | null): FormulaEntry[] {
  const collected = new Set(player?.codex ?? []);
  const entries: FormulaEntry[] = [];
  for (const realm of realms) {
    for (const lesson of realm.lessons) {
      const fs = lesson.concept.formulas ?? [];
      for (const f of fs) {
        entries.push({
          key: f.key,
          tex: f.tex,
          caption: f.caption,
          realmTitle: realm.title,
          lessonTitle: lesson.title,
          collected: collected.has(f.key),
        });
      }
    }
  }
  return entries;
}

export default function CodexPage() {
  const [player, setPlayer] = useState<PlayerState | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setPlayer(load());
  }, []);

  const all = gatherAllFormulas(player);
  const collected = all.filter((e) => e.collected);

  return (
    <>
      <SiteHeader player={player} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-magic text-xs uppercase tracking-[0.3em] text-[var(--gold-deep)] hover:text-[var(--ink-plum)]"
        >
          ← 返回大厅
        </Link>

        <header className="mt-6">
          <p className="font-magic text-xs uppercase tracking-[0.4em] text-[var(--gold-deep)]">
            ✧ Codex of Spells ✧
          </p>
          <h1 className="font-display text-5xl md:text-6xl mt-2 text-[var(--ink-plum)]">
            公式典藏馆
          </h1>
          <p className="font-hand text-base text-[var(--ink-plum)]/70 mt-2 max-w-2xl">
            每学完一节课，你掌握的公式会自动入藏。
            {hydrated && (
              <>
                {" "}已收集 <span className="violet-ink font-bold">{collected.length}</span>{" "}
                / {all.length} 条咒文。
              </>
            )}
          </p>
        </header>

        <Ribbon text="收藏的公式" />

        <section className="grid gap-4 md:grid-cols-2">
          {all.map((e, i) => (
            <motion.div
              key={e.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`card-magic p-5 md:p-6 ${
                e.collected ? "" : "opacity-50 saturate-50"
              }`}
              style={
                e.collected
                  ? {
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(244,211,94,0.18))",
                    }
                  : undefined
              }
            >
              <div className="font-magic text-[10px] uppercase tracking-[0.3em] text-[var(--gold-deep)]">
                {e.collected ? "已收藏" : "未入藏"} · {e.realmTitle} ⊙ {e.lessonTitle}
              </div>
              <div className="mt-4 flex items-center justify-center min-h-[60px]">
                {e.collected ? (
                  <Tex display>{e.tex}</Tex>
                ) : (
                  <span className="font-magic text-2xl text-[var(--moonstone)]">
                    ? ? ?
                  </span>
                )}
              </div>
              <p className="text-sm font-hand text-[var(--ink-plum)]/70 mt-3 text-center">
                {e.collected ? e.caption : "完成相应课程后即可揭示"}
              </p>
            </motion.div>
          ))}
        </section>
      </main>
    </>
  );
}
