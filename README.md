# AI 原生工程：Vibe Coding 进阶与全域自动化落地

[![GitHub Stars](https://img.shields.io/github/stars/TatsukiMeng/ai-native-engineering?style=flat-square&logo=github&label=Stars)](https://github.com/TatsukiMeng/ai-native-engineering/stargazers)
[![Netlify Status](https://img.shields.io/website?url=https%3A%2F%2Fai-native-engineering.netlify.app&up_message=online&down_message=offline&up_color=00C7B7&down_color=ef4444&style=flat-square&label=Netlify&logo=netlify&logoColor=white)](https://ai-native-engineering.netlify.app)
<a href="https://www.netlify.com">
  <img src="https://www.netlify.com/assets/badges/netlify-badge-color-accent.svg" alt="Deploys by Netlify" />
</a>

这不是一本“AI 工具大全”，也不是把一堆新名词摊开讲一遍的科普手册。

这个仓库真正想做的，是把 AI 编程从“偶尔好用的外挂”，写成一套能做大项目、能持续交付、出了问题也知道怎么兜底的工程工作流。

现在看到的不是终稿，而是一份持续推进中的书稿工作区：文档站、书稿正文、写作规则和后续案例代码，都会在这里一起生长。

## 快速入口

- [行为准则](CODE_OF_CONDUCT.md)
- [协作说明](CONTRIBUTING.md)
- [仓库协作规范](AGENTS.md)
- [当前目录主线](OUTLINE.md)
- [文档站导览版大纲](docs/content/docs/outline/overview.mdx)

## 这本书到底在写什么

这本书想回答的，不是“哪个 AI IDE 最强”，而是更现实的几个问题：

- 为什么很多人觉得 AI 很笨，本质上其实是工作流还停在补全时代。
- 为什么 `Prompt` 写得再认真，项目一做大还是会乱。
- 为什么 `Context`、`Rules`、`Skills`、`CLI`、`MCP`、`Playwright`、`Harness`、`Agent Team` 这些能力最后一定会收敛成一条完整工作流。
- 为什么真正难的不是“让 AI 写出代码”，而是“让它少乱猜、少返工、能验证、能回滚、能治理”。

所以这本书不会只停在概念层，也不会只做几个小 demo。主线会围绕一个真正的大项目展开，把需求收敛、系统设计、主干实现、联调交付、长期治理串成一条线。

## 当前结构

全书现在按五个 Part 推进：

| Part | 主题 | 当前主线 |
| --- | --- | --- |
| `Part 1` | 破局 | 范式转移、工具分工、控制面、产品判断、主线项目亮相 |
| `Part 2` | 定盘 | 需求收敛、技术栈、仓库起盘、系统设计、spec-first 控制面 |
| `Part 3` | 长主干 | Execution Graph、官方路径、事实层/证据层/投影层、开发期 Harness、长任务不断线 |
| `Part 4` | 接世界 | 运行时观察面、Playwright verifier、外部系统边界、联调发布与回退 |
| `Part 5` | 自运行 | 成本与吞吐治理、System of Record、Agent Team、反脆弱 Harness、人类 on-the-loop |

更细的章节说明，直接看：

- [根目录 OUTLINE](OUTLINE.md)
- [导览版大纲](docs/content/docs/outline/overview.mdx)
- [详细版大纲](docs/content/docs/outline/detailed-outline.mdx)

## 当前进度（截至 2026 年 4 月 17 日）

仓库当前的状态可以概括成一句话：

**前两部分已经把认知和项目底板立住，后面三部分的大纲和章节骨架已经切到“长主干 -> 接世界 -> 自运行”这条新主线。**

按模块看：

| 模块 | 当前状态 | 说明 |
| --- | --- | --- |
| 前言 | 已有可读版本 | 说明为什么写这本书、写给谁、怎么读 |
| `Part 1 · 破局` | 第一轮正文已落地 | 认知破局、工具分工、控制面主线已经连起来 |
| `Part 2 · 定盘` | 第一轮正文已落地 | 需求收敛、系统设计、spec-first 控制面已经打通 |
| `Part 3 · 长主干` | 新骨架已完成 | 已切到 Execution Graph、官方路径、开发期 Harness 这条主线 |
| `Part 4 · 接世界` | 新骨架已完成 | 已切到运行时观察面、verifier、边界与交付闭环 |
| `Part 5 · 自运行` | 新骨架已完成 | 已切到成本、System of Record、Agent Team、反脆弱 Harness |
| 文档基建 | 已可稳定使用 | Fumadocs 静态导出、Part 结构、导览页、侧边栏分组已打通 |

## 仓库结构

当前仓库最核心的部分如下：

```text
.
├── docs/                 # Fumadocs 文档站，也是书稿主要落点
├── OUTLINE.md            # 根目录版目录主线与写作规划
├── AGENTS.md             # 仓库协作规范，AI 和人都要遵守
├── CODE_OF_CONDUCT.md    # 项目行为准则
├── CONTRIBUTING.md       # 协作说明
└── README.md             # 项目说明与当前进度
```

补充几点更准确的说明：

- 书稿正文主要放在 `docs/content/docs`。
- 文档站采用 **Next.js + Fumadocs**，并明确走 **Static Export**，不依赖服务端渲染。
- 正文章节与目录都统一使用数字前缀 + 英文 slug。
- 分组导览页统一使用 `00-overview.mdx`。
- 分享稿、杂记、实验记录等非正文材料统一放在 `docs/content/docs/notes/`。
- 后续完整案例代码会逐步补到 `cases/` 一类目录中，但目前主阵地仍然是 `docs/`。

## 本地开发

如果只是想本地跑文档站，直接在 `docs/` 目录下操作：

```bash
cd docs
bun install
bun run dev
```

常用命令：

```bash
cd docs
bun run types:check
bun run build
bun run start
```

说明：

- `bun run dev`：本地开发。
- `bun run types:check`：生成类型并做 TypeScript 校验。
- `bun run build`：执行静态构建。
- `bun run start`：基于 `out` 目录预览静态产物。

## Netlify 部署

仓库根目录已经提供 `netlify.toml`。Netlify 导入这个仓库时会：

- 把 `docs/` 识别成实际构建目录。
- 用 `bun install --frozen-lockfile && bun run build` 构建。
- 发布 `docs/out` 里的静态产物。
- 默认把 `NEXT_PUBLIC_BASE_PATH` 固定为根路径 `/`。

如果后面要接自定义域名、canonical、社交分享图或线上巡检，再补：

- `NEXT_PUBLIC_SITE_URL`
- 需要联动其他自动化时再补对应 token

## 内容组织约定

为了避免目录越写越乱，仓库现在统一遵循这些规则：

- 顶层结构统一使用 `Part 1`、`Part 2` 这类说法。
- 文档目录统一使用数字前缀，例如 `01-breakthrough`、`02-foundation`。
- 分组导览页统一使用 `00-overview.mdx`。
- 真正长期生效的规则，以 `AGENTS.md` 为准。

如果之后继续往里补内容，最好沿着这套规则走，不然侧边栏、顺序和导出路由很快就会重新打架。

## 协作说明

如果准备直接改仓库内容，先看这几个文件：

- `AGENTS.md`：最重要，里面有写作风格、术语规范、目录规则、AI 协作要求。
- `OUTLINE.md`：根目录版全书主线，适合快速看目录结构。
- `docs/content/docs/outline/overview.mdx`：读者视角的导览版大纲。
- `docs/content/docs/outline/detailed-outline.mdx`：更完整的章节设计。
- `CONTRIBUTING.md`：补充性的协作说明。

另外有几个约定最好别漏：

- Commit message 必须使用中文。
- 提交前缀遵守 Angular 风格，比如 `docs:`、`fix:`、`chore:`。
- 涉及外部产品、模型、工具的判断，尽量要有来源，不要硬写想当然结论。
- 这不是一个“写点漂亮话就行”的仓库，能落地、能复现、能解释为什么这么做，比堆概念重要得多。

## 关于 README 自己

这个 README 的定位不是营销文案，也不是项目宣言。

它更像一个给后来者看的现场说明：

- 这个仓库现在在做什么。
- 目录主线推进到哪了。
- 文档站怎么跑。
- 结构规则是什么。
- 如果要继续改，应该先看哪里。

后面随着书稿推进，它也会继续更新。

## License

仓库当前附带了 `LICENSE` 文件。

如果后续对书稿正文和工程代码采用不同的授权方式，会在仓库里明确补充，不靠 README 口头约定。
