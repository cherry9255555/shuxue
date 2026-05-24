/* 数学表达式工具：表达式比对、随机生成 */

/** 把用户输入归一化（去除空格、统一负号、统一斜杠） */
function normalize(s: string): string {
  return s
    .replace(/\s+/g, "")
    .replace(/[−–—]/g, "-")
    .replace(/[／]/g, "/")
    .replace(/[（]/g, "(")
    .replace(/[）]/g, ")")
    .toLowerCase();
}

/** 数字比对（含分数、小数），容差 1e-6 */
export function numericEqual(input: string, answer: number): boolean {
  const s = normalize(input);
  // 尝试分数 a/b
  const frac = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
  let v: number;
  if (frac) {
    v = parseFloat(frac[1]) / parseFloat(frac[2]);
  } else {
    v = parseFloat(s);
  }
  if (Number.isNaN(v)) return false;
  return Math.abs(v - answer) < 1e-6;
}

/** 字符串归一比对（用于多个等价写法） */
export function stringMatch(input: string, accepted: string[]): boolean {
  const s = normalize(input);
  return accepted.some((a) => normalize(a) === s);
}

/** 一次函数求值 y = kx + b */
export function linear(k: number, b: number, x: number): number {
  return k * x + b;
}

/** 二次函数求值 y = ax² + bx + c */
export function quadratic(a: number, b: number, c: number, x: number): number {
  return a * x * x + b * x + c;
}

/** 顶点 (-b/2a, c - b²/4a) */
export function vertex(a: number, b: number, c: number): { x: number; y: number } {
  const vx = -b / (2 * a);
  const vy = c - (b * b) / (4 * a);
  return { x: vx, y: vy };
}
