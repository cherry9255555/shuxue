import type { AvatarId } from "@/lib/progress";

type Props = {
  id: AvatarId;
  size?: number;
  className?: string;
  glow?: boolean;
};

/** 4 个 SVG 风格化的二次元角色头像（无版权风险，纯几何 + 渐变） */
export default function Avatar({ id, size = 96, className = "", glow = true }: Props) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            background:
              "radial-gradient(circle, rgba(255,196,214,0.7), rgba(244,211,94,0.3) 50%, transparent 75%)",
            transform: "scale(1.15)",
          }}
        />
      )}
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        className="relative drop-shadow-[0_8px_24px_rgba(45,27,105,0.35)]"
      >
        {AVATARS[id]}
      </svg>
    </div>
  );
}

export const AVATAR_META: Record<AvatarId, { name: string; title: string }> = {
  luna: { name: "ルナ Luna", title: "月光见习生" },
  sora: { name: "ソラ Sora", title: "晴空魔导士" },
  haru: { name: "ハル Haru", title: "春日炼金师" },
  yuki: { name: "ユキ Yuki", title: "雪原占星师" },
};

/** 4 个角色：用 SVG 几何 + 头发/眼睛/装饰组合区分。先做轮廓代入感，后期可替换真立绘 */
const AVATARS: Record<AvatarId, React.ReactNode> = {
  luna: (
    <>
      <defs>
        <linearGradient id="luna-hair" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3d2a7d" />
          <stop offset="100%" stopColor="#7c5fbf" />
        </linearGradient>
        <radialGradient id="luna-skin" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fff1e8" />
          <stop offset="100%" stopColor="#ffd9c0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="#ffeef5" stroke="#f4d35e" strokeWidth="2" />
      {/* 头发底层 */}
      <path d="M25 60 Q 30 25, 60 22 Q 90 25, 95 60 L 90 90 L 30 90 Z" fill="url(#luna-hair)" />
      {/* 脸 */}
      <ellipse cx="60" cy="68" rx="22" ry="26" fill="url(#luna-skin)" />
      {/* 刘海 */}
      <path d="M38 50 Q 45 60, 50 56 Q 55 50, 60 56 Q 65 50, 70 56 Q 75 60, 82 50" fill="none" stroke="#3d2a7d" strokeWidth="6" strokeLinecap="round" />
      {/* 月亮饰物 */}
      <path d="M88 32 a 8 8 0 1 1 -4 -8 a 6 6 0 1 0 4 8" fill="#f4d35e" />
      {/* 眼睛 */}
      <ellipse cx="52" cy="70" rx="2.5" ry="4" fill="#2d1b69" />
      <ellipse cx="68" cy="70" rx="2.5" ry="4" fill="#2d1b69" />
      <circle cx="52.7" cy="69" r="0.8" fill="#fff" />
      <circle cx="68.7" cy="69" r="0.8" fill="#fff" />
      {/* 腮红 */}
      <ellipse cx="48" cy="78" rx="3" ry="1.5" fill="#ffc4d6" opacity="0.6" />
      <ellipse cx="72" cy="78" rx="3" ry="1.5" fill="#ffc4d6" opacity="0.6" />
    </>
  ),
  sora: (
    <>
      <defs>
        <linearGradient id="sora-hair" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#7ec8e3" />
          <stop offset="100%" stopColor="#bfe6f7" />
        </linearGradient>
        <radialGradient id="sora-skin" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fff1e8" />
          <stop offset="100%" stopColor="#ffd9c0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="#eaf6fc" stroke="#f4d35e" strokeWidth="2" />
      <path d="M25 65 Q 28 30, 60 22 Q 92 30, 95 65 L 92 95 Q 80 88, 60 88 Q 40 88, 28 95 Z" fill="url(#sora-hair)" />
      <ellipse cx="60" cy="68" rx="22" ry="26" fill="url(#sora-skin)" />
      <path d="M40 55 Q 50 58, 60 54 Q 70 58, 80 55" fill="none" stroke="#5fa9c8" strokeWidth="5" strokeLinecap="round" />
      {/* 双马尾 */}
      <ellipse cx="20" cy="80" rx="8" ry="18" fill="url(#sora-hair)" />
      <ellipse cx="100" cy="80" rx="8" ry="18" fill="url(#sora-hair)" />
      {/* 蝴蝶结 */}
      <path d="M85 28 L 92 22 L 92 30 Z M 85 28 L 92 34 L 92 26 Z" fill="#ffc4d6" />
      <circle cx="85" cy="28" r="2" fill="#f48fb1" />
      {/* 眼睛 */}
      <ellipse cx="52" cy="70" rx="2.5" ry="4" fill="#1a4d6e" />
      <ellipse cx="68" cy="70" rx="2.5" ry="4" fill="#1a4d6e" />
      <circle cx="52.7" cy="69" r="0.8" fill="#fff" />
      <circle cx="68.7" cy="69" r="0.8" fill="#fff" />
      <ellipse cx="48" cy="78" rx="3" ry="1.5" fill="#ffc4d6" opacity="0.6" />
      <ellipse cx="72" cy="78" rx="3" ry="1.5" fill="#ffc4d6" opacity="0.6" />
    </>
  ),
  haru: (
    <>
      <defs>
        <linearGradient id="haru-hair" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#d77a5a" />
          <stop offset="100%" stopColor="#f3b27a" />
        </linearGradient>
        <radialGradient id="haru-skin" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fff1e8" />
          <stop offset="100%" stopColor="#ffd9c0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="#fff5e8" stroke="#f4d35e" strokeWidth="2" />
      <path d="M28 70 Q 28 25, 60 20 Q 92 25, 92 70 L 88 92 Q 60 84, 32 92 Z" fill="url(#haru-hair)" />
      <ellipse cx="60" cy="68" rx="22" ry="26" fill="url(#haru-skin)" />
      <path d="M40 56 Q 48 62, 60 56 Q 72 62, 80 56" fill="none" stroke="#a94f30" strokeWidth="5" strokeLinecap="round" />
      {/* 樱花发饰 */}
      <g transform="translate(78,30)">
        <path d="M0 -6 Q 4 -3 6 0 Q 4 3 0 6 Q -4 3 -6 0 Q -4 -3 0 -6" fill="#ffc4d6" />
        <circle r="1.5" fill="#fff5cc" />
      </g>
      {/* 眼睛 */}
      <ellipse cx="52" cy="70" rx="2.5" ry="4" fill="#5a2c0c" />
      <ellipse cx="68" cy="70" rx="2.5" ry="4" fill="#5a2c0c" />
      <circle cx="52.7" cy="69" r="0.8" fill="#fff" />
      <circle cx="68.7" cy="69" r="0.8" fill="#fff" />
      <ellipse cx="48" cy="78" rx="3" ry="1.5" fill="#ffc4d6" opacity="0.6" />
      <ellipse cx="72" cy="78" rx="3" ry="1.5" fill="#ffc4d6" opacity="0.6" />
    </>
  ),
  yuki: (
    <>
      <defs>
        <linearGradient id="yuki-hair" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#e8eaf2" />
          <stop offset="100%" stopColor="#b8c0d0" />
        </linearGradient>
        <radialGradient id="yuki-skin" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fff5ee" />
          <stop offset="100%" stopColor="#ffd9c0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="#eef0f7" stroke="#f4d35e" strokeWidth="2" />
      <path d="M28 65 Q 30 22, 60 20 Q 90 22, 92 65 L 95 95 Q 60 80, 25 95 Z" fill="url(#yuki-hair)" />
      <ellipse cx="60" cy="68" rx="22" ry="26" fill="url(#yuki-skin)" />
      <path d="M40 55 Q 48 58, 60 53 Q 72 58, 80 55" fill="none" stroke="#7a8090" strokeWidth="5" strokeLinecap="round" />
      {/* 星辰发饰 */}
      <path d="M30 30 L 32 35 L 37 35 L 33 38 L 35 43 L 30 40 L 25 43 L 27 38 L 23 35 L 28 35 Z" fill="#f4d35e" />
      {/* 眼睛 */}
      <ellipse cx="52" cy="70" rx="2.5" ry="4" fill="#5a4a6e" />
      <ellipse cx="68" cy="70" rx="2.5" ry="4" fill="#5a4a6e" />
      <circle cx="52.7" cy="69" r="0.8" fill="#fff" />
      <circle cx="68.7" cy="69" r="0.8" fill="#fff" />
      <ellipse cx="48" cy="78" rx="3" ry="1.5" fill="#ffc4d6" opacity="0.6" />
      <ellipse cx="72" cy="78" rx="3" ry="1.5" fill="#ffc4d6" opacity="0.6" />
    </>
  ),
};
