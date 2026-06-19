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
      interactiveCharts: [
        { id: "enpak-market", title: "NYC borough 市场机会地图" },
        { id: "enpak-forecast", title: "精简版 SARIMA 12 个月预测" }
      ]
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
      interactiveCharts: [
        { id: "credit-score-bands", title: "风险排序业务价值：坏账率与 Lift" },
        { id: "credit-feature-importance", title: "Top 15 风险特征（中文释义）" }
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
      interactiveCharts: [
        { id: "unicef-donation-distribution", title: "捐赠金额分布" },
        { id: "unicef-channel-performance", title: "渠道/页面/设备表现" }
      ]
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
      interactiveCharts: [
        { id: "aedc-lga-map", title: "澳大利亚 LGA 儿童发展脆弱性地图" },
        { id: "aedc-seifa-dv2", title: "SEIFA IRSD 与 DV2 关系" }
      ]
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
