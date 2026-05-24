"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Avatar, { AVATAR_META } from "@/components/game/Avatar";
import type { AvatarId, PlayerState } from "@/lib/progress";
import { create, load } from "@/lib/progress";

type Props = {
  onReady: (player: PlayerState) => void;
};

export default function CharacterCreator({ onReady }: Props) {
  const [stage, setStage] = useState<"loading" | "form" | "done">("loading");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<AvatarId>("luna");

  useEffect(() => {
    const existing = load();
    if (existing && existing.name) {
      setStage("done");
      onReady(existing);
    } else {
      setStage("form");
    }
  }, [onReady]);

  function submit() {
    const trimmed = name.trim() || "葵";
    const player = create(trimmed, avatar);
    setStage("done");
    onReady(player);
  }

  if (stage !== "form") return null;

  const avatars: AvatarId[] = ["luna", "sora", "haru", "yuki"];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(45,27,105,0.55), rgba(20,9,58,0.8))",
          backdropFilter: "blur(8px)",
        }}
      >
        <motion.div
          initial={{ scale: 0.92, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="card-magic p-8 md:p-12 max-w-2xl w-full"
          style={{ background: "rgba(253,246,240,0.95)" }}
        >
          <div className="text-center mb-2">
            <p className="font-magic text-xs uppercase tracking-[0.4em] text-[var(--gold-deep)]">
              ✧ Sakura Mahou Gakuin ✧
            </p>
            <h1 className="font-display text-4xl md:text-5xl mt-2 text-[var(--ink-plum)]">
              欢迎来到 <span className="gold-stroke">樱花魔法院</span>
            </h1>
            <p className="font-hand text-[var(--moonstone)] mt-3">
              选择你的人设，刻下你的名字。<br className="hidden sm:inline" />
              入学典礼即将开始。
            </p>
          </div>

          <div className="ribbon my-6" />

          {/* Avatar 选择 */}
          <div className="grid grid-cols-4 gap-3 md:gap-4">
            {avatars.map((id) => {
              const selected = avatar === id;
              return (
                <button
                  key={id}
                  onClick={() => setAvatar(id)}
                  className={`relative rounded-2xl p-2 md:p-3 transition-all ${
                    selected
                      ? "bg-[var(--gold-dust)]/30 ring-2 ring-[var(--gold-deep)]"
                      : "hover:bg-white/60"
                  }`}
                >
                  <Avatar id={id} size={80} glow={selected} />
                  <div className="mt-2 text-xs font-magic text-[var(--ink-plum)] text-center">
                    {AVATAR_META[id].name.split(" ")[0]}
                  </div>
                  <div className="text-[10px] font-hand text-[var(--moonstone)] text-center">
                    {AVATAR_META[id].title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 名字 */}
          <div className="mt-6">
            <label className="block text-sm font-hand text-[var(--ink-plum)] mb-2">
              ✦ 为自己取一个名字（不输则默认为「葵」）
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={12}
              placeholder="比如：小樱、Haru、星见..."
              className="w-full px-4 py-3 rounded-xl border border-[var(--surface-ring)] bg-white text-lg font-hand text-[var(--ink-plum)] focus:outline-none focus:border-[var(--gold-deep)] focus:ring-2 focus:ring-[var(--gold-dust)]/30"
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="font-magic text-xs text-[var(--moonstone)] tracking-wider">
              进度只保存在这台设备上 · 不上传任何信息
            </p>
            <button onClick={submit} className="btn-magic">
              ✦ 缔结契约 ✦
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
