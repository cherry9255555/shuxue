"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Tex from "@/components/ui/Tex";
import type { Question } from "@/content/types";

type Status = "idle" | "correct" | "wrong";

type Props = {
  question: Question;
  onResolve: (correct: boolean, attempts: number) => void;
};

/** 把含 $...$ 的文本切成普通文字 + 内联 TeX */
function renderStem(stem: string) {
  const parts = stem.split(/(\$[^$]+\$)/g);
  return parts.map((p, i) => {
    if (p.startsWith("$") && p.endsWith("$")) {
      return <Tex key={i}>{p.slice(1, -1)}</Tex>;
    }
    return <span key={i}>{p}</span>;
  });
}

export default function QuestionCard({ question, onResolve }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [selected, setSelected] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const isChoice = question.kind === "choice";

  function check() {
    if (status === "correct") return;
    let correct = false;
    if (isChoice) {
      if (selected === null) return;
      correct = selected === question.answerIndex;
    } else {
      const ans = question.answer;
      if (typeof ans === "number") {
        const n = Number(input.replace(/\s+/g, ""));
        const frac = input.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
        const v = frac ? parseFloat(frac[1]) / parseFloat(frac[2]) : n;
        correct = !Number.isNaN(v) && Math.abs(v - ans) < 1e-6;
      } else {
        const normalized = input.replace(/\s+/g, "").toLowerCase();
        correct = ans.strings.some((s) => s.replace(/\s+/g, "").toLowerCase() === normalized);
      }
    }

    const next = attempts + 1;
    setAttempts(next);
    if (correct) {
      setStatus("correct");
      onResolve(true, next);
    } else {
      setStatus("wrong");
      if (next >= 3) {
        // 3 次后揭晓答案，但仍算未通过
        onResolve(false, next);
      }
    }
  }

  function reset() {
    setStatus("idle");
    setSelected(null);
    setInput("");
  }

  return (
    <div className="card-magic p-6 md:p-8 relative overflow-hidden">
      {/* 题干 */}
      <div className="text-base md:text-lg leading-relaxed text-[var(--ink-plum)] mb-5">
        {renderStem(question.stem)}
      </div>
      {question.stemTex && (
        <div className="my-4 flex justify-center">
          <Tex display>{question.stemTex}</Tex>
        </div>
      )}

      {/* 选项 / 填空 */}
      {isChoice ? (
        <div className="grid gap-3 md:grid-cols-2">
          {question.options.map((opt, i) => {
            const isSel = selected === i;
            const isAns = status !== "idle" && i === question.answerIndex;
            const isWrongPick = status === "wrong" && isSel && i !== question.answerIndex;
            return (
              <button
                key={i}
                onClick={() => status !== "correct" && setSelected(i)}
                disabled={status === "correct"}
                className={`text-left px-4 py-3 rounded-xl border transition-all
                  ${
                    isAns
                      ? "border-[var(--gold-deep)] bg-[var(--gold-dust)]/20 shadow-[0_0_0_2px_rgba(244,211,94,0.4)]"
                      : isWrongPick
                      ? "border-[var(--sakura-deep)] bg-[var(--sakura-pink)]/30"
                      : isSel
                      ? "border-[var(--ink-plum)] bg-white/80"
                      : "border-[var(--surface-ring)] bg-white/60 hover:bg-white/90 hover:border-[var(--sakura-deep)]"
                  }`}
              >
                <span className="font-magic text-xs text-[var(--gold-deep)] mr-2">
                  {String.fromCharCode(65 + i)}
                </span>
                {renderStem(opt)}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={question.placeholder ?? "在这里写下你的答案"}
            disabled={status === "correct"}
            className="flex-1 px-4 py-3 rounded-xl border border-[var(--surface-ring)] bg-white/80 text-[var(--ink-plum)] font-hand text-lg focus:outline-none focus:border-[var(--gold-deep)] focus:ring-2 focus:ring-[var(--gold-dust)]/30"
            onKeyDown={(e) => e.key === "Enter" && check()}
          />
        </div>
      )}

      {/* 提示 */}
      {question.hint && status === "wrong" && !showHint && attempts < 3 && (
        <button
          onClick={() => setShowHint(true)}
          className="mt-4 text-sm font-magic text-[var(--gold-deep)] underline-offset-4 hover:underline"
        >
          ✦ 翻开提示卡
        </button>
      )}
      {showHint && question.hint && (
        <div className="mt-4 px-4 py-3 rounded-xl bg-[var(--gold-dust)]/15 border border-[var(--gold-dust)]/40 text-sm">
          <span className="font-magic text-[var(--gold-deep)] uppercase tracking-widest mr-2">提示</span>
          {renderStem(question.hint)}
        </div>
      )}

      {/* 提交 / 反馈区 */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <AnimatePresence mode="wait">
          {status === "correct" && (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-magic text-[var(--gold-deep)] tracking-wider"
            >
              ✦ Magnifique! 答对了 ✦
            </motion.div>
          )}
          {status === "wrong" && (
            <motion.div
              key="bad"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }}
              transition={{ x: { duration: 0.4 } }}
              exit={{ opacity: 0 }}
              className="font-magic text-[var(--sakura-deep)] tracking-wider"
            >
              {attempts >= 3 ? "结界还没破开，看看解析吧" : "再试一次 · もう一度"}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="ml-auto flex gap-2">
          {status === "wrong" && attempts < 3 && (
            <button onClick={reset} className="btn-magic btn-magic-secondary text-sm py-2 px-4">
              重来
            </button>
          )}
          {status !== "correct" && (
            <button
              onClick={check}
              disabled={isChoice ? selected === null : !input}
              className="btn-magic text-sm py-2 px-5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              施法判定
            </button>
          )}
        </div>
      </div>

      {/* 解析 */}
      {(status === "correct" || (status === "wrong" && attempts >= 3)) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 pt-5 border-t border-[var(--surface-ring)]"
        >
          <div className="font-magic text-xs uppercase tracking-[0.3em] text-[var(--gold-deep)] mb-2">
            ✧ 解析
          </div>
          <div className="text-sm leading-relaxed text-[var(--ink-plum)]/85 font-hand">
            {renderStem(question.explanation)}
          </div>
        </motion.div>
      )}

      {/* 答对的星屑闪光 */}
      {status === "correct" && <CorrectBurst />}
    </div>
  );
}

function CorrectBurst() {
  // 8 颗星屑朝外飞
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const r = 80 + Math.random() * 60;
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
            animate={{
              x: Math.cos(angle) * r,
              y: Math.sin(angle) * r,
              opacity: 0,
              scale: 1.2,
            }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute"
            style={{ color: i % 2 === 0 ? "#f4d35e" : "#ffc4d6", fontSize: 14 }}
          >
            ✦
          </motion.span>
        );
      })}
    </div>
  );
}
