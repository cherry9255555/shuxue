type Props = {
  text?: string;
  className?: string;
};

/** 缎带分隔线，中间一颗星，左右金色渐变 */
export default function Ribbon({ text, className = "" }: Props) {
  return (
    <div className={`relative flex items-center justify-center my-8 ${className}`}>
      <span className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--gold-deep)] to-[var(--gold-dust)]" />
      <span className="mx-4 inline-flex items-center gap-2 font-magic text-xs tracking-[0.3em] text-[var(--gold-deep)] uppercase">
        <Sparkle /> {text ?? "✧"} <Sparkle />
      </span>
      <span className="flex-1 h-px bg-gradient-to-l from-transparent via-[var(--gold-deep)] to-[var(--gold-dust)]" />
    </div>
  );
}

function Sparkle() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" className="inline-block">
      <path
        d="M12 0 L13.5 9 L24 12 L13.5 15 L12 24 L10.5 15 L0 12 L10.5 9 Z"
        fill="currentColor"
      />
    </svg>
  );
}
