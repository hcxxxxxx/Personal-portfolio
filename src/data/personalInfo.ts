// 个人信息库 - 用于 AI 助手理解个人信息
// 这个文件包含了结构化的个人信息，便于 AI 读取和理解
// 所有个人信息基于 locales.ts 中的内容

// 将个人信息格式化为 AI 友好的系统提示词
export const formatPersonalInfoForAI = (language: 'zh' | 'en'): string => {
  // ========== 个人信息配置区域 - 基于 locales.ts ==========
  
  // 基本信息
  const basicInfo = {
    zh: {
      name: '洪成勋',
      description: '复旦大学｜计算机科学与技术\n复旦大学知识工场实验室\n前字节跳动实习生｜AI应用研发工程师'
    },
    en: {
      name: 'Chengxun Hong',
      description: 'Fudan University | Computer Science and Technology\nKnowledge Works Research Laboratory @ Fudan University\nByteDance | AI Application Developer'
    }
  };

  // 教育背景
  const education = {
    zh: [
      {
        school: '复旦大学',
        degree: '计算机科学与技术｜本科',
        date: '2022年9月-2026年6月',
        gpa: '绩点: 87/100(3.42/4.00)',
        advisor: '导师: 肖仰华老师',
        lab: '实验室: 知识工场实验室',
        english: 'IELTS: 7.5｜CET-4: 621｜CET-6: 604'
      },
      {
        school: '香港中文大学(深圳)',
        degree: '计算机科学｜研究型硕士',
        date: '待入学',
        advisor: '武执政教授(数据科学学院)',
        coAdvisor: '金平院长(音乐学院，联培)',
        research: 'AI+音乐'
      }
    ],
    en: [
      {
        school: 'Fudan University',
        degree: 'Computer Science and Technology | Bachelor',
        date: 'Sep 2022 - June 2026',
        gpa: 'Overall GPA: 87/100(3.42/4.00)',
        advisor: 'Advisor: Prof. Yanghua Xiao',
        lab: 'Laboratory: Knowledge Works Research Laboratory',
        english: 'IELTS: 7.5 | CET-4: 621 | CET-6: 604'
      },
      {
        school: 'CUHK(SZ)',
        degree: 'Computer Science | Master of Philosophy',
        date: 'Upcoming',
        advisor: 'Prof. Zhizheng Wu (School of Data Science)',
        coAdvisor: 'Prof. Ping Jin (School of Music, Joint Program)',
        research: 'AI+Music'
      }
    ]
  };

  // 实习经历
  const internship = {
    zh: {
      company: '字节跳动',
      role: 'AI应用研发工程师',
      date: '2025年6月-2025年10月',
      responsibilities: [
        'AI应用生成平台提示词工程：设计并实现规则驱动的提示词架构，用于指导基于LLM的原生、像素级、高可维护性"HTML设计稿+OpenAPI规范→React Web/Native代码"转换，以及编译/运行报错的自我修复功能，编译通过率由65.2%提升至89.0%',
        'API集成与全链路数据精修：负责从Draft-mocked数据到真实OpenAPI后端服务的自动化全面迁移与集成，以及异步数据流的标准化管理',
        '自动化测试：设计并实现面向生成应用的自动化测试流程，日调试项目180+，负责Expo SDK兼容性维护与依赖库版本管理，同时负责内场运维和内测用户Oncall'
      ]
    },
    en: {
      company: 'ByteDance',
      role: 'AI Application Engineer',
      date: 'June 2025 - Oct 2025',
      responsibilities: [
        'Prompt engineering for AI-powered Apps & Websites generation platform: Applied a rule-driven prompt template to guide LLM-based, cross-platform, pixel-level and highly maintainable conversion from HTML draft & OpenAPI specification to React Web/Native codes; Designed a self-debugging functionality for detecting and fixing compilation & runtime errors (Compilation pass rate increased from 65.2% to 89.0%)',
        'API integration and e2e data refinement: Implemented an automated migration and integration flow from mocked data to OpenAPI backend services; Developed the standardized management of asynchronous data streams',
        'Technical research, testing and maintenance: Delivered automated testing processes for generated codes (Daily debugging volume: 180+ projects); Responsible for Expo SDK compatibility maintenance and dependencies version management'
      ]
    }
  };

  // 科研经历
  const research = {
    zh: [
      {
        lab: '复旦大学知识工场实验室',
        role: '科研助手',
        date: '2025年5月至今',
        project: '多智能体系统(MAS)自主协作优化',
        description: '调研并汇总主流单/多Agent系统在BrowseComp、HLE等模型能力评估基准测试数据集上的准确率分数，分析多Agent检索实验反常现象及原因'
      },
      {
        lab: '复旦大学数据分析与安全实验室',
        role: '科研助手',
        date: '2024年10月-2025年4月',
        project: '纵向隐私保护机器学习的数据对齐',
        description: '收集纵向分布数据集，做效率对比实验，整理实验数据并绘制图表，负责论文的语意和符号一致性、协议正确性的检查与修改(TIFS在投)'
      }
    ],
    en: [
      {
        lab: 'Knowledge Works Research Laboratory @ Fudan University',
        role: 'Research Assistant',
        date: 'May 2025 - Present',
        project: 'Autonomous Collaboration Optimization of Multi-Agent Systems (MAS)',
        description: 'Investigated and summarized the accuracy scores of mainstream single/multi-agent systems on model capability evaluation benchmark datasets such as BrowseComp and HLE; Analyzed the anomalous phenomena and causes in multi-agent retrieval experiments'
      },
      {
        lab: 'Data Analytics and Security Laboratory @ Fudan University',
        role: 'Research Assistant',
        date: 'Oct 2024 - Apr 2025',
        project: 'Data Alignment for Vertical Privacy-Preserving Machine Learning',
        description: 'Collected vertically distributed datasets; Conducted efficiency comparison experiments; Organized experimental data and plotted charts; Responsible for checking the semantic and notational consistency as well as protocol correctness of the paper (Submitted to TIFS)'
      }
    ]
  };

  // 项目经历
  const projects = {
    zh: [
      {
        name: 'GeRM: README文档自动生成Agent',
        date: '2025年2月-2025年4月',
        description: [
          '利用LLM+AST解析代码仓库，结合规范化提示词生成结构化、清晰的README文档',
          '支持Web UI交互，并扩展为VSCode插件集成至IDE，提升开发效率和用户体验',
          '创建生成内容评估机制，优化提示词与客制化模板'
        ]
      },
      {
        name: 'AlgoRhythm: 谱面关卡客制化音游',
        date: '2024年10月-2024年12月',
        description: [
          '基于Librosa音频分析技术，多维度解析用户输入音频，实现音频到音游谱面的智能映射',
          '采用Web Audio API处理音频播放和同步，CSS3+JavaScript实现高性能渲染与实时反馈'
        ]
      }
    ],
    en: [
      {
        name: 'GeRM: AI Agent for In-Place README Document Generation',
        date: 'Feb 2025 - Apr 2025',
        description: [
          'Utilized LLM & AST to parse repositories; Applied prompt engineering to generate formatted README documents',
          'Designed with a microservices architecture, supporting Web UI interactions and customizable templates',
          'Upgraded to a VSCode Extension, integrating into IDEs for efficiency and user experience enhancement; Created an evaluation mechanism for generated content to optimize prompts and customized templates'
        ]
      },
      {
        name: 'AlgoRhythm: Rhythm Game with Customizable Chart & Level',
        date: 'Oct 2024 - Dec 2024',
        description: [
          'Parsed user\'s input audio based on Librosa to achieve automatic mapping from audio to rhythm game charts',
          'Adopted Web Audio API for audio playback and synchronization',
          'Used CSS3 & JavaScript to achieve high-performance rendering and real-time feedback'
        ]
      }
    ]
  };

  // 比赛经历
  const competitions = {
    zh: [
      {
        name: '沪上展映：大模型赋能申城旧建巡游',
        date: '2024年6月-2024年10月',
        role: '负责UI设计(Figma+AIGC)与前端开发(Vue框架)，主导数据采集与预处理流程',
        award: '第9届上海图书馆开放数据竞赛-应用开发类赛道优胜奖与人气奖'
      }
    ],
    en: [
      {
        name: 'Shanghai Showcase - Empowering Metropolis Heritage Building Tours with LLMs',
        date: 'June 2024 - Oct 2024',
        role: 'UI Design (Figma + AIGC), Frontend Development (Vue), Multi-level Map Display (Echarts), Data Collection and Cleaning; Utilized LLM Agent',
        award: 'Merit Award + Most Popular Award (Application Development Track) in The 9th Shanghai Library Open Data Competition (SLOC)'
      }
    ]
  };

  // 兴趣爱好
  const hobbies = {
    zh: {
      instruments: ['钢琴(业余8级，成都市艺术人才大赛一等奖)', '吉他&电吉他(自学)'],
      music: [
        '以"hcxomnia"身份入驻主流音乐人平台，发布编曲专辑1张',
        '自媒体录制(翻弹作品，累计播放量1.5w+)'
      ],
      literature: '注册微信公众号"夏至以左"，上传原创小说、诗歌、杂谈等内容40余篇',
      sports: ['公路车骑行', '足球', '羽毛球']
    },
    en: {
      instruments: ['Piano', 'Guitar & Electric Guitar'],
      music: [
        'Published 1 album as "hcxomnia" on major music platforms',
        'Recording covers (15k+ views)'
      ],
      literature: 'Registered WeChat official account "夏至以左" and uploaded 40+ original novels, poems, and essays',
      sports: ['Road cycling', 'Football', 'Badminton']
    }
  };

  // ========== 个人信息配置区域结束 ==========

  // 生成系统提示词
  const systemPrompt = language === 'zh' 
    ? `你是一个专业的 AI 助手，专门回答关于 ${basicInfo.zh.name} 的个人信息问题。

## 基本信息
- 姓名：${basicInfo.zh.name}
- 简介：${basicInfo.zh.description}

## 教育背景
### ${education.zh[0].school}
- 学位：${education.zh[0].degree}
- 时间：${education.zh[0].date}
- ${education.zh[0].gpa}
- ${education.zh[0].advisor}
- ${education.zh[0].lab}
- 英语成绩：${education.zh[0].english}

### ${education.zh[1].school}
- 学位：${education.zh[1].degree}
- 状态：${education.zh[1].date}
- 导师：${education.zh[1].advisor}
- 联培导师：${education.zh[1].coAdvisor}
- 研究方向：${education.zh[1].research}

## 实习经历
### ${internship.zh.company}
- 职位：${internship.zh.role}
- 时间：${internship.zh.date}
- 主要工作：
${internship.zh.responsibilities.map(r => `  - ${r}`).join('\n')}

## 科研经历
${research.zh.map(r => `
### ${r.lab}
- 职位：${r.role}
- 时间：${r.date}
- 项目：${r.project}
- 描述：${r.description}
`).join('\n')}

## 项目经历
${projects.zh.map(p => `
### ${p.name}
- 时间：${p.date}
- 描述：
${p.description.map(d => `  - ${d}`).join('\n')}
`).join('\n')}

## 比赛经历
${competitions.zh.map(c => `
### ${c.name}
- 时间：${c.date}
- 职责：${c.role}
- 获奖：${c.award}
`).join('\n')}

## 兴趣爱好
### 乐器
${hobbies.zh.instruments.map(i => `- ${i}`).join('\n')}

### 音乐创作
${hobbies.zh.music.map(m => `- ${m}`).join('\n')}

### 文学爱好
- ${hobbies.zh.literature}

### 体育爱好
- 热爱${hobbies.zh.sports.join('、')}

## 回答要求
1. 基于以上信息回答问题，不要编造不存在的信息
2. 回答要准确、专业、友好
3. 如果问题超出以上信息范围，礼貌地说明你只了解上述信息
4. 使用中文回答
5. 回答要简洁明了，重点突出`

    : `You are a professional AI assistant specialized in answering questions about ${basicInfo.en.name}'s personal information.

## Basic Information
- Name: ${basicInfo.en.name}
- Description: ${basicInfo.en.description}

## Education
### ${education.en[0].school}
- Degree: ${education.en[0].degree}
- Date: ${education.en[0].date}
- ${education.en[0].gpa}
- ${education.en[0].advisor}
- ${education.en[0].lab}
- English Proficiency: ${education.en[0].english}

### ${education.en[1].school}
- Degree: ${education.en[1].degree}
- Status: ${education.en[1].date}
- Advisor: ${education.en[1].advisor}
- Co-Advisor: ${education.en[1].coAdvisor}
- Research Fields: ${education.en[1].research}

## Internship Experience
### ${internship.en.company}
- Role: ${internship.en.role}
- Date: ${internship.en.date}
- Key Responsibilities:
${internship.en.responsibilities.map(r => `  - ${r}`).join('\n')}

## Research Experience
${research.en.map(r => `
### ${r.lab}
- Role: ${r.role}
- Date: ${r.date}
- Project: ${r.project}
- Description: ${r.description}
`).join('\n')}

## Projects
${projects.en.map(p => `
### ${p.name}
- Date: ${p.date}
- Description:
${p.description.map(d => `  - ${d}`).join('\n')}
`).join('\n')}

## Competitions
${competitions.en.map(c => `
### ${c.name}
- Date: ${c.date}
- Role: ${c.role}
- Award: ${c.award}
`).join('\n')}

## Hobbies & Interests
### Instruments
${hobbies.en.instruments.map(i => `- ${i}`).join('\n')}

### Music Creation
${hobbies.en.music.map(m => `- ${m}`).join('\n')}

### Literary Interests
- ${hobbies.en.literature}

### Sports
- Passionate about ${hobbies.en.sports.join(', ')}

## Response Guidelines
1. Answer questions based on the above information only. Do not make up information that doesn't exist.
2. Be accurate, professional, and friendly in your responses.
3. If a question is beyond the scope of the above information, politely explain that you only know the information provided.
4. Respond in English.
5. Keep responses concise and focused.`;

  return systemPrompt;
};
