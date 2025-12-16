// 语言类型定义
export type Language = 'zh' | 'en';

// 模块内容类型 - 使用 Markdown 格式
export interface ModuleContent {
  title: string;
  subtitle: string;
  content: string; // Markdown 格式的内容
}

// 所有文本内容的类型定义
export interface LocaleTexts {
  // 侧边导航
  nav: {
    hero: {
      name: string;
      description: string;
    };
    experience: {
      name: string;
      description: string;
    };
    chat: {
      name: string;
      description: string;
    };
    contact: {
      name: string;
      description: string;
    };
  };
  
  // 英雄部分
  hero: {
    name: string;
    description: string;
  };
  
  // 联系部分
  contact: {
    title: string;
    subtitle: string;
    connectWithMe: string;
    email: string;
    github: string;
    linkedin: string;
    responseTime: string;
    responseTimeText: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      sendMessage: string;
      sending: string;
      success: string;
    };
  };
  
  // AI 聊天部分
  chat: {
    initialMessage: string;
    placeholder: string;
    disclaimer: string;
    responses: {
      experience: string;
      default: string;
    };
  };
  
  // 经历部分 - 6个模块，每个模块使用 Markdown 格式
  experience: {
    sectionTitle: string;
    education: ModuleContent;
    internship: ModuleContent;
    research: ModuleContent;
    projects: ModuleContent;
    competitions: ModuleContent;
    hobbies: ModuleContent;
  };
}

// 中文文本
const zh: LocaleTexts = {
  nav: {
    hero: {
      name: '关于',
      description: '了解我',
    },
    experience: {
      name: '经历',
      description: '我的交互式简历',
    },
    chat: {
      name: 'AI 聊天',
      description: '与我的 AI 聊天',
    },
    contact: {
      name: 'AlgoRhythm',
      description: '音游体验',
    },
  },
  hero: {
    name: '洪成勋',
    description: '复旦大学｜计算机科学与技术\n复旦大学知识工场实验室\n前字节跳动实习生｜AI应用研发工程师',
  },
  contact: {
    title: 'AlgoRhythm',
    subtitle: '上传你喜欢的音乐，生成专属谱面！',
    connectWithMe: '与我联系',
    email: '邮箱',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    responseTime: '响应时间',
    responseTimeText: '通常在 24 小时内回复',
    form: {
      name: '姓名',
      namePlaceholder: '',
      email: '邮箱',
      emailPlaceholder: '',
      message: '消息',
      messagePlaceholder: '',
      sendMessage: '发送消息',
      sending: '发送中...',
      success: '您的邮件客户端应该已经打开。谢谢！',
    },
  },
  chat: {
    initialMessage: '你好！我是洪成勋的 AI 助手。你可以问我任何关于洪成勋的经历、技能、项目或兴趣的问题。让我们开始吧～',
    placeholder: '你可以向我询问关于洪成勋的问题...',
    disclaimer: 'AI 可能会犯错。请考虑检查重要信息。',
    responses: {
      experience: '',
      default: '这是一个有趣的问题！我很乐意讨论更多关于我的背景、项目或技术兴趣的内容。随时问我关于我的经历、技能、教育或任何其他你想知道的事情。',
    },
  },
  experience: {
    sectionTitle: '个人简历',
    education: {
      title: '教育经历',
      subtitle: '',
      content: `# 复旦大学
计算机科学与技术｜本科｜2022年9月-2026年6月
---

### 学业信息
**·** 绩点: 87/100(3.42/4.00)
**·** 导师: 肖仰华老师
**·** 实验室: 知识工场实验室

### 英语成绩
**·** IELTS: 7.5｜CET-4: 621｜CET-6: 604

# 香港中文大学(深圳)
计算机科学｜研究型硕士｜待入学
---

### 导师
**·** 武执政教授(数据科学学院)
**·** 金平院长(音乐学院，联培)

### 研究方向
**·** AI+音乐
`,
    },
    internship: {
      title: '实习经历',
      subtitle: '',
      content: `# 字节跳动
AI应用研发工程师｜2025年6月-2025年10月
---

### AI应用生成平台提示词工程
**·** 设计并实现规则驱动的提示词架构，用于指导基于LLM的原生、像素级、高可维护性"HTML设计稿+OpenAPI规范→React Web/Native代码"转换，以及编译/运行报错的自我修复功能，编译通过率由65.2%提升至89.0%

### API集成与全链路数据精修
**·** 负责从Draft-mocked数据到真实OpenAPI后端服务的自动化全面迁移与集成，以及异步数据流的标准化管理

### 自动化测试
**·** 设计并实现面向生成应用的自动化测试流程，日调试项目180+，负责Expo SDK兼容性维护与依赖库版本管理，同时负责内场运维和内测用户Oncall`,
    },
    research: {
      title: '科研经历',
      subtitle: '',
      content: `# 复旦大学知识工场实验室
科研助手｜2025年5月至今
---

### 多智能体系统(MAS)自主协作优化
**·** 调研并汇总主流单/多Agent系统在*BrowseComp*、*HLE*等模型能力评估基准测试数据集上的准确率分数，分析多Agent检索实验反常现象及原因

# 复旦大学数据分析与安全实验室
科研助手｜2024年10月-2025年4月
---

### 纵向隐私保护机器学习的数据对齐
**·** 收集纵向分布数据集，做效率对比实验，整理实验数据并绘制图表，负责论文的语意和符号一致性、协议正确性的检查与修改(TIFS在投)`,
    },
    projects: {
      title: '项目经历',
      subtitle: '',
      content: `# GeRM: README文档自动生成Agent
个人项目｜2025年2月-2025年4月
---

**·** 利用LLM+AST解析代码仓库，结合规范化提示词生成结构化、清晰的README文档
**·** 支持Web UI交互，并扩展为VSCode插件集成至IDE，提升开发效率和用户体验
**·** 创建生成内容评估机制，优化提示词与客制化模板

# AlgoRhythm: 谱面关卡客制化音游
个人项目｜2024年10月-2024年12月
---

**·** 基于Librosa音频分析技术，多维度解析用户输入音频，实现音频到音游谱面的智能映射
**·** 采用Web Audio API处理音频播放和同步，CSS3+JavaScript实现高性能渲染与实时反馈`,
    },
    competitions: {
      title: '比赛经历',
      subtitle: '',
      content: `# 沪上展映：大模型赋能申城旧建巡游
竞赛获奖｜2024年6月-2024年10月
---

### 职责
**·** 负责UI设计(Figma+AIGC)与前端开发(Vue框架)，主导数据采集与预处理流程

### 获奖情况
**·** 项目获第9届上海图书馆开放数据竞赛-应用开发类赛道优胜奖与人气奖`,
    },
    hobbies: {
      title: '兴趣爱好',
      subtitle: '',
      content: `
### 乐器学习
**·** 钢琴(业余8级，成都市艺术人才大赛一等奖)
**·** 吉他&电吉他(自学)

### 音乐创作
**·** 以“hcxomnia”身份入驻主流音乐人平台，发布编曲专辑1张
**·** 自媒体录制(翻弹作品，累计播放量1.5w+)

### 文学爱好
**·** 注册微信公众号“夏至以左”，上传原创小说、诗歌、杂谈等内容40余篇

### 体育爱好
**·** 热爱公路车骑行、足球、羽毛球
`,
    },
  },
};

