# 李明杰｜AI产品经理面试作品集

面向耳机、音响类 3C 精品跨境电商岗位的**面试演示系统**：由候选人主讲、页面辅助表达、截图和真实案例承担证明、预设问答承接追问。

- 项目内部标识：`LMJ AI PM Portfolio · WorkBuddy Edition`
- 本仓库独立于旧作品集（`limmingjie-portfolio`）与 Codex 版本（`limmingjie-ai-pm-interview`），不共享写入位置。
- 旧作品集只读，仅复制素材，从不修改、提交或推送。
- GitHub Pages 路径：`/limmingjie-ai-pm/`

## 三种模式

| 模式 | 用途 |
| --- | --- |
| 普通浏览 | 面试官自己看，默认不显示提词 |
| 15 分钟标准 | 明天主讲使用的默认路径 |
| 8 分钟精简 | 面试官时间有限时，隐藏次要屏 |

详情页与「对方可能会问」抽屉支持 20 分钟以上深挖。

## 本地命令

```bash
npm install
npm run dev          # 本地预览
npm run qr           # 生成三条抖音代表作品的二维码（build 会自动执行）
npm test -- --run    # 内容与组件校验
npm run build        # 类型检查 + 静态构建
npm run preview -- --port 4173
npx playwright test  # 1440x900 / 1366x768 / 390x844 验收
```

> Windows + Git Bash 下若 `npm` 报编码错误，请使用完整路径的 `npm.cmd`。

## 内容修改位置

| 想改什么 | 改哪里 |
| --- | --- |
| 章节、指标、账号矩阵、案例文案 | `src/content/portfolio.ts` |
| 每屏提词与建议时长 | `src/content/scripts.ts` |
| 预设追问（15 秒 / 45 秒） | `src/content/faq.ts` |
| 视觉令牌（颜色、字号、间距） | `src/styles/tokens.css` |
| 组件样式 | `src/styles/global.css` |
| 素材（截图 / 视频 / 简历 / 二维码） | `public/assets/**`、`public/resume/**` |

## 证据与真实性规则

- 每个数字都必须带口径（`Metric.scope`），测试会强制校验。
- 严格区分 **真实工作**、**截图时数据**、**产品 Demo**、**产品方案**、**规划目标**。
- AI 编导工作台 = 产品 Demo（提示词与内容方法已用于实际工作，页面不是公司上线系统）。
- 研发费合规专家 = 产品方案 + 页面 Demo（知识库规模与效率提升为设计目标）。
- AI Product Leader OS = 附加区，不进入 15 分钟标准主线。
- 三条抖音链接均为**单条作品**分享链接，不是账号主页；按钮统一为「查看代表作品」。
- 不出现空模块、占位符、假 Demo 按钮和未经确认的公司信息。

## 与 AI 协作工具的边界

Hermes 与 Codex 属于协作工具。需求判断、流程设计、提示词、验收标准与迭代方向由候选人负责，编码实现由工具协作完成，不描述成完全由个人手写开发。

## 部署

推送到 `main` 后由 `.github/workflows/deploy-pages.yml` 自动构建并发布。
首次部署前必须确认远程仓库名称，且 **不得改动旧仓库的 GitHub Pages 设置**。
