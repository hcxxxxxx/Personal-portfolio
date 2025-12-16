'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  X, 
  GraduationCap, 
  Briefcase, 
  FlaskConical, 
  Code2, 
  Trophy, 
  Mail,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { LocaleTexts } from '@/locales';

// --- 类型定义 ---

type View = 'hero' | 'experience' | 'chat' | 'contact';

interface CustomAnimationProps {
  prev: View;
  next: View;
}

interface InteractiveExperienceProps {
  custom?: CustomAnimationProps;
}

type ModuleId = 'education' | 'internship' | 'research' | 'projects' | 'competitions' | 'about';

interface ModuleConfig {
  id: ModuleId;
  icon: React.ReactNode;
  gradient: string;
  glowColor: string;
  bgColor: string; // 卡片背景色（对应渐变色的透明版本）
  position: { x: number; y: number };
}

// --- 动画变体 ---

const profileImageVariants: Variants = {
  initial: (custom?: CustomAnimationProps) => {
    if (custom?.prev === 'hero' && custom?.next === 'experience') {
      return { opacity: 1 };
    }
    return { opacity: custom?.prev === 'chat' ? 0 : 1 };
  },
  animate: () => ({
      opacity: 1,
      transition: { duration: 0.7, delay: 0.2 }
  }),
  exit: (custom?: CustomAnimationProps) => {
    if (custom?.next === 'chat') {
      return { opacity: 0, transition: { duration: 0.4 } };
    }
    return {};
  }
};

const containerVariants: Variants = {
  initial: {},
  animate: {},
  exit: (custom?: CustomAnimationProps) => {
    if (custom?.next === 'hero') {
      return {
        y: '100%',
        scale: 0.9,
        opacity: 0,
        transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
      };
    }
    return {};
  }
};

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20 
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring", 
      stiffness: 300, 
      damping: 25 
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 }
  }
};

// --- 模块配置 ---

const moduleConfigs: ModuleConfig[] = [
  {
    id: 'education',
    icon: <GraduationCap size={28} strokeWidth={1.5} />,
    gradient: 'from-blue-500 to-cyan-400',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    bgColor: 'rgba(59, 130, 246, 0.1)',
    position: { x: -1, y: -1 },
  },
  {
    id: 'internship',
    icon: <Briefcase size={28} strokeWidth={1.5} />,
    gradient: 'from-violet-500 to-purple-400',
    glowColor: 'rgba(139, 92, 246, 0.5)',
    bgColor: 'rgba(139, 92, 246, 0.1)',
    position: { x: 0, y: -1 },
  },
  {
    id: 'research',
    icon: <FlaskConical size={28} strokeWidth={1.5} />,
    gradient: 'from-emerald-500 to-teal-400',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    position: { x: 1, y: -1 },
  },
  {
    id: 'projects',
    icon: <Code2 size={28} strokeWidth={1.5} />,
    gradient: 'from-orange-500 to-amber-400',
    glowColor: 'rgba(249, 115, 22, 0.5)',
    bgColor: 'rgba(249, 115, 22, 0.1)',
    position: { x: -1, y: 1 },
  },
  {
    id: 'competitions',
    icon: <Trophy size={28} strokeWidth={1.5} />,
    gradient: 'from-pink-500 to-rose-400',
    glowColor: 'rgba(236, 72, 153, 0.5)',
    bgColor: 'rgba(236, 72, 153, 0.1)',
    position: { x: 0, y: 1 },
  },
  {
    id: 'about',
    icon: <Mail size={28} strokeWidth={1.5} />,
    gradient: 'from-sky-500 to-blue-400',
    glowColor: 'rgba(14, 165, 233, 0.5)',
    bgColor: 'rgba(14, 165, 233, 0.1)',
    position: { x: 1, y: 1 },
  },
];

// --- 模块卡片组件 ---

interface ModuleCardProps {
  config: ModuleConfig;
  texts: LocaleTexts;
  onClick: () => void;
}

