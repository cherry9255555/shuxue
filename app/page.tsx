"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import SiteHeader from "@/components/game/SiteHeader";
import Avatar, { AVATAR_META } from "@/components/game/Avatar";
import CharacterCreator from "@/components/game/CharacterCreator";
import RealmCard from "@/components/game/RealmCard";
import Ribbon from "@/components/theme/Ribbon";
import { realms } from "@/content";
import type { PlayerState } from "@/lib/progress";
import { load, lessonStars, realmProgress } from "@/lib/progress";

export default function HomePage() {
  const [player, setPlayer] = useState<PlayerState | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setPlayer(load());
  }, []);

  function isRealmUnlocked(unlockAfter: string | null): boolean {
    if (!unlockAfter) return true;
    return lessonStars(player, unlockAfter) > 0;
  }

  return (
    <>
      <SiteHeader player={player} />
      {hydrated && !player && <CharacterCreator onReady={setPlayer} />}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        {/* 英雄区 */}
        <section className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="font-magic text-xs uppercase tracking-[0.4em] text-[var(--gold-deep)]">
              ✧ Sakura Mahou Gakuin · 入学典礼 ✧
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-[var(--ink-plum)] mt-3 leading-[1.05]">
              在花瓣纷飞之处
              <br />
              <span className="gold-stroke">解开数学的咒文</span>
            </h1>
            <p className="font-hand text-lg text-[var(--ink-plum)]/80 mt-5 max-w-xl leading-relaxed">
              每个章节都是一个被封印的<strong className="violet-ink">结界</strong>。
              答对题目，你会获得**星尘** ✦，升级、解锁、收集公式典藏。
              {player ? (
                <>
                  <br />
                  欢迎回来，<strong className="violet-ink">{player.name}</strong>。
                </>
              ) : null}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`/realm/${realms[0].slug}`} className="btn-magic">
                ✦ {player ? "继续修行" : "进入第一个结界"} ✦
              </Link>
              <Link href="/codex" className="btn-magic btn-magic-secondary">
                公式典藏
              </Link>
            </div>
          </motion.div>

          {player && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="hidden md:flex flex-col items-center"
            >
              <Avatar id={player.avatar} size={196} />
              <div className="mt-4 text-center">
                <div className="font-display text-2xl text-[var(--ink-plum)]">
                  {player.name}
                </div>
                <div className="font-magic text-xs tracking-[0.3em] text-[var(--gold-deep)] uppercase mt-1">
                  Lv.{player.level} · {AVATAR_META[player.avatar].title}
                </div>
              </div>
            </motion.div>
          )}
        </section>

        <Ribbon text="结界图谱 · Realm Map" />

        {/* 章节地图 */}
        <section className="grid gap-5 md:grid-cols-2">
          {realms.map((r, i) => (
            <RealmCard
              key={r.slug}
              realm={r}
              player={player}
              unlocked={isRealmUnlocked(r.unlockAfter)}
              index={i}
            />
          ))}
        </section>

        {/* 等更多章节的占位卡 */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {["勾股回廊", "圆环秘境", "概率星海"].map((title) => (
            <div key={title} className="card-magic p-5 opacity-50 saturate-50">
              <div className="font-magic text-xs tracking-[0.3em] text-[var(--gold-deep)]/60 uppercase">
                未解封
              </div>
              <div className="font-display text-2xl text-[var(--ink-plum)] mt-1">
                {title}
              </div>
              <p className="font-hand text-sm text-[var(--ink-plum)]/60 mt-2">
                完成前面的章节，将自动开启 ✦
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center font-magic text-xs text-[var(--moonstone)] tracking-widest">
          ✧ 每一道题，都是一次施法 ✧
        </div>
      </main>
    </>
  );
}
