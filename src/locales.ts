// 语言类型定义
export type Language = 'zh' | 'en';

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
  
  // 经历部分
  experience: {
    education: {
      title: string;
      school: string;
      degree: string;
      date: string;
      points: string[];
    };
    competition: {
      title: string;
      name: string;
      award: string;
      project: string;
      points: string[];
    };
    projectGerm: {
      title: string;
      name: string;
      date: string;
      points: string[];
    };
    projectPhi3: {
      title: string;
      name: string;
      date: string;
      points: string[];
    };
    internship: {
      title: string;
      company: string;
      role: string;
      date: string;
      points: string[];
    };
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
      name: '联系',
      description: '取得联系',
    },
  },
  hero: {
    name: '洪成勋',
    description: '复旦大学计算机科学专业学生，热衷于构建智能应用和开发者工具。目前在字节跳动实习，专注于 AI 驱动的代码生成和自动化。',
  },
  contact: {
    title: '取得联系',
    subtitle: '准备好一起创造一些令人惊叹的东西了吗？让我们连接起来，一起探索可能性。我总是很兴奋地讨论新机会和创新项目。',
    connectWithMe: '与我联系',
    email: '邮箱',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    responseTime: '响应时间',
    responseTimeText: '通常在 24 小时内回复',
    form: {
      name: '姓名',
      namePlaceholder: '您的全名',
      email: '邮箱',
      emailPlaceholder: 'your.email@example.com',
      message: '消息',
      messagePlaceholder: '告诉我您的项目、想法，或者只是打个招呼...',
      sendMessage: '发送消息',
      sending: '发送中...',
      success: '您的邮件客户端应该已经打开。谢谢！',
    },
  },
  chat: {
    initialMessage: '你好！我是你的 AI 助手。你可以问我任何关于我的经历、技能、项目或兴趣的问题。今天我能为你做些什么？',
    placeholder: '问我任何问题...',
    disclaimer: 'AI 可能会犯错。请考虑检查重要信息。',
    responses: {
      experience: '我在 TechCorp 担任软件工程师实习生，在 StartupX 担任前端开发实习生。我使用过 React、Node.js、TypeScript 等现代 Web 技术，以及 AWS 等云平台。我参与过 API 优化、响应式 UI 构建和自动化测试实施。',
      default: '这是一个有趣的问题！我很乐意讨论更多关于我的背景、项目或技术兴趣的内容。随时问我关于我的经历、技能、教育或任何其他你想知道的事情。',
    },
  },
  experience: {
    education: {
      title: '教育',
      school: '复旦大学',
      degree: '计算机科学与技术学士',
      date: '2022.09 - 2026.06',
      points: [
        'GPA: 87/100',
        '导师：肖仰华教授，知识工场实验室',
        '核心课程：操作系统、编译原理、人工智能',
      ],
    },
    competition: {
      title: '奖项',
      name: '第九届上海图书馆开放数据竞赛',
      award: '应用开发赛道 一等奖 & 人气奖',
      project: '项目 "上海愿景"',
      points: [
        '负责 UI 设计（Figma + AIGC）和前端开发（Vue）。',
        '领导数据收集和预处理流程。',
      ],
    },
    projectGerm: {
      title: 'GERM',
      name: 'GERM: AI Agent for README Generation',
      date: '2025年2月 - 2025年4月',
      points: [
        '开发了一个使用 LLM 和 AST 解析的智能体，从代码库自动生成结构化的 README。',
        '构建了 Web UI 和 VSCode 扩展以增强开发者工作流程。',
        '设计了内容评估系统以优化提示词和自定义模板。',
      ],
    },
    projectPhi3: {
      title: 'Phi-3',
      name: 'Phi-3 Fine-Tuning with LORA',
      date: '2025年1月 - 2025年2月',
      points: [
        '使用 LORA 对 Phi-3-Mini-4K-Instruct 模型进行微调，使用 Flash Attention 2 优化性能。',
        '使用 Hugging Face Transformers 和 TRL 库实现了监督微调（SFT）。',
      ],
    },
    internship: {
      title: '实习',
      company: '字节跳动',
      role: '软件工程师实习生，AI 平台',
      date: '2025年6月 - 至今',
      points: [
        '领导了将 HTML 设计和 OpenAPI 规范转换为像素级完美 React 代码的规则驱动架构。',
        '为生成的应用程序实现了编译和运行时错误的自修复功能。',
        '自动化了模拟数据到真实 OpenAPI 后端的迁移，并标准化了异步数据流管理。',
        '主导了自动化测试工作流程，并为内部用户提供技术支持。',
      ],
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
      name: 'Contact',
      description: 'Get in touch',
    },
  },
  hero: {
    name: 'Chengxun Hong',
    description: 'Computer Science student at Fudan University with a passion for building intelligent applications and developer tools. Currently interning at ByteDance, focusing on AI-powered code generation and automation.',
  },
  contact: {
    title: 'Get In Touch',
    subtitle: '',
    connectWithMe: 'Connect With Me',
    email: 'Email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    responseTime: 'Response Time',
    responseTimeText: 'Usually responds within 24 hours',
    form: {
      name: 'Name',
      namePlaceholder: 'Your full name',
      email: 'Email',
      emailPlaceholder: 'your.email@example.com',
      message: 'Message',
      messagePlaceholder: 'Tell me about your project, idea, or just say hello...',
      sendMessage: 'Send Message',
      sending: 'Sending...',
      success: 'Your mail client should have opened. Thank you!',
    },
  },
  chat: {
    initialMessage: 'Hello! I\'m your AI assistant. You can ask me anything about my experience, skills, projects, or interests. How can I help you today?',
    placeholder: 'Ask me anything...',
    disclaimer: 'AI can make mistakes. Consider checking important information.',
    responses: {
      experience: 'I have experience as a Software Engineer Intern at TechCorp and Frontend Developer Intern at StartupX. I\'ve worked with modern web technologies like React, Node.js, TypeScript, and cloud platforms like AWS. I\'ve contributed to optimizing APIs, building responsive UIs, and implementing automated testing.',
      default: 'That\'s an interesting question! I\'d be happy to discuss more about my background, projects, or technical interests. Feel free to ask me about my experience, skills, education, or anything else you\'d like to know.',
    },
  },
  experience: {
    education: {
      title: 'Education',
      school: 'Fudan University',
      degree: 'B.S. in Computer Science and Technology',
      date: '2022.09 - 2026.06',
      points: [
        'GPA: 87/100',
        'Advisor: Prof. Yanghua Xiao, Knowledge Works Laboratory',
        'Core Courses: Operating Systems, Compiler Principles, Artificial Intelligence',
      ],
    },
    competition: {
      title: 'Awards',
      name: '9th Shanghai Library Open Data Competition',
      award: 'Winner & Popularity Award, Application Development Track',
      project: 'Project "Shanghai Vision"',
      points: [
        'Responsible for UI design (Figma + AIGC) and front-end development (Vue).',
        'Led the data collection and preprocessing pipeline.',
      ],
    },
    projectGerm: {
      title: 'GERM',
      name: 'GERM: AI Agent for README Generation',
      date: 'Feb 2025 - Apr 2025',
      points: [
        'Developed an agent using LLMs and AST parsing to auto-generate structured READMEs from codebases.',
        'Built a Web UI and a VSCode extension to enhance developer workflow.',
        'Designed a content evaluation system to optimize prompts and customize templates.',
      ],
    },
    projectPhi3: {
      title: 'Phi-3',
      name: 'Phi-3 Fine-Tuning with LORA',
      date: 'Jan 2025 - Feb 2025',
      points: [
        'Fine-tuned the Phi-3-Mini-4K-Instruct model using LORA, optimizing performance with Flash Attention 2.',
        'Implemented Supervised Fine-Tuning (SFT) with Hugging Face Transformers and TRL libraries.',
      ],
    },
    internship: {
      title: 'Internship',
      company: 'ByteDance',
      role: 'Software Engineer Intern, AI Platform',
      date: 'June 2025 - Present',
      points: [
        'Led rule-driven architecture for converting HTML designs & OpenAPI specs into pixel-perfect React code.',
        'Implemented self-repair capabilities for compilation and runtime errors in the generated applications.',
        'Automated migration of mock data to real OpenAPI backends and standardized async data stream management.',
        'Spearheaded automated testing workflows and provided technical support for internal users.',
      ],
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

