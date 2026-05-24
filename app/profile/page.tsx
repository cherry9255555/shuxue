"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/game/SiteHeader";
import Avatar, { AVATAR_META } from "@/components/game/Avatar";
import XPBar from "@/components/game/XPBar";
import Ribbon from "@/components/theme/Ribbon";
import StarRating from "@/components/game/StarRating";
import { realms } from "@/content";
import type { AvatarId, PlayerState } from "@/lib/progress";
import { lessonStars, load, save } from "@/lib/progress";

export default function ProfilePage() {
  const router = useRouter();
  const [player, setPlayer] = useState<PlayerState | null>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<AvatarId>("luna");

  useEffect(() => {
    const p = load();
    setPlayer(p);
    if (p) {
      setName(p.name);
      setAvatar(p.avatar);
    }
  }, []);

  if (!player) {
    return (
      <>
        <SiteHeader player={null} />
        <main className="max-w-3xl mx-auto px-4 py-16 text-center">
          <p className="font-hand text-lg text-[var(--ink-plum)]">
            还没有创建角色。
          </p>
          <Link href="/" className="btn-magic mt-6 inline-block">
            前往大厅
          </Link>
        </main>
      </>
    );
  }

  function commit() {
    const next: PlayerState = { ...player!, name: name.trim() || "葵", avatar };
    save(next);
    setPlayer(next);
    setEditing(false);
  }

  function resetAll() {
    if (
      !confirm(
        "确定要清除所有学习进度并删除角色吗？此操作不可撤销。",
      )
    )
      return;
    localStorage.removeItem("sakura-math.v1");
    router.push("/");
  }

  const totalStars = realms.reduce((acc, r) => {
    const ls = r.lessons.reduce(
      (a, l) => a + lessonStars(player, l.key),
      0,
    );
    return acc + ls + lessonStars(player, r.boss.key);
  }, 0);

  const maxStars = realms.reduce(
    (acc, r) => acc + (r.lessons.length + 1) * 3,
    0,
  );

  return (
    <>
      <SiteHeader player={player} />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-magic text-xs uppercase tracking-[0.3em] text-[var(--gold-deep)] hover:text-[var(--ink-plum)]"
        >
          ← 返回大厅
        </Link>

        <header className="mt-6 flex items-center gap-6">
          <Avatar id={player.avatar} size={120} />
          <div className="flex-1">
            <p className="font-magic text-xs uppercase tracking-[0.4em] text-[var(--gold-deep)]">
              ✧ Profile · 角色档案 ✧
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-[var(--ink-plum)] mt-1">
              {player.name}
            </h1>
            <p className="font-hand text-sm text-[var(--ink-plum)]/70 mt-1">
              {AVATAR_META[player.avatar].name} ·{" "}
              {AVATAR_META[player.avatar].title}
            </p>
            <div className="mt-4 max-w-md">
              <XPBar player={player} />
            </div>
          </div>
        </header>

        <Ribbon text="数据" />

        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="等级" value={`Lv.${player.level}`} />
          <Stat label="累计星屑" value={`${player.xp} ✦`} />
          <Stat label="本次连击" value={`${player.streak}x`} />
          <Stat label="收藏公式" value={`${player.codex.length}`} />
        </section>

        <Ribbon text="星级总览" />

        <section className="card-magic p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-hand text-[var(--ink-plum)]">
              {totalStars} / {maxStars} ✦
            </span>
            <StarRating value={Math.round((totalStars / maxStars) * 3)} size={16} />
          </div>
          <div className="space-y-2">
            {realms.map((r) => {
              const stars = r.lessons.reduce(
                (a, l) => a + lessonStars(player, l.key),
                0,
              );
              const max = r.lessons.length * 3;
              const ratio = max === 0 ? 0 : stars / max;
              return (
                <div key={r.slug} className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="font-display text-[var(--ink-plum)]">
                      {r.title}
                    </span>
                    <span className="font-hand text-[var(--ink-plum)]/60">
                      {stars} / {max}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/60 overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${ratio * 100}%`,
                        background:
                          "linear-gradient(90deg, var(--sakura-pink), var(--gold-dust))",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <Ribbon text="设定" />

        {editing ? (
          <section className="card-magic p-6 space-y-5">
            <div>
              <label className="block text-sm font-hand text-[var(--ink-plum)] mb-2">
                名字
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={12}
                className="w-full px-4 py-3 rounded-xl border border-[var(--surface-ring)] bg-white font-hand text-lg text-[var(--ink-plum)] focus:outline-none focus:border-[var(--gold-deep)]"
              />
            </div>
            <div>
              <label className="block text-sm font-hand text-[var(--ink-plum)] mb-2">
                立绘
              </label>
              <div className="grid grid-cols-4 gap-3">
                {(["luna", "sora", "haru", "yuki"] as AvatarId[]).map((id) => (
                  <button
                    key={id}
                    onClick={() => setAvatar(id)}
                    className={`p-2 rounded-2xl transition-all ${
                      avatar === id
                        ? "bg-[var(--gold-dust)]/30 ring-2 ring-[var(--gold-deep)]"
                        : "hover:bg-white/60"
                    }`}
                  >
                    <Avatar id={id} size={60} glow={avatar === id} />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setEditing(false)}
                className="btn-magic btn-magic-secondary"
              >
                取消
              </button>
              <button onClick={commit} className="btn-magic">
                保存
              </button>
            </div>
          </section>
        ) : (
          <section className="card-magic p-6 flex items-center justify-between">
            <p className="font-hand text-[var(--ink-plum)]/80 text-sm">
              修改名字、立绘
            </p>
            <button
              onClick={() => setEditing(true)}
              className="btn-magic btn-magic-secondary text-sm py-2 px-4"
            >
              编辑
            </button>
          </section>
        )}

        <section className="mt-4 card-magic p-6 flex items-center justify-between">
          <p className="font-hand text-[var(--ink-plum)]/80 text-sm">
            清除所有学习进度（不可恢复）
          </p>
          <button
            onClick={resetAll}
            className="text-sm font-magic text-[var(--sakura-deep)] underline-offset-4 hover:underline tracking-wider"
          >
            重置进度
          </button>
        </section>
      </main>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-magic p-4 text-center">
      <div className="font-magic text-[10px] tracking-[0.3em] uppercase text-[var(--gold-deep)]">
        {label}
      </div>
      <div className="font-display text-2xl text-[var(--ink-plum)] mt-1">
        {value}
      </div>
    </div>
  );
}
