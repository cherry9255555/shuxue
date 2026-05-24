import type { Realm } from "./types";

export const linearRealm: Realm = {
  slug: "huanghua-garden",
  title: "黄昏花园",
  subtitle: "Crepuscular Garden",
  motif: "一次函数 · 初二复习",
  description:
    "夕阳把整座花园染成樱粉。这里所有的藤蔓都长成一条直线 —— 它们用同一个法则生长：每走 x 步，高度变化是 kx + b。掌握直线的语言，便能在花园里自由穿梭。",
  unlockAfter: null,
  accent: "#ffc4d6",
  lessons: [
    // ───────────────────────── L1
    {
      slug: "what-is-function",
      key: "linear/l1",
      title: "L1 · 召唤函数",
      subtitle: "什么是函数",
      interactive: null,
      concept: {
        title: "什么是函数？",
        subtitle: "「对应」是数学世界最朴素的契约",
        paragraphs: [
          "想象你站在花园门口，门内有一只小灯笼。你每往前迈一步，灯笼就亮一格 —— 走 1 步亮 1 格，走 3 步亮 3 格。这个「你走的步数 → 灯笼亮的格数」就是一种**对应关系**。",
          "在数学里，如果两个变量 $x$ 和 $y$ 之间，**对每一个 $x$ 都有唯一确定的 $y$ 与它对应**，那么我们说 $y$ 是 $x$ 的**函数**。$x$ 叫做**自变量**，$y$ 叫做**因变量**。",
          "用一句话总结：函数 = 一对一（或一对多到一）的法则。给我一个 $x$，我必须能毫不犹豫地告诉你对应的 $y$ 是谁。",
        ],
        formulas: [
          {
            key: "function-def",
            tex: "y = f(x)",
            caption: "函数的符号表达：y 由 x 通过法则 f 决定",
          },
        ],
      },
      questions: [
        {
          kind: "choice",
          id: "q1",
          stem: "下列哪一个关系，是 $y$ 关于 $x$ 的函数？",
          options: [
            "$x$ 是某次考试的考号，$y$ 是该考号对应的考生姓名",
            "$x$ 是花园里的一棵樱花树，$y$ 是这棵树上某一朵花瓣的颜色",
            "$x$ 是一个正方形的边长，$y$ 是它的面积",
            "$x$ 是某条街道，$y$ 是这条街上的住户",
          ],
          answerIndex: 2,
          hint: "函数要求「每一个 $x$ 对应唯一的 $y$」。一棵树上有很多花瓣，颜色可能不同；一条街上有许多住户。",
          explanation:
            "正方形的边长 $x$ 一旦确定，面积 $y = x^2$ 就唯一确定，所以是函数。其它选项里，一个 $x$ 可能对应多个 $y$。",
        },
        {
          kind: "choice",
          id: "q2",
          stem: "已知函数 $y = 2x - 3$，当 $x = 4$ 时，$y$ 的值是？",
          options: ["5", "11", "8", "−5"],
          answerIndex: 0,
          hint: "把 $x = 4$ 代入式子里算一下：$2 \\times 4 - 3$。",
          explanation: "$y = 2 \\times 4 - 3 = 8 - 3 = 5$。",
        },
        {
          kind: "fill",
          id: "q3",
          stem: "已知 $y = -3x + 7$，当 $x = 2$ 时，$y = $",
          answer: 1,
          placeholder: "写一个整数或小数",
          hint: "代入 $x = 2$：$-3 \\times 2 + 7$。",
          explanation: "$-3 \\times 2 + 7 = -6 + 7 = 1$。",
        },
        {
          kind: "choice",
          id: "q4",
          stem: "函数 $y = f(x)$ 中，正确的说法是？",
          options: [
            "$x$ 叫做因变量",
            "$y$ 叫做自变量",
            "$x$ 叫做自变量，$y$ 叫做因变量",
            "$x$ 和 $y$ 都是因变量",
          ],
          answerIndex: 2,
          explanation:
            "记忆口诀：**自由的是自变量**（$x$ 可以自由取值），**跟随的是因变量**（$y$ 因为 $x$ 才有值）。",
        },
        {
          kind: "fill",
          id: "q5",
          stem: "设函数 $f(x) = x^2 - 1$，则 $f(-3) = $",
          answer: 8,
          hint: "把 $x = -3$ 代入：$(-3)^2 - 1$。注意负数平方为正。",
          explanation: "$(-3)^2 - 1 = 9 - 1 = 8$。",
        },
      ],
    },

    // ───────────────────────── L2
    {
      slug: "linear-form",
      key: "linear/l2",
      title: "L2 · 直线之约",
      subtitle: "一次函数的定义与图像",
      interactive: "slope-slider",
      concept: {
        title: "什么是一次函数？",
        subtitle: "$y = kx + b$，最古老的咒文",
        paragraphs: [
          "形如 $y = kx + b$（其中 $k \\neq 0$，$k$ 和 $b$ 都是常数）的函数，叫做**一次函数**。当 $b = 0$ 时，它就退化成最纯粹的形态 $y = kx$，叫做**正比例函数**。",
          "**一次函数的图像永远是一条直线**。换句话说，只要你看见一条直线（不是水平也不是竖直），就可以用 $y = kx + b$ 来描述它。",
          "右侧的「魔法显像仪」里，你可以拖动滑块改变 $k$，看直线如何转动；改变 $b$，看直线如何上下平移。**观察是最好的老师**。",
        ],
        formulas: [
          {
            key: "linear-form",
            tex: "y = kx + b \\quad (k \\neq 0)",
            caption: "一次函数标准形式",
          },
        ],
      },
      questions: [
        {
          kind: "choice",
          id: "q1",
          stem: "下列函数中，哪一个**不是**一次函数？",
          options: ["$y = 3x + 1$", "$y = -x$", "$y = x^2 + 2$", "$y = \\frac{1}{2}x - 5$"],
          answerIndex: 2,
          hint: "一次函数自变量 $x$ 的次数必须是 1。",
          explanation: "$y = x^2 + 2$ 含 $x^2$，是二次函数。其余都是 $y = kx + b$ 形式。",
        },
        {
          kind: "choice",
          id: "q2",
          stem: "一次函数 $y = kx + b$ 中，**当 $b = 0$ 时**，它叫做？",
          options: ["反比例函数", "二次函数", "正比例函数", "常数函数"],
          answerIndex: 2,
          explanation: "$y = kx$（$k \\neq 0$）就是正比例函数，是一次函数的一种特殊形态。",
        },
        {
          kind: "fill",
          id: "q3",
          stem: "若函数 $y = (m-2)x + 3$ 是一次函数，则 $m$ 需要满足 $m \\ne $ ",
          answer: 2,
          hint: "一次函数要求 $k \\neq 0$。",
          explanation: "因为 $k = m - 2$ 必须不等于 0，所以 $m \\ne 2$。",
        },
        {
          kind: "choice",
          id: "q4",
          stem: "一次函数的图像是？",
          options: ["一条曲线", "一段折线", "一条直线", "一个圆"],
          answerIndex: 2,
          explanation: "这是定义级别的事实：一次函数 $y = kx + b$ 的图像永远是一条直线。",
        },
        {
          kind: "choice",
          id: "q5",
          stem: "下列哪个**点**在一次函数 $y = 2x - 1$ 的图像上？",
          options: ["$(0, 1)$", "$(1, 1)$", "$(2, 2)$", "$(-1, 1)$"],
          answerIndex: 1,
          hint: "把每个点的 $x$ 代进 $y = 2x - 1$，看算出来的 $y$ 是不是和点里的 $y$ 一致。",
          explanation: "代入 $(1, 1)$：$y = 2 \\times 1 - 1 = 1$，吻合。其它点代入都不一致。",
        },
      ],
    },

    // ───────────────────────── L3
    {
      slug: "slope",
      key: "linear/l3",
      title: "L3 · 斜率咏唱",
      subtitle: "k 的几何意义",
      interactive: "slope-slider",
      concept: {
        title: "斜率 k 究竟是什么？",
        subtitle: "「每走一步，跳跃多高」",
        paragraphs: [
          "在 $y = kx + b$ 里，$k$ 叫做**斜率**。它的几何含义非常直观：**当 $x$ 增加 1 时，$y$ 改变的量就是 $k$**。",
          "**$k > 0$**：直线从左下到右上，像爬樱花树；$x$ 越大 $y$ 越大。\n**$k < 0$**：直线从左上到右下，像花瓣飘落；$x$ 越大 $y$ 越小。\n**$|k|$ 越大**：直线越陡；**$|k|$ 越小**：直线越平缓。",
          "可以这样记：**$k$ = 上升的量 / 走过的量**。比如 $k = 2$，意味着每往右走 1 格，y 就升高 2 格。",
        ],
        formulas: [
          {
            key: "slope-meaning",
            tex: "k = \\frac{\\Delta y}{\\Delta x}",
            caption: "斜率 = y 的变化量 ÷ x 的变化量",
          },
        ],
      },
      questions: [
        {
          kind: "choice",
          id: "q1",
          stem: "已知一次函数 $y = kx + b$ 的图像从左下到右上，则可以判断？",
          options: ["$k > 0$", "$k < 0$", "$k = 0$", "$b > 0$"],
          answerIndex: 0,
          hint: "从左下到右上 = x 增大时 y 也增大。",
          explanation: "$x$ 增大 $y$ 也增大，说明 $k > 0$（与 $b$ 的正负无关）。",
        },
        {
          kind: "choice",
          id: "q2",
          stem: "下列函数中，图像最「陡」的是？",
          options: ["$y = 0.5x + 1$", "$y = -3x + 1$", "$y = x + 1$", "$y = -0.8x + 1$"],
          answerIndex: 1,
          hint: "陡不陡看 $|k|$，绝对值越大越陡。",
          explanation: "$|{-3}| = 3$ 最大，所以 $y = -3x + 1$ 最陡（虽然方向朝左下）。",
        },
        {
          kind: "fill",
          id: "q3",
          stem: "直线 $y = 4x - 2$ 中，当 $x$ 增加 1 时，$y$ 增加了 ",
          answer: 4,
          hint: "$y$ 的变化量 = $k \\cdot \\Delta x$。",
          explanation: "$\\Delta y = k \\cdot \\Delta x = 4 \\times 1 = 4$。",
        },
        {
          kind: "fill",
          id: "q4",
          stem: "直线经过两点 $(1, 3)$ 和 $(4, 12)$，则斜率 $k = $",
          answer: 3,
          hint: "$k = \\dfrac{y_2 - y_1}{x_2 - x_1}$。",
          explanation: "$k = \\dfrac{12 - 3}{4 - 1} = \\dfrac{9}{3} = 3$。",
        },
        {
          kind: "choice",
          id: "q5",
          stem: "两条直线 $y = 2x + 1$ 与 $y = 2x - 5$ 之间的关系是？",
          options: ["相交于一点", "平行", "垂直", "重合"],
          answerIndex: 1,
          hint: "斜率相同但 $b$ 不同的两条直线…",
          explanation: "$k$ 都是 2 (相同斜率)，但 $b$ 不同 (不重合)，所以两线**平行**。",
        },
      ],
    },

    // ───────────────────────── L4
    {
      slug: "intercept",
      key: "linear/l4",
      title: "L4 · 截距之星",
      subtitle: "b 与坐标轴交点",
      interactive: "slope-slider",
      concept: {
        title: "b 决定了直线在哪里穿过 y 轴",
        paragraphs: [
          "在 $y = kx + b$ 里，**$b$ 叫做 y 轴上的截距**。它的几何含义：**直线与 $y$ 轴交点的纵坐标**，也就是点 $(0, b)$。",
          "想知道直线与 $x$ 轴的交点？让 $y = 0$ 解方程 $kx + b = 0$，得到 $x = -\\dfrac{b}{k}$，所以与 $x$ 轴的交点是 $\\left(-\\dfrac{b}{k}, 0\\right)$。",
          "拖动滑块改 $b$，你会看到整条直线整体上下移动，而方向（斜率）不变。",
        ],
        formulas: [
          {
            key: "intercepts",
            tex: "(0,\\, b)\\;\\;\\text{与}\\;\\; \\left(-\\tfrac{b}{k},\\, 0\\right)",
            caption: "一次函数与坐标轴的两个交点",
          },
        ],
      },
      questions: [
        {
          kind: "choice",
          id: "q1",
          stem: "一次函数 $y = -2x + 6$ 与 $y$ 轴的交点是？",
          options: ["$(6, 0)$", "$(0, -2)$", "$(0, 6)$", "$(3, 0)$"],
          answerIndex: 2,
          explanation: "令 $x = 0$，$y = -2 \\times 0 + 6 = 6$，所以交点是 $(0, 6)$。",
        },
        {
          kind: "fill",
          id: "q2",
          stem: "直线 $y = 3x - 12$ 与 $x$ 轴的交点的横坐标 $x = $",
          answer: 4,
          hint: "令 $y = 0$ 解方程。",
          explanation: "$3x - 12 = 0 \\Rightarrow x = 4$。",
        },
        {
          kind: "choice",
          id: "q3",
          stem: "若一次函数图像经过原点，则 $b = $？",
          options: ["1", "−1", "0", "任意值"],
          answerIndex: 2,
          hint: "经过原点 $(0, 0)$ 意味着 $x = 0$ 时 $y = 0$。",
          explanation: "代入：$0 = k \\cdot 0 + b \\Rightarrow b = 0$。此时函数为正比例函数。",
        },
        {
          kind: "fill",
          id: "q4",
          stem: "一次函数 $y = kx + 5$ 经过点 $(2, 1)$，则 $k = $",
          answer: -2,
          hint: "把点代入函数。",
          explanation: "$1 = 2k + 5 \\Rightarrow 2k = -4 \\Rightarrow k = -2$。",
        },
        {
          kind: "choice",
          id: "q5",
          stem: "直线 $y = -x + 3$ 不经过哪个象限？",
          options: ["第一象限", "第二象限", "第三象限", "第四象限"],
          answerIndex: 2,
          hint: "$k < 0$，$b > 0$。先想图像走向。",
          explanation:
            "$k = -1 < 0$ 表示从左上到右下；$b = 3 > 0$ 表示与 y 轴交于上方。这样的直线经过一、二、四象限，**不经过第三象限**。",
        },
      ],
    },

    // ───────────────────────── L5
    {
      slug: "two-lines",
      key: "linear/l5",
      title: "L5 · 双线交锋",
      subtitle: "两直线的位置关系",
      interactive: null,
      concept: {
        title: "两条直线之间，有几种可能？",
        paragraphs: [
          "设两条一次函数 $y = k_1 x + b_1$ 与 $y = k_2 x + b_2$，它们之间只有三种关系：",
          "**① 平行**：$k_1 = k_2$ 且 $b_1 \\neq b_2$（斜率相同但不重合）。\n**② 重合**：$k_1 = k_2$ 且 $b_1 = b_2$（完全是同一条直线）。\n**③ 相交**：$k_1 \\neq k_2$（斜率不同必相交于唯一一点）。",
          "求两直线交点：联立方程组 $\\begin{cases} y = k_1 x + b_1 \\\\ y = k_2 x + b_2 \\end{cases}$，让两个 $y$ 相等：$k_1 x + b_1 = k_2 x + b_2$，解出 $x$ 后回代得到 $y$。",
        ],
        formulas: [
          {
            key: "parallel-condition",
            tex: "k_1 = k_2,\\;b_1 \\ne b_2 \\Rightarrow \\text{平行}",
            caption: "两直线平行的判定",
          },
        ],
      },
      questions: [
        {
          kind: "choice",
          id: "q1",
          stem: "直线 $y = 3x - 1$ 和 $y = 3x + 4$ 的关系是？",
          options: ["相交", "平行", "重合", "垂直"],
          answerIndex: 1,
          explanation: "斜率都为 3，截距不同，所以平行。",
        },
        {
          kind: "fill",
          id: "q2",
          stem: "若 $y = (m-1)x + 2$ 与 $y = 3x - 5$ 平行，则 $m = $",
          answer: 4,
          hint: "平行 ⇒ 斜率相等。",
          explanation: "$m - 1 = 3 \\Rightarrow m = 4$。",
        },
        {
          kind: "fill",
          id: "q3",
          stem: "直线 $y = 2x + 1$ 与 $y = -x + 4$ 的交点的横坐标 $x = $",
          answer: 1,
          hint: "让两个 $y$ 相等：$2x + 1 = -x + 4$。",
          explanation: "$2x + 1 = -x + 4 \\Rightarrow 3x = 3 \\Rightarrow x = 1$。",
        },
        {
          kind: "choice",
          id: "q4",
          stem: "已知直线 $l_1: y = -2x + 3$ 和 $l_2: y = -2x + 3$，它们的关系是？",
          options: ["相交", "平行", "重合", "垂直"],
          answerIndex: 2,
          explanation: "斜率相同且截距也相同，所以两条直线完全重合。",
        },
        {
          kind: "fill",
          id: "q5",
          stem: "已知 $y = 4x + b$ 与 $y = 4x - 3$ 是同一条直线，则 $b = $",
          answer: -3,
          explanation: "重合意味着斜率和截距都相等，所以 $b = -3$。",
        },
      ],
    },
  ],

  boss: {
    key: "linear/boss",
    title: "✦ 花园守护者 · 直线之主 ✦",
    intro:
      "黄昏花园的深处，一条由所有直线编织成的金色丝带 —— 它询问你：「你是否真的明白直线的语言？」 答对所有问题，可解锁下一个结界。",
    questions: [
      {
        kind: "choice",
        id: "b1",
        stem: "已知一次函数 $y = kx + b$ 的图像经过 $(1, 3)$ 和 $(0, 1)$，则 $k = $？",
        options: ["1", "2", "3", "−2"],
        answerIndex: 1,
        hint: "$k = \\dfrac{\\Delta y}{\\Delta x}$。",
        explanation: "$k = \\dfrac{3 - 1}{1 - 0} = 2$。",
      },
      {
        kind: "fill",
        id: "b2",
        stem: "若直线 $y = kx - 4$ 经过 $(2, 0)$，则 $k = $",
        answer: 2,
        explanation: "代入 $(2, 0)$：$0 = 2k - 4 \\Rightarrow k = 2$。",
      },
      {
        kind: "choice",
        id: "b3",
        stem: "下列哪个一次函数 **既**经过第二象限**又**与 $y = -3x + 5$ 平行？",
        options: ["$y = 3x + 1$", "$y = -3x - 2$", "$y = -3x + 2$", "$y = 3x - 1$"],
        answerIndex: 2,
        hint: "平行 ⇒ 斜率为 −3；经过第二象限 ⇒ $b > 0$（$k<0$ 时）。",
        explanation:
          "斜率必须为 −3，所以排除 A、D。再看 b：$y = -3x + 2$ 中 $b = 2 > 0$，图像经过第一、二、四象限。$y = -3x - 2$ 经过二、三、四象限也对。但更标准的「经过第二象限」时 $b > 0$ 一定满足，答案选 $y = -3x + 2$。",
      },
      {
        kind: "fill",
        id: "b4",
        stem: "直线 $y = -2x + 6$ 与 $x$ 轴、$y$ 轴围成的三角形面积是 ",
        answer: 9,
        hint: "两个交点 + 原点 = 直角三角形。$x$ 轴交点 $(3,0)$，$y$ 轴交点 $(0,6)$。",
        explanation: "三角形两条直角边长 3 和 6，面积 = $\\dfrac{1}{2} \\times 3 \\times 6 = 9$。",
      },
      {
        kind: "choice",
        id: "b5",
        stem: "某商场卖樱花蛋糕，每个 30 元，已知售出 $x$ 个的总收入 $y$ (元) 与 $x$ 的函数关系是？",
        options: ["$y = 30 + x$", "$y = 30x$", "$y = 30 - x$", "$y = \\frac{30}{x}$"],
        answerIndex: 1,
        explanation:
          "每个 30 元，售出 $x$ 个总收入就是 $30 \\times x = 30x$，这是正比例函数（$y = kx$ 形式，$k = 30$）。",
      },
    ],
  },
};