// 英文文本
const en: LocaleTexts = {
  nav: {
    hero: {
      name: 'About',
      description: 'Learn about me',
    },
    experience: {
      name: 'Experience',
      description: 'My interactive resume',
    },
    chat: {
      name: 'AI Chat',
      description: 'Chat with my AI',
    },
    contact: {
      name: 'AlgoRhythm',
      description: 'Play music game',
    },
  },
  hero: {
    name: 'Chengxun Hong',
    description: 'Fudan University | Computer Science and Technology\nKnowledge Works Research Laboratory @ Fudan University\nByteDance | AI Application Developer',
  },
  contact: {
    title: 'AlgoRhythm',
    subtitle: 'Upload your favorite music and generate a custom chart!',
    connectWithMe: 'Connect With Me',
    email: 'Email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    responseTime: 'Response Time',
    responseTimeText: 'Usually responds within 24 hours',
    form: {
      name: 'Name',
      namePlaceholder: '',
      email: 'Email',
      emailPlaceholder: '',
      message: 'Message',
      messagePlaceholder: '',
      sendMessage: 'Send me a message',
      sending: 'Sending...',
      success: 'Your mail client should have opened. Thank you!',
    },
  },
  chat: {
    initialMessage: 'Hello! I\'m your AI assistant. You can ask me anything about my experience, skills, projects, or interests. How can I help you today?',
    placeholder: 'Ask me anything about Chengxun...',
    disclaimer: 'AI can make mistakes. Consider checking important information.',
    responses: {
      experience: '',
      default: 'That\'s an interesting question! I\'d be happy to discuss more about my background, projects, or technical interests. Feel free to ask me about my experience, skills, education, or anything else you\'d like to know.',
    },
  },
  experience: {
    sectionTitle: 'Personal Resume',
    education: {
      title: 'Education',
      subtitle: '',
      content: `# Fudan University
Computer Science and Technology｜Bachelor｜Sep 2022-June 2026
---

### Academic Information
**·** Overall GPA: 87/100(3.42/4.00)
**·** Advisor: Prof. Yanghua Xiao
**·** Laboratory: Knowledge Works Research Laboratory

### English Proficiency
**·** IELTS: 7.5｜CET-4: 621｜CET-6: 604

# CUHK(SZ)
Computer Science｜Master of Philosophy｜Upcoming
---

### Advisor
**·** Prof. Zhizheng Wu(School of Data Science)
**·** Prof. Ping Jin(School of Music, Joint Program)

### Research Fields
**·** AI+Music
`,
    },
    internship: {
      title: 'Internship',
      subtitle: '',
      content: `# ByteDance
AI Application Engineer｜June 2025-Oct 2025
---

### Prompt engineering for AI-powered Apps & Websites generation platform
**·** Applied a rule-driven prompt template to guide LLM-based, cross-platform, pixel-level and highly maintainable conversion from HTML draft & OpenAPI specification to React Web/Native codes
**·** Designed a self-debugging functionality for detecting and fixing compilation & runtime errors (Compilation pass rate increased from 65.2% to 89.0%)

### API integration and e2e data refinement
**·** Implemented an automated migration and integration flow from mocked data to OpenAPI backend services
**·** Developed the standardized management of asynchronous data streams

### Technical research, testing and maintenance
**·** Delivered automated testing processes for generated codes (Daily debugging volume: 180+ projects)
**·** Responsible for Expo SDK compatibility maintenance and dependencies version management`,
    },
    research: {
      title: 'Research',
      subtitle: '',
      content: `# Knowledge Works Research Laboratory
Research Assistant｜May 2025-Present
---

### Autonomous Collaboration Optimization of Multi-Agent Systems (MAS)
**·** Investigated and summarized the accuracy scores of mainstream single/multi-agent systems on model capability evaluation benchmark datasets such as *BrowseComp* and *HLE*
**·** Analyzed the anomalous phenomena and causes in multi-agent retrieval experiments

# Data Analytics and Security Laboratory
Research Assistant｜Oct 2024-Apr 2025
---

### Data Alignment for Vertical Privacy-Preserving Machine Learning
**·** Collected vertically distributed datasets; Conducted efficiency comparison experiments; Organized experimental data and plotted charts
**·** Responsible for checking the semantic and notational consistency as well as protocol correctness of the paper (Submitted to TIFS)`,
    },
    projects: {
      title: 'Projects',
      subtitle: '',
      content: `# GeRM: AI Agent for In-Place README Document Generation
Personal Project｜Feb 2025-Apr 2025
---

**·** Utilized LLM & AST to parse repositories; Applied prompt engineering to generate formatted README documents
**·** Designed with a microservices architecture, supporting Web UI interactions and customizable templates
**·** Upgraded to a VSCode Extension, integrating into IDEs for efficiency and user experience enhancement; Created an evaluation mechanism for generated content to optimize prompts and customized templates

# AlgoRhythm: Rhythm Game with Customizable Chart & Level
Personal Project｜Oct 2024-Dec 2024
---

**·** Parsed user's input audio based on Librosa to achieve automatic mapping from audio to rhythm game charts
**·** Adopted Web Audio API for audio playback and synchronization
**·** Used CSS3 & JavaScript to achieve high-performance rendering and real-time feedback`,
    },
    competitions: {
      title: 'Competitions',
      subtitle: '',
      content: `# Shanghai Showcase - Empowering Metropolis Heritage Building Tours with LLMs
Competition Awards｜June 2024-Oct 2024
---

### Responsibilities
**·** UI Design (Figma + AIGC), Frontend Development (Vue), Multi-level Map Display (Echarts), Data Collection and Cleaning; Utilized LLM Agent

### Awards
**·** Merit Award + Most Popular Award (Application Development Track) in The 9th Shanghai Library Open Data Competition (SLOC)`,
    },
    hobbies: {
      title: 'Hobbies',
      subtitle: '',
      content: `
### Instruments
**·** Piano
**·** Guitar & Electric Guitar

### Music Creation
**·** Published 1 album as "hcxomnia" on major music platforms
**·** Recording covers (15k+ views)

### Literary Interests
**·** Registered WeChat official account "夏至以左" and uploaded 40+ original novels, poems, and essays

### Sports Interests
**·** Passionate about road cycling, football, and badminton`,
    },
  },
};

// 导出所有语言文本
export const locales: Record<Language, LocaleTexts> = {
  zh,
  en,
};

// 获取指定语言的文本
export const getTexts = (lang: Language): LocaleTexts => locales[lang];
