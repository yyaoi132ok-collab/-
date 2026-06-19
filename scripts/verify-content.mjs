import { existsSync, readFileSync } from "node:fs";
import { portfolioData } from "../src/data.js";

const requiredFiles = ["index.html", "src/data.js", "src/app.js", "src/styles.css"];
const requiredDataFiles = [
  "public/data/enpak-market.json",
  "public/data/enpak-forecast.json",
  "public/data/credit-score-bands.json",
  "public/data/credit-feature-importance.json",
  "public/data/unicef-donation-distribution.json",
  "public/data/unicef-channel-performance.json",
  "public/data/aedc-seifa-dv2.json",
  "public/data/aedc-top-dv2.json"
];
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

for (const file of requiredDataFiles) {
  if (!existsSync(file)) {
    throw new Error(`Missing required data file: ${file}`);
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

  if (!project.interactiveCharts || project.interactiveCharts.length < 1) {
    throw new Error(`Project is missing interactive charts: ${project.id}`);
  }
}

const dataSource = readFileSync("src/data.js", "utf8");
for (const forbidden of [
  "public/assets/projects/aedc/top-dv2-lgas.png",
  "public/assets/projects/aedc/seifa-dv2-relationship.png",
  "public/assets/projects/aedc/transit-accessibility.png"
]) {
  if (dataSource.includes(forbidden)) {
    throw new Error(`AEDC report screenshot is still referenced: ${forbidden}`);
  }
}

const html = readFileSync("index.html", "utf8");
if (!html.includes("plotly-2.35.2.min.js")) {
  throw new Error("Plotly CDN script is missing from index.html");
}

console.log("Portfolio content check passed.");
