# 樱花魔法院 · Sakura Mahou Gakuin

一个面向中学生（特别为初二复习 + 初三预习设计）的二次元主题数学学习站。
角色扮演 + 关卡 + 可视化互动 + 公式典藏，让初中数学变成一场结界破除之旅。

## 主要特性

- **角色养成**：4 种二次元立绘 + 自定义名字。等级、星尘（XP）、连击。
- **结界图谱**：两个章节，10 节课 + 2 个 BOSS。一次函数（初二复习）+ 二次函数（初三预习）。
- **可视化探索**：拖滑块改 $k, b, a, c$ 看函数图像实时变化。
- **公式典藏**：学过的公式自动入藏，未学的显示 `???`。
- **温柔失败**：答错不扣分，3 次内可重试；第 3 次自动展示解析。
- **零后端**：所有进度存在浏览器 `localStorage`，无登录、无数据收集。

## 技术栈

- Next.js 16.2 (App Router) + React 19.2 + TypeScript
- Tailwind CSS v4
- Motion (framer-motion 后续版本)
- KaTeX（数学公式）
- 字体：Cormorant Garamond + Cinzel Decorative + Klee One + LXGW WenKai

## 本地开发

```bash
npm install
npm run dev
```

打开 http://localhost:3000

## 构建

```bash
npm run build
npm start
```

## 部署到 Vercel

1. 推送到 GitHub
2. 在 [vercel.com/new](https://vercel.com/new) 导入这个仓库
3. Vercel 会自动识别 Next.js 项目，零配置部署

## 目录结构

```
app/
  page.tsx                    # 主大厅
  realm/[slug]/page.tsx       # 章节首页
  realm/[slug]/[lesson]/      # 课程页（lesson = boss 时为 BOSS）
  codex/page.tsx              # 公式典藏馆
  profile/page.tsx            # 角色档案
components/
  theme/                      # SakuraParticles, Sparkles, Ribbon
  game/                       # Avatar, XPBar, RealmCard, CharacterCreator, SiteHeader
  lesson/                     # QuestionCard, FunctionPlot
  ui/                         # Card, Button, Tex
content/
  linear-function.ts          # 章节 1 数据
  quadratic-function.ts       # 章节 2 数据
lib/
  progress.ts                 # localStorage 进度读写
  katex.ts                    # 公式渲染封装
  math.ts                     # 数学工具函数
```

## 增加新章节

1. 在 `content/` 新建 `xxx.ts`，按 `Realm` 类型结构编写（参考已有两个文件）
2. 在 `content/index.ts` 的 `realms` 数组里加上它
3. `unlockAfter` 字段填上前置章节 BOSS 的 `key`（如 `"linear/boss"`）就能控制解锁顺序

## 数据 & 隐私

- 所有学习进度只保存在浏览器 `localStorage`（键 `sakura-math.v1`）
- 不发送任何数据到外部服务器
- 清除浏览器数据 = 重置进度
