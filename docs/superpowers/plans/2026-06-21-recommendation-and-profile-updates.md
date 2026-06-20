# Recommendation And Profile Updates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a clickable Sydney Business School recommendation-letter card before Student Success, update profile wording and label, and add a cross-cultural collaboration strength card.

**Architecture:** Copy the original PDF into `public/assets/references/` so Vite serves it unchanged. Extend `ExperienceHighlights` with a first-card reference anchor, retain Student Success as a separate employment card, and add one object to the existing MagicBento strengths data. The content guard validates the PDF asset, link safety, required wording, and visual classes.

**Tech Stack:** React 19, Vite public assets, Lucide React, CSS, Node verification scripts.

---

### Task 1: Add A Failing Content Guard

**Files:**
- Modify: `scripts/verify-content.mjs`

- [ ] **Step 1: Require `public/assets/references/steven-hitchcock-recommendation.pdf`, `reference-letter-card`, `Dr Steven Hitchcock 推荐信`, the PDF URL, `海外学生工作`, `我是悉尼大学 Business School 的 Data Analytics 硕士`, and `跨文化团队协作`.**
- [ ] **Step 2: Run `npm run check`; expect failure before the implementation exists.**
- [ ] **Step 3: Commit with `git commit -m "test: cover recommendation and profile updates"`.**

### Task 2: Add The PDF Asset And React Content

**Files:**
- Create: `public/assets/references/steven-hitchcock-recommendation.pdf`
- Modify: `src/main.jsx`

- [ ] **Step 1: Copy the supplied PDF unchanged into the public asset path.**
- [ ] **Step 2: Add a `reference-letter-card` anchor before `.student-success-card`, opening `/assets/references/steven-hitchcock-recommendation.pdf` in a new tab with `rel="noreferrer"`.**
- [ ] **Step 3: Include the academic reference title, 2023 date, BWIL6215 International Industry Placement Program, and concise public assessment of analysis, communication, professionalism, and international adaptation.**
- [ ] **Step 4: Add `海外学生工作` before the Student Success title and replace the profile lead with `我是悉尼大学 Business School 的 Data Analytics 硕士...`.**
- [ ] **Step 5: Append a `UsersRound`-icon strength titled `跨文化团队协作`, using the confirmed international-team collaboration copy.**
- [ ] **Step 6: Run `npm run check`; expect pass, then commit with `git commit -m "feat: add recommendation and collaboration highlights"`.**

### Task 3: Style And Verify

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Add reference card styling matching the black-gold grid system and mobile rules that stack it with the other experience cards.**
- [ ] **Step 2: Run `npm run check`, `npm run perf:check`, `npm run build`, and `git diff --check`; expect every command to exit `0`.**
- [ ] **Step 3: Verify at desktop and 390px mobile that the reference card appears above Student Success, labels remain readable, and the PDF anchor opens a new tab.**
