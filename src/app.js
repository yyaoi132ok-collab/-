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
