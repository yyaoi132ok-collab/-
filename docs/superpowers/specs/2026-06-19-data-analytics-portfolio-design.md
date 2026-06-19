# 数据分析个人作品集网站设计规格

日期：2026-06-19

## 目标

为姚羿 Yi Yao 搭建一个中文数据分析个人作品集网站，用于求职投递和 HR 快速评估。网站不只是复述简历，而是展示可验证的数据分析能力：业务问题理解、多源数据处理、建模预测、可视化表达和可执行建议。

第一版服务目标：

- 面向中文 HR、数据分析岗、商业分析岗、BI/可视化岗和初级数据科学相关岗位。
- 用 4 个项目证明能力宽度和业务落地意识。
- 不公开原始数据、notebook、课程报告或内部文件，只展示脱敏后的图表、方法和结论。
- 首屏让招聘方在 30 秒内理解候选人定位，项目页让面试官在 2-3 分钟内读懂一个案例。

## 网站定位

显示名：姚羿 Yi Yao

浏览器标题建议：Yi Yao | Data Analytics Portfolio

首页价值主张：

> 用数据建模、可视化和业务判断，把复杂问题转化为可执行决策。

标签：

- Business Analytics
- Machine Learning
- Data Visualization

整体风格：数据产品型作品集。页面应像轻量 analytics dashboard，而不是传统个人主页。采用指标卡、项目卡、图表预览、能力矩阵和清晰的数据故事。

## 参考原则

调研参考了 CareerFoundry、Coursera、Maarten Grootendorst、Scaler 等数据作品集建议，归纳为以下设计原则：

- 项目不能只列代码或报告链接，要用业务叙事和视觉结果展示分析能力。
- 招聘方关心业务问题、数据来源、方法、结果、可视化、可量化影响和沟通质量。
- 项目数量重质不重量，3-6 个 polished projects 比大量零散项目更好。
- 作品集应体现 T-shaped profile：横向覆盖统计、编程、业务、可视化，纵向突出一个主方向。
- 对课程或公开数据项目，要明确数据来源和角色边界，避免让 HR 误解为真实公司雇佣经历。

## 信息架构

第一版为单页主页加 4 个项目详情区。详情区可以先在同一页面中实现，后续再拆成独立页面。

导航：

- 首页
- 项目
- 能力
- 经历
- 联系

不做以下功能：

- 博客系统
- 登录或后台
- 文件下载
- 评论
- 复杂动画
- 原始数据或 notebook 公开链接

## 首页结构

### 1. Hero

内容：

- 姓名：姚羿 Yi Yao
- 一句话定位：用数据建模、可视化和业务判断，把复杂问题转化为可执行决策。
- 简短说明：悉尼大学商学院数据分析硕士，关注商业增长、金融风控、空间数据分析和数据可视化。
- 主要行动按钮：查看项目
- 次要行动按钮：联系我

视觉：

- 不做大幅营销式 hero。
- 以数据产品界面为主，首屏可包含小型指标卡或项目摘要面板。

### 2. Selected Impact 指标条

建议指标：

- 4 个端到端分析项目
- 800K+ 信贷样本建模
- 62K+ 捐赠会话分析
- AUC 0.7187 风控模型
- 2.23x Top10% 风险 Lift
- SARIMA 市场活动预测

这些指标来自已读取材料。展示时应避免夸大，必要时注明为项目内模型/holdout 结果。

### 3. Case Studies 项目区

项目排序：

1. Enpak Social | 纽约市场情报与上线策略分析
2. 阿里天池信贷风控项目 | 违约预测与风险分层
3. UNICEF Australia | 在线捐赠行为与 Ask Ladder 优化
4. AEDC 教育照护分析 | 空间可达性与发展脆弱性分析

每张卡包含：

- 业务问题
- 数据规模或方法
- 一个关键结果
- 能力标签
- 查看详情入口

### 4. 分析能力矩阵

按能力表达，而不是只列工具：

- 数据治理：多源数据整合、缺失值处理、异常值检查、标准化、分层聚合
- 业务分析：KPI 框架、用户/风险分层、增长建议、策略矩阵
- 建模预测：LightGBM、XGBoost、CatBoost、Random Forest、Regression、SARIMA
- 可视化表达：Dashboard、地图、趋势图、指标卡、模型评估图
- 沟通交付：报告、PPT、业务建议、决策框架

工具栈：

- Python
- Pandas
- NumPy
- Matplotlib
- Seaborn
- Plotly
- Scikit-learn
- XGBoost
- LightGBM
- Jupyter Notebook
- Excel
- MATLAB

SQL、Tableau、Power BI、Streamlit 是否作为核心技能，需要后续由用户确认实际熟练程度。当前材料中有 Streamlit dashboard，但简历未列入 Streamlit。

### 5. 经历与联系

教育：

- 悉尼大学，商学院硕士，数据分析，2025.02-2026.11
- 塔斯马尼亚大学，工程学院荣誉学士，电子工程交换，2022.02-2023.06
- 西南大学，学士，电子信息工程，2019.09-2023.07

经历：

- Enpak Social，数据分析实习生，2026.01-2026.03
- Tasmania，Student Success Leader，2022.12-2023.10

联系方式：

- 邮箱使用简历中的邮箱，后续可确认是否替换为更职业化邮箱。
- 电话是否展示需要后续确认。第一版建议不在公开网页直接显示手机号，避免隐私风险。
- LinkedIn、GitHub 如有，后续补充。

## 项目详情页通用结构

每个项目采用短案例研究结构：

