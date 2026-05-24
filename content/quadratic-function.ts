import type { Realm } from "./types";

export const quadraticRealm: Realm = {
  slug: "stellar-pavilion",
  title: "星图阁",
  subtitle: "Stellar Pavilion",
  motif: "二次函数 · 初三预习",
  description:
    "穿过黄昏花园，是一座漂浮在夜空中的水晶阁楼。这里的轨迹不再是直线，而是优雅的**抛物线** —— 从月球弹回的光、流星划过的弧、喷泉的水柱，它们都遵循同一种二次方程。",
  unlockAfter: "linear/boss",
  accent: "#7c5fbf",
  lessons: [
    // ───────────────────────── L1
    {
      slug: "from-linear-to-quadratic",
      key: "quad/l1",
      title: "L1 · 从直线到弧",
      subtitle: "二次函数登场",
      interactive: "a-slider",
      concept: {
        title: "什么是二次函数？",
        subtitle: "$y = ax^2 + bx + c$",
        paragraphs: [
          "**形如 $y = ax^2 + bx + c$（其中 $a \\neq 0$）的函数，叫做二次函数**。最简单的形式是 $y = x^2$ —— 一条优雅的「U」字形抛物线，开口朝上，最低点在原点。",
          "和一次函数图像是直线不同，**二次函数图像永远是一条抛物线**。它有一根对称轴，左右两侧完美镜像。",
          "「魔法显像仪」里，你可以拖动 $a$ 看抛物线**开口的张合**：$a$ 越大开口越窄，$a$ 越小越宽；$a$ 为负数时整条曲线翻转向下。",
        ],
        formulas: [
          {
            key: "quad-form",
            tex: "y = ax^2 + bx + c \\quad (a \\neq 0)",
            caption: "二次函数标准形式",
          },
        ],
      },
      questions: [
        {
          kind: "choice",
          id: "q1",
          stem: "下列函数中，是二次函数的是？",
          options: ["$y = 2x + 1$", "$y = x^2 - 3x$", "$y = \\dfrac{1}{x}$", "$y = \\sqrt{x}$"],
          answerIndex: 1,
          explanation: "二次函数必须有 $x^2$ 项，且系数不为 0。$y = x^2 - 3x$ 符合。",
        },
        {
          kind: "choice",
          id: "q2",
          stem: "若 $y = (m+1)x^2 - 3x + 2$ 是二次函数，则 $m$ 满足？",
          options: ["$m \\neq -1$", "$m = -1$", "$m \\geq -1$", "$m$ 可以是任何数"],
          answerIndex: 0,
          hint: "二次函数要求 $a \\neq 0$。",
          explanation: "$a = m + 1$ 不能为 0，所以 $m \\neq -1$。",
        },
        {
          kind: "fill",
          id: "q3",
          stem: "已知二次函数 $y = 2x^2 - 3x + 1$，则当 $x = 2$ 时 $y = $",
          answer: 3,
          explanation: "$y = 2 \\times 4 - 3 \\times 2 + 1 = 8 - 6 + 1 = 3$。",
        },
        {
          kind: "choice",
          id: "q4",
          stem: "二次函数 $y = -3x^2$ 的图像开口方向是？",
          options: ["向上", "向下", "向左", "向右"],
          answerIndex: 1,
          hint: "$a$ 的正负决定开口方向。",
          explanation: "$a = -3 < 0$，开口**向下**。",
        },
        {
          kind: "choice",
          id: "q5",
          stem: "下列哪个函数的图像开口最「窄」？",
          options: ["$y = x^2$", "$y = \\frac{1}{2}x^2$", "$y = 3x^2$", "$y = -2x^2$"],
          answerIndex: 2,
          hint: "$|a|$ 越大，开口越窄。",
          explanation: "$|3| > |-2| > |1| > |1/2|$，所以 $y = 3x^2$ 开口最窄。",
        },
      ],
    },

    // ───────────────────────── L2
    {
      slug: "axis-vertex",
      key: "quad/l2",
      title: "L2 · 对称之轴",
      subtitle: "对称轴与顶点",
      interactive: "a-slider",
      concept: {
        title: "抛物线的「心脏」：对称轴和顶点",
        paragraphs: [
          "每条抛物线都有一根**对称轴**，把图像分成完美的两半。对于 $y = ax^2 + bx + c$，对称轴的方程是 $x = -\\dfrac{b}{2a}$。",
          "对称轴与抛物线的交点叫做**顶点**。当 $a > 0$ 时它是图像的最低点，$a < 0$ 时是最高点。顶点的坐标是：",
          "其实只要把 $x = -\\dfrac{b}{2a}$ 代回原函数，就能得到顶点的 $y$ 坐标。这也是抛物线**取得最大值或最小值**的位置。",
        ],
        formulas: [
          {
            key: "vertex",
            tex: "\\left(-\\dfrac{b}{2a},\\;c - \\dfrac{b^2}{4a}\\right)",
            caption: "顶点坐标公式",
          },
        ],
      },
      questions: [
        {
          kind: "choice",
          id: "q1",
          stem: "二次函数 $y = x^2 - 4x + 1$ 的对称轴是？",
          options: ["$x = -2$", "$x = 2$", "$x = 4$", "$x = -4$"],
          answerIndex: 1,
          hint: "对称轴 $x = -\\dfrac{b}{2a}$。",
          explanation: "$a = 1, b = -4$，$x = -\\dfrac{-4}{2 \\times 1} = 2$。",
        },
        {
          kind: "fill",
          id: "q2",
          stem: "二次函数 $y = -2x^2 + 8x - 5$ 的对称轴是 $x = $",
          answer: 2,
          explanation: "$x = -\\dfrac{8}{2 \\times (-2)} = -\\dfrac{8}{-4} = 2$。",
        },
        {
          kind: "fill",
          id: "q3",
          stem: "二次函数 $y = x^2 - 6x + 5$ 的顶点纵坐标 $y = $",
          answer: -4,
          hint: "对称轴 $x = 3$，代入算 $y$。",
          explanation: "对称轴 $x = 3$，$y = 9 - 18 + 5 = -4$，顶点 $(3, -4)$。",
        },
        {
          kind: "choice",
          id: "q4",
          stem: "二次函数 $y = -x^2 + 2x + 3$ 的**最大值**是？",
          options: ["3", "4", "5", "2"],
          answerIndex: 1,
          hint: "$a < 0$ 时顶点是最大值点。先找对称轴 $x = 1$。",
          explanation: "对称轴 $x = -\\dfrac{2}{-2} = 1$，$y_{\\max} = -1 + 2 + 3 = 4$。",
        },
        {
          kind: "choice",
          id: "q5",
          stem: "抛物线 $y = 2x^2 + 4x + 1$ 的顶点坐标是？",
          options: ["$(-1, -1)$", "$(1, 7)$", "$(-1, 1)$", "$(1, -1)$"],
          answerIndex: 0,
          explanation: "对称轴 $x = -\\dfrac{4}{4} = -1$，$y = 2 - 4 + 1 = -1$，顶点 $(-1, -1)$。",
        },
      ],
    },

    // ───────────────────────── L3
    {
      slug: "coefficient-a",
      key: "quad/l3",
      title: "L3 · 系数 a 的魔力",
      subtitle: "开口与张合",
      interactive: "a-slider",
      concept: {
        title: "$a$ 主宰了抛物线的「形态」",
        paragraphs: [
          "$a$ 是二次函数最重要的系数，它决定了抛物线的**开口方向**和**张合程度**：",
          "**符号决定方向**：$a > 0$ 开口向上（像一个微笑），$a < 0$ 开口向下（像皱眉）。\n**绝对值决定张合**：$|a|$ 越大，抛物线越「瘦」（越陡）；$|a|$ 越小，越「胖」（越平缓）。",
          "拖动「魔法显像仪」里 $a$ 的滑块，让 $a$ 从 −3 慢慢变到 3，你会看到抛物线如何翻转、张合 —— 这是理解二次函数最直观的方式。",
        ],
      },
      questions: [
        {
          kind: "choice",
          id: "q1",
          stem: "下列哪一个二次函数的图像开口最「宽」（最平缓）？",
          options: ["$y = 2x^2$", "$y = 0.3x^2$", "$y = -x^2$", "$y = 5x^2$"],
          answerIndex: 1,
          hint: "$|a|$ 越小越宽。",
          explanation: "$|0.3|$ 最小，所以开口最宽。",
        },
        {
          kind: "choice",
          id: "q2",
          stem: "抛物线 $y = ax^2$ 开口向下，则 $a$ 的范围是？",
          options: ["$a > 0$", "$a < 0$", "$a = 0$", "$a$ 可以是任意值"],
          answerIndex: 1,
          explanation: "开口向下 ⇔ $a < 0$。",
        },
        {
          kind: "choice",
          id: "q3",
          stem: "$y = 3x^2$ 和 $y = -3x^2$ 的图像关系是？",
          options: ["完全相同", "关于 $x$ 轴对称", "关于 $y$ 轴对称", "关于原点对称"],
          answerIndex: 1,
          hint: "把每个点 $(x, y)$ 变成 $(x, -y)$。",
          explanation: "两个函数同一个 $x$ 算出的 $y$ 互为相反数，所以图像关于 **$x$ 轴对称**。",
        },
        {
          kind: "choice",
          id: "q4",
          stem: "下列哪两个函数图像的开口形状**完全一样**（只是位置不同）？",
          options: [
            "$y = 2x^2$ 和 $y = 2x^2 + 5$",
            "$y = x^2$ 和 $y = 3x^2$",
            "$y = -x^2$ 和 $y = x^2$",
            "$y = \\frac{1}{2}x^2$ 和 $y = 2x^2$",
          ],
          answerIndex: 0,
          hint: "开口形状只看 $a$。",
          explanation: "$a$ 都是 2，开口形状一样，只是 $y = 2x^2 + 5$ 向上平移了 5。",
        },
        {
          kind: "fill",
          id: "q5",
          stem: "若 $y = (k-2)x^2$ 的图像开口向上，则 $k$ 必须 $>$ ",
          answer: 2,
          hint: "开口向上 ⇔ 二次项系数 > 0。",
          explanation: "$k - 2 > 0 \\Rightarrow k > 2$。",
        },
      ],
    },

    // ───────────────────────── L4
    {
      slug: "translation",
      key: "quad/l4",
      title: "L4 · 平移之术",
      subtitle: "b 和 c 的作用",
      interactive: null,
      concept: {
        title: "改变 b 和 c，让抛物线在平面上「飞」",
        paragraphs: [
          "**$c$ 是抛物线与 $y$ 轴交点的纵坐标**（让 $x = 0$，得 $y = c$）。改变 $c$，整条抛物线就上下平移。",
          "$b$ 比较微妙，它**同时**影响对称轴位置和顶点 —— 改变 $b$ 时，抛物线既左右移又有上下移。但有一个好用的形式叫**顶点式**：",
          "如果一个抛物线写成 $y = a(x - h)^2 + k$，那么顶点就是 $(h, k)$，对称轴是 $x = h$。这是从一般式 $y = ax^2 + bx + c$ **配方**得来的结果。",
        ],
        formulas: [
          {
            key: "vertex-form",
            tex: "y = a(x - h)^2 + k",
            caption: "顶点式：顶点 $(h, k)$，对称轴 $x = h$",
          },
        ],
      },
      questions: [
        {
          kind: "fill",
          id: "q1",
          stem: "抛物线 $y = x^2 - 4x + 3$ 与 $y$ 轴的交点纵坐标是 ",
          answer: 3,
          hint: "$y$ 轴交点：令 $x = 0$。",
          explanation: "$y = 0 - 0 + 3 = 3$。这其实就是 $c$。",
        },
        {
          kind: "choice",
          id: "q2",
          stem: "把 $y = x^2$ 的图像向**右**平移 2 个单位，得到的函数是？",
          options: ["$y = (x + 2)^2$", "$y = (x - 2)^2$", "$y = x^2 + 2$", "$y = x^2 - 2$"],
          answerIndex: 1,
          hint: "顶点从 $(0,0)$ 移到 $(2,0)$。代入顶点式。",
          explanation: "$y = (x - 2)^2$，顶点 $(2, 0)$。**口诀：左加右减**（针对 $x$ 内的常数）。",
        },
        {
          kind: "choice",
          id: "q3",
          stem: "把 $y = -2x^2$ 的图像向**上**平移 3 个单位，得到？",
          options: ["$y = -2x^2 + 3$", "$y = -2x^2 - 3$", "$y = -2(x+3)^2$", "$y = -2(x-3)^2$"],
          answerIndex: 0,
          explanation: "$y$ 轴上平移 = 整个函数 +3。**口诀：上加下减**（针对外面的常数）。",
        },
        {
          kind: "fill",
          id: "q4",
          stem: "二次函数 $y = (x - 3)^2 - 5$ 的顶点 $y$ 坐标是 ",
          answer: -5,
          explanation: "顶点式 $y = a(x - h)^2 + k$，顶点是 $(h, k) = (3, -5)$。",
        },
        {
          kind: "choice",
          id: "q5",
          stem: "已知抛物线 $y = a(x - 1)^2 + 4$ 经过点 $(0, 1)$，则 $a = $？",
          options: ["−3", "3", "1", "−1"],
          answerIndex: 0,
          hint: "代入 $x = 0, y = 1$。",
          explanation: "$1 = a(0 - 1)^2 + 4 = a + 4 \\Rightarrow a = -3$。",
        },
      ],
    },

    // ───────────────────────── L5
    {
      slug: "roots",
      key: "quad/l5",
      title: "L5 · 根与交点",
      subtitle: "方程与图像的盟约",
      interactive: null,
      concept: {
        title: "抛物线与 x 轴的交点 = 方程 $ax^2 + bx + c = 0$ 的根",
        paragraphs: [
          "让 $y = 0$，就等价于解一元二次方程 $ax^2 + bx + c = 0$。它的解就叫做**根**。",
          "**判别式** $\\Delta = b^2 - 4ac$ 告诉你交点的数量：\n• $\\Delta > 0$：抛物线与 $x$ 轴有**两个**交点，方程有两个不等实根。\n• $\\Delta = 0$：恰好相切，**一个**交点（一个重根）。\n• $\\Delta < 0$：**不相交**，方程在实数范围内无解。",
          "求根公式：当 $\\Delta \\geq 0$ 时，$x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$。这是初三最重要的公式之一，要刻进脑子里。",
        ],
        formulas: [
          {
            key: "delta",
            tex: "\\Delta = b^2 - 4ac",
            caption: "判别式",
          },
          {
            key: "quad-formula",
            tex: "x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
            caption: "一元二次方程求根公式",
          },
        ],
      },
      questions: [
        {
          kind: "choice",
          id: "q1",
          stem: "方程 $x^2 - 5x + 6 = 0$ 的根是？",
          options: ["$x = 1$ 或 $x = 6$", "$x = 2$ 或 $x = 3$", "$x = -2$ 或 $x = -3$", "$x = 6$"],
          answerIndex: 1,
          hint: "找两个数，**积** = 6，**和** = 5。",
          explanation: "因式分解：$(x - 2)(x - 3) = 0$，所以 $x = 2$ 或 $x = 3$。",
        },
        {
          kind: "fill",
          id: "q2",
          stem: "二次方程 $2x^2 - 3x + 1 = 0$ 的判别式 $\\Delta = $",
          answer: 1,
          explanation: "$\\Delta = (-3)^2 - 4 \\times 2 \\times 1 = 9 - 8 = 1$。",
        },
        {
          kind: "choice",
          id: "q3",
          stem: "抛物线 $y = x^2 - 4x + 5$ 与 $x$ 轴的交点数是？",
          options: ["0 个", "1 个", "2 个", "无穷多个"],
          answerIndex: 0,
          hint: "算 $\\Delta$。",
          explanation: "$\\Delta = 16 - 20 = -4 < 0$，**没有**交点。",
        },
        {
          kind: "choice",
          id: "q4",
          stem: "若抛物线 $y = x^2 - 2x + m$ 与 $x$ 轴相切（恰好一个交点），则 $m = $？",
          options: ["0", "1", "−1", "4"],
          answerIndex: 1,
          hint: "相切 ⇔ $\\Delta = 0$。",
          explanation: "$\\Delta = 4 - 4m = 0 \\Rightarrow m = 1$。",
        },
        {
          kind: "fill",
          id: "q5",
          stem: "已知一元二次方程 $x^2 - 7x + 12 = 0$ 的两个根，则这两根之和等于 ",
          answer: 7,
          hint: "韦达定理：两根之和 = $-\\dfrac{b}{a}$。",
          explanation:
            "两根之和 = $-\\dfrac{-7}{1} = 7$（也可以解出 $x = 3, 4$ 直接相加）。这就是著名的**韦达定理**。",
        },
      ],
    },
  ],

  boss: {
    key: "quad/boss",
    title: "✦ 星图阁守护者 · 抛物之灵 ✦",
    intro:
      "夜空之上有一颗悬浮的星核，它由所有抛物线的轨迹凝成。它问你：「你能从抛物线的形状，反推出它的灵魂吗？」",
    questions: [
      {
        kind: "choice",
        id: "b1",
        stem: "已知二次函数图像的顶点是 $(2, -3)$ 且经过 $(0, 1)$，则它的解析式是？",
        options: [
          "$y = (x - 2)^2 - 3$",
          "$y = (x + 2)^2 - 3$",
          "$y = x^2 - 3$",
          "$y = -(x - 2)^2 - 3$",
        ],
        answerIndex: 0,
        hint: "用顶点式 $y = a(x - h)^2 + k$，先确定 $h, k$ 再代点求 $a$。",
        explanation:
          "顶点式 $y = a(x - 2)^2 - 3$，代 $(0,1)$：$1 = 4a - 3 \\Rightarrow a = 1$，所以 $y = (x - 2)^2 - 3$。",
      },
      {
        kind: "fill",
        id: "b2",
        stem: "若 $y = 2x^2 - 4x + 3$，则 $y$ 的最小值是 ",
        answer: 1,
        hint: "$a > 0$ 时顶点是最低点；对称轴 $x = 1$。",
        explanation: "对称轴 $x = -\\dfrac{-4}{4} = 1$，代入 $y = 2 - 4 + 3 = 1$。最小值是 1。",
      },
      {
        kind: "choice",
        id: "b3",
        stem: "抛物线 $y = -x^2 + 4x - 3$ 与 $x$ 轴的交点是？",
        options: [
          "$(1, 0)$ 和 $(3, 0)$",
          "$(-1, 0)$ 和 $(-3, 0)$",
          "$(0, 1)$ 和 $(0, 3)$",
          "没有交点",
        ],
        answerIndex: 0,
        hint: "解方程 $-x^2 + 4x - 3 = 0$，等价于 $x^2 - 4x + 3 = 0$。",
        explanation:
          "$x^2 - 4x + 3 = (x - 1)(x - 3) = 0$，所以 $x = 1$ 或 $x = 3$，交点 $(1, 0)$ 和 $(3, 0)$。",
      },
      {
        kind: "choice",
        id: "b4",
        stem: "已知抛物线开口向上、顶点在第三象限，且与 $y$ 轴交点在正半轴上，则下列**不可能**的是？",
        options: ["对称轴 $x = -1$", "$a > 0$", "$c > 0$", "顶点纵坐标 $> 0$"],
        answerIndex: 3,
        hint: "顶点在第三象限意味着 $h < 0$ 且 $k < 0$。",
        explanation:
          "「顶点在第三象限」要求顶点的纵坐标 $k < 0$；选项 D 说 $k > 0$，自相矛盾，不可能。",
      },
      {
        kind: "fill",
        id: "b5",
        stem: "如果樱花从 8 米高处下落，下落距离 $h$ 米与时间 $t$ 秒的关系是 $h = 5t^2$。当樱花刚好落地（$h = 8$）时，$t^2 = $",
        answer: 1.6,
        hint: "$5t^2 = 8$。",
        explanation: "$t^2 = \\dfrac{8}{5} = 1.6$。注意我们求的是 $t^2$，不是 $t$ 本身。",
      },
    ],
  },
};
