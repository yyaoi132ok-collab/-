# Data Analytics Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished Chinese data analytics portfolio site for 姚羿 Yi Yao with a dashboard-like homepage and four case-study sections.

**Architecture:** Use a static single-page site so the first version is easy to open locally, deploy to GitHub Pages/Vercel, and edit without framework overhead. Content lives in `src/data.js`, rendering logic in `src/app.js`, styling in `src/styles.css`, and public images under `public/assets/projects/`.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Python static server for preview, Poppler/Office extraction utilities for assets, Node script for content checks.

---

## File Structure

Create or modify these files:

- Create `.gitignore`: ignore scratch assets, OS metadata, and generated local files.
- Create `index.html`: static shell, metadata, navigation anchors, app root.
- Create `src/data.js`: all portfolio copy, metrics, projects, skills, education, and contact data.
- Create `src/app.js`: render homepage sections and project details from `portfolioData`.
- Create `src/styles.css`: responsive data-product visual system.
- Create `scripts/verify-content.mjs`: lightweight regression check for required text, sections, and local asset references.
- Create `public/assets/projects/.gitkeep`: keeps asset directory in git before images are copied.
- Create `public/assets/projects/credit/`: selected credit risk project figures.
- Create `public/assets/projects/enpak/`: selected Enpak slide/chart images.
- Create `public/assets/projects/unicef/`: selected UNICEF report figures.
- Create `public/assets/projects/aedc/`: selected AEDC report/notebook figures.

Existing files:

- Read: `docs/superpowers/specs/2026-06-19-data-analytics-portfolio-design.md`
- Leave alone: `tmp/` scratch extraction files unless copying selected public assets out of them.

## Task 1: Repository Hygiene And Directories

**Files:**
- Create: `.gitignore`
- Create: `public/assets/projects/.gitkeep`
- Create directories: `src/`, `scripts/`, `public/assets/projects/{enpak,credit,unicef,aedc}`

- [ ] **Step 1: Create `.gitignore`**

Use this exact content:

```gitignore
.DS_Store
**/.DS_Store
tmp/
node_modules/
.env
.env.*
*.log
```

- [ ] **Step 2: Create site directories**

Run:

```bash
mkdir -p src scripts public/assets/projects/enpak public/assets/projects/credit public/assets/projects/unicef public/assets/projects/aedc
touch public/assets/projects/.gitkeep
```

Expected: the directories exist and `public/assets/projects/.gitkeep` is present.

- [ ] **Step 3: Verify tracked scope**

Run:

```bash
git status --short
```

Expected: `.gitignore` and `public/assets/projects/.gitkeep` appear as untracked; `tmp/` no longer appears after `.gitignore` is created.

- [ ] **Step 4: Commit**

Run:

```bash
git add .gitignore public/assets/projects/.gitkeep
git commit -m "chore: set up portfolio workspace"
```

Expected: commit succeeds.

## Task 2: Portfolio Content Data

**Files:**
- Create: `src/data.js`
- Test: `scripts/verify-content.mjs` will be added in Task 6.

- [ ] **Step 1: Create `src/data.js`**

Use this complete initial data module:

