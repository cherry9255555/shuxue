"use client";

import { useMemo, useState } from "react";

type Props = {
  kind: "linear" | "quadratic";
  initial?: { a?: number; b?: number; c?: number; k?: number };
  controls: ("k" | "b" | "a" | "c")[];
  width?: number;
  height?: number;
  domain?: [number, number];
  range?: [number, number];
  /** 静态参考线（用于对比） */
  reference?: { k?: number; b?: number; a?: number; c?: number; label: string };
};

/** 函数图像 + 可拖滑块。SVG 坐标系：x 向右、y 向上（手动翻转） */
export default function FunctionPlot({
  kind,
  initial,
  controls,
  width = 480,
  height = 360,
  domain = [-8, 8],
  range = [-8, 8],
  reference,
}: Props) {
  const [k, setK] = useState(initial?.k ?? 1);
  const [b, setB] = useState(initial?.b ?? 0);
  const [a, setA] = useState(initial?.a ?? 1);
  const [c, setC] = useState(initial?.c ?? 0);

  const padding = 24;
  const [xMin, xMax] = domain;
  const [yMin, yMax] = range;

  const xToPx = (x: number) =>
    padding + ((x - xMin) / (xMax - xMin)) * (width - padding * 2);
  const yToPx = (y: number) =>
    padding + ((yMax - y) / (yMax - yMin)) * (height - padding * 2);

  const evalFn = (x: number) =>
    kind === "linear" ? k * x + b : a * x * x + b * x + c;
  const evalRef = (x: number) => {
    if (!reference) return null;
    if (kind === "linear") {
      const rk = reference.k ?? 1;
      const rb = reference.b ?? 0;
      return rk * x + rb;
    } else {
      const ra = reference.a ?? 1;
      const rb = reference.b ?? 0;
      const rc = reference.c ?? 0;
      return ra * x * x + rb * x + rc;
    }
  };

  const samples = 200;
  const step = (xMax - xMin) / samples;

  const path = useMemo(() => {
    let d = "";
    let started = false;
    for (let i = 0; i <= samples; i++) {
      const x = xMin + step * i;
      const y = evalFn(x);
      const px = xToPx(x);
      const py = yToPx(y);
      if (py < -1000 || py > height + 1000) {
        started = false;
        continue;
      }
      d += `${started ? "L" : "M"}${px.toFixed(2)} ${py.toFixed(2)} `;
      started = true;
    }
    return d.trim();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [k, b, a, c, kind, xMin, xMax, yMin, yMax, width, height]);

  const refPath = useMemo(() => {
    if (!reference) return null;
    let d = "";
    let started = false;
    for (let i = 0; i <= samples; i++) {
      const x = xMin + step * i;
      const y = evalRef(x);
      if (y === null) return null;
      const px = xToPx(x);
      const py = yToPx(y);
      if (py < -1000 || py > height + 1000) {
        started = false;
        continue;
      }
      d += `${started ? "L" : "M"}${px.toFixed(2)} ${py.toFixed(2)} `;
      started = true;
    }
    return d.trim();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference, xMin, xMax, width, height]);

  const formula =
    kind === "linear"
      ? formatLinear(k, b)
      : formatQuadratic(a, b, c);

  return (
    <div className="card-magic p-5">
      {/* 公式标题 */}
      <div className="flex items-center justify-between mb-3">
        <div className="font-magic text-xs uppercase tracking-[0.3em] text-[var(--gold-deep)]">
          ✧ 魔法显像仪
        </div>
        <div className="font-display text-xl text-[var(--ink-plum)]">{formula}</div>
      </div>

      {/* 图像 */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto bg-white/40 rounded-xl border border-[var(--surface-ring)]"
      >
        {/* 网格 */}
        <Grid xToPx={xToPx} yToPx={yToPx} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} />

        {/* 坐标轴 */}
        <line x1={padding} y1={yToPx(0)} x2={width - padding} y2={yToPx(0)} stroke="#4a1942" strokeWidth="1.5" />
        <line x1={xToPx(0)} y1={padding} x2={xToPx(0)} y2={height - padding} stroke="#4a1942" strokeWidth="1.5" />

        {/* 参考曲线（虚线） */}
        {refPath && (
          <>
            <path d={refPath} fill="none" stroke="#b8a4d4" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />
          </>
        )}

        {/* 主曲线 */}
        <path
          d={path}
          fill="none"
          stroke="url(#sakura-line)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="sakura-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#f48fb1" />
            <stop offset="50%" stopColor="#f4d35e" />
            <stop offset="100%" stopColor="#7c5fbf" />
          </linearGradient>
        </defs>

        {/* 关键点：一次函数显示 (0, b) 和 (-b/k, 0)；二次函数显示顶点 */}
        {kind === "linear" && (
          <>
            <KeyPoint x={xToPx(0)} y={yToPx(b)} label={`(0, ${b.toFixed(1)})`} />
            {k !== 0 && (
              <KeyPoint x={xToPx(-b / k)} y={yToPx(0)} label={`(${(-b / k).toFixed(1)}, 0)`} />
            )}
          </>
        )}
        {kind === "quadratic" && a !== 0 && (
          <KeyPoint
            x={xToPx(-b / (2 * a))}
            y={yToPx(c - (b * b) / (4 * a))}
            label={`顶点 (${(-b / (2 * a)).toFixed(1)}, ${(c - (b * b) / (4 * a)).toFixed(1)})`}
          />
        )}
      </svg>

      {/* 控制器 */}
      <div className="mt-5 space-y-3">
        {controls.includes("k") && (
          <Slider label="斜率 k" value={k} min={-5} max={5} step={0.1} onChange={setK} color="#f48fb1" />
        )}
        {controls.includes("a") && (
          <Slider label="二次项系数 a" value={a} min={-3} max={3} step={0.1} onChange={setA} color="#f48fb1" />
        )}
        {controls.includes("b") && (
          <Slider label={kind === "linear" ? "截距 b" : "一次项系数 b"} value={b} min={-5} max={5} step={0.1} onChange={setB} color="#f4d35e" />
        )}
        {controls.includes("c") && (
          <Slider label="常数项 c" value={c} min={-5} max={5} step={0.1} onChange={setC} color="#7c5fbf" />
        )}
        {reference && (
          <div className="text-xs font-hand text-[var(--moonstone)] flex items-center gap-2 pt-2">
            <span className="inline-block w-6 h-px border-t border-dashed border-[var(--moonstone)]" />
            参考：{reference.label}
          </div>
        )}
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  color,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="font-hand text-[var(--ink-plum)]">{label}</span>
        <span className="font-magic text-[var(--gold-deep)]">{value.toFixed(1)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
        style={{ accentColor: color }}
      />
    </div>
  );
}

function Grid({
  xToPx,
  yToPx,
  xMin,
  xMax,
  yMin,
  yMax,
}: {
  xToPx: (x: number) => number;
  yToPx: (y: number) => number;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}) {
  const lines: React.ReactNode[] = [];
  for (let x = Math.ceil(xMin); x <= xMax; x++) {
    if (x === 0) continue;
    lines.push(
      <line
        key={`gx${x}`}
        x1={xToPx(x)}
        y1={yToPx(yMin)}
        x2={xToPx(x)}
        y2={yToPx(yMax)}
        stroke="#e7d4f3"
        strokeWidth="0.7"
      />,
    );
  }
  for (let y = Math.ceil(yMin); y <= yMax; y++) {
    if (y === 0) continue;
    lines.push(
      <line
        key={`gy${y}`}
        x1={xToPx(xMin)}
        y1={yToPx(y)}
        x2={xToPx(xMax)}
        y2={yToPx(y)}
        stroke="#e7d4f3"
        strokeWidth="0.7"
      />,
    );
  }
  return <g>{lines}</g>;
}

function KeyPoint({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="5" fill="#fff5cc" stroke="#c9a227" strokeWidth="2" />
      <circle cx={x} cy={y} r="2" fill="#c9a227" />
      <text
        x={x + 8}
        y={y - 8}
        fontSize="11"
        fill="#4a1942"
        fontFamily="var(--font-cormorant), serif"
      >
        {label}
      </text>
    </g>
  );
}

function formatLinear(k: number, b: number) {
  const kStr = k === 1 ? "x" : k === -1 ? "-x" : `${k.toFixed(1)}x`;
  if (Math.abs(b) < 1e-6) return `y = ${kStr}`;
  return `y = ${kStr} ${b >= 0 ? "+" : "−"} ${Math.abs(b).toFixed(1)}`;
}

function formatQuadratic(a: number, b: number, c: number) {
  const aStr = a === 1 ? "x²" : a === -1 ? "-x²" : `${a.toFixed(1)}x²`;
  const bStr = Math.abs(b) < 1e-6 ? "" : ` ${b >= 0 ? "+" : "−"} ${Math.abs(b).toFixed(1)}x`;
  const cStr = Math.abs(c) < 1e-6 ? "" : ` ${c >= 0 ? "+" : "−"} ${Math.abs(c).toFixed(1)}`;
  return `y = ${aStr}${bStr}${cStr}`;
}
