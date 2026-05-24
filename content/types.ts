/* 课程内容数据结构 */

export type Question =
  | {
      kind: "choice";
      id: string;
      stem: string; // 支持 $...$ 行内公式
      stemTex?: string; // 可选：单独的块级公式
      options: string[];
      answerIndex: number;
      hint?: string;
      explanation: string;
    }
  | {
      kind: "fill";
      id: string;
      stem: string;
      stemTex?: string;
      /** 期望答案：数字或多个可接受字符串 */
      answer: number | { strings: string[] };
      placeholder?: string;
      hint?: string;
      explanation: string;
    };

export type Concept = {
  /** 主标题 */
  title: string;
  /** 副标题/魔法风称号 */
  subtitle?: string;
  /** Markdown-lite 段落，行间用 \n\n 分隔。支持 $...$ 行内公式 */
  paragraphs: string[];
  /** 学完后入典藏的公式 */
  formulas?: { key: string; tex: string; caption: string }[];
};

export type Lesson = {
  slug: string;
  title: string;
  subtitle: string;
  /** 进度 key（独立、不变） */
  key: string;
  concept: Concept;
  questions: Question[];
  /** 互动小组件，可选 */
  interactive?: "slope-slider" | "a-slider" | null;
};

export type Realm = {
  slug: string;
  title: string;
  subtitle: string;
  motif: string;
  /** 章节卡片描述（"黄昏花园"风格氛围) */
  description: string;
  /** 章节解锁条件：null = 始终解锁；string = 要求另一章节 key 完成 60% */
  unlockAfter: string | null;
  /** 主色覆盖（可空） */
  accent?: string;
  lessons: Lesson[];
  /** 章节 BOSS */
  boss: {
    key: string;
    title: string;
    intro: string;
    questions: Question[];
  };
};