```javascript
export const portfolioData = {
  person: {
    name: "姚羿 Yi Yao",
    title: "数据分析作品集",
    browserTitle: "Yi Yao | Data Analytics Portfolio",
    tagline: "用数据建模、可视化和业务判断，把复杂问题转化为可执行决策。",
    summary:
      "悉尼大学商学院数据分析硕士，关注商业增长、金融风控、空间数据分析和数据可视化。作品集展示从多源数据治理、特征工程、预测建模到业务建议的完整分析链路。",
    tags: ["Business Analytics", "Machine Learning", "Data Visualization"],
    email: "1220210595@qq.com"
  },
  impact: [
    { value: "4", label: "端到端分析项目", note: "覆盖商业增长、风控、公共政策和上线策略" },
    { value: "800K+", label: "信贷样本建模", note: "阿里天池信贷违约预测项目" },
    { value: "62K+", label: "捐赠会话分析", note: "UNICEF Australia 在线捐赠数据" },
    { value: "0.7187", label: "风控模型 AUC", note: "内部时序 holdout 结果" },
    { value: "2.23x", label: "Top10% 风险 Lift", note: "高风险客群坏账率提升倍数" },
    { value: "SARIMA", label: "市场活动预测", note: "Enpak NYC launch 12 个月趋势预测" }
  ],
  projects: [
    {
      id: "enpak",
      title: "Enpak Social | 纽约市场情报与上线策略分析",
      domain: "市场情报 / 上线策略 / 时间序列预测",
      period: "2026.01 - 2026.03",
      featuredMetric: "Manhattan + Brooklyn pilot",
      summary:
        "在缺少内部行为数据的上线前阶段，使用公开数据构建社区参与度指标和收入机会矩阵，识别纽约优先投放区域。",
      businessQuestion:
        "Enpak 在 NYC 上线前如何判断哪些 borough 和社区更适合优先投放、商业化和后续扩张？",
      role:
        "负责外部公开数据整合、KPI 框架设计、Community Engagement Index 建模、SARIMA 活动趋势预测、Revenue Opportunity Matrix 和上线策略汇报。",
      dataMethods: [
        "整合人口、收入、教育水平、商业密度、历史活动等公开数据",
        "标准化 Event Density、Business Density、Population Density、Income、Education 指标",
        "构建 Community Engagement Index 和 Revenue Opportunity Matrix",
        "使用 SARIMA 进行 12 个月活动趋势预测"
      ],
      insights: [
        { value: "Tier 1", label: "Manhattan", text: "即时商业化核心，高密度、高收入、高商业集中度。" },
        { value: "Tier 2", label: "Brooklyn", text: "增长扩展区，年轻用户与活动潜力强。" },
        { value: "MAE 71.36", label: "SARIMA 验证", text: "活动趋势预测 RMSE 为 105.56，用于辅助 launch timing 判断。" }
      ],
      recommendations: [
        "先做 Manhattan + Brooklyn pilot，验证高价值区域的获客与商业化假设。",
        "短期聚焦 Manhattan premium advertiser acquisition。",
        "中期扩展 Brooklyn youth-centered engagement，长期布局 Queens multilingual expansion。"
      ],
      tags: ["Market Intelligence", "KPI Design", "SARIMA", "Strategy Deck"],
      charts: []
    },
    {
      id: "credit",
      title: "阿里天池信贷风控项目 | 违约预测与风险分层",
      domain: "金融风控 / 二分类建模 / 风险分层",
      period: "2026.06",
      featuredMetric: "AUC 0.7187",
      summary:
        "基于阿里天池信贷违约数据集，完成从数据预处理、特征工程、模型训练到风险分层和业务阈值建议的完整风控建模流程。",
      businessQuestion:
        "如何在贷前审批场景中提前识别高违约风险用户，并把模型分数转化为可执行的人工复核和风险定价策略？",
      role:
        "负责数据清洗、特征工程、LightGBM/XGBoost/CatBoost 等模型比较、时序 holdout 评估、TopN 风险分层、特征重要性解释和 Streamlit dashboard 交付。",
      dataMethods: [
        "按 issueDate 进行 train/valid/holdout 时序切分，避免用未来数据评估过去模型",
        "构建 181 个建模特征，包括收入、负债、信用历史、地区和交互特征",
        "比较 Logistic Regression、Random Forest、XGBoost、LightGBM、CatBoost 与加权投票模型",
        "以 AUC、KS、Recall@TopN、Precision@TopN 和 Lift 作为核心业务指标"
      ],
      insights: [
        { value: "0.7187", label: "Holdout AUC", text: "最终主模型 TunedLightGBM_final 在内部时序 holdout 上的排序能力。" },
        { value: "0.3209", label: "KS", text: "反映模型区分违约与正常客户的能力。" },
        { value: "44.42%", label: "Top10% 坏账率", text: "高风险前 10% 客群覆盖 22.29% 坏账样本，Lift 为 2.23。" }
      ],
      recommendations: [
        "将模型用于贷前风险排序、人工复核名单生成和风险定价辅助。",
        "不要把模型作为单一自动拒绝规则，避免业务和合规风险。",
        "以时间后置 holdout 表现作为主要泛化评估口径，持续监控样本漂移。"
      ],
      tags: ["LightGBM", "Risk Segmentation", "Feature Engineering", "Dashboard"],
      charts: [
        {
          src: "public/assets/projects/credit/final_feature_importance_top15.png",
          alt: "信贷风控模型 Top15 特征重要性",
          caption: "模型特征重要性显示，邮编编码、收入、循环余额和信用历史是关键风险信号。"
        },
        {
          src: "public/assets/projects/credit/holdout_score_band_bad_rate.png",
          alt: "Holdout 风险分层坏账率",
          caption: "预测分数越高的风险分层坏账率越高，说明模型具备可用于业务排序的能力。"
        },
        {
          src: "public/assets/projects/credit/threshold_strategy_curve.png",
          alt: "风险阈值策略曲线",
          caption: "阈值曲线用于在坏账覆盖和人工复核资源之间做取舍。"
        }
      ]
    },
    {
      id: "unicef",
      title: "UNICEF Australia | 在线捐赠行为与 Ask Ladder 优化",
      domain: "增长分析 / 捐赠转化 / 回归建模",
      period: "2026.02",
      featuredMetric: "62,591 sessions",
      summary:
        "分析 UNICEF Australia 在线捐赠会话，识别影响捐赠金额的渠道、页面、设备和 ask-ladder 因素，并提出分层建议捐赠金额策略。",
      businessQuestion:
        "如何根据会话来源、页面意图、设备环境和建议捐赠金额，为不同用户场景设计更有效的 ask ladder？",
      role:
        "负责数据清洗、特征工程、EDA、多模型比较、stacking 建模、ask-ladder simulation 和业务建议输出。",
      dataMethods: [
        "处理 62,591 条 donation session 和 25 个原始字段",
        "构造 ask structure、page intent、traffic attribution、time context、device/platform 和 geography 特征组",
        "比较 OLS、Ridge、Lasso、Elastic Net、Random Forest、XGBoost、LightGBM、CatBoost 和 stacking",
        "结合模型结果与业务分层进行 ask-ladder simulation"
      ],
      insights: [
        { value: "0.9642", label: "RMSE_log", text: "Stacking 模型取得最佳整体表现。" },
        { value: "AUD 116.36", label: "RMSE_actual", text: "原始金额尺度上的预测误差，反映捐赠金额本身波动较大。" },
        { value: "80/105/230", label: "通用 ladder", text: "适合作为多数 cohort 的 one-time baseline ask ladder。" }
      ],
      recommendations: [
        "从固定捐赠模板转向 segmented, context-aware ask ladders。",
        "高意向用户可测试 AUD 100/135/435 的更高 ladder。",
        "Mobile/iOS 用户使用 AUD 70/95/220 的低门槛 ladder，降低转化阻力。"
      ],
      tags: ["EDA", "Regression", "Stacking", "Growth Analytics"],
      charts: []
    },
    {
      id: "aedc",
      title: "AEDC 教育照护分析 | 空间可达性与发展脆弱性分析",
      domain: "空间数据 / 公共政策 / 多源数据整合",
      period: "2026.02",
      featuredMetric: "Pearson r = -0.787",
      summary:
        "整合 AEDC、SEIFA、教育服务、Google Reviews 和学前教育数据，分析儿童发展脆弱性与社会经济劣势、交通可达性和服务质量的关系。",
      businessQuestion:
        "哪些地区儿童发展脆弱性更高？这些地区的风险是否与社会经济劣势、交通可达性和服务质量波动重叠？",
      role:
        "负责多源数据清洗、LGA/service/postcode 多粒度聚合、空间 join、相关分析、地图与趋势可视化、政策建议总结。",
      dataMethods: [
        "整合 AEDC、SEIFA、Education Services、Google Reviews 和 Preschool Education 数据",
        "将 service-level 和 postcode-level 数据聚合到 LGA 视角进行比较",
        "构建 DV2、SEIFA IRSD、公共交通距离、NQS 服务质量和 Google review sentiment 指标",
        "使用地图、散点图、分层图和关键词网络解释区域差异"
      ],
      insights: [
        { value: "74.5%", label: "MacDonnell DV2", text: "显著高于全国 LGA 中位数 11.3%。" },
        { value: "-0.787", label: "SEIFA vs DV2", text: "SEIFA IRSD 与 DV2 强负相关，说明发展脆弱性呈现社会经济梯度。" },
        { value: "0.341", label: "交通距离 vs DV2", text: "公共交通距离与 DV2 正相关，高风险地区也面临可达性劣势。" }
      ],
      recommendations: [
        "资源分配不应只看服务数量，应优先识别 high DV2、low SEIFA、long transport distance 和 weaker service quality 的重叠区域。",
        "建议提供交通补贴、mobile outreach hubs 和 targeted quality-improvement grants。",
        "将 Google Reviews 作为早期预警工具，而不是替代 NQS 或 AEDC 的正式质量指标。"
      ],
      tags: ["Spatial Analytics", "Policy Insight", "Geo Join", "Data Visualization"],
      charts: []
    }
  ],
  skills: [
    {
      group: "数据治理",
      items: ["多源数据整合", "缺失值处理", "异常值检查", "标准化", "分层聚合"]
    },
    {
      group: "业务分析",
      items: ["KPI 框架", "用户/风险分层", "增长建议", "策略矩阵", "政策优先级"]
    },
    {
      group: "建模预测",
      items: ["LightGBM", "XGBoost", "CatBoost", "Random Forest", "Regression", "SARIMA"]
    },
    {
      group: "可视化表达",
      items: ["Dashboard", "地图", "趋势图", "指标卡", "模型评估图"]
    },
    {
      group: "工具",
      items: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "Scikit-learn", "Jupyter Notebook", "Excel", "MATLAB"]
    }
  ],
  education: [
    "悉尼大学 | 商学院硕士 数据分析 | 2025.02 - 2026.11",
    "塔斯马尼亚大学 | 工程学院荣誉学士 电子工程（交换） | 2022.02 - 2023.06",
    "西南大学 | 学士 电子信息工程 | 2019.09 - 2023.07"
  ],
  experience: [
    "Enpak Social | 数据分析实习生 | 2026.01 - 2026.03",
    "Tasmania | Student Success Leader | 2022.12 - 2023.10"
  ]
};
```

