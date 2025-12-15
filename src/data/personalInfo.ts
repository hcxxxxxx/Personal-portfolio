// 个人信息库 - 用于 AI 助手理解个人信息
// 这个文件包含了结构化的个人信息，便于 AI 读取和理解
// 所有个人信息都直接硬编码在此文件中，便于集中修改

// 将个人信息格式化为 AI 友好的系统提示词
// 所有个人信息都直接硬编码在此方法中，便于集中修改
export const formatPersonalInfoForAI = (language: 'zh' | 'en'): string => {
  // ========== 个人信息配置区域 - 请在此处修改个人信息 ==========
  
  // 基本信息
  const basicInfo = {
    zh: {
      name: '洪成勋',
      description: '复旦大学｜计算与智能创新学院｜计算机科学与技术'
    },
    en: {
      name: 'Chengxun Hong',
      description: 'Fudan University｜Computer Science and Technology'
    }
  };

  // 教育背景
  const education = {
    zh: {
      school: '复旦大学',
      degree: '计算机科学与技术学士',
      date: '2022.09 - 2026.06',
      gpa: 'GPA: 87/100',
      advisor: '导师：肖仰华教授，知识工场实验室',
      coreCourses: ['操作系统', '编译原理', '人工智能']
    },
    en: {
      school: 'Fudan University',
      degree: 'B.S. in Computer Science and Technology',
      date: '2022.09 - 2026.06',
      gpa: 'GPA: 87/100',
      advisor: 'Advisor: Prof. Yanghua Xiao, Knowledge Works Laboratory',
      coreCourses: ['Operating Systems', 'Compiler Principles', 'Artificial Intelligence']
    }
  };

  // 工作经历
  const internship = {
    zh: {
      company: '字节跳动',
      role: '软件工程师实习生，AI 平台',
      date: '2025年6月 - 至今',
      responsibilities: [
        '领导了将 HTML 设计和 OpenAPI 规范转换为像素级完美 React 代码的规则驱动架构。',
        '为生成的应用程序实现了编译和运行时错误的自修复功能。',
        '自动化了模拟数据到真实 OpenAPI 后端的迁移，并标准化了异步数据流管理。',
        '主导了自动化测试工作流程，并为内部用户提供技术支持。'
      ]
    },
    en: {
      company: 'ByteDance',
      role: 'Software Engineer Intern, AI Platform',
      date: 'June 2025 - Present',
      responsibilities: [
        'Led rule-driven architecture for converting HTML designs & OpenAPI specs into pixel-perfect React code.',
        'Implemented self-repair capabilities for compilation and runtime errors in the generated applications.',
        'Automated migration of mock data to real OpenAPI backends and standardized async data stream management.',
        'Spearheaded automated testing workflows and provided technical support for internal users.'
      ]
    }
  };

  // 项目经历
  const projects = {
    zh: [
      {
        name: 'GERM: AI Agent for README Generation',
        date: '2025年2月 - 2025年4月',
        description: [
          '开发了一个使用 LLM 和 AST 解析的智能体，从代码库自动生成结构化的 README。',
          '构建了 Web UI 和 VSCode 扩展以增强开发者工作流程。',
          '设计了内容评估系统以优化提示词和自定义模板。'
        ]
      },
      {
        name: 'Phi-3 Fine-Tuning with LORA',
        date: '2025年1月 - 2025年2月',
        description: [
          '使用 LORA 对 Phi-3-Mini-4K-Instruct 模型进行微调，使用 Flash Attention 2 优化性能。',
          '使用 Hugging Face Transformers 和 TRL 库实现了监督微调（SFT）。'
        ]
      }
    ],
    en: [
      {
        name: 'GERM: AI Agent for README Generation',
        date: 'Feb 2025 - Apr 2025',
        description: [
          'Developed an agent using LLMs and AST parsing to auto-generate structured READMEs from codebases.',
          'Built a Web UI and a VSCode extension to enhance developer workflow.',
          'Designed a content evaluation system to optimize prompts and customize templates.'
        ]
      },
      {
        name: 'Phi-3 Fine-Tuning with LORA',
        date: 'Jan 2025 - Feb 2025',
        description: [
          'Fine-tuned the Phi-3-Mini-4K-Instruct model using LORA, optimizing performance with Flash Attention 2.',
          'Implemented Supervised Fine-Tuning (SFT) with Hugging Face Transformers and TRL libraries.'
        ]
      }
    ]
  };

  // 获奖经历
  const awards = {
    zh: [
      {
        name: '第九届上海图书馆开放数据竞赛',
        award: '应用开发赛道 一等奖 & 人气奖',
        project: '项目 "沪上展映"',
        contributions: [
          '负责 UI 设计（Figma + AIGC）和前端开发（Vue）。',
          '领导数据收集和预处理流程。'
        ]
      }
    ],
    en: [
      {
        name: '9th Shanghai Library Open Data Competition',
        award: 'Winner & Popularity Award, Application Development Track',
        project: 'Project "Shanghai Vision"',
        contributions: [
          'Responsible for UI design (Figma + AIGC) and front-end development (Vue).',
          'Led the data collection and preprocessing pipeline.'
        ]
      }
    ]
  };

  // 技能
  const skills = {
    languages: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C++'],
    frameworks: ['React', 'Next.js', 'Vue', 'Node.js'],
    tools: ['Figma', 'Git', 'VSCode', 'Hugging Face', 'Transformers'],
    platforms: ['AWS', 'OpenAPI', 'VSCode Extension']
  };

  // ========== 个人信息配置区域结束 ==========

  // 根据语言选择对应的信息
  const info = language === 'zh' 
    ? {
        basic: basicInfo.zh,
        education: education.zh,
        internship: internship.zh,
        projects: projects.zh,
        awards: awards.zh,
        skills
      }
    : {
        basic: basicInfo.en,
        education: education.en,
        internship: internship.en,
        projects: projects.en,
        awards: awards.en,
        skills
      };

  // 生成系统提示词
  const systemPrompt = language === 'zh' 
    ? `你是一个专业的 AI 助手，专门回答关于 ${info.basic.name} 的个人信息问题。

## 基本信息
- 姓名：${info.basic.name}
- 简介：${info.basic.description}

## 教育背景
- 学校：${info.education.school}
- 学位：${info.education.degree}
- 时间：${info.education.date}
- ${info.education.gpa}
- ${info.education.advisor}
- 核心课程：${info.education.coreCourses.join('、')}

## 工作经历
### 实习经历
- 公司：${info.internship.company}
- 职位：${info.internship.role}
- 时间：${info.internship.date}
- 主要职责：
${info.internship.responsibilities.map(r => `  - ${r}`).join('\n')}

## 项目经历
${info.projects.map(project => `
### ${project.name}
- 时间：${project.date}
- 描述：
${project.description.map(d => `  - ${d}`).join('\n')}
`).join('\n')}

## 获奖经历
${info.awards.map(award => `
### ${award.name}
- 奖项：${award.award}
- 项目：${award.project}
- 贡献：
${award.contributions.map(c => `  - ${c}`).join('\n')}
`).join('\n')}

## 技能
- 编程语言：${info.skills.languages.join('、')}
- 框架/库：${info.skills.frameworks.join('、')}
- 工具：${info.skills.tools.join('、')}
- 平台：${info.skills.platforms.join('、')}

## 回答要求
1. 基于以上信息回答问题，不要编造不存在的信息
2. 回答要准确、专业、友好
3. 如果问题超出以上信息范围，礼貌地说明你只了解上述信息
4. 使用中文回答
5. 回答要简洁明了，重点突出`
    : `You are a professional AI assistant specialized in answering questions about ${info.basic.name}'s personal information.

## Basic Information
- Name: ${info.basic.name}
- Description: ${info.basic.description}

## Education
- School: ${info.education.school}
- Degree: ${info.education.degree}
- Date: ${info.education.date}
- ${info.education.gpa}
- ${info.education.advisor}
- Core Courses: ${info.education.coreCourses.join(', ')}

## Work Experience
### Internship
- Company: ${info.internship.company}
- Role: ${info.internship.role}
- Date: ${info.internship.date}
- Key Responsibilities:
${info.internship.responsibilities.map(r => `  - ${r}`).join('\n')}

## Projects
${info.projects.map(project => `
### ${project.name}
- Date: ${project.date}
- Description:
${project.description.map(d => `  - ${d}`).join('\n')}
`).join('\n')}

## Awards
${info.awards.map(award => `
### ${award.name}
- Award: ${award.award}
- Project: ${award.project}
- Contributions:
${award.contributions.map(c => `  - ${c}`).join('\n')}
`).join('\n')}

## Skills
- Programming Languages: ${info.skills.languages.join(', ')}
- Frameworks/Libraries: ${info.skills.frameworks.join(', ')}
- Tools: ${info.skills.tools.join(', ')}
- Platforms: ${info.skills.platforms.join(', ')}

## Response Guidelines
1. Answer questions based on the above information only. Do not make up information that doesn't exist.
2. Be accurate, professional, and friendly in your responses.
3. If a question is beyond the scope of the above information, politely explain that you only know the information provided.
4. Respond in English.
5. Keep responses concise and focused.`;

  return systemPrompt;
};

