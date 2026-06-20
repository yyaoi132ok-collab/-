import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Database,
  Languages,
  LineChart,
  Mail,
  Map,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import { portfolioData } from './data.js';
import DotGrid from './DotGrid.jsx';
import MagicBento from './MagicBento.jsx';
import TextType from './TextType.jsx';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });

const projects = [
  {
    id: 'enpak',
    title: 'Enpak Social',
    subtitle: '纽约市场情报与上线策略分析',
    type: '海外实习项目',
    image: '/assets/projects/enpak/enpak-logo.png',
    tags: ['Market Intelligence', 'SARIMA', 'Geo Analysis'],
    metrics: ['MAE 71.36', 'RMSE 105.56', 'NYC 5 Boroughs'],
    summary:
      '为 Enpak Ready 纽约上线制定区域优先级、活动需求预测与收入机会矩阵，识别 Manhattan、Brooklyn、Queens 的差异化进入策略。',
  },
  {
    id: 'credit',
    title: '阿里天池信贷风控',
    subtitle: '违约预测与风险分层',
    type: '机器学习项目',
    image: '/assets/projects/credit/brand-bg.svg',
    tags: ['LightGBM', 'AUC/KS', 'Risk Tiering'],
    metrics: ['AUC 0.7187', 'KS 0.3209', '181 Features'],
    summary:
      '基于信贷申请与行为特征建立违约预测模型，将模型输出转化为可解释的风险分层、坏账率与 Lift 指标。',
  },
  {
    id: 'unicef',
    title: 'UNICEF Australia',
    subtitle: '在线捐赠行为与 Ask Ladder 优化',
    type: '商业分析项目',
    image: '/assets/projects/unicef/brand-bg.svg',
    tags: ['Donation Analytics', 'Stacking', 'Ask Ladder'],
    metrics: ['62,591 Sessions', 'RMSE AUD 116.36', 'R2 log 0.2014'],
    summary:
      '分析在线捐赠路径、设备与页面属性对捐赠额的影响，并设计分人群的 Ask Ladder 金额建议。',
  },
  {
    id: 'aedc',
    title: 'AEDC 教育照护分析',
    subtitle: '空间可达性与发展脆弱性分析',
    type: '空间数据项目',
    image: '/assets/projects/aedc/brand-bg.svg',
    tags: ['Spatial Data', 'SEIFA', 'AEDC'],
    metrics: ['r = -0.787', 'LGA Map', 'Service Access'],
    summary:
      '整合 AEDC、SEIFA 与教育服务可达性数据，定位儿童发展脆弱性高、服务覆盖不足的地区。',
  },
];

const strengths = [
  {
    icon: BarChart3,
    title: '商业问题拆解',
    text: '把模糊业务目标拆成指标、分群、漏斗与可执行的分析问题。',
  },
  {
    icon: BrainCircuit,
    title: '机器学习建模',
    text: '熟悉特征工程、模型调参、验证指标与模型结果的业务解释。',
  },
  {
    icon: Map,
    title: '空间与地图分析',
    text: '能把地理差异、服务覆盖和需求热度转化为直观决策图层。',
  },
  {
    icon: LineChart,
    title: '预测与时间序列',
    text: '使用 SARIMA 等方法做活动量、需求量和趋势预测，并解释不确定性。',
  },
  {
    icon: Database,
    title: '数据清洗与整合',
    text: '处理多源数据、缺失值、字段编码与可复用的数据分析管线。',
  },
  {
    icon: ShieldCheck,
    title: '指标可信度',
    text: '重视 holdout、误差、Lift、相关性边界，让结论经得起追问。',
  },
  {
    icon: Languages,
    title: '英语沟通与跨文化协作',
    text: 'PTE 四项 7 分 · 大学英语六级 510 分 · 具备英文学习、工作沟通与海外协作能力。',
  },
  {
    icon: Sparkles,
    title: 'AI 应用与快速交付',
    text: '使用生成式 AI 完成短剧内容制作、Vibe Coding 与个人网站搭建，将想法快速转化为可运行的数字作品。',
  },
  {
    icon: UsersRound,
    title: '跨文化团队协作',
    text: '参与由不同国家与文化背景成员组成的项目团队，能在分工、沟通与协作节奏中有效协调，推进共同交付。',
  },
];

const stats = [
  ['USYD', '悉尼大学商学院'],
  ['211', '西南大学本科背景'],
  ['工科', '电子信息工程背景'],
  ['数分硕士', 'Data Analytics 硕士'],
];

const educationItems = [
  {
    school: 'University of Sydney',
    nameZh: '悉尼大学',
    program: 'Business School | Master of Data Analytics',
    period: '2025.02 - 2026.11',
    image: '/assets/education/usyd-emblem.svg',
    logoClass: 'education-logo-usyd',
  },
  {
    school: 'University of Tasmania',
    nameZh: '塔斯马尼亚大学',
    program: 'Engineering Honours Bachelor Exchange | Electronic Engineering',
    period: '2022.02 - 2023.06',
    image: '/assets/education/utas-emblem-gold.png',
    logoClass: 'education-logo-utas',
  },
  {
    school: 'Southwest University',
    nameZh: '西南大学',
    program: 'Bachelor | Electronic Information Engineering',
    period: '2019.09 - 2023.07',
    image: '/assets/education/swu-emblem-gold.png',
    logoClass: 'education-logo-swu',
  },
];