- [ ] **Step 2: Verify syntax**

Run:

```bash
node --check src/data.js
```

Expected: no syntax errors.

- [ ] **Step 3: Commit**

Run:

```bash
git add src/data.js
git commit -m "content: add portfolio case study data"
```

Expected: commit succeeds.

## Task 3: HTML Shell And Rendering

**Files:**
- Create: `index.html`
- Create: `src/app.js`
- Modify later: `src/styles.css`

- [ ] **Step 1: Create `index.html`**

Use this HTML:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Yi Yao | Data Analytics Portfolio</title>
    <meta
      name="description"
      content="姚羿 Yi Yao 的数据分析作品集，展示商业增长、金融风控、空间数据和可视化项目。"
    />
    <link rel="stylesheet" href="src/styles.css" />
  </head>
  <body>
    <header class="site-header" aria-label="主导航">
      <a class="brand" href="#top">姚羿 Yi Yao</a>
      <nav class="nav-links">
        <a href="#projects">项目</a>
        <a href="#skills">能力</a>
        <a href="#experience">经历</a>
        <a href="#contact">联系</a>
      </nav>
    </header>
    <main id="top">
      <div id="app"></div>
    </main>
    <script type="module" src="src/app.js"></script>
  </body>
</html>
```

- [ ] **Step 2: Create `src/app.js`**

Use this rendering module:

```javascript
import { portfolioData } from "./data.js";

const app = document.querySelector("#app");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderTags(tags) {
  return tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
}

