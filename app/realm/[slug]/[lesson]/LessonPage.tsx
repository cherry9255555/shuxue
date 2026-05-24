"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import SiteHeader from "@/components/game/SiteHeader";
import Ribbon from "@/components/theme/Ribbon";
import QuestionCard from "@/components/lesson/QuestionCard";
import FunctionPlot from "@/components/lesson/FunctionPlot";
import Tex from "@/components/ui/Tex";
import StarRating from "@/components/game/StarRating";
import type { Lesson, Question, Realm } from "@/content/types";
import type { PlayerState } from "@/lib/progress";
import { applyAnswer, completeLesson, load, save } from "@/lib/progress";

type Data =
  | { realm: Realm; lesson: Lesson; boss: null }
  | { realm: Realm; lesson: null; boss: Realm["boss"] };

type Props = {
  realmSlug: string;
  lessonSlug: string;
  data: Data;
};

/** 把含 $...$ 的段落拆成普通文本 + TeX */
function renderInline(text: string, keyPrefix = "k") {
  const parts = text.split(/(\$[^$]+\$)/g);
  return parts.map((p, i) => {
    if (p.startsWith("$") && p.endsWith("$")) {
      return <Tex key={`${keyPrefix}-${i}`}>{p.slice(1, -1)}</Tex>;
    }
    // 支持 **粗体**
    const bolded = p.split(/(\*\*[^*]+\*\*)/g).map((seg, j) => {
      if (seg.startsWith("**") && seg.endsWith("**")) {
        return (
          <strong key={`b-${j}`} className="violet-ink">
            {seg.slice(2, -2)}
          </strong>
        );
      }
      return <span key={`s-${j}`}>{seg}</span>;
    });
    return <span key={`${keyPrefix}-${i}`}>{bolded}</span>;
  });
}

