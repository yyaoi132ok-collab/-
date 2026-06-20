# Language And AI Strengths Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two evidence-based language and AI capability cards to the existing MagicBento strengths grid.

**Architecture:** Keep the strengths grid data-driven. Extend the existing `strengths` array in `src/main.jsx`, import the one missing Lucide icon, and strengthen the existing source-level content test. No MagicBento component or CSS changes are required because the new cards inherit its layout and interactions.

**Tech Stack:** React 19, Lucide React, MagicBento, Node verification scripts.

---

### Task 1: Add A Failing Strengths Guard

**Files:**
- Modify: `scripts/verify-content.mjs`

- [ ] **Step 1: Add this assertion after `const source = readFileSync(...)`.**

```js
for (const strengthRequirement of [
  '英语沟通与跨文化协作', 'PTE 四项 7 分', '大学英语六级 510 分',
  'AI 应用与快速交付', '短剧内容制作', 'Vibe Coding', '个人网站搭建', 'Languages',
]) {
  if (!source.includes(strengthRequirement)) throw new Error(`Strength card is missing: ${strengthRequirement}`);
}
```

- [ ] **Step 2: Run `npm run check`; expect `Strength card is missing: 英语沟通与跨文化协作`.**
- [ ] **Step 3: Commit with `git commit -m "test: cover language and ai strengths"`.**

### Task 2: Extend The Data-Driven Strengths Grid

**Files:**
- Modify: `src/main.jsx:4-15`
- Modify: `src/main.jsx:72-108`

- [ ] **Step 1: Add `Languages` to the Lucide import list.**
- [ ] **Step 2: Append these objects to `strengths`.**

```js
  {
    icon: Languages,
    title: '英语沟通与跨文化协作',
    text: 'PTE 四项 7 分 · 大学英语六级 510 分 · 具备英文学习、工作沟通与海外协作能力。',
  },
  {
    icon: Sparkles,
    title: 'AI 应用与快速交付',
    text: '使用生成式 AI 完成短剧内容制作、Vibe Coding 与个人网站搭建，将想法快速转化为可运行的数字作品。',
  },
```

- [ ] **Step 3: Run `npm run check`; expect it to pass.**
- [ ] **Step 4: Commit with `git commit -m "feat: add language and ai strengths"`.**

### Task 3: Verify Layout And Production Build

**Files:** No source changes unless a defect is observed.

- [ ] **Step 1: Run `npm run check`, `npm run perf:check`, `npm run build`, and `git diff --check`; expect all to exit with status `0`.**
- [ ] **Step 2: At desktop width, verify the MagicBento grid contains eight cards, preserves gold hover/particle behavior, and labels the new cards `07` and `08`.**
- [ ] **Step 3: At 390px width, verify the two cards stack in the existing single-column MagicBento layout with no horizontal overflow.**
