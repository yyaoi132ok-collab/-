# Student Success And Official Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a separate University of Tasmania Student Success work-experience card and a Southwest University Westa College official-feature banner that opens the supplied WeChat article.

**Architecture:** The `Profile` section owns education, employment, and institutional recognition. Add an `ExperienceHighlights` component after the education cards, use existing UTAS and SWU gold assets, and extend the Node content guard to protect public facts, safe external-link attributes, and ordering.

**Tech Stack:** React 19, Vite, GSAP ScrollTrigger, Lucide React, CSS, Node verification scripts.

---

## File Structure

- Modify `src/main.jsx` to add `ExperienceHighlights`, render it after `.education-grid`, and add its children to the existing transform-safe GSAP reveal selector.
- Modify `src/styles.css` to define black-and-gold desktop styling and mobile stacking rules.
- Modify `scripts/verify-content.mjs` to verify the public facts, source URL, link attributes, CSS classes, and card ordering.

### Task 1: Add Failing Content Assertions

**Files:**
- Modify: `scripts/verify-content.mjs`

- [ ] **Step 1: Add these checks after the existing USYD emblem check.**

```js
const studentSuccessRequirements = [
  'Student Success Leader', 'Chinese Outreach', 'University of Tasmania', '2022',
  '主动联系需要额外支持的学生', '升学、就业、实习与校园支持资源',
  '中文学生跨文化支持', 'student-success-card',
];
const officialFeatureRequirements = [
  'official-feature-banner', 'OFFICIAL FEATURE / 西南大学西塔学院',
  '海外学子风采｜姚羿：为明天谱写新的可能', '校长激励奖一等奖',
  '2+2 国际培养', '学生组织与协作', '海外升学',
  'https://mp.weixin.qq.com/s/hgu61u2-5xiz6NrdqE1w3Q', 'target="_blank"', 'rel="noreferrer"',
];
for (const requirement of [...studentSuccessRequirements, ...officialFeatureRequirements]) {
  if (!source.includes(requirement)) throw new Error(`Experience highlight is missing: ${requirement}`);
}
if (source.indexOf('student-success-card') > source.indexOf('official-feature-banner')) {
  throw new Error('Student Success must appear before the official feature banner.');
}
for (const confidentialDetail of ['28.64', 'James Chester', 'Fazlinda Kassim']) {
  if (source.includes(confidentialDetail)) throw new Error(`Confidential offer detail published: ${confidentialDetail}`);
}
```

- [ ] **Step 2: Run `npm run check`; expect a non-zero exit with `Experience highlight is missing`.**
- [ ] **Step 3: Commit the red guard.**

```bash
git add scripts/verify-content.mjs
git commit -m "test: cover student success experience content"
```

### Task 2: Add The Separate React Surfaces

**Files:**
- Modify: `src/main.jsx:320-324`
- Modify: `src/main.jsx:467-531`

- [ ] **Step 1: Add `ExperienceHighlights` immediately before `Profile`.**

```jsx
function ExperienceHighlights() {
  return (
    <div className="experience-highlights reveal-item" aria-label="学生工作与官方报道">
      <article className="student-success-card tilt-card">
        <div className="student-success-mark" aria-hidden="true">
          <img src="/assets/education/utas-emblem-gold.png" alt="" loading="lazy" decoding="async" />
        </div>
        <div className="student-success-content">
          <p className="eyebrow">Student Employment</p>
          <h3>Student Success Leader</h3>
          <p className="student-success-meta">University of Tasmania · Chinese Outreach · 2022</p>
          <ul>
            <li>主动联系需要额外支持的学生</li>
            <li>提供升学、就业、实习与校园支持资源的转介</li>
            <li>面向中文学生提供跨文化支持与沟通</li>
          </ul>
        </div>
      </article>
      <a className="official-feature-banner tilt-card" href="https://mp.weixin.qq.com/s/hgu61u2-5xiz6NrdqE1w3Q" target="_blank" rel="noreferrer">
        <div className="official-feature-mark" aria-hidden="true">
          <img src="/assets/education/swu-emblem-gold.png" alt="" loading="lazy" decoding="async" />
        </div>
        <div className="official-feature-copy">
          <p className="eyebrow">OFFICIAL FEATURE / 西南大学西塔学院</p>
          <h3>海外学子风采｜姚羿：为明天谱写新的可能</h3>
          <p>本科阶段的学习表现、学生组织经历与海外升学成果获母校官方公众号专题报道，呈现优秀学子与榜样角色。</p>
          <div className="official-feature-tags" aria-label="报道重点">
            <span>校长激励奖一等奖</span><span>2+2 国际培养</span><span>学生组织与协作</span><span>海外升学</span>
          </div>
        </div>
        <span className="official-feature-action">阅读专题报道 <ArrowUpRight size={18} aria-hidden="true" /></span>
      </a>
    </div>
  );
}
```

- [ ] **Step 2: Render it after education.**

```jsx
      </div>
      <ExperienceHighlights />
    </section>
```

- [ ] **Step 3: Replace the GSAP selector with the following.**

