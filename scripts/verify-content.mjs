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