const tickerItems = [
  { label: 'NYC 市场情报', projectId: 'enpak' },
  { label: '信贷风控建模', projectId: 'credit' },
  { label: '空间数据分析', projectId: 'aedc' },
  { label: 'LightGBM / AUC / KS', projectId: 'credit' },
  { label: 'SARIMA 趋势预测', projectId: 'enpak' },
  { label: 'Ask Ladder 优化', projectId: 'unicef' },
  { label: 'SEIFA 与 AEDC', projectId: 'aedc' },
  { label: '商业策略可视化', projectId: 'enpak' },
];

const projectDetails = Object.fromEntries(portfolioData.projects.map((project) => [project.id, project]));

const chartAssets = {
  enpak: [
    { type: 'nycMap', title: 'NYC Borough 市场机会地图', caption: '按商业密度、人口密度与教育水平识别上线优先区域。' },
    { type: 'matrix', title: '收入机会矩阵', caption: '用商业密度和收入水平对 borough 做机会分层。' },
    { type: 'forecast', title: 'SARIMA 活动趋势预测', caption: '展示未来 12 个月活动量趋势及预测区间。' },
  ],
  aedc: [
    { type: 'aedcMap', title: '澳大利亚 LGA 儿童发展脆弱性地图', caption: '按 DV2% 高亮高脆弱性地区，hover 查看 LGA 与 IRSD。' },
    { type: 'aedcScatter', title: 'SEIFA IRSD 与 DV2 关系', caption: '验证社会经济劣势与儿童发展脆弱性的负相关关系。' },
    { type: 'aedcTop', title: '高 DV2 LGA 排名', caption: '快速定位应优先关注的高风险地区。' },
  ],
  credit: [
    { type: 'creditBands', title: 'Holdout 风险分层坏账率与 Lift', caption: '把模型分数转化为业务可执行的风险排序。' },
    { type: 'featureImportance', title: 'Top 风险特征中文解释', caption: '用可读变量名解释 LightGBM 模型排序依据。' },
  ],
  unicef: [
    { type: 'donationDist', title: '捐赠金额分布', caption: '识别主流捐赠区间与高金额长尾。' },
    { type: 'channelPerformance', title: '渠道/页面/设备表现', caption: '比较不同用户场景下的平均捐赠表现。' },
  ],
};

const TooltipContext = createContext(null);

function App() {
  usePortfolioInteractions();
  usePortfolioMotion();
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  const openProject = (projectId) => {
    setActiveProjectId(projectId);
    window.setTimeout(() => {
      document.querySelector(`[data-project-id="${projectId}"]`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 80);
  };

  return (
    <TooltipContext.Provider value={setTooltip}>
      <main className="site-shell">
        <div className="cursor-spotlight" aria-hidden="true" />
        <Hero openProject={openProject} />
        <div className="post-profile-surface">
          <DotGrid
            dotSize={3}
            gap={22}
            baseColor="#2E2F20"
            activeColor="#B7A06D"
            proximity={92}
            shockRadius={108}
            shockStrength={11}
            resistance={750}
            returnDuration={0.7}
          />
          <div className="post-profile-surface__content">
            <Profile openProject={openProject} />
            <Projects activeProjectId={activeProjectId} setActiveProjectId={setActiveProjectId} />
            <Strengths />
          </div>
        </div>
        <Contact />
      </main>
      <FloatingTooltip tooltip={tooltip} />
    </TooltipContext.Provider>
  );
}

function FloatingTooltip({ tooltip }) {
  return (
    <div
      className={tooltip ? 'floating-tooltip is-active' : 'floating-tooltip'}
      style={tooltip ? { left: tooltip.x + 18, top: tooltip.y + 18 } : undefined}
    >
      {tooltip?.content}
    </div>
  );
}

function useFloatingTooltip() {
  const setTooltip = useContext(TooltipContext);

  const showTooltip = (content, event) => {
    setTooltip?.({ content, x: event.clientX, y: event.clientY });
  };

  const hideTooltip = () => setTooltip?.(null);

  return { showTooltip, hideTooltip };
}

function usePortfolioInteractions() {
  useEffect(() => {
    const root = document.documentElement;
    const spotlight = document.querySelector('.cursor-spotlight');
    const interactiveCards = document.querySelectorAll('.tilt-card');

    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const handlePointerMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        root.style.setProperty('--cursor-x', `${pointerX}px`);
        root.style.setProperty('--cursor-y', `${pointerY}px`);
        pointerFrame = 0;
      });
    };

    const handleCardMove = (event) => {
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -8;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      card.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
      card.style.setProperty('--glow-x', `${x}px`);
      card.style.setProperty('--glow-y', `${y}px`);
    };

    const resetCard = (event) => {
      event.currentTarget.style.setProperty('--tilt-x', '0deg');
      event.currentTarget.style.setProperty('--tilt-y', '0deg');
    };

    window.addEventListener('pointermove', handlePointerMove);
    interactiveCards.forEach((card) => {
      card.addEventListener('pointermove', handleCardMove);
      card.addEventListener('pointerleave', resetCard);
    });

    if (spotlight) {
      spotlight.classList.add('is-ready');
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      interactiveCards.forEach((card) => {
        card.removeEventListener('pointermove', handleCardMove);
        card.removeEventListener('pointerleave', resetCard);
      });
    };
  }, []);
}

function usePortfolioMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal-item').forEach((item) => item.classList.add('is-visible'));
      document.querySelectorAll('.hero-opening-mask').forEach((mask) => mask.remove());
      return undefined;
    }

    const context = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power4.out' } });
      heroTimeline
        .to('.hero-opening-mask', { scaleX: 0, duration: 1.5, stagger: 0.14, transformOrigin: 'right center' })
        .from('.nav', { y: -44, autoAlpha: 0, duration: 0.85 }, '-=0.78')
        .from('.hero-data-panel', { x: 90, autoAlpha: 0, duration: 1.05 }, '-=0.65')
        .from('.hero-title', { y: 150, scaleX: 0.72, autoAlpha: 0, duration: 1.25, transformOrigin: 'left bottom' }, '-=0.75')
        .from('.hero-copy, .hero-actions, .ticker', { y: 42, autoAlpha: 0, duration: 0.8, stagger: 0.12 }, '-=0.76');

      document.querySelectorAll('.section, .closing').forEach((section) => {
        const heading = section.querySelector('.section-heading, .closing-inner');
        const title = heading?.querySelector('h2');
        const eyebrow = heading?.querySelector('.eyebrow');
        const cards = section.querySelectorAll(
          '.profile-grid > *, .education-grid, .experience-highlights > *, .project-card, .magic-bento-card, .closing-actions',
        );

        // Create entrance states only once the section reaches the viewport.
        // This keeps all content visible during the initial page load.
        ScrollTrigger.create({
          trigger: section,
          start: 'top 76%',
          once: true,
          onEnter: () => {
            const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
            if (eyebrow) timeline.from(eyebrow, { x: -130, autoAlpha: 0, duration: 0.75 });
            if (title) {
              timeline.from(
                title,
                { y: 120, scaleX: 0.74, autoAlpha: 0, duration: 1.05, transformOrigin: 'left bottom' },
                '-=0.45',
              );
            }
            if (cards.length) {
              timeline
                .from(
                  cards,
                  { clipPath: 'inset(10% 0 0 0)', duration: 0.95, stagger: 0.11 },
                  '-=0.38',
                )
                .set(cards, { clearProps: 'clipPath' });
            }
          },
        });

        gsap.to(section.querySelectorAll('.education-card img, .project-image img'), {
          yPercent: -7,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
        });
      });
      ScrollTrigger.refresh();
    }, document.body);

    return () => context.revert();
  }, []);
}

