type Props = {
  value: number; // 0..3
  max?: number;
  size?: number;
  className?: string;
};

export default function StarRating({ value, max = 3, size = 16, className = "" }: Props) {
  const stars = Array.from({ length: max }, (_, i) => i < value);
  return (
    <span className={`inline-flex gap-0.5 ${className}`}>
      {stars.map((on, i) => (
        <Star key={i} on={on} size={size} />
      ))}
    </span>
  );
}

function Star({ on, size }: { on: boolean; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <linearGradient id={`star-${on ? "on" : "off"}`} x1="0" x2="1" y1="0" y2="1">
          {on ? (
            <>
              <stop offset="0%" stopColor="#fff5cc" />
              <stop offset="60%" stopColor="#f4d35e" />
              <stop offset="100%" stopColor="#c9a227" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="rgba(184,164,212,0.3)" />
              <stop offset="100%" stopColor="rgba(184,164,212,0.15)" />
            </>
          )}
        </linearGradient>
      </defs>
      <path
        d="M12 2 L14.5 8.5 L21.5 9 L16 13.5 L17.8 20.5 L12 16.8 L6.2 20.5 L8 13.5 L2.5 9 L9.5 8.5 Z"
        fill={`url(#star-${on ? "on" : "off"})`}
        stroke={on ? "#c9a227" : "rgba(74,25,66,0.2)"}
        strokeWidth="0.6"
      />
    </svg>
  );
}