export default function LessonPage({ realmSlug, lessonSlug, data }: Props) {
  const { realm } = data;
  const isBoss = lessonSlug === "boss";
  const title = isBoss ? data.boss!.title : data.lesson!.title;
  const subtitle = isBoss ? "BOSS 挑战" : data.lesson!.subtitle;
  const questions: Question[] = isBoss ? data.boss!.questions : data.lesson!.questions;
  const concept = isBoss ? null : data.lesson!.concept;
  const interactive = isBoss ? null : data.lesson!.interactive;
  const lessonKey = isBoss ? data.boss!.key : data.lesson!.key;

  const router = useRouter();
  const [player, setPlayer] = useState<PlayerState | null>(null);
  const [phase, setPhase] = useState<"concept" | "practice" | "done">(
    isBoss ? "practice" : "concept",
  );
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);
  const [allCorrect, setAllCorrect] = useState(true);
  const [pop, setPop] = useState<{ xp: number; level: boolean } | null>(null);

  useEffect(() => {
    setPlayer(load());
  }, []);

  const totalQ = questions.length;
  const progressed = resolvedIds.length;

  function handleResolve(qid: string, correct: boolean) {
    if (!player) return;
    if (resolvedIds.includes(qid)) return;
    const { next, gainedXp, leveledUp } = applyAnswer(player, lessonKey, qid, correct);
    setPlayer(next);
    setResolvedIds((arr) => [...arr, qid]);
    if (!correct) setAllCorrect(false);
    if (gainedXp > 0) {
      setPop({ xp: gainedXp, level: leveledUp });
      setTimeout(() => setPop(null), 1800);
    }
  }

  // 全部题目结束 → 完成课程
  useEffect(() => {
    if (!player) return;
    if (progressed < totalQ) return;
    if (phase === "done") return;
    const formulaKeys = concept?.formulas?.map((f) => f.key) ?? [];
    const next = completeLesson(player, lessonKey, totalQ, formulaKeys);
    setPlayer(next);
    save(next);
    setPhase("done");
  }, [progressed, totalQ, phase, player, lessonKey, concept]);

  const nextLessonHref = useMemo(() => {
    if (isBoss) return "/";
    const idx = realm.lessons.findIndex((l) => l.slug === lessonSlug);
    if (idx === -1) return `/realm/${realm.slug}`;
    if (idx + 1 < realm.lessons.length) {
      return `/realm/${realm.slug}/${realm.lessons[idx + 1].slug}`;
    }
    return `/realm/${realm.slug}/boss`;
  }, [isBoss, realm, lessonSlug]);

  return (
    <>
      <SiteHeader player={player} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <Link
          href={`/realm/${realm.slug}`}
          className="inline-flex items-center gap-2 font-magic text-xs uppercase tracking-[0.3em] text-[var(--gold-deep)] hover:text-[var(--ink-plum)]"
        >
          ← {realm.title}
        </Link>

        <header className="mt-6">
          <p className="font-magic text-xs uppercase tracking-[0.4em] text-[var(--gold-deep)]">
            ✧ {subtitle} ✧
          </p>
          <h1 className="font-display text-4xl md:text-5xl mt-2 text-[var(--ink-plum)] leading-tight">
            {title}
          </h1>
          {concept?.subtitle && (
            <p className="font-hand text-base text-[var(--ink-plum)]/70 mt-1">
              {concept.subtitle}
            </p>
          )}
        </header>

        {/* 概念讲解 */}
        {phase === "concept" && concept && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="card-magic p-6 md:p-8 space-y-5">
              {concept.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed font-body text-[var(--ink-plum)]/90">
                  {renderInline(p, `p${i}`)}
                </p>
              ))}

              {concept.formulas && concept.formulas.length > 0 && (
                <div className="pt-3 border-t border-[var(--surface-ring)]">
                  <div className="font-magic text-xs tracking-[0.3em] text-[var(--gold-deep)] uppercase mb-3">
                    ✧ 入典藏馆的公式
                  </div>
                  <div className="space-y-3">
                    {concept.formulas.map((f) => (
                      <div key={f.key} className="flex items-baseline gap-4">
                        <div className="font-display text-xl text-[var(--ink-plum)]">
                          <Tex display>{f.tex}</Tex>
                        </div>
                        <div className="font-hand text-sm text-[var(--ink-plum)]/70">
                          {f.caption}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 互动可视化 */}
            {(interactive === "slope-slider" || interactive === "a-slider") && (
              <div className="mt-6">
                <FunctionPlot
                  kind={interactive === "slope-slider" ? "linear" : "quadratic"}
                  controls={
                    interactive === "slope-slider"
                      ? (["k", "b"] as const).slice()
                      : (["a", "b", "c"] as const).slice()
                  }
                  initial={interactive === "slope-slider" ? { k: 1, b: 0 } : { a: 1, b: 0, c: 0 }}
                />
                <p className="font-hand text-sm text-[var(--moonstone)] mt-3 text-center">
                  ✦ 用滑块改变系数，观察图像如何变化。准备好之后开始答题。
                </p>
              </div>
            )}

            <div className="mt-7 flex justify-center">
              <button onClick={() => setPhase("practice")} className="btn-magic">
                ✦ 开始施法（共 {totalQ} 题） ✦
              </button>
            </div>
          </motion.section>
        )}

        {/* 答题 */}
        {phase === "practice" && (
          <section className="mt-8 space-y-6">
            {/* 进度指示 */}
            <div className="flex items-center gap-3 text-sm">
              <span className="font-magic text-[var(--gold-deep)] tracking-wider uppercase text-xs">
                进度
              </span>
              <div className="flex-1 h-1.5 rounded-full bg-white/60 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(progressed / totalQ) * 100}%` }}
                  className="h-full"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--sakura-pink), var(--gold-dust))",
                  }}
                />
              </div>
              <span className="font-hand text-sm text-[var(--ink-plum)]">
                {progressed} / {totalQ}
              </span>
            </div>

            {questions.map((q, i) => (
              <div key={q.id}>
                <div className="font-magic text-xs tracking-[0.3em] text-[var(--gold-deep)] mb-2 uppercase">
                  第 {i + 1} 道
                </div>
                <QuestionCard
                  question={q}
                  onResolve={(correct) => handleResolve(q.id, correct)}
                />
              </div>
            ))}
          </section>
        )}

        {/* 完成 */}
        {phase === "done" && (
          <motion.section
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-10"
          >
            <div className="card-magic p-8 md:p-10 text-center relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,196,214,0.4), rgba(244,211,94,0.3))",
              }}
            >
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 16 }, (_, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 400, opacity: [0, 1, 0] }}
                    transition={{
                      duration: 4 + Math.random() * 3,
                      delay: Math.random() * 1.5,
                      repeat: Infinity,
                      ease: "easeIn",
                    }}
                    className="absolute text-2xl"
                    style={{
                      left: `${Math.random() * 100}%`,
                      color: i % 2 === 0 ? "#f48fb1" : "#f4d35e",
                    }}
                  >
                    ❀
                  </motion.span>
                ))}
              </div>
              <div className="relative">
                <p className="font-magic text-xs tracking-[0.4em] text-[var(--gold-deep)] uppercase">
                  ✦ {isBoss ? "结界已破" : "结界封印解除"} ✦
                </p>
                <h2 className="font-display text-5xl md:text-6xl mt-3 text-[var(--ink-plum)]">
                  {allCorrect ? "Magnifique!" : "Bien joué!"}
                </h2>
                <p className="font-hand text-lg text-[var(--ink-plum)]/80 mt-2">
                  {allCorrect
                    ? "全对！樱花漫天，你将公式收入了典藏馆。"
                    : "完成了这一节。复盘解析，下一次将更接近完美。"}
                </p>
                <div className="mt-5 flex justify-center">
                  <StarRating
                    value={
                      allCorrect ? (player && player.streak >= 3 ? 3 : 2) : 1
                    }
                    size={28}
                  />
                </div>
                <div className="mt-8 flex justify-center gap-3">
                  <Link href={nextLessonHref} className="btn-magic">
                    {isBoss ? "返回大厅" : "✦ 下一节 ✦"}
                  </Link>
                  <button
                    onClick={() => router.refresh()}
                    className="btn-magic btn-magic-secondary"
                  >
                    再练一遍
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* XP 飘字 */}
        <AnimatePresence>
          {pop && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: -40, scale: 1 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ duration: 1.5 }}
              className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
            >
              <div className="px-5 py-3 rounded-full font-magic tracking-[0.2em] text-lg shadow-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, var(--gold-dust), var(--sakura-deep))",
                  color: "#fff",
                  boxShadow: "0 10px 40px rgba(244,211,94,0.5)",
                }}
              >
                {pop.level ? "✦ LEVEL UP! ✦" : `+${pop.xp} 星尘 ✦`}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