function Hero({ openProject }) {
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    const activate = () => setLoadVideo(true);
    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(activate, { timeout: 1800 })
      : window.setTimeout(activate, 900);
    return () => {
      if (window.cancelIdleCallback && typeof idleId === 'number') window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, []);

  return (
    <section className="hero" id="top">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/assets/projects/enpak/market-overview.png"
      >
        {loadVideo ? <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" /> : null}
      </video>
      <div className="hero-scrim" />
      <div className="hero-opening-mask" aria-hidden="true" />
      <div className="hero-opening-mask hero-opening-mask--gold" aria-hidden="true" />
      <div className="hero-data-panel" aria-hidden="true">
        <span>01 / Role</span>
        <strong>Data Analyst</strong>
        <span>02 / Education</span>
        <strong>USYD Business School</strong>
        <span>03 / Foundation</span>
        <strong>Engineering + Analytics</strong>
      </div>
      <header className="nav">
        <a className="brand" href="#top" aria-label="返回首页">
          YY
        </a>
        <nav className="nav-links" aria-label="主导航">
          <a href="#profile">经历</a>
          <a href="#projects">项目</a>
          <a href="#strengths">优势</a>
          <a href="#contact">联系</a>
        </nav>
        <a className="nav-cta" href="mailto:1220210595@qq.com">
          <Mail size={18} />
          联系我
        </a>
      </header>

      <div className="hero-content">
        <p className="eyebrow reveal-item">Data Analyst Portfolio</p>
        <h1 className="hero-title">
          姚羿
          <TextType
            text="把复杂数据转化为可执行的商业判断。"
            typingSpeed={58}
            initialDelay={420}
            loop={false}
            showCursor
            cursorCharacter="|"
            className="hero-text-type"
          />
        </h1>
        <p className="hero-copy">
          数据分析师，关注商业增长、金融风控、空间可达性与公益捐赠行为分析。擅长把模型结果、地图与指标体系组织成清晰的决策故事。
        </p>
        <div className="hero-actions">
          <a className="primary-action" href="#projects">
            查看项目经历
            <ArrowUpRight size={18} />
          </a>
          <a className="secondary-action" href="mailto:1220210595@qq.com">
            1220210595@qq.com
          </a>
        </div>
      </div>
      <Ticker openProject={openProject} />
    </section>
  );
}

function Ticker({ openProject }) {
  return (
    <div className="ticker" aria-label="数据分析能力关键词">
      <div className="ticker-track">
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <button type="button" key={`${item.label}-${index}`} onClick={() => openProject(item.projectId)}>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ExperienceHighlights() {
  return (
    <div className="experience-highlights reveal-item" aria-label="学生工作与官方报道">
      <a
        className="reference-letter-card tilt-card"
        href="/assets/references/steven-hitchcock-recommendation.pdf"
        target="_blank"
        rel="noreferrer"
      >
        <div className="reference-letter-mark" aria-hidden="true">
          <img src="/assets/education/usyd-emblem.svg" alt="" loading="lazy" decoding="async" />
        </div>
        <div className="reference-letter-copy">
          <p className="eyebrow">Academic Reference / USYD Business School</p>
          <h3>Dr Steven Hitchcock 推荐信</h3>
          <p>悉尼大学商学院高级讲师对国际行业实践表现的正式评价，肯定专业准备、分析思维、沟通协作与国际职业环境适应力。</p>
          <span>BWIL6215: International Industry Placement Program · 2023</span>
        </div>
        <span className="reference-letter-action">
          预览推荐信 <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </a>

      <article className="student-success-card tilt-card">
        <div className="student-success-mark" aria-hidden="true">
          <img src="/assets/education/utas-emblem-gold.png" alt="" loading="lazy" decoding="async" />
        </div>
        <div className="student-success-content">
          <p className="eyebrow">Student Employment</p>
          <h3>海外学生工作｜Student Success Leader</h3>
          <p className="student-success-meta">University of Tasmania · Chinese Outreach · 2022</p>
          <ul>
            <li>主动联系需要额外支持的学生</li>
            <li>提供升学、就业、实习与校园支持资源的转介</li>
            <li>提供中文学生跨文化支持与沟通</li>
          </ul>
        </div>
        <a
          className="student-success-action"
          href="/assets/references/utas-student-success-offer.pdf"
          target="_blank"
          rel="noreferrer"
        >
          预览 Offer <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </article>

      <a
        className="official-feature-banner tilt-card"
        href="https://mp.weixin.qq.com/s/hgu61u2-5xiz6NrdqE1w3Q"
        target="_blank"
        rel="noreferrer"
      >
        <div className="official-feature-mark" aria-hidden="true">
          <img src="/assets/education/swu-emblem-gold.png" alt="" loading="lazy" decoding="async" />
        </div>
        <div className="official-feature-copy">
          <p className="eyebrow">OFFICIAL FEATURE / 西南大学西塔学院</p>
          <h3>海外学子风采｜姚羿：为明天谱写新的可能</h3>
          <p>本科阶段的学习表现、学生组织经历与海外升学成果获母校官方公众号专题报道，呈现优秀学子与榜样角色。</p>
          <div className="official-feature-tags" aria-label="报道重点">
            <span>校长激励奖一等奖</span>
            <span>2+2 国际培养</span>
            <span>学生组织与协作</span>
            <span>海外升学</span>
          </div>
        </div>
        <span className="official-feature-action">
          阅读专题报道 <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </a>
    </div>
  );
}

function Profile({ openProject }) {
  const statActions = [
    () => document.querySelector('.education-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
    () => document.querySelector('.education-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
    () => document.querySelector('.education-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
    () => document.querySelector('.education-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
  ];

  return (
    <section className="section profile-section reveal-item" id="profile">
      <div className="section-heading reveal-item">
        <p className="eyebrow">Profile</p>
        <h2>个人经历</h2>
      </div>
      <div className="profile-grid">
        <div className="portrait-panel tilt-card reveal-item" aria-label="姚羿个人视觉">
          <div className="portrait-frame">
            <img className="portrait-photo" src="/assets/profile/yi-yao-studio-portrait.jpg" alt="姚羿影棚肖像" loading="lazy" decoding="async" />
          </div>
          <div className="portrait-lines">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="bio-panel tilt-card reveal-item">
          <p className="bio-lead">
            我是悉尼大学 Business School 的 Data Analytics 硕士，具有西南大学电子信息工程本科背景，项目经历覆盖海外市场分析、信贷风控、公益捐赠优化与教育空间数据分析。
          </p>
          <p>
            我的优势不是只把图做出来，而是从业务目标反推数据结构、指标口径和故事线：哪些地区先进入，哪些客户更高风险，哪些页面影响转化，哪些地区最需要服务补位。
          </p>
          <div className="contact-strip">
            <span>悉尼大学 Business School</span>
            <span>Data Analytics 硕士</span>
            <span>211 本科背景</span>
            <span>电子信息工程</span>
            <span>工科 + 商科数据分析</span>
          </div>
        </div>
        <div className="stats-panel reveal-item">
          {stats.map(([value, label], index) => (
            <button className="stat tilt-card" type="button" key={label} onClick={statActions[index]}>
              <strong>{value}</strong>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="education-grid reveal-item">
        {educationItems.map((item) => (
          <article className={`education-card tilt-card ${item.logoClass}`} key={item.school}>
            <img src={item.image} alt={`${item.nameZh} 校徽`} loading="lazy" decoding="async" />
            <div>
              <p>{item.nameZh}</p>
              <h3>{item.school}</h3>
              <span>{item.program}</span>
              <strong>{item.period}</strong>
            </div>
          </article>
        ))}
      </div>
      <ExperienceHighlights />
    </section>
  );
}

function Projects({ activeProjectId, setActiveProjectId }) {
  const cardRefs = useRef({});

  const toggleProject = (projectId) => {
    setActiveProjectId((current) => (current === projectId ? null : projectId));
    window.setTimeout(() => {
      cardRefs.current[projectId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  };

  const closeProject = (projectId) => {
    setActiveProjectId(null);
    window.setTimeout(() => {
      cardRefs.current[projectId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  };

  return (
    <section className="section projects-section reveal-item" id="projects">
      <div className="section-heading wide reveal-item">
        <div>
          <p className="eyebrow">Selected Work</p>
          <h2>项目经历</h2>
        </div>
      </div>
      <div className={`project-grid ${activeProjectId ? 'has-active-project' : ''}`}>
        {projects.map((project) => (
          <article
            className={`project-card tilt-card reveal-item ${
              activeProjectId === project.id ? 'is-expanded' : ''
            } ${activeProjectId && activeProjectId !== project.id ? 'is-muted' : ''}`}
            key={project.title}
            data-project-id={project.id}
            style={{ '--project-bg': `url(${project.image})` }}
            ref={(node) => {
              cardRefs.current[project.id] = node;
            }}
          >
            <div className="project-image">
              <img src={project.image} alt={`${project.title} 项目图表预览`} loading="lazy" decoding="async" />
              <span>{project.type}</span>
            </div>
            <div className="project-body">
              <p className="project-kicker">{project.subtitle}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="metric-row">
                {project.metrics.map((metric) => (
                  <strong key={metric}>{metric}</strong>
                ))}
              </div>
              <button
                className="project-link"
                type="button"
                onClick={() => (activeProjectId === project.id ? closeProject(project.id) : toggleProject(project.id))}
              >
                <span>{activeProjectId === project.id ? 'Close case' : 'Explore case'}</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
            {activeProjectId === project.id ? (
              <ProjectCase projectId={project.id} onClose={() => closeProject(project.id)} />
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectCase({ projectId, onClose }) {
  const detail = projectDetails[projectId];
  const charts = chartAssets[projectId] ?? [];

  if (!detail) return null;

  return (
    <div className="case-panel">
      <button className="case-close" type="button" onClick={onClose} aria-label="关闭项目详情">
        Close
      </button>
      <div className="case-grid">
        <div className="case-narrative">
          <p className="case-label">{detail.domain}</p>
          <h4>{detail.title}</h4>
          <p>{detail.businessQuestion}</p>
          <div className="case-role">
            <strong>我的角色</strong>
            <span>{detail.role}</span>
          </div>
          <div className="case-insights">
            {detail.insights.map((insight) => (
              <div className="case-insight" key={`${detail.id}-${insight.label}`}>
                <strong>{insight.value}</strong>
                <span>{insight.label}</span>
                <p>{insight.text}</p>
              </div>
            ))}
          </div>
          <details className="tech-details">
            <summary>展开技术细节</summary>
            <div className="tech-grid">
              <div>
                <strong>数据与方法</strong>
                <ul>
                  {detail.dataMethods.map((method) => (
                    <li key={method}>{method}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>业务建议</strong>
                <ul>
                  {detail.recommendations.map((recommendation) => (
                    <li key={recommendation}>{recommendation}</li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        </div>
        <div className="case-charts">
          {charts.map((chart) => (
            <InteractiveChart key={`${projectId}-${chart.type}`} chart={chart} />
          ))}
        </div>
      </div>
    </div>
  );
}

function InteractiveChart({ chart }) {
  const componentMap = {
    nycMap: <NycMarketMap />,
    matrix: <OpportunityMatrix />,
    forecast: <ForecastChart />,
    aedcMap: <AedcMap />,
    aedcScatter: <AedcScatter />,
    aedcTop: <AedcTopBars />,
    creditBands: <CreditBands />,
    featureImportance: <FeatureImportance />,
    donationDist: <DonationDistribution />,
    channelPerformance: <ChannelPerformance />,
  };

  return (
    <article className="chart-card">
      <div className="chart-head">
        <h5>{chart.title}</h5>
        <p>{chart.caption}</p>
      </div>
      {componentMap[chart.type]}
    </article>
  );
}

function useJson(path) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(path)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${path}`);
        return response.json();
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setData([]);
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  return data;
}

function ChartLoading() {
  return <div className="chart-loading">Loading interactive chart</div>;
}

function NycMarketMap() {
  const geojson = useJson('/data/nyc-boroughs.geojson');
  const market = useJson('/data/enpak-market.json');
  const [hovered, setHovered] = useState(null);

  const marketByBorough = useMemo(
    () => Object.fromEntries((market ?? []).map((item) => [item.borough, item])),
    [market],
  );

  if (!geojson || !market) return <ChartLoading />;

  return (
    <GeoSvg
      geojson={geojson}
      getName={(feature) => feature.properties.borough}
      getValue={(feature) => marketByBorough[feature.properties.borough]?.business_density ?? 0}
      getFill={(value) => colorScale(value, 60, 410, ['#171207', '#8f6e32', '#f2d58a'])}
      hovered={hovered}
      onHover={setHovered}
      valueLabel="Business density"
      renderHover={(feature) => {
        const row = marketByBorough[feature.properties.borough];
        if (!row) return null;
        return (
          <>
            <strong>{row.borough}</strong>
            <span>Business density {row.business_density.toFixed(1)}/km2</span>
            <span>Median income ${Math.round(row.median_income).toLocaleString()}</span>
          </>
        );
      }}
    />
  );
}

function AedcMap() {
  const geojson = useJson('/data/aedc-lga-map.geojson');
  const [hovered, setHovered] = useState(null);

  if (!geojson) return <ChartLoading />;

  return (
    <GeoSvg
      geojson={geojson}
      getName={(feature) => feature.properties.lga_name}
      getValue={(feature) => feature.properties.dv2 ?? 0}
      getFill={(value) => colorScale(value, 0, 82, ['#16120a', '#d7b56d', '#c45f35'])}
      hovered={hovered}
      onHover={setHovered}
      valueLabel="DV2 %"
      renderHover={(feature) => (
        <>
          <strong>{feature.properties.lga_name}</strong>
          <span>DV2 {Number(feature.properties.dv2).toFixed(1)}%</span>
          <span>IRSD {Number(feature.properties.irsd).toFixed(0)}</span>
        </>
      )}
    />
  );
}

function GeoSvg({ geojson, getName, getValue, getFill, hovered, onHover, valueLabel, renderHover }) {
  const { showTooltip, hideTooltip } = useFloatingTooltip();
  const width = 720;
  const height = valueLabel === 'DV2 %' ? 540 : 430;
  const bounds = useMemo(() => getGeoBounds(geojson), [geojson]);

  return (
    <div className="geo-chart">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={valueLabel}>
        <g>
          {geojson.features.map((feature) => {
            const name = getName(feature);
            const value = getValue(feature);
            const active = hovered === name;
            return (
              <path
                key={name}
                d={geometryToPath(feature.geometry, bounds, width, height)}
                fill={getFill(value)}
                className={active ? 'map-shape is-active' : 'map-shape'}
                onMouseEnter={(event) => {
                  onHover(name);
                  showTooltip(renderHover(feature), event);
                }}
                onMouseMove={(event) => showTooltip(renderHover(feature), event)}
                onMouseLeave={() => {
                  onHover(null);
                  hideTooltip();
                }}
              />
            );
          })}
        </g>
      </svg>
      <div className="map-legend">
        <span>{valueLabel}</span>
        <i />
      </div>
    </div>
  );
}

function ForecastChart() {
  const data = useJson('/data/enpak-forecast.json');
  const [hovered, setHovered] = useState(null);
  const { showTooltip, hideTooltip } = useFloatingTooltip();

  if (!data) return <ChartLoading />;

  const width = 720;
  const height = 300;
  const pad = { top: 24, right: 24, bottom: 46, left: 54 };
  const maxY = Math.max(...data.map((item) => item.upper));
  const minY = Math.min(0, ...data.map((item) => item.lower));
  const x = (index) => pad.left + (index / (data.length - 1)) * (width - pad.left - pad.right);
  const y = (value) => height - pad.bottom - ((value - minY) / (maxY - minY)) * (height - pad.top - pad.bottom);
  const upperPath = data.map((item, index) => `${index ? 'L' : 'M'} ${x(index)} ${y(item.upper)}`).join(' ');
  const lowerPath = [...data]
    .reverse()
    .map((item, index) => `L ${x(data.length - 1 - index)} ${y(item.lower)}`)
    .join(' ');
  const linePath = data.map((item, index) => `${index ? 'L' : 'M'} ${x(index)} ${y(item.forecast)}`).join(' ');

  return (
    <div className="svg-chart">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="SARIMA forecast">
        <path className="interval-area" d={`${upperPath} ${lowerPath} Z`} />
        <path className="forecast-line" d={linePath} />
        {data.map((item, index) => (
          <circle
            key={item.month}
            className={hovered?.month === item.month ? 'chart-point is-active' : 'chart-point'}
            cx={x(index)}
            cy={y(item.forecast)}
            r="5"
            onMouseEnter={(event) => {
              setHovered(item);
              showTooltip(`${item.month}: ${item.forecast.toFixed(1)} events`, event);
            }}
            onMouseMove={(event) => showTooltip(`${item.month}: ${item.forecast.toFixed(1)} events`, event)}
            onMouseLeave={() => {
              setHovered(null);
              hideTooltip();
            }}
          />
        ))}
        {[0, 300, 600].map((tick) => (
          <g key={tick}>
            <line className="grid-line" x1={pad.left} x2={width - pad.right} y1={y(tick)} y2={y(tick)} />
            <text className="axis-label" x={18} y={y(tick) + 4}>{tick}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function OpportunityMatrix() {
  const data = useJson('/data/enpak-market.json');
  const [hovered, setHovered] = useState(null);

  if (!data) return <ChartLoading />;

  return (
    <ScatterChart
      data={data}
      xKey="business_density"
      yKey="median_income"
      sizeKey="education_share"
      labelKey="borough"
      xLabel="Business density"
      yLabel="Median income"
      formatHover={(item) => `${item.borough}: ${item.business_density.toFixed(1)} density / $${item.median_income.toLocaleString()}`}
      hovered={hovered}
      setHovered={setHovered}
    />
  );
}

function AedcScatter() {
  const data = useJson('/data/aedc-seifa-dv2.json');
  const [hovered, setHovered] = useState(null);

  if (!data) return <ChartLoading />;

  return (
    <ScatterChart
      data={data}
      xKey="irsd"
      yKey="dv2"
      sizeKey="dv2"
      labelKey="lga"
      xLabel="SEIFA IRSD"
      yLabel="DV2 %"
      formatHover={(item) => `${item.lga}: DV2 ${item.dv2.toFixed(1)}%, IRSD ${item.irsd.toFixed(0)}`}
      hovered={hovered}
      setHovered={setHovered}
    />
  );
}

function ScatterChart({ data, xKey, yKey, sizeKey, labelKey, xLabel, yLabel, formatHover, hovered, setHovered }) {
  const { showTooltip, hideTooltip } = useFloatingTooltip();
  const width = 720;
  const height = 300;
  const pad = { top: 22, right: 26, bottom: 46, left: 58 };
  const xExtent = extent(data.map((item) => Number(item[xKey])));
  const yExtent = extent(data.map((item) => Number(item[yKey])));
  const sizeExtent = extent(data.map((item) => Number(item[sizeKey])));
  const sx = (value) => pad.left + normalize(value, xExtent[0], xExtent[1]) * (width - pad.left - pad.right);
  const sy = (value) => height - pad.bottom - normalize(value, yExtent[0], yExtent[1]) * (height - pad.top - pad.bottom);
  const sr = (value) => 5 + normalize(value, sizeExtent[0], sizeExtent[1]) * 12;

  return (
    <div className="svg-chart">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${xLabel} by ${yLabel}`}>
        {[0.25, 0.5, 0.75].map((tick) => (
          <line
            key={`v-${tick}`}
            className="grid-line"
            x1={pad.left + tick * (width - pad.left - pad.right)}
            x2={pad.left + tick * (width - pad.left - pad.right)}
            y1={pad.top}
            y2={height - pad.bottom}
          />
        ))}
        {[0.25, 0.5, 0.75].map((tick) => (
          <line
            key={`h-${tick}`}
            className="grid-line"
            x1={pad.left}
            x2={width - pad.right}
            y1={pad.top + tick * (height - pad.top - pad.bottom)}
            y2={pad.top + tick * (height - pad.top - pad.bottom)}
          />
        ))}
        {data.map((item) => {
          const active = hovered?.[labelKey] === item[labelKey];
          return (
            <circle
              key={item[labelKey]}
              className={active ? 'bubble-point is-active' : 'bubble-point'}
              cx={sx(Number(item[xKey]))}
              cy={sy(Number(item[yKey]))}
              r={sr(Number(item[sizeKey]))}
              onMouseEnter={(event) => {
                setHovered(item);
                showTooltip(formatHover(item), event);
              }}
              onMouseMove={(event) => showTooltip(formatHover(item), event)}
              onMouseLeave={() => {
                setHovered(null);
                hideTooltip();
              }}
            />
          );
        })}
        <text className="axis-title" x={width / 2} y={height - 10}>{xLabel}</text>
        <text className="axis-title" x={-height / 2} y={16} transform="rotate(-90)">{yLabel}</text>
      </svg>
    </div>
  );
}

function AedcTopBars() {
  const data = useJson('/data/aedc-top-dv2.json');
  const [hovered, setHovered] = useState(null);
  if (!data) return <ChartLoading />;
  return <BarChart data={data.slice(0, 8)} labelKey="lga" valueKey="dv2" suffix="%" hovered={hovered} setHovered={setHovered} />;
}

function CreditBands() {
  const data = useJson('/data/credit-score-bands.json');
  const [hovered, setHovered] = useState(null);
  if (!data) return <ChartLoading />;
  return <BarChart data={data.slice(0, 6)} labelKey="risk_band" valueKey="bad_rate" valueMultiplier={100} suffix="%" hovered={hovered} setHovered={setHovered} />;
}

function FeatureImportance() {
  const data = useJson('/data/credit-feature-importance.json');
  const [hovered, setHovered] = useState(null);
  if (!data) return <ChartLoading />;
  return <BarChart data={data.slice(0, 8)} labelKey="label_zh" valueKey="importance" suffix="" hovered={hovered} setHovered={setHovered} />;
}

function DonationDistribution() {
  const data = useJson('/data/unicef-donation-distribution.json');
  const [hovered, setHovered] = useState(null);
  if (!data) return <ChartLoading />;
  return <BarChart data={data} labelKey="bucket" valueKey="count" suffix=" sessions" hovered={hovered} setHovered={setHovered} />;
}

function ChannelPerformance() {
  const data = useJson('/data/unicef-channel-performance.json');
  const [hovered, setHovered] = useState(null);
  if (!data) return <ChartLoading />;
  return <BarChart data={data} labelKey="segment" valueKey="mean_revenue" prefix="AUD " hovered={hovered} setHovered={setHovered} />;
}

function BarChart({ data, labelKey, valueKey, valueMultiplier = 1, prefix = '', suffix = '', hovered, setHovered }) {
  const { showTooltip, hideTooltip } = useFloatingTooltip();
  const maxValue = Math.max(...data.map((item) => Number(item[valueKey]) * valueMultiplier));
  return (
    <div className="bar-chart">
      {data.map((item) => {
        const value = Number(item[valueKey]) * valueMultiplier;
        const active = hovered?.[labelKey] === item[labelKey];
        return (
          <div
            className={active ? 'bar-row is-active' : 'bar-row'}
            key={item[labelKey]}
            onMouseEnter={(event) => {
              setHovered(item);
              showTooltip(
                `${item[labelKey]}: ${prefix}${value.toLocaleString(undefined, { maximumFractionDigits: 1 })}${suffix}`,
                event,
              );
            }}
            onMouseMove={(event) =>
              showTooltip(
                `${item[labelKey]}: ${prefix}${value.toLocaleString(undefined, { maximumFractionDigits: 1 })}${suffix}`,
                event,
              )
            }
            onMouseLeave={() => {
              setHovered(null);
              hideTooltip();
            }}
          >
            <span>{item[labelKey]}</span>
            <i style={{ '--bar-width': `${(value / maxValue) * 100}%` }} />
            <strong>{prefix}{value.toLocaleString(undefined, { maximumFractionDigits: 1 })}{suffix}</strong>
          </div>
        );
      })}
    </div>
  );
}

function getGeoBounds(geojson) {
  const points = [];
  geojson.features.forEach((feature) => collectCoordinates(feature.geometry.coordinates, points));
  const lons = points.map((point) => point[0]);
  const lats = points.map((point) => point[1]);
  return {
    minLon: Math.min(...lons),
    maxLon: Math.max(...lons),
    minLat: Math.min(...lats),
    maxLat: Math.max(...lats),
  };
}

function collectCoordinates(input, output) {
  if (typeof input?.[0] === 'number') {
    output.push(input);
    return;
  }
  input.forEach((item) => collectCoordinates(item, output));
}

function geometryToPath(geometry, bounds, width, height) {
  const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
  return polygons
    .map((polygon) =>
      polygon
        .map((ring) =>
          ring
            .map((point, index) => {
              const projected = projectPoint(point, bounds, width, height);
              return `${index === 0 ? 'M' : 'L'} ${projected.x.toFixed(2)} ${projected.y.toFixed(2)}`;
            })
            .join(' ') + ' Z',
        )
        .join(' '),
    )
    .join(' ');
}

function projectPoint([lon, lat], bounds, width, height) {
  const padding = 14;
  const lonRange = bounds.maxLon - bounds.minLon || 1;
  const latRange = bounds.maxLat - bounds.minLat || 1;
  const scale = Math.min((width - padding * 2) / lonRange, (height - padding * 2) / latRange);
  const mapWidth = lonRange * scale;
  const mapHeight = latRange * scale;
  const offsetX = (width - mapWidth) / 2;
  const offsetY = (height - mapHeight) / 2;
  const x = offsetX + (lon - bounds.minLon) * scale;
  const y = height - offsetY - (lat - bounds.minLat) * scale;
  return { x, y };
}

function extent(values) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = (max - min) * 0.08 || 1;
  return [min - pad, max + pad];
}

function normalize(value, min, max) {
  if (max === min) return 0.5;
  return (Number(value) - min) / (max - min);
}

function colorScale(value, min, max, colors) {
  const t = Math.max(0, Math.min(1, normalize(value, min, max)));
  const mid = colors.length === 3 ? 0.5 : 1;
  if (colors.length === 3 && t > mid) {
    return mixColor(colors[1], colors[2], (t - mid) / mid);
  }
  if (colors.length === 3) {
    return mixColor(colors[0], colors[1], t / mid);
  }
  return mixColor(colors[0], colors[1], t);
}

function mixColor(a, b, amount) {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const mixed = ca.map((channel, index) => Math.round(channel + (cb[index] - channel) * amount));
  return `rgb(${mixed.join(', ')})`;
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  return [0, 2, 4].map((index) => parseInt(clean.slice(index, index + 2), 16));
}

function Strengths() {
  return (
    <section className="section strengths-section reveal-item" id="strengths">
      <div className="section-heading reveal-item">
        <p className="eyebrow">Capability</p>
        <h2>个人优势</h2>
      </div>
      <MagicBento
        cards={strengths}
        glowColor="215, 181, 109"
        particleCount={8}
        enableTilt
        enableMagnetism
        clickEffect
      />
    </section>
  );
}

function Contact() {
  return (
    <section className="closing" id="contact">
      <div className="closing-inner reveal-item">
        <p className="eyebrow">Contact</p>
        <h2>让数据分析从“看见问题”走到“推动决策”。</h2>
        <p>
          我正在寻找数据分析、商业分析、风控建模与数据可视化相关机会。欢迎通过邮件联系我。
        </p>
        <div className="closing-actions">
          <a className="closing-action" href="mailto:1220210595@qq.com">
            <Mail size={20} />
            1220210595@qq.com
          </a>
          <a className="closing-action" href="tel:15340554050">15340554050</a>
          <span className="closing-action">微信 YYaoi001</span>
        </div>
      </div>
      <Sparkles className="closing-mark" size={180} aria-hidden="true" />
    </section>
  );
}

const rootElement = document.getElementById('root');
const root = window.__yiYaoPortfolioRoot ?? createRoot(rootElement);
window.__yiYaoPortfolioRoot = root;
root.render(<App />);