function renderHero(data) {
  const tags = renderTags(data.person.tags);
  return `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">Data Analytics Portfolio</p>
        <h1 id="hero-title">${escapeHtml(data.person.name)}</h1>
        <p class="hero-tagline">${escapeHtml(data.person.tagline)}</p>
        <p class="hero-summary">${escapeHtml(data.person.summary)}</p>
        <div class="tag-row">${tags}</div>
        <div class="hero-actions">
          <a class="button primary" href="#projects">查看项目</a>
          <a class="button secondary" href="#contact">联系我</a>
        </div>
      </div>
      <aside class="hero-panel" aria-label="作品集摘要">
        <p class="panel-label">Selected Impact</p>
        <div class="mini-metrics">
          ${data.impact
            .slice(0, 4)
            .map(
              (metric) => `
                <div>
                  <strong>${escapeHtml(metric.value)}</strong>
                  <span>${escapeHtml(metric.label)}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </aside>
    </section>
  `;
}

function renderImpact(metrics) {
  return `
    <section class="section impact-section" aria-labelledby="impact-title">
      <div class="section-heading">
        <p class="eyebrow">Selected Impact</p>
        <h2 id="impact-title">用指标快速证明项目深度</h2>
      </div>
      <div class="metric-grid">
        ${metrics
          .map(
            (metric) => `
              <article class="metric-card">
                <strong>${escapeHtml(metric.value)}</strong>
                <span>${escapeHtml(metric.label)}</span>
                <p>${escapeHtml(metric.note)}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderProjectCard(project) {
  return `
    <article class="project-card">
      <div>
        <p class="project-domain">${escapeHtml(project.domain)}</p>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.summary)}</p>
      </div>
      <div class="project-card-footer">
        <strong>${escapeHtml(project.featuredMetric)}</strong>
        <a href="#case-${escapeHtml(project.id)}">查看详情</a>
      </div>
      <div class="tag-row">${renderTags(project.tags)}</div>
    </article>
  `;
}

function renderProjects(projects) {
  return `
    <section class="section" id="projects" aria-labelledby="projects-title">
      <div class="section-heading">
        <p class="eyebrow">Case Studies</p>
        <h2 id="projects-title">四个能支撑面试追问的分析项目</h2>
        <p>每个项目都围绕业务问题展开，展示数据来源、方法、关键结果和可执行建议。</p>
      </div>
      <div class="project-grid">
        ${projects.map(renderProjectCard).join("")}
      </div>
    </section>
  `;
}

function renderChartGallery(project) {
  if (!project.charts.length) {
    return `<p class="muted">图表将在脱敏整理后加入；当前先展示方法、指标和业务结论。</p>`;
  }

  return `
    <div class="chart-grid">
      ${project.charts
        .map(
          (chart) => `
            <figure class="chart-card">
              <img src="${escapeHtml(chart.src)}" alt="${escapeHtml(chart.alt)}" loading="lazy" />
              <figcaption>${escapeHtml(chart.caption)}</figcaption>
            </figure>
          `
        )
        .join("")}
    </div>
  `;
}

function renderCaseStudy(project) {
  return `
    <section class="case-study" id="case-${escapeHtml(project.id)}" aria-labelledby="${escapeHtml(project.id)}-title">
      <div class="case-header">
        <p class="eyebrow">${escapeHtml(project.period)}</p>
        <h2 id="${escapeHtml(project.id)}-title">${escapeHtml(project.title)}</h2>
        <p>${escapeHtml(project.summary)}</p>
        <div class="tag-row">${renderTags(project.tags)}</div>
      </div>
      <div class="case-layout">
        <div class="case-main">
          <h3>业务问题</h3>
          <p>${escapeHtml(project.businessQuestion)}</p>
          <h3>我的角色</h3>
          <p>${escapeHtml(project.role)}</p>
          <h3>数据与方法</h3>
          <ul>
            ${project.dataMethods.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
          <h3>业务建议</h3>
          <ul>
            ${project.recommendations.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </div>
        <aside class="insight-panel">
          <h3>关键发现</h3>
          ${project.insights
            .map(
              (insight) => `
                <div class="insight-card">
                  <strong>${escapeHtml(insight.value)}</strong>
                  <span>${escapeHtml(insight.label)}</span>
                  <p>${escapeHtml(insight.text)}</p>
                </div>
              `
            )
            .join("")}
        </aside>
      </div>
      <div class="case-charts">
        <h3>图表展示</h3>
        ${renderChartGallery(project)}
      </div>
    </section>
  `;
}

function renderSkills(data) {
  return `
    <section class="section" id="skills" aria-labelledby="skills-title">
      <div class="section-heading">
        <p class="eyebrow">Capability Matrix</p>
        <h2 id="skills-title">分析能力矩阵</h2>
      </div>
      <div class="skill-grid">
        ${data.skills
          .map(
            (skillGroup) => `
              <article class="skill-card">
                <h3>${escapeHtml(skillGroup.group)}</h3>
                <div class="tag-row">${renderTags(skillGroup.items)}</div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderExperience(data) {
  return `
    <section class="section experience-section" id="experience" aria-labelledby="experience-title">
      <div class="section-heading">
        <p class="eyebrow">Background</p>
        <h2 id="experience-title">教育与经历</h2>
      </div>
      <div class="timeline-grid">
        <article>
          <h3>教育背景</h3>
          <ul>${data.education.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </article>
        <article>
          <h3>经历</h3>
          <ul>${data.experience.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </article>
      </div>
    </section>
  `;
}

function renderContact(data) {
  return `
    <section class="section contact-section" id="contact" aria-labelledby="contact-title">
      <div>
        <p class="eyebrow">Contact</p>
        <h2 id="contact-title">联系我</h2>
        <p>如果你希望进一步了解项目细节、面试讨论或数据分析岗位机会，可以通过邮箱联系。</p>
      </div>
      <a class="button primary" href="mailto:${escapeHtml(data.person.email)}">${escapeHtml(data.person.email)}</a>
    </section>
  `;
}

function renderApp(data) {
  document.title = data.person.browserTitle;
  app.innerHTML = [
    renderHero(data),
    renderImpact(data.impact),
    renderProjects(data.projects),
    ...data.projects.map(renderCaseStudy),
    renderSkills(data),
    renderExperience(data),
    renderContact(data)
  ].join("");
}

renderApp(portfolioData);
```

- [ ] **Step 3: Verify JavaScript syntax**

Run:

```bash
node --check src/app.js
```

Expected: no syntax errors.

- [ ] **Step 4: Commit**

Run:

```bash
git add index.html src/app.js
git commit -m "feat: render portfolio content"
```

Expected: commit succeeds.

## Task 4: Visual System And Responsive Layout

**Files:**
- Create: `src/styles.css`

- [ ] **Step 1: Create `src/styles.css`**

Use this complete stylesheet:

```css
:root {
  color-scheme: light;
  --bg: #f6f8fb;
  --surface: #ffffff;
  --surface-strong: #eef3f8;
  --ink: #17202a;
  --muted: #5f6f7f;
  --line: #d9e2ea;
  --accent: #167a7f;
  --accent-strong: #0d565a;
  --blue: #235b9f;
  --green: #357a38;
  --shadow: 0 18px 50px rgba(20, 35, 50, 0.09);
  --radius: 8px;
  font-family: Inter, "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  line-height: 1.65;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 14px clamp(20px, 4vw, 56px);
  border-bottom: 1px solid rgba(217, 226, 234, 0.88);
  background: rgba(246, 248, 251, 0.92);
  backdrop-filter: blur(16px);
}

.brand {
  font-weight: 800;
  letter-spacing: 0;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 18px;
  color: var(--muted);
  font-size: 14px;
}

.nav-links a:hover {
  color: var(--accent-strong);
}

main {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.65fr);
  gap: 28px;
  align-items: stretch;
  min-height: calc(100vh - 72px);
  padding: 76px 0 42px;
}

.hero-copy,
.hero-panel,
.section,
.case-study {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow);
}

.hero-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(28px, 5vw, 56px);
}

.eyebrow {
  margin: 0 0 10px;
  color: var(--accent-strong);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 18px;
  font-size: clamp(42px, 8vw, 86px);
  line-height: 1.02;
  letter-spacing: 0;
}

h2 {
  margin-bottom: 12px;
  font-size: clamp(26px, 4vw, 42px);
  line-height: 1.16;
  letter-spacing: 0;
}

h3 {
  margin-bottom: 10px;
  font-size: 18px;
  line-height: 1.3;
  letter-spacing: 0;
}

.hero-tagline {
  max-width: 780px;
  margin-bottom: 16px;
  font-size: clamp(20px, 3vw, 30px);
  line-height: 1.35;
  font-weight: 700;
}

.hero-summary,
.section-heading p,
.project-card p,
.case-header p,
.contact-section p,
.muted {
  color: var(--muted);
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 4px 9px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface-strong);
  color: #34495a;
  font-size: 13px;
  font-weight: 650;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 10px 16px;
  border: 1px solid var(--accent);
  border-radius: var(--radius);
  font-weight: 800;
}

.button.primary {
  background: var(--accent);
  color: white;
}

.button.secondary {
  color: var(--accent-strong);
}

.hero-panel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 28px;
  background:
    linear-gradient(180deg, rgba(22, 122, 127, 0.08), rgba(35, 91, 159, 0.04)),
    var(--surface);
}

.panel-label {
  color: var(--muted);
  font-weight: 800;
}

.mini-metrics,
.metric-grid,
.project-grid,
.skill-grid,
.timeline-grid,
.chart-grid {
  display: grid;
  gap: 16px;
}

.mini-metrics {
  grid-template-columns: 1fr;
}

.mini-metrics div,
.metric-card,
.project-card,
.skill-card,
.timeline-grid article,
.insight-card,
.chart-card {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #fbfcfe;
}

.mini-metrics div {
  padding: 18px;
}

.mini-metrics strong,
.metric-card strong,
.insight-card strong,
.project-card-footer strong {
  display: block;
  color: var(--accent-strong);
  font-size: 28px;
  line-height: 1;
}

.mini-metrics span,
.metric-card span,
.insight-card span {
  display: block;
  margin-top: 8px;
  color: var(--ink);
  font-weight: 800;
}

.section,
.case-study {
  margin: 24px 0;
  padding: clamp(22px, 4vw, 36px);
}

.section-heading {
  max-width: 760px;
  margin-bottom: 24px;
}

.metric-grid {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}

.metric-card {
  min-height: 148px;
  padding: 18px;
}

.metric-card p,
.insight-card p {
  margin: 10px 0 0;
  color: var(--muted);
  font-size: 14px;
}

.project-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.project-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 310px;
  padding: 22px;
}

.project-domain {
  color: var(--blue);
  font-size: 13px;
  font-weight: 800;
}

.project-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 20px 0 14px;
}

.project-card-footer a {
  color: var(--accent-strong);
  font-weight: 800;
}

.case-header {
  max-width: 880px;
  margin-bottom: 28px;
}

.case-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);
  gap: 22px;
}

.case-main,
.insight-panel {
  min-width: 0;
}

.case-main ul,
.timeline-grid ul {
  padding-left: 20px;
}

.insight-panel {
  display: grid;
  align-content: start;
  gap: 12px;
}

.insight-card {
  padding: 16px;
}

.case-charts {
  margin-top: 28px;
}

.chart-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.chart-card {
  overflow: hidden;
}

.chart-card img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: contain;
  background: #f1f5f8;
}

.chart-card figcaption {
  padding: 12px;
  color: var(--muted);
  font-size: 14px;
}

.skill-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.skill-card {
  padding: 18px;
}

.timeline-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.timeline-grid article {
  padding: 20px;
}

.contact-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 64px;
}

@media (max-width: 980px) {
  .hero,
  .case-layout,
  .timeline-grid,
  .contact-section {
    grid-template-columns: 1fr;
  }

  .hero {
    min-height: auto;
  }

  .metric-grid,
  .skill-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .chart-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .nav-links {
    width: 100%;
    justify-content: space-between;
    gap: 8px;
  }

  .hero {
    padding-top: 34px;
  }

  .metric-grid,
  .project-grid,
  .skill-grid {
    grid-template-columns: 1fr;
  }

  .project-card {
    min-height: auto;
  }
}
```

- [ ] **Step 2: Start local server**

Run:

```bash
python3 -m http.server 4173
```

Expected: server prints `Serving HTTP on :: port 4173` or equivalent and keeps running.

- [ ] **Step 3: Browser smoke check**

Open `http://127.0.0.1:4173` in the in-app browser. Verify:

- Hero is visible.
- Navigation links scroll to sections.
- No text overlaps at desktop width.
- Project cards render four projects.

- [ ] **Step 4: Commit**

Stop the server with `Ctrl-C`, then run:

```bash
git add src/styles.css
git commit -m "style: add data product portfolio layout"
```

Expected: commit succeeds.

## Task 5: Public Chart Assets

**Files:**
- Create selected images under:
  - `public/assets/projects/credit/`
  - `public/assets/projects/enpak/`
  - `public/assets/projects/unicef/`
  - `public/assets/projects/aedc/`
- Modify: `src/data.js` chart arrays for projects where assets are available.

- [ ] **Step 1: Copy credit risk figures**

Run:

```bash
cp "tmp/credit_project/第六阶段_最终交付物/04_输出结果/final_project_outputs/figures/final_feature_importance_top15.png" public/assets/projects/credit/final_feature_importance_top15.png
cp "tmp/credit_project/第六阶段_最终交付物/04_输出结果/final_project_outputs/figures/holdout_score_band_bad_rate.png" public/assets/projects/credit/holdout_score_band_bad_rate.png
cp "tmp/credit_project/第六阶段_最终交付物/04_输出结果/final_project_outputs/figures/threshold_strategy_curve.png" public/assets/projects/credit/threshold_strategy_curve.png
```

Expected: all three files exist under `public/assets/projects/credit/`.

- [ ] **Step 2: Extract Enpak slide images to scratch**

Run:

```bash
mkdir -p tmp/enpak_assets
python3 - <<'PY'
from zipfile import ZipFile
from pathlib import Path
src = Path("/Users/yyaoi001/Desktop/重要文件电子版/美国实习/Enpak/Enpak Ready Launch Strategy.pptx")
out = Path("tmp/enpak_assets")
with ZipFile(src) as z:
    for name in z.namelist():
        if name.startswith("ppt/media/") and not name.endswith("/"):
            target = out / Path(name).name
            target.write_bytes(z.read(name))
            print(target)
PY
find tmp/enpak_assets -type f | sed -n '1,40p'
```

Expected: image files are extracted into `tmp/enpak_assets/`.

- [ ] **Step 3: Select Enpak public images**

Open thumbnails with Finder or use `file tmp/enpak_assets/*`. Copy 2-3 useful, non-sensitive images into stable names:

```bash
cp tmp/enpak_assets/image1.png public/assets/projects/enpak/market-overview.png
cp tmp/enpak_assets/image2.png public/assets/projects/enpak/event-heatmap.png
cp tmp/enpak_assets/image3.png public/assets/projects/enpak/forecast.png
```

Expected: if `image1.png`, `image2.png`, or `image3.png` are not the right figures, choose the correct extracted images but keep the destination names above.

- [ ] **Step 4: Extract UNICEF report figures**

Run:

```bash
mkdir -p tmp/unicef_assets
python3 - <<'PY'
from zipfile import ZipFile
from pathlib import Path
src = Path("/Users/yyaoi001/Desktop/6600/final/QBUS6600_Group_Assignment_Report.docx")
out = Path("tmp/unicef_assets")
with ZipFile(src) as z:
    for name in z.namelist():
        if name.startswith("word/media/") and not name.endswith("/"):
            target = out / Path(name).name
            target.write_bytes(z.read(name))
            print(target)
PY
find tmp/unicef_assets -type f | sed -n '1,40p'
```

Expected: report figures are extracted into `tmp/unicef_assets/`.

- [ ] **Step 5: Select UNICEF public images**

Copy 2-3 useful, non-sensitive figures into stable names:

```bash
cp tmp/unicef_assets/image1.png public/assets/projects/unicef/donation-distribution.png
cp tmp/unicef_assets/image2.png public/assets/projects/unicef/monthly-revenue.png
cp tmp/unicef_assets/image3.png public/assets/projects/unicef/traffic-page-attributes.png
```

Expected: if these source images are not the right figures, choose the correct extracted images but keep the destination names above.

- [ ] **Step 6: Render AEDC PDF pages for chart extraction**

Run:

```bash
mkdir -p tmp/aedc_pages
pdftoppm -png "/Users/yyaoi001/Desktop/6860/6860ass2/QBUS6860 Group Report_Group 61.pdf" tmp/aedc_pages/page
find tmp/aedc_pages -type f | sed -n '1,30p'
```

Expected: page images such as `tmp/aedc_pages/page-1.png` exist.

- [ ] **Step 7: Select AEDC public images**

Copy 2-3 pages or cropped chart images into stable names:

```bash
cp tmp/aedc_pages/page-3.png public/assets/projects/aedc/top-dv2-lgas.png
cp tmp/aedc_pages/page-4.png public/assets/projects/aedc/seifa-dv2-relationship.png
cp tmp/aedc_pages/page-5.png public/assets/projects/aedc/transit-accessibility.png
```

Expected: if the page numbers do not match the desired charts, choose the correct page images but keep the destination names above. Cropping can be deferred unless full pages look poor in the site.

- [ ] **Step 8: Update `src/data.js` chart arrays**

Replace the empty `charts: []` arrays for `enpak`, `unicef`, and `aedc` with these entries after files are copied:

```javascript
charts: [
  {
    src: "public/assets/projects/enpak/market-overview.png",
    alt: "Enpak NYC 市场结构和 borough 对比图",
    caption: "纽约市场结构呈现明显差异，Manhattan 更适合即时商业化，Brooklyn 更适合增长扩展。"
  },
  {
    src: "public/assets/projects/enpak/event-heatmap.png",
    alt: "NYC 历史活动热力图",
    caption: "活动密度集中在 Manhattan 和 central Brooklyn，用于辅助选择 pilot launch 区域。"
  },
  {
    src: "public/assets/projects/enpak/forecast.png",
    alt: "SARIMA 12 个月活动趋势预测",
    caption: "SARIMA 预测用于辅助判断未来 12 个月活动波动和上线节奏。"
  }
]
```

```javascript
charts: [
  {
    src: "public/assets/projects/unicef/donation-distribution.png",
    alt: "UNICEF 捐赠金额分布",
    caption: "捐赠金额高度右偏，说明需要同时关注普通捐赠者和高价值捐赠者。"
  },
  {
    src: "public/assets/projects/unicef/monthly-revenue.png",
    alt: "UNICEF 月度捐赠收入变化",
    caption: "月度收入在税季和年末出现高峰，体现 campaign timing 对捐赠行为的影响。"
  },
  {
    src: "public/assets/projects/unicef/traffic-page-attributes.png",
    alt: "UNICEF 页面与流量属性表现",
    caption: "页面意图和流量来源共同影响捐赠金额与转化质量。"
  }
]
```

```javascript
charts: [
  {
    src: "public/assets/projects/aedc/top-dv2-lgas.png",
    alt: "AEDC 高 DV2 地区排名",
    caption: "高 DV2 地区显著高于全国 LGA 中位数，且常被小人口规模掩盖。"
  },
  {
    src: "public/assets/projects/aedc/seifa-dv2-relationship.png",
    alt: "SEIFA IRSD 与 DV2 关系",
    caption: "SEIFA IRSD 与 DV2 强负相关，显示儿童发展脆弱性存在社会经济梯度。"
  },
  {
    src: "public/assets/projects/aedc/transit-accessibility.png",
    alt: "交通可达性与 DV2 关系",
    caption: "高 DV2 地区往往伴随更弱公共交通可达性，形成复合劣势。"
  }
]
```

- [ ] **Step 9: Verify image paths**

Run:

```bash
for f in public/assets/projects/credit/final_feature_importance_top15.png public/assets/projects/credit/holdout_score_band_bad_rate.png public/assets/projects/credit/threshold_strategy_curve.png public/assets/projects/enpak/market-overview.png public/assets/projects/enpak/event-heatmap.png public/assets/projects/enpak/forecast.png public/assets/projects/unicef/donation-distribution.png public/assets/projects/unicef/monthly-revenue.png public/assets/projects/unicef/traffic-page-attributes.png public/assets/projects/aedc/top-dv2-lgas.png public/assets/projects/aedc/seifa-dv2-relationship.png public/assets/projects/aedc/transit-accessibility.png; do test -f "$f" && echo "ok $f" || echo "missing $f"; done
```

Expected: all lines begin with `ok`.

- [ ] **Step 10: Commit**

Run:

```bash
git add public/assets/projects src/data.js
git commit -m "content: add project chart assets"
```

Expected: commit succeeds.

## Task 6: Content Regression Checks

**Files:**
- Create: `scripts/verify-content.mjs`
- Modify: `package.json`

- [ ] **Step 1: Create `package.json`**

Use this:

```json
{
  "name": "yi-yao-data-portfolio",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "check": "node scripts/verify-content.mjs",
    "serve": "python3 -m http.server 4173"
  }
}
```

- [ ] **Step 2: Create `scripts/verify-content.mjs`**

Use this script:

```javascript
import { existsSync, readFileSync } from "node:fs";
import { portfolioData } from "../src/data.js";

const requiredFiles = ["index.html", "src/data.js", "src/app.js", "src/styles.css"];
const requiredText = [
  "姚羿 Yi Yao",
  "Enpak Social",
  "阿里天池信贷风控项目",
  "UNICEF Australia",
  "AEDC 教育照护分析",
  "AUC 0.7187",
  "2.23x",
  "Pearson r = -0.787"
];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const combined = requiredFiles.map((file) => readFileSync(file, "utf8")).join("\n");

for (const text of requiredText) {
  if (!combined.includes(text)) {
    throw new Error(`Missing required text: ${text}`);
  }
}

if (portfolioData.projects.length !== 4) {
  throw new Error(`Expected 4 projects, found ${portfolioData.projects.length}`);
}

for (const project of portfolioData.projects) {
  if (!project.businessQuestion || !project.role || project.insights.length < 3) {
    throw new Error(`Project is missing case-study content: ${project.id}`);
  }

  for (const chart of project.charts) {
    if (!existsSync(chart.src)) {
      throw new Error(`Missing chart asset for ${project.id}: ${chart.src}`);
    }
  }
}

console.log("Portfolio content check passed.");
```

- [ ] **Step 3: Run check**

Run:

```bash
npm run check
```

Expected: `Portfolio content check passed.`

- [ ] **Step 4: Commit**

Run:

```bash
git add package.json scripts/verify-content.mjs
git commit -m "test: add portfolio content checks"
```

Expected: commit succeeds.

## Task 7: Browser Verification And Polish

**Files:**
- Modify if needed: `src/styles.css`, `src/data.js`, `src/app.js`

- [ ] **Step 1: Start server**

Run:

```bash
npm run serve
```

Expected: site is served at `http://127.0.0.1:4173`.

- [ ] **Step 2: Desktop browser verification**

Open `http://127.0.0.1:4173` in the in-app browser at desktop width. Verify:

- Hero, metrics, project cards, four case-study sections, skills, experience, and contact sections are visible.
- No nested card layout looks cramped.
- Chart images load or show the explicit chart-placeholder sentence.
- Navigation links work.
- Chinese text does not overflow buttons or cards.

- [ ] **Step 3: Mobile browser verification**

Resize browser to a mobile viewport or use responsive mode if available. Verify:

- Navigation wraps cleanly.
- Project cards stack one column.
- Metrics stack without text clipping.
- Case-study insight panels move below content.
- Chart cards do not overflow viewport.

- [ ] **Step 4: Fix concrete issues**

If a visual issue is found, apply a targeted CSS or content fix. Examples:

```css
.project-card h3 {
  overflow-wrap: anywhere;
}

.button {
  text-align: center;
}
```

Only add these fixes if the browser check shows the issue.

- [ ] **Step 5: Run checks**

Run:

```bash
npm run check
node --check src/app.js
node --check src/data.js
```

Expected:

- `Portfolio content check passed.`
- no syntax errors.

- [ ] **Step 6: Commit**

Run:

```bash
git add src/styles.css src/data.js src/app.js
git commit -m "fix: polish responsive portfolio presentation"
```

Expected: commit succeeds if files changed. If no files changed, skip this commit.

## Task 8: Final Review Notes

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create `README.md`**

Use this:

```markdown
# Yi Yao Data Analytics Portfolio

中文数据分析作品集网站，展示商业增长、金融风控、空间数据分析和可视化项目。

## Local Preview

```bash
npm run serve
```

Open `http://127.0.0.1:4173`.

## Checks

```bash
npm run check
node --check src/app.js
node --check src/data.js
```

## Privacy Boundary

The site intentionally does not publish raw data, notebooks, original reports, internal decks, phone number, or downloadable project files. It only shows project summaries, methods, selected metrics, and sanitized chart images.
```

- [ ] **Step 2: Run final checks**

Run:

```bash
npm run check
git status --short
```

Expected:

- `Portfolio content check passed.`
- only `README.md` is uncommitted before the commit.

- [ ] **Step 3: Commit**

Run:

```bash
git add README.md
git commit -m "docs: add portfolio preview instructions"
```

Expected: commit succeeds.

- [ ] **Step 4: Final handoff**

Report:

- Local preview URL: `http://127.0.0.1:4173`
- Main files: `index.html`, `src/data.js`, `src/app.js`, `src/styles.css`
- Privacy boundary remains intact.
- Any chart assets that looked weak or need manual cropping.

## Self-Review

Spec coverage:

- Dashboard-like homepage: Tasks 3 and 4.
- Selected Impact metrics: Tasks 2 and 3.
- Four project cards and details: Tasks 2 and 3.
- Capability matrix: Tasks 2 and 3.
- Education, experience, contact: Tasks 2 and 3.
- No public raw files/downloads: Tasks 2 and 8.
- Chart assets: Task 5.
- Responsive verification: Task 7.
- Local preview: Tasks 4, 7, and 8.

Placeholder scan:

- No unresolved placeholder markers or unspecified implementation steps are used.
- Asset selection allows choosing correct extracted images while preserving stable destination names because source media ordering may vary by Office export. The destination paths and data references are exact.

Type consistency:

- `portfolioData.projects[].charts` is read by `renderChartGallery()`.
- Each project includes `businessQuestion`, `role`, `dataMethods`, `insights`, `recommendations`, and `tags`.
- Chart paths in `src/data.js` match Task 5 destination paths.
