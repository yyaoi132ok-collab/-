# 作品集交互图表与项目分栏改版规格

日期：2026-06-19

## 背景

当前第一版作品集已经完成中文首页、4 个项目详情、项目图表和基础验证。但 AEDC 项目使用的是 PDF 报告页截图，不符合最终作品集展示要求。用户希望：

- AEDC 不再展示论文截图，只展示图表。
- 图表具备可互动能力。
- 四个项目/实习经历分栏展现，页面结构更清晰，避免长页面冗杂。

## 改版目标

采用“首页轻互动 + 项目重点互动”的方案：

- 首页保留数据产品型视觉，但项目区改为四个清晰入口卡。
- 项目详情不再连续展开全部内容，改为点击项目卡后显示对应项目详情。
- 每个项目提供 1-2 个重点交互图表，而不是大量静态截图。
- 使用 Plotly.js 实现前端交互，仍保持静态网站架构。
- 公开的只是脱敏/聚合后的 JSON 数据，不公开原始数据、notebook、报告或内部文件。

## 信息架构变化

### 首页

保留：

- Hero
- Selected Impact
- 项目入口
- 能力矩阵
- 教育与经历
- 联系方式

调整：

- 项目区从“项目卡 + 后面连续四个长详情区”改成“项目四栏入口 + 单个活动详情面板”。
- 点击项目卡后，仅显示当前项目详情，其他项目详情隐藏。
- 项目卡应有清晰状态：active / inactive。

### 项目详情

每次只显示一个项目：

- 项目概览
- 业务问题
- 我的角色
- 数据与方法
- 关键发现
- 业务建议
- 交互图表
- 能力标签

默认展示 Enpak Social，因为它是真实实习项目。

## 交互图表范围

每个项目第一版放 1-2 个重点交互图：

### Enpak Social

交互图 1：NYC borough 市场指标对比。

- 数据字段：borough、business_density、population_density、median_income、education_share。
- 交互方式：可 hover 查看指标；可通过按钮或下拉切换指标。
- 目的：展示 Manhattan、Brooklyn、Queens 的不同市场角色。

交互图 2：SARIMA 12 个月活动趋势预测。

- 数据字段：month、forecast、lower_bound、upper_bound。
- 交互方式：趋势线 + 置信区间 hover。
- 目的：展示上线时机判断。

### 阿里天池信贷风控

交互图 1：Holdout 风险分层坏账率。

- 数据来源：`score_band_analysis.csv`
- 数据字段：risk_band、bad_rate、capture_rate、lift、split。
- 交互方式：hover 显示 bad_rate、capture_rate、lift。
- 目的：展示模型可用于业务排序。

交互图 2：Top 特征重要性。

- 数据来源：`final_feature_importance.csv`
- 数据字段：feature、importance。
- 交互方式：Top 15 horizontal bar chart。
- 目的：解释模型主要风险信号。

### UNICEF Australia

交互图 1：捐赠金额分布。

- 第一版可使用报告聚合结果或从可提供数据生成聚合 JSON。
- 若缺少 cleaned CSV，则使用脱敏聚合数据，不公开 session-level 数据。
- 目的：展示右偏分布和高价值捐赠者影响。

交互图 2：页面/流量属性表现。

- 第一版可使用报告图表中的聚合信息建立小型 JSON。
- 目的：展示不同 channel/page theme 的平均捐赠表现。

### AEDC 教育照护

交互图 1：SEIFA IRSD vs DV2 散点图。

- 数据来源：`proceed/aedc_2021_with_seifa_clean.csv`
- 数据字段：lga_name、dv2_pct、irsd_score、child_count 或有效样本数。
- 交互方式：hover 显示 LGA、DV2、IRSD；高 DV2 点突出显示。
- 目的：替代论文截图，直接展示社会经济梯度。

交互图 2：Top DV2 LGAs 条形图或交互地图。

- 优先实现 Top DV2 LGAs 条形图，稳定且适合 portfolio。
- 地图可作为后续增强，避免第一版引入 shapefile 转 GeoJSON 的复杂性。

## 数据边界

允许复制到 `public/data/`：

- 聚合后的 JSON
- 已脱敏、非原始明细的 CSV/JSON
- 项目输出指标表，如风险分层、特征重要性、AEDC LGA 汇总

不允许公开：

- 原始数据集
- notebook
- 完整报告
- Enpak 原始 PPT
- session-level 捐赠明细
- 官方 testA 预测全量明细

## 技术设计

新增文件：

- `src/charts.js`：Plotly 图表渲染函数，按项目 id 渲染对应图表。
- `public/data/enpak-market.json`
- `public/data/enpak-forecast.json`
- `public/data/credit-score-bands.json`
- `public/data/credit-feature-importance.json`
- `public/data/unicef-donation-distribution.json`
- `public/data/unicef-channel-performance.json`
- `public/data/aedc-seifa-dv2.json`
- `public/data/aedc-top-dv2.json`

修改文件：

- `index.html`：引入 Plotly CDN 和 `src/charts.js`。
- `src/app.js`：项目详情改为 active detail panel；卡片点击切换 active 项目并触发图表渲染。
- `src/data.js`：项目图表从静态 `charts` 数组改为 `interactiveCharts` 元数据。
- `src/styles.css`：新增 project switcher、active card、chart panel 样式。
- `scripts/verify-content.mjs`：检查 Plotly 容器和 data JSON 是否存在。

## 验收标准

- AEDC 项目不再展示报告页截图。
- 首页项目区是四个清晰分栏/卡片入口。
- 页面同一时间只展开一个项目详情，默认 Enpak。
- 每个项目至少有一个交互 Plotly 图表；AEDC 至少有两个交互图表。
- 图表 hover 可显示关键数据。
- 自动检查通过。
- 浏览器无 console error。
- 桌面无横向溢出，移动端项目卡可单列堆叠。

## 后续增强

- 如果用户提供 UNICEF cleaned CSV，可把聚合图从手工 JSON 改成真实数据生成。
- 如果用户希望 AEDC 地图更强，可将 LGA shapefile 转为简化 GeoJSON，加入 choropleth map。
- 如果后续部署到公网，应再次检查所有 JSON 是否不包含敏感明细。
