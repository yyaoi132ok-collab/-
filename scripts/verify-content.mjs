import { existsSync, readFileSync } from "node:fs";

const requiredFiles = ["index.html", "src/main.jsx", "src/styles.css", "src/MagicBento.jsx", "src/MagicBento.css", "src/TextType.jsx", "src/TextType.css", "src/DotGrid.jsx", "src/DotGrid.css", "vite.config.js"];
const requiredAssets = [
  "public/assets/projects/enpak/enpak-logo-dark.png",
  "public/assets/projects/credit/brand-bg.svg",
  "public/assets/projects/unicef/brand-bg.svg",
  "public/assets/projects/aedc/brand-bg.svg",
  "public/assets/profile/yi-yao-photo.jpg",
  "public/assets/profile/yi-yao-studio-portrait.jpg",
  "public/assets/education/usyd-bg.svg",
  "public/assets/education/utas-bg.svg",
  "public/assets/education/swu-bg.svg",
  "public/assets/references/steven-hitchcock-recommendation.pdf",
  "public/assets/references/enpak-brian-recommendation.pdf",
  "public/assets/references/alibaba-recommendation.pdf",
  "public/assets/references/utas-student-success-offer.pdf",
  "public/assets/references/yi-yao-resume.pdf",
  "public/data/nyc-boroughs.geojson",
  "public/data/aedc-lga-map.geojson"
];
const requiredText = [
  "姚羿 Yi Yao",
  "Enpak Social",
  "阿里天池信贷风控",
  "UNICEF Australia",
  "AEDC 教育照护分析",
  "项目经历",
  "悉尼大学",
  "塔斯马尼亚大学",
  "西南大学",
  "211 本科背景",
  "电子信息工程",
  "微信 YYaoi001",
  "15340554050",
  "数据分析师",
  "AUC 0.7187",
  "r = -0.787",
  "createRoot"
];

