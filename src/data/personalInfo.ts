// 个人信息库 - 用于 AI 助手理解个人信息
// 这个文件包含了结构化的个人信息，便于 AI 读取和理解

import { LocaleTexts } from '@/locales';

// 个人信息接口定义
export interface PersonalInfo {
  basic: {
    name: {
      zh: string;
      en: string;
    };
    description: {
      zh: string;
      en: string;
    };
  };
  education: {
    school: string;
    degree: string;
    date: string;
    gpa: string;
    advisor: string;
    coreCourses: string[];
  };
  experience: {
    internship: {
      company: string;
      role: string;
      date: string;
      responsibilities: string[];
    };
  };
  projects: Array<{
    name: string;
    date: string;
    description: string[];
  }>;
  awards: Array<{
    name: string;
    award: string;
    project: string;
    contributions: string[];
  }>;
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
    platforms: string[];
  };
}

// 从 locales 数据生成个人信息库
export const getPersonalInfo = (texts: LocaleTexts): PersonalInfo => {
  return {
    basic: {
      name: {
        zh: texts.hero.name,
        en: texts.hero.name === '洪成勋' ? 'Chengxun Hong' : texts.hero.name,
      },
      description: {
        zh: texts.hero.description,
        en: texts.hero.description,
      },
    },
    education: {
      school: texts.experience.education.school,
      degree: texts.experience.education.degree,
      date: texts.experience.education.date,
      gpa: texts.experience.education.points.find(p => p.includes('GPA') || p.includes('gpa')) || '',
      advisor: texts.experience.education.points.find(p => p.includes('导师') || p.includes('Advisor') || p.includes('advisor')) || '',
      coreCourses: (() => {
        const coursesPoint = texts.experience.education.points.find(p => 
          p.includes('课程') || p.includes('Courses') || p.includes('courses')
        );
        if (!coursesPoint) return [];
        // 提取课程名称（冒号或中文冒号后的内容）
        const coursesText = coursesPoint.split(/[：:]/)[1]?.trim() || '';
        // 支持中文顿号、英文逗号、中文逗号作为分隔符
        return coursesText.split(/[、,，]/).map(s => s.trim()).filter(s => s.length > 0);
      })(),
    },
    experience: {
      internship: {
        company: texts.experience.internship.company,
        role: texts.experience.internship.role,
        date: texts.experience.internship.date,
        responsibilities: texts.experience.internship.points,
      },
    },
    projects: [
      {
        name: texts.experience.projectGerm.name,
        date: texts.experience.projectGerm.date,
        description: texts.experience.projectGerm.points,
      },
      {
        name: texts.experience.projectPhi3.name,
        date: texts.experience.projectPhi3.date,
        description: texts.experience.projectPhi3.points,
      },
    ],
    awards: [
      {
        name: texts.experience.competition.name,
        award: texts.experience.competition.award,
        project: texts.experience.competition.project,
        contributions: texts.experience.competition.points,
      },
    ],
    skills: {
      languages: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C++'],
      frameworks: ['React', 'Next.js', 'Vue', 'Node.js'],
      tools: ['Figma', 'Git', 'VSCode', 'Hugging Face', 'Transformers'],
      platforms: ['AWS', 'OpenAPI', 'VSCode Extension'],
    },
  };
};

// 将个人信息格式化为 AI 友好的系统提示词
export const formatPersonalInfoForAI = (info: PersonalInfo, language: 'zh' | 'en'): string => {
  const lang = language === 'zh' ? 'zh' : 'en';
  const name = info.basic.name[lang];
  const description = info.basic.description[lang];

  const systemPrompt = language === 'zh' 
    ? `你是一个专业的 AI 助手，专门回答关于 ${name} 的个人信息问题。

## 基本信息
- 姓名：${name}
- 简介：${description}

## 教育背景
- 学校：${info.education.school}
- 学位：${info.education.degree}
- 时间：${info.education.date}
- ${info.education.gpa}
- ${info.education.advisor}
- 核心课程：${info.education.coreCourses.join('、')}

## 工作经历
### 实习经历
- 公司：${info.experience.internship.company}
- 职位：${info.experience.internship.role}
- 时间：${info.experience.internship.date}
- 主要职责：
${info.experience.internship.responsibilities.map(r => `  - ${r}`).join('\n')}

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
    : `You are a professional AI assistant specialized in answering questions about ${name}'s personal information.

## Basic Information
- Name: ${name}
- Description: ${description}

## Education
- School: ${info.education.school}
- Degree: ${info.education.degree}
- Date: ${info.education.date}
- ${info.education.gpa}
- ${info.education.advisor}
- Core Courses: ${info.education.coreCourses.join(', ')}

## Work Experience
### Internship
- Company: ${info.experience.internship.company}
- Role: ${info.experience.internship.role}
- Date: ${info.experience.internship.date}
- Key Responsibilities:
${info.experience.internship.responsibilities.map(r => `  - ${r}`).join('\n')}

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