```js
const cards = section.querySelectorAll(
  '.profile-grid > *, .education-grid, .experience-highlights > *, .project-card, .magic-bento-card, .closing-actions',
);
```

- [ ] **Step 4: Run `npm run check`; expect source assertions to pass.**
- [ ] **Step 5: Commit the React work.**

```bash
git add src/main.jsx
git commit -m "feat: add student success and official feature content"
```

### Task 3: Add Black-And-Gold Styling And CSS Guard

**Files:**
- Modify: `scripts/verify-content.mjs`
- Modify: `src/styles.css` after `.education-card strong` and inside `@media (max-width: 768px)`

- [ ] **Step 1: Add this CSS-class guard.**

```js
for (const className of [
  '.experience-highlights', '.student-success-card', '.official-feature-banner',
  '.official-feature-tags', '.official-feature-action',
]) {
  if (!styles.includes(className)) throw new Error(`Experience visual treatment is missing: ${className}`);
}
```

- [ ] **Step 2: Run `npm run check`; expect `Experience visual treatment is missing`.**

- [ ] **Step 3: Add desktop styling with this structural shape.**

```css
.experience-highlights { display: grid; gap: 18px; margin-top: 18px; }
.student-success-card, .official-feature-banner {
  position: relative; isolation: isolate; overflow: hidden;
  border: 1px solid rgba(215, 181, 109, 0.22);
  background: radial-gradient(circle at 76% 34%, rgba(215,181,109,.16), transparent 34%), linear-gradient(90deg, rgba(215,181,109,.08) 1px, transparent 1px), linear-gradient(rgba(215,181,109,.08) 1px, transparent 1px), #090b0e;
  background-size: auto, 56px 56px, 56px 56px, auto;
}
.student-success-card { display: grid; grid-template-columns: minmax(180px,.34fr) minmax(0,1fr); min-height: 300px; }
.student-success-mark, .official-feature-mark { display: grid; place-items: center; padding: 34px; }
.student-success-mark img, .official-feature-mark img { width: min(100%,220px); max-height: 180px; object-fit: contain; filter: drop-shadow(0 14px 28px rgba(215,181,109,.2)); }
.student-success-content, .official-feature-copy { position: relative; z-index: 1; padding: 38px; }
.student-success-content h3, .official-feature-copy h3 { margin: 10px 0 12px; color: #f2f8fb; font-size: clamp(28px,3vw,46px); line-height: 1.08; }
.student-success-meta, .official-feature-copy > p:not(.eyebrow) { margin: 0; color: var(--muted); line-height: 1.7; }
.student-success-content ul { display: grid; gap: 10px; margin: 24px 0 0; padding: 0; color: #cbd6df; list-style: none; }
.student-success-content li::before { margin-right: 10px; color: var(--accent); content: "01"; font-variant-numeric: tabular-nums; }
.student-success-content li:nth-child(2)::before { content: "02"; }
.student-success-content li:nth-child(3)::before { content: "03"; }
.official-feature-banner { display: grid; grid-template-columns: minmax(170px,.25fr) minmax(0,1fr) auto; align-items: stretch; min-height: 340px; color: inherit; text-decoration: none; cursor: pointer; }
.official-feature-banner:hover { border-color: rgba(215,181,109,.68); }
.official-feature-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
.official-feature-tags span { border: 1px solid rgba(215,181,109,.22); padding: 8px 10px; color: #d7b56d; font-size: 13px; }
.official-feature-action { display: inline-flex; align-items: center; gap: 10px; align-self: end; padding: 28px; color: #fff1c7; white-space: nowrap; }
```

- [ ] **Step 4: Add mobile rules inside the existing 768px query.**

```css
.student-success-card, .official-feature-banner { grid-template-columns: 1fr; }
.student-success-mark, .official-feature-mark { min-height: 170px; padding: 28px 28px 0; }
.student-success-content, .official-feature-copy { padding: 28px; }
.official-feature-action { justify-content: flex-start; padding: 0 28px 28px; }
```

- [ ] **Step 5: Verify, then commit the completed styling and guard.**

```bash
npm run check
npm run perf:check
npm run build
git diff --check
git add src/styles.css scripts/verify-content.mjs
git commit -m "feat: style experience recognition highlights"
```

Expected: the four verification commands exit with status `0` before the commit.

### Task 4: Verify The Running Site

**Files:** No source changes unless a visual defect is observed.

- [ ] **Step 1: Run `npm run dev -- --port 4174`.**
- [ ] **Step 2: At 1440px width, verify the order is education, Student Success, official feature, then project heading. Confirm title, tags, gold emblems, and GSAP reveal.**
- [ ] **Step 3: At 390px width, verify the cards stack, tags wrap, the external-link action remains visible, and no horizontal scrolling occurs.**
- [ ] **Step 4: Inspect the anchor and confirm the WeChat URL, `target="_blank"`, and `rel="noreferrer"`. WeChat login is not required.**
- [ ] **Step 5: If a visual correction is required, repeat Task 3 verification and commit with `git commit -m "fix: refine experience highlight layout"`.**