for (const file of [...requiredFiles, ...requiredAssets]) {
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

const html = readFileSync("index.html", "utf8");
if (!html.includes("/src/main.jsx")) {
  throw new Error("React entry script is missing from index.html");
}

const source = readFileSync("src/main.jsx", "utf8");
for (const strengthRequirement of [
  '英语沟通与跨文化协作',
  'PTE 四项 7 分',
  '大学英语六级 510 分',
  'AI 应用与快速交付',
  '短剧内容制作',
  'Vibe Coding',
  '个人网站搭建',
  'Languages',
]) {
  if (!source.includes(strengthRequirement)) {
    throw new Error(`Strength card is missing: ${strengthRequirement}`);
  }
}

const projectCount = source.split("image: '/assets/projects").length - 1;
if (projectCount !== 4) {
  throw new Error(`Expected 4 portfolio project cards, found ${projectCount}`);
}

for (const bentoRequirement of ["import MagicBento", "<MagicBento", 'glowColor="215, 181, 109"']) {
  if (!source.includes(bentoRequirement)) {
    throw new Error(`Black-gold MagicBento integration is missing: ${bentoRequirement}`);
  }
}

for (const dotGridRequirement of ["import DotGrid", "<DotGrid", "post-profile-surface", 'activeColor="#B7A06D"']) {
  if (!source.includes(dotGridRequirement)) {
    throw new Error(`Black-gold DotGrid integration is missing: ${dotGridRequirement}`);
  }
}

const dotGridCss = readFileSync("src/DotGrid.css", "utf8");
for (const dotGridStyle of [".dot-grid__canvas", "pointer-events: none;", ".post-profile-surface__content"]) {
  if (!dotGridCss.includes(dotGridStyle)) {
    throw new Error(`DotGrid background layering is missing: ${dotGridStyle}`);
  }
}

for (const textTypeRequirement of ["import TextType", "<TextType", "把复杂数据转化为可执行的商业判断。", "cursorCharacter=\"|\""]) {
  if (!source.includes(textTypeRequirement)) {
    throw new Error(`Hero TextType integration is missing: ${textTypeRequirement}`);
  }
}

for (const motionRequirement of ["ScrollTrigger", "usePortfolioMotion", "hero-opening-mask", "hero-title", ".project-image img"]) {
  if (!source.includes(motionRequirement) && !combined.includes(motionRequirement)) {
    throw new Error(`GSAP motion system is missing: ${motionRequirement}`);
  }
}

if (!source.includes("onEnter: () =>")) {
  throw new Error("Section motion must initialize on entry so project cards stay visible before scrolling.");
}

if (source.includes("timeline.from(cards, { y:")) {
  throw new Error("Card entrance motion must not overwrite tilt-card transforms.");
}

if (!source.includes("clipPath: 'inset(10% 0 0 0)'")) {
  throw new Error("Card entrance motion must use a transform-safe reveal mask.");
}

if (source.includes("cards,\n                  { autoAlpha:")) {
  throw new Error("Card entrance motion must never hide core project content with autoAlpha.");
}

const bentoCss = readFileSync("src/MagicBento.css", "utf8");
if (bentoCss.includes("132, 0, 255") || bentoCss.includes("#120F17")) {
  throw new Error("MagicBento still contains its default purple color palette.");
}

const heroPanel = source.slice(source.indexOf('className="hero-data-panel"'), source.indexOf("<header className=\"nav\""));
for (const identityText of ["Data Analyst", "USYD Business School", "Engineering + Analytics"]) {
  if (!heroPanel.includes(identityText)) {
    throw new Error(`Hero identity panel is missing: ${identityText}`);
  }
}
for (const oldMetric of ["AUC 0.7187", "r = -0.787"]) {
  if (heroPanel.includes(oldMetric)) {
    throw new Error(`Hero identity panel still contains a project metric: ${oldMetric}`);
  }
}

if (source.includes("姚羿 Yi Yao")) {
  throw new Error("Hero name still includes the removed English name.");
}

if (source.includes("四个项目按经历类型分栏展示：海外实习、机器学习、商业分析、空间数据。")) {
  throw new Error("Projects heading still contains the removed explanatory sentence.");
}

const styles = readFileSync("src/styles.css", "utf8");
for (const wideChartRequirement of [
  "chart.type === 'channelPerformance'",
  "chart-card is-wide",
  ".chart-card.is-wide",
  ".chart-card.is-wide .bar-row",
  ".chart-card.is-wide {\n    grid-column: span 1;",
]) {
  if (!source.includes(wideChartRequirement) && !styles.includes(wideChartRequirement)) {
    throw new Error(`UNICEF channel performance chart must use a wide card layout: ${wideChartRequirement}`);
  }
}

for (const className of [
  '.experience-highlights',
  '.reference-letter-card',
  '.reference-letter-action',
  '.student-success-card',
  '.official-feature-banner',
  '.official-feature-tags',
  '.official-feature-action',
]) {
  if (!styles.includes(className)) {
    throw new Error(`Experience visual treatment is missing: ${className}`);
  }
}

for (const requiredStyle of [
  ".education-card::before",
  "mask-image: linear-gradient(to bottom",
  ".bio-panel {\n  min-height: 520px;",
]) {
  if (!styles.includes(requiredStyle)) {
    throw new Error(`Expected visual treatment is missing: ${requiredStyle}`);
  }
}

if (!source.includes("/assets/projects/enpak/enpak-logo.png")) {
  throw new Error("Enpak is not using the high-resolution transparent logo asset.");
}

if (styles.includes('.project-card[data-project-id="enpak"]::before')) {
  throw new Error("Enpak still has a separate background treatment that can overlap the shared grid.");
}

for (const requiredLayoutRule of [
  ".project-image {\n  position: relative;\n  z-index: 1;\n  height: 288px;",
  "display: grid;\n  place-items: center;",
  ".project-card::before {",
  "background-size: 100% 100%, 72px 72px, 72px 72px, auto;",
]) {
  if (!styles.includes(requiredLayoutRule) && !source.includes(requiredLayoutRule)) {
    throw new Error(`Unified project or portrait layout is missing: ${requiredLayoutRule}`);
  }
}

const projectImageRule = styles.slice(styles.indexOf(".project-image img"), styles.indexOf(".project-card:hover .project-image img"));
for (const requiredImageRule of ["object-fit: contain;", "padding: 20px;"]) {
  if (!projectImageRule.includes(requiredImageRule)) {
    throw new Error(`Project previews can still crop artwork: ${requiredImageRule}`);
  }
}

const portraitRule = styles.slice(styles.indexOf(".portrait-frame"), styles.indexOf(".portrait-lines"));
for (const requiredPortraitRule of [
  "portrait-frame",
  "border-radius: 50%;",
  "clip-path: circle(50%);",
  "border: 1px solid rgba(215, 181, 109, 0.72);",
  "object-fit: cover;",
  "inset: 0 auto auto -8%;",
  "object-position: 43% 42%;",
  "width: min(72%, 286px);",
  "filter: brightness(0.84) saturate(0.78) contrast(1.06);",
  "/assets/profile/yi-yao-studio-portrait.jpg",
]) {
  if (!portraitRule.includes(requiredPortraitRule) && !source.includes(requiredPortraitRule)) {
    throw new Error(`Portrait cutout treatment is missing: ${requiredPortraitRule}`);
  }
}

if (!styles.includes("background: linear-gradient(180deg, transparent 62%, rgba(8, 12, 16, 0.96) 100%);")) {
  throw new Error("Portrait shoulder fade is missing.");
}

for (const projectAsset of [
  "public/assets/projects/credit/brand-bg.svg",
  "public/assets/projects/unicef/brand-bg.svg",
  "public/assets/projects/aedc/brand-bg.svg",
]) {
  const assetSource = readFileSync(projectAsset, "utf8");
  if (assetSource.includes('<rect width="1200" height="720" fill="url(#bg)"/>')) {
    throw new Error(`Project artwork still has an opaque background: ${projectAsset}`);
  }
}

const usydEmblem = readFileSync("public/assets/education/usyd-emblem.svg", "utf8");
if (usydEmblem.includes('#141414') || !usydEmblem.includes('#D7B56D')) {
  throw new Error("USYD emblem must be natively gold for mobile browser compatibility.");
}

const studentSuccessRequirements = [
  '海外学生工作｜Student Success Leader',
  'Chinese Outreach',
  'University of Tasmania',
  '2022',
  '主动联系需要额外支持的学生',
  '升学、就业、实习与校园支持资源',
  '中文学生跨文化支持',
  'student-success-card',
  'student-success-action',
  '/assets/references/utas-student-success-offer.pdf',
];

const officialFeatureRequirements = [
  'official-feature-banner',
  'OFFICIAL FEATURE / 西南大学西塔学院',
  '海外学子风采｜姚羿：为明天谱写新的可能',
  '校长激励奖一等奖',
  '2+2 国际培养',
  '学生组织与协作',
  '海外升学',
  'https://mp.weixin.qq.com/s/hgu61u2-5xiz6NrdqE1w3Q',
  'target="_blank"',
  'rel="noreferrer"',
];

for (const requirement of [...studentSuccessRequirements, ...officialFeatureRequirements]) {
  if (!source.includes(requirement)) {
    throw new Error(`Experience highlight is missing: ${requirement}`);
  }
}

if (source.indexOf('student-success-card') > source.indexOf('official-feature-banner')) {
  throw new Error('Student Success must appear before the official feature banner.');
}

for (const confidentialDetail of ['28.64', 'James Chester', 'Fazlinda Kassim']) {
  if (source.includes(confidentialDetail)) {
    throw new Error(`Confidential offer detail published: ${confidentialDetail}`);
  }
}

if (source.includes('student-success-kicker')) {
  throw new Error('Student Success must use a combined heading instead of a separate kicker.');
}

const recommendationRequirements = [
  'reference-letter-card',
  'Dr Steven Hitchcock 推荐信',
  'BWIL6215: International Industry Placement Program',
  '/assets/references/steven-hitchcock-recommendation.pdf',
  'Academic Reference',
  '海外实习推荐信｜Enpak Social',
  'Market Intelligence / Launch Strategy',
  '/assets/references/enpak-brian-recommendation.pdf',
  '企业推荐信｜Alibaba Group',
  'Data Analytics / Credit Risk Modelling',
  '/assets/references/alibaba-recommendation.pdf',
];

for (const requirement of recommendationRequirements) {
  if (!source.includes(requirement)) {
    throw new Error(`Recommendation card is missing: ${requirement}`);
  }
}

if (source.indexOf('reference-letter-card') > source.indexOf('student-success-card')) {
  throw new Error('Recommendation card must appear before Student Success.');
}

const experienceHighlights = source.slice(source.indexOf('function ExperienceHighlights'), source.indexOf('function Profile'));
if (!experienceHighlights.includes('/assets/education/usyd-emblem.svg')) {
  throw new Error('Recommendation card must use the native-gold USYD emblem.');
}

const highlightOrder = [
  'Dr Steven Hitchcock 推荐信',
  '海外实习推荐信｜Enpak Social',
  '企业推荐信｜Alibaba Group',
  '海外学生工作｜Student Success Leader',
  '海外学子风采｜姚羿：为明天谱写新的可能',
];
for (let index = 1; index < highlightOrder.length; index += 1) {
  if (experienceHighlights.indexOf(highlightOrder[index - 1]) > experienceHighlights.indexOf(highlightOrder[index])) {
    throw new Error(`Experience highlight order is wrong: ${highlightOrder[index - 1]} must appear before ${highlightOrder[index]}`);
  }
}

const referenceCardCss = styles.slice(styles.indexOf('.reference-letter-card {'), styles.indexOf('.student-success-card {'));
for (const layoutRequirement of [
  'grid-template-columns: minmax(180px, 0.34fr) minmax(0, 1fr);',
  'min-height: 300px;',
  '.reference-letter-mark img',
  '.reference-letter-action,\n.student-success-action {\n  position: absolute;',
]) {
  if (!referenceCardCss.includes(layoutRequirement) && !styles.includes(layoutRequirement)) {
    throw new Error(`Recommendation card is not aligned with Student Success: ${layoutRequirement}`);
  }
}

const officialFeatureHover = styles.indexOf('.official-feature-banner:hover {');
const officialFeatureCss = styles.slice(styles.lastIndexOf('.official-feature-banner {', officialFeatureHover), officialFeatureHover);
if (!officialFeatureCss.includes('grid-template-columns: minmax(180px, 0.34fr) minmax(0, 1fr);')) {
  throw new Error('Official feature text must align with the reference and Student Success copy columns.');
}

for (const profileRequirement of [
  '我是悉尼大学 Business School 的 Data Analytics 硕士',
  '跨文化团队协作',
  '不同国家与文化背景成员',
]) {
  if (!source.includes(profileRequirement)) {
    throw new Error(`Profile update is missing: ${profileRequirement}`);
  }
}

for (const resumeRequirement of [
  'resume-download',
  'resume-download-label',
  '下载简历',
  'aria-label="下载简历 PDF"',
  '/assets/references/yi-yao-resume.pdf',
  'download="姚羿-数据分析简历.pdf"',
  'FileText',
]) {
  if (!source.includes(resumeRequirement)) {
    throw new Error(`Resume download action is missing: ${resumeRequirement}`);
  }
}

if (!styles.includes('.resume-download-item {\n  min-height: 58px;')) {
  throw new Error('Resume icon and label must share one matching bordered rectangle.');
}

for (const requiredFix of [
  '.project-card:not([data-project-id="enpak"]) .project-image img',
  'mix-blend-mode: screen;',
]) {
  if (!source.includes(requiredFix) && !styles.includes(requiredFix)) {
    throw new Error(`Expected asset-visibility fix is missing: ${requiredFix}`);
  }
}

for (const forbidden of ["每张卡片先给 HR", "demo", "Demo", "精选项目", "closing-meta"]) {
  if (combined.includes(forbidden)) {
    throw new Error(`Forbidden placeholder/demo text remains: ${forbidden}`);
  }
}

const profileKeywordBlock = source.slice(source.indexOf("contact-strip"), source.indexOf("education-grid"));
for (const forbiddenProfileText of ["1220210595@qq.com", "15340554050", "微信 YYaoi001"]) {
  if (profileKeywordBlock.includes(forbiddenProfileText)) {
    throw new Error(`Contact detail remains in profile keyword strip: ${forbiddenProfileText}`);
  }
}

console.log("React portfolio content check passed.");
