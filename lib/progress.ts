/* localStorage 驱动的玩家进度。无后端、无登录。 */

const KEY = "sakura-math.v1";

export type AvatarId = "luna" | "sora" | "haru" | "yuki";

export type LessonProgress = {
  /** 已答对的题目 id */
  correct: string[];
  /** 满星完成（首通 + 全对 + 连击≥3） */
  stars: number;
  completedAt?: number;
};

export type PlayerState = {
  name: string;
  avatar: AvatarId;
  level: number;
  xp: number;
  /** 全局累计连击（当前连击数，答错归零） */
  streak: number;
  /** 收入典藏的公式 key */
  codex: string[];
  /** lessonKey -> 进度 */
  lessons: Record<string, LessonProgress>;
  /** 设置 */
  settings: {
    sound: boolean;
    reducedMotion: boolean;
  };
  /** 首次进入时间 */
  createdAt: number;
};

const XP_PER_LEVEL = 500;
const XP_PER_CORRECT = 10;
const STREAK_BONUS = (streak: number) => Math.min(streak * 2, 20);

export const DEFAULT_PLAYER: PlayerState = {
  name: "",
  avatar: "luna",
  level: 1,
  xp: 0,
  streak: 0,
  codex: [],
  lessons: {},
  settings: { sound: false, reducedMotion: false },
  createdAt: 0,
};

export function load(): PlayerState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as PlayerState;
    return { ...DEFAULT_PLAYER, ...data };
  } catch {
    return null;
  }
}

export function save(state: PlayerState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
}

export function create(name: string, avatar: AvatarId): PlayerState {
  const state: PlayerState = {
    ...DEFAULT_PLAYER,
    name: name.trim() || "葵",
    avatar,
    createdAt: Date.now(),
  };
  save(state);
  return state;
}

export function applyAnswer(
  state: PlayerState,
  lessonKey: string,
  questionId: string,
  correct: boolean,
): { next: PlayerState; gainedXp: number; leveledUp: boolean } {
  const lesson = state.lessons[lessonKey] ?? { correct: [], stars: 0 };
  let next = { ...state };
  let gainedXp = 0;

  if (correct) {
    if (!lesson.correct.includes(questionId)) {
      lesson.correct = [...lesson.correct, questionId];
    }
    next.streak = state.streak + 1;
    gainedXp = XP_PER_CORRECT + STREAK_BONUS(next.streak - 1);
    next.xp = state.xp + gainedXp;
  } else {
    next.streak = 0;
  }

  let leveledUp = false;
  while (next.xp >= XP_PER_LEVEL) {
    next.xp -= XP_PER_LEVEL;
    next.level += 1;
    leveledUp = true;
  }

  next.lessons = { ...state.lessons, [lessonKey]: lesson };
  save(next);
  return { next, gainedXp, leveledUp };
}

export function completeLesson(
  state: PlayerState,
  lessonKey: string,
  totalQuestions: number,
  formulaKeys: string[],
): PlayerState {
  const lesson = state.lessons[lessonKey] ?? { correct: [], stars: 0 };
  const allCorrect = lesson.correct.length >= totalQuestions;

  let stars = 1; // 完成 = 1 星
  if (allCorrect) stars = Math.max(stars, 2); // 全对 = 2 星
  if (state.streak >= 3) stars = Math.max(stars, 3); // 连击 ≥ 3 = 3 星

  lesson.stars = Math.max(lesson.stars, stars);
  lesson.completedAt = Date.now();

  const codex = Array.from(new Set([...state.codex, ...formulaKeys]));

  const next = {
    ...state,
    lessons: { ...state.lessons, [lessonKey]: lesson },
    codex,
  };
  save(next);
  return next;
}

export function xpProgress(state: PlayerState): { current: number; max: number; ratio: number } {
  const current = state.xp;
  const max = XP_PER_LEVEL;
  return { current, max, ratio: Math.min(current / max, 1) };
}

export function lessonStars(state: PlayerState | null, lessonKey: string): number {
  return state?.lessons[lessonKey]?.stars ?? 0;
}

export function realmProgress(
  state: PlayerState | null,
  lessonKeys: string[],
): { completed: number; total: number; ratio: number } {
  const total = lessonKeys.length;
  if (!state) return { completed: 0, total, ratio: 0 };
  const completed = lessonKeys.filter((k) => (state.lessons[k]?.stars ?? 0) > 0).length;
  return { completed, total, ratio: total === 0 ? 0 : completed / total };
}