const ModuleCard = ({ config, texts, onClick }: ModuleCardProps) => {
  const moduleTexts = texts.experience[config.id];
  const title = moduleTexts.title;
  const subtitle = moduleTexts.subtitle;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative cursor-pointer group"
      style={{ 
        gridColumn: config.position.x === 0 ? '2' : config.position.x === -1 ? '1' : '3',
        gridRow: config.position.y === -1 ? '1' : '2',
      }}
    >
      {/* 外层发光效果 */}
      <div 
        className="absolute -inset-1 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${config.glowColor}, transparent)` }}
      />
      
      {/* 主卡片 - 使用对应颜色的透明背景 */}
      <div 
        className="relative h-full backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 group-hover:border-white/20"
        style={{ backgroundColor: config.bgColor }}
    >
        {/* 顶部渐变装饰线 */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient}`} />
        
        {/* 右侧大号背景图标阴影 */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6 opacity-[0.1] scale-[3.5] md:scale-[4] pointer-events-none text-white">
          {config.icon}
        </div>
        
        {/* 内容区域 */}
        <div className="relative py-6 pr-6 md:py-8 md:pr-8 flex flex-col justify-center min-h-[140px] md:min-h-[160px]" style={{ paddingLeft: '2rem' }}>
          {/* 标题 */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight ml-2 md:ml-4">
            {title}
          </h3>
          
          {/* 副标题 */}
          <p className="text-sm md:text-base text-slate-400 font-light ml-2 md:ml-4">
            {subtitle}
          </p>
          
          {/* 箭头指示 */}
          <div className="absolute bottom-5 right-5 md:bottom-6 md:right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <ChevronRight size={24} className="text-slate-400" />
          </div>
        </div>
        
        {/* 角落装饰 */}
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/5 rounded-br-lg" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/5 rounded-bl-lg" />
      </div>
    </motion.div>
  );
};

// --- 详情弹窗组件 ---

interface DetailModalProps {
  moduleId: ModuleId;
  config: ModuleConfig;
  texts: LocaleTexts;
  onClose: () => void;
}

const DetailModal = ({ moduleId, config, texts, onClose }: DetailModalProps) => {
  const moduleData = texts.experience[moduleId];
  const content = moduleData.content;

  // 阻止滚轮事件冒泡，防止触发页面切换
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-auto"
      onWheel={handleWheel}
    >
      {/* 背景遮罩 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-md" 
        onClick={onClose}
      />
      
      {/* 弹窗主体 */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full max-w-2xl max-h-[85vh] rounded-3xl border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl"
        style={{ backgroundColor: 'rgba(15, 23, 42, 0.95)' }}
      >
        {/* 顶部渐变线 */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${config.gradient}`} />
        
        {/* 关闭按钮 */}
        <button 
          onClick={onClose}
          className="absolute z-50 p-2.5 rounded-full bg-white/10 text-slate-400 hover:text-white hover:bg-white/20 transition-all duration-300"
          style={{ top: '24px', right: '24px' }}
        >
          <X size={20} />
        </button>
        
        {/* 内容区域 */}
        <div 
          className="relative z-10 overflow-y-auto custom-scrollbar"
          style={{ 
            padding: '48px 56px',
            maxHeight: 'calc(85vh - 2px)'
          }}
        >
          <MarkdownContent content={content} />
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Markdown 渲染组件 ---

// 解析行内样式（加粗、斜体）
const parseInlineStyles = (text: string): React.ReactNode => {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  while (remaining.length > 0) {
    // 匹配 **加粗**
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // 匹配 *斜体*
    const italicMatch = remaining.match(/\*([^*]+)\*/);

    if (boldMatch && (!italicMatch || boldMatch.index! <= italicMatch.index!)) {
      const beforeText = remaining.slice(0, boldMatch.index);
      if (beforeText) {
        parts.push(beforeText);
      }
      parts.push(
        <strong key={keyIndex++} className="font-bold text-white">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch.index! + boldMatch[0].length);
    } else if (italicMatch) {
      const beforeText = remaining.slice(0, italicMatch.index);
      if (beforeText) {
        parts.push(beforeText);
      }
      parts.push(
        <em key={keyIndex++} className="italic text-slate-200">
          {italicMatch[1]}
        </em>
      );
      remaining = remaining.slice(italicMatch.index! + italicMatch[0].length);
    } else {
      parts.push(remaining);
      break;
    }
  }

  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <>{parts}</>;
};

