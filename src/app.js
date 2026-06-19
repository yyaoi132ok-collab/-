import { portfolioData } from "./data.js";
import { renderProjectCharts } from "./charts.js";

const app = document.querySelector("#app");
let activeProjectId = "enpak";

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

function getActiveProject() {
  return portfolioData.projects.find((project) => project.id === activeProjectId) || portfolioData.projects[0];
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
  const activeClass = project.id === activeProjectId ? " active" : "";
  return `
    <button class="project-card${activeClass}" type="button" data-project-id="${escapeHtml(project.id)}" aria-pressed="${project.id === activeProjectId}">
      <span class="project-domain">${escapeHtml(project.domain)}</span>
      <span class="project-title">${escapeHtml(project.title)}</span>
      <span class="project-summary">${escapeHtml(project.summary)}</span>
      <span class="project-card-footer">
        <strong>${escapeHtml(project.featuredMetric)}</strong>
        <span>查看详情</span>
      </span>
      <span class="tag-row">${renderTags(project.tags)}</span>
    </button>
  `;
}

function renderProjects(projects) {
  const active = getActiveProject();
  return `
    <section class="section" id="projects" aria-labelledby="projects-title">
      <div class="section-heading">
        <p class="eyebrow">Case Studies</p>
        <h2 id="projects-title">四个清晰分栏的分析项目</h2>
        <p>点击项目卡切换详情。页面每次只展开一个项目，避免长页面堆叠。</p>
      </div>
      <div class="project-grid project-switcher">
        ${projects.map(renderProjectCard).join("")}
      </div>
      <div id="active-case-study" class="active-case-panel">
        ${renderCaseStudy(active)}
      </div>
    </section>
  `;
}

function renderChartContainers(project) {
  return `
    <div class="interactive-chart-grid">
      ${project.interactiveCharts
        .map(
          (chart) => `
            <article class="interactive-chart-card">
              <h4>${escapeHtml(chart.title)}</h4>
              <div class="plotly-chart" data-chart="${escapeHtml(chart.id)}" aria-label="${escapeHtml(chart.title)}"></div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderCaseStudy(project) {
  return `
    <article class="case-study active-case" id="case-${escapeHtml(project.id)}" aria-labelledby="${escapeHtml(project.id)}-title">
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
        <h3>交互图表</h3>
        ${renderChartContainers(project)}
      </div>
    </article>
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

function bindProjectSwitcher() {
  document.querySelectorAll("[data-project-id]").forEach((button) => {
    button.addEventListener("click", async () => {
      activeProjectId = button.dataset.projectId;
      document.querySelector("#projects").outerHTML = renderProjects(portfolioData.projects);
      bindProjectSwitcher();
      await renderProjectCharts(activeProjectId);
      document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

async function renderApp(data) {
  document.title = data.person.browserTitle;
  app.innerHTML = [
    renderHero(data),
    renderImpact(data.impact),
    renderProjects(data.projects),
    renderSkills(data),
    renderExperience(data),
    renderContact(data)
  ].join("");
  bindProjectSwitcher();
  await renderProjectCharts(activeProjectId);
}

renderApp(portfolioData);