1. 项目概览：项目名称、领域、时间、工具、核心一句话结果。
2. 业务问题：为什么做这个分析。
3. 我的角色：负责的数据清洗、特征工程、EDA、建模、可视化、报告和业务建议。
4. 数据与方法：数据来源、样本规模、核心变量、模型或分析方法。
5. 关键发现：3 个 insight cards，优先使用数字化结果。
6. 业务建议：把发现转化为行动建议。
7. 图表展示：2-4 张脱敏图表，每张配一句洞察说明。
8. 能力总结：Feature Engineering、Forecasting、Risk Segmentation、Business Storytelling 等标签。

## 项目内容草案

### Enpak Social | 纽约市场情报与上线策略分析

定位：真实业务实习项目，首页第一优先级。

业务问题：

Enpak 上线前缺少内部行为数据，需要通过外部公开数据判断 NYC 哪些区域适合优先投放和商业化。

数据与方法：

- 人口、收入、教育水平、商业密度、历史活动数据等公开数据
- Community Engagement Index
- 标准化 event density、business density、population density、income、education
- SARIMA 12 个月活动趋势预测
- Revenue Opportunity Matrix

关键结果：

- Manhattan：即时商业化核心，高密度、高收入、高商业集中度
- Brooklyn：增长扩展区，年轻用户与活动潜力强
- Queens：长期多语言扩张机会
- SARIMA validation MAE 71.36，RMSE 105.56

业务建议：

- 先做 Manhattan + Brooklyn pilot
- 短期抓 Manhattan premium advertiser acquisition
- 中期扩展 Brooklyn youth-centered engagement
- 长期布局 Queens multilingual expansion

### 阿里天池信贷风控项目 | 违约预测与风险分层

定位：金融风控、机器学习和业务分层能力证明。

命名注意：

使用“阿里天池信贷风控项目”，不写“阿里巴巴实习”，避免雇佣关系表述风险。

数据与方法：

- 阿里天池信贷违约数据集
- 信贷违约二分类预测
- 数据清洗、特征工程、模型训练、调参、业务分层、Dashboard
- 主模型 TunedLightGBM_final
- 特征数 181

关键结果：

- 内部时序 holdout AUC 0.7187
- KS 0.3209
- Top10% 高风险人群坏账率 44.42%
- Top10% Lift 2.23

业务建议：

- 模型用于贷前风险排序、人工复核名单生成和风险定价辅助
- 不作为单一自动拒绝规则
- 以时间后置 holdout 表现作为主要泛化评估口径

### UNICEF Australia | 在线捐赠行为与 Ask Ladder 优化

定位：商业增长、捐赠转化、EDA 和建模案例。

数据与方法：

- 62,591 条 donation session
- 原始字段 25 个，建模矩阵约 79/81 个字段
- 数据清洗、特征工程、EDA、线性模型、正则化、树模型、Boosting、Stacking

关键结果：

- 最强 Stacking 模型 RMSE_log 0.9642
- R²_log 0.2014
- RMSE_actual AUD 116.36
- MAE_actual AUD 56.04

业务建议：

- 通用 one-time ask ladder：AUD 80/105/230
- 高意向用户：AUD 100/135/435
- Mobile/iOS 用户：AUD 70/95/220
- 从固定捐赠模板转向 segmented, context-aware ask ladders

### AEDC 教育照护分析 | 空间可达性与发展脆弱性分析

定位：空间数据、公共政策、多源整合和可视化分析案例。

数据与方法：

- AEDC、SEIFA、Education Services、Google Reviews、Preschool Education
- LGA、service、postcode 多粒度数据清洗与聚合
- DV2、SEIFA IRSD、公共交通距离、NQS 服务质量、Google review sentiment
- 空间 join、地图、相关分析、关键词/评论分析

关键结果：

- MacDonnell DV2 74.5%
- Barkly DV2 60.6%
- West Daly DV2 52.5%
- Halls Creek DV2 51.4%
- 全国 LGA 中位数 11.3%
- SEIFA IRSD 与 DV2 Pearson r = -0.787
- 公共交通距离与 DV2 Pearson r ≈ 0.341

业务建议：

- 不应只增加服务数量
- 优先关注 high DV2、low SEIFA、long transport distance、weaker service quality 的重叠区域
- 建议交通补贴、mobile outreach hubs、质量提升 grants、标准化年度家长反馈机制

## 隐私与公开边界

第一版不公开：

- 原始数据
- notebook
- 课程报告原文
- 内部 PPT 原件
- 可下载文件
- 手机号

可以公开：

- 项目标题
- 脱敏后的业务问题
- 数据规模和公开来源
- 方法、指标和关键结果
- 脱敏图表截图
- 技能标签和项目总结

Enpak 项目需要避免泄露内部敏感细节。网站只展示已确认的策略层结论、公开数据方法和聚合指标。

## 后续待确认

- 是否有 LinkedIn、GitHub、个人邮箱或职业邮箱。
- 是否展示电话。建议不展示。
- 是否熟练 SQL、Tableau、Power BI、Streamlit。当前不要默认写入核心技能。
- 是否需要部署到 GitHub Pages、Vercel 或 Netlify。
- 是否要把项目详情拆为独立页面，还是第一版先放在单页内。

## 验收标准

第一版网站完成后应满足：

- 中文内容专业、可信、无夸大。
- 首屏清楚表达姓名、定位和数据分析价值。
- 4 个项目卡都包含业务问题、方法、结果和能力标签。
- 每个项目详情都能独立支撑一次面试追问。
- 页面在桌面和手机上不出现文字溢出、重叠或图表遮挡。
- 不公开敏感文件或原始数据。
- 可本地打开或通过本地开发服务器预览。