const MarkdownContent = ({ content }: { content: string }) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let lineIndex = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${lineIndex}`} className="space-y-2 my-4">
          {listItems.map((item, i) => (
            <li key={i} className="text-slate-300 leading-relaxed">
              {parseInlineStyles(item)}
            </li>
      ))}
    </ul>
  );
      listItems = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    lineIndex = i;

    // 分隔线 ---
    if (line.trim() === '---' || line.trim() === '***' || line.trim() === '___') {
      flushList();
      elements.push(
        <hr key={i} className="border-t border-white/10 my-6" />
      );
    }
    // 四级标题 ####
    else if (line.startsWith('#### ')) {
      flushList();
      elements.push(
        <div key={i} className="text-[16px] font-medium text-slate-200 mt-4 mb-1">
          {parseInlineStyles(line.slice(5))}
        </div>
      );
    }
    // 三级标题 ###
    else if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <div key={i} className="text-[20px] font-medium text-slate-100 mt-5 mb-2">
          {parseInlineStyles(line.slice(4))}
        </div>
      );
    }
    // 二级标题 ##
    else if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <div key={i} className="text-[28px] font-semibold text-white mt-6 mb-2">
          {parseInlineStyles(line.slice(3))}
        </div>
      );
    }
    // 一级标题 #
    else if (line.startsWith('# ')) {
      flushList();
      elements.push(
        <div key={i} className="text-[32px] font-bold text-white mt-6 first:mt-0 mb-2">
          {parseInlineStyles(line.slice(2))}
        </div>
      );
    }
    // 列表项 -
    else if (line.startsWith('- ')) {
      listItems.push(line.slice(2));
    }
    // 空行
    else if (line.trim() === '') {
      flushList();
    }
    // 普通段落
    else {
      flushList();
      elements.push(
        <p key={i} className="text-slate-300 leading-relaxed my-1">
          {parseInlineStyles(line)}
        </p>
  );
    }
  }

  flushList();

  return <div className="space-y-1">{elements}</div>;
};

// --- 主组件 ---

const InteractiveExperience = ({ custom }: InteractiveExperienceProps) => {
  const { texts } = useLanguage();
  const [selectedModule, setSelectedModule] = useState<ModuleId | null>(null);
  const [shouldAnimateOpacity, setShouldAnimateOpacity] = useState(false);
  
  useEffect(() => {
    if (custom?.prev === 'hero' && custom?.next === 'experience') {
      const rafId = requestAnimationFrame(() => setShouldAnimateOpacity(true));
      return () => cancelAnimationFrame(rafId);
    } else {
      setShouldAnimateOpacity(false);
    }
  }, [custom]);

  const selectedConfig = selectedModule 
    ? moduleConfigs.find(c => c.id === selectedModule) 
    : null;

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      variants={containerVariants}
      custom={custom}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* 背景光效 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>
      
      {/* 主内容区域 */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          
          {/* 左侧：头像区域 */}
      <motion.div
            layoutId="profile-image-container"
            className="relative z-10 flex-shrink-0"
        transition={{ 
            duration: 0.7, 
            ease: [0.4, 0, 0.2, 1] 
            }}
            style={{
              opacity: shouldAnimateOpacity || (custom?.prev !== 'hero') ? 1 : undefined 
            }}
      >
        <motion.div
          variants={profileImageVariants}
          custom={custom}
          initial="initial"
          animate="animate"
          exit="exit"
              className="relative"
            >
              {/* 外圈装饰 */}
              <div className="absolute -inset-3 rounded-full border border-white/10 animate-pulse" />
              <div className="absolute -inset-6 rounded-full border border-white/5" />
              
              {/* 头像 */}
              <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-slate-800 shadow-[0_0_60px_rgba(14,165,233,0.3)]">
          <Image
            src="/profile.jpg"
            alt={texts.hero.name}
            fill
                  className="object-cover"
            priority
          />
                {/* 光泽叠加 */}
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-transparent pointer-events-none" />
              </div>
              
              {/* 状态指示点 */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-slate-900 shadow-lg" />
        </motion.div>
      </motion.div>

          {/* 右侧：模块卡片网格 */}
      <motion.div
            className="flex-1 w-full"
            variants={cardContainerVariants}
        initial="hidden"
        animate="visible"
            exit="exit"
      >
            <div className="grid grid-cols-3 gap-4 md:gap-5">
              {moduleConfigs.map((config) => (
                <ModuleCard
                  key={config.id}
                  config={config}
                  texts={texts}
                  onClick={() => setSelectedModule(config.id)}
          />
        ))}
            </div>
      </motion.div>
        </div>
      </div>

      {/* 详情弹窗 */}
      <AnimatePresence>
        {selectedModule && selectedConfig && (
          <DetailModal
            moduleId={selectedModule}
            config={selectedConfig}
            texts={texts}
            onClose={() => setSelectedModule(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InteractiveExperience;
