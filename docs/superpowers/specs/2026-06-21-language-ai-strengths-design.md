# Language And AI Strengths Design

## Goal

Add two recruiter-readable capability cards to the existing Personal Strengths MagicBento grid without changing the style or interaction behavior of the six current cards.

## Content

### 英语沟通与跨文化协作

- Evidence: PTE four skills at 7; CET-6 score of 510.
- Copy: `PTE 四项 7 分 · 大学英语六级 510 分 · 具备英文学习、工作沟通与海外协作能力。`
- Icon: `Languages` from Lucide React.

### AI 应用与快速交付

- Evidence: AI short-form drama production, Vibe Coding, and personal website implementation.
- Copy: `使用生成式 AI 完成短剧内容制作、Vibe Coding 与个人网站搭建，将想法快速转化为可运行的数字作品。`
- Icon: `Sparkles` from Lucide React.

## Presentation

- Append the cards to the existing `strengths` data array.
- Continue using the current MagicBento card dimensions, gold glow, tilt, magnetism, and click particle feedback.
- Do not add a separate visual section, certificate badges, or a new interaction pattern.
- The existing responsive grid will include the new cards naturally.

## Validation

- Extend `scripts/verify-content.mjs` to require the two card titles, credential text, AI work terms, and `Languages` icon import.
- Run `npm run check`, `npm run perf:check`, `npm run build`, and `git diff --check`.
