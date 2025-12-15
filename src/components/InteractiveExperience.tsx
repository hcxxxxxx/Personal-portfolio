'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTypewriter } from '@/hooks/useTypewriter';
import { LocaleTexts } from '@/locales';

// --- 动画变体定义 ---

type View = 'hero' | 'experience' | 'chat' | 'contact';

interface CustomAnimationProps {
  prev: View;
  next: View;
}

interface InteractiveExperienceProps {
  custom?: CustomAnimationProps;
}

const profileImageVariants: Variants = {
  initial: (custom?: CustomAnimationProps) => {
    if (custom?.prev === 'hero' && custom?.next === 'experience') {
      return { opacity: 1 };
    }
    return { opacity: custom?.prev === 'chat' ? 0 : 1 };
  },
  animate: (custom?: CustomAnimationProps) => {
    if (custom?.prev === 'hero' && custom?.next === 'experience') {
      return { opacity: 1 };
    }
    return {
      opacity: 1,
      transition: { duration: 0.7, delay: 0.2 }
    };
  },
  exit: (custom?: CustomAnimationProps) => {
    if (custom?.next === 'chat') {
      return {
        opacity: 0,
        transition: { duration: 0.4 }
      };
    }
    return {};
  }
};

const orbitContainerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.2,
    transition: { duration: 0.5 }
  }
};

const planetVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  }
};

// --- 类型定义 ---

interface ExperienceContent {
  company?: string;
  role?: string;
  date?: string;
  points: string[];
  school?: string;
  degree?: string;
  name?: string;
  award?: string;
  project?: string;
}

interface ExperienceItem {
  id: string;
  logo: string | null;
  title: string;
  content: ExperienceContent;
}

interface OrbitDef {
  radius: number;
  size: number;
}

interface PlanetProps {
  item: ExperienceItem;
  index: number;
  onSelect: (item: ExperienceItem) => void;
  orbit: OrbitDef;
  color: string;
}

interface DetailCardProps {
  item: ExperienceItem;
  onDeselect: () => void;
}

// --- 数据 ---
const getExperienceData = (texts: LocaleTexts): ExperienceItem[] => [
  {
    id: 'education',
    logo: '/degree.svg',
    title: texts.experience.education.title,
    content: {
      school: texts.experience.education.school,
      degree: texts.experience.education.degree,
      date: texts.experience.education.date,
      points: texts.experience.education.points,
    },
  },
  {
    id: 'competition',
    logo: '/awards.svg',
    title: texts.experience.competition.title,
    content: {
      name: texts.experience.competition.name,
      award: texts.experience.competition.award,
      project: texts.experience.competition.project,
      points: texts.experience.competition.points,
    },
  },
  {
    id: 'project-germ',
    logo: '/projects.svg',
    title: texts.experience.projectGerm.title,
    content: {
      name: texts.experience.projectGerm.name,
      date: texts.experience.projectGerm.date,
      points: texts.experience.projectGerm.points,
    },
  },
  {
    id: 'project-phi3',
    logo: '/hobby.svg',
    title: texts.experience.projectPhi3.title,
    content: {
      name: texts.experience.projectPhi3.name,
      date: texts.experience.projectPhi3.date,
      points: texts.experience.projectPhi3.points,
    },
  },
  {
    id: 'internship',
    logo: '/bytedance-logo.svg',
    title: texts.experience.internship.title,
    content: {
      company: texts.experience.internship.company,
      role: texts.experience.internship.role,
      date: texts.experience.internship.date,
      points: texts.experience.internship.points,
    },
  },
];

const orbits: OrbitDef[] = [
  { radius: 180, size: 56 },
  { radius: 240, size: 52 },
  { radius: 300, size: 58 },
  { radius: 360, size: 54 },
  { radius: 420, size: 50 },
];

// --- 组件 ---

// 行星组件：使用嵌套旋转实现高性能公转
const Planet = ({ item, index, onSelect, orbit, color }: PlanetProps) => {
  const { radius, size } = orbit;
  
  // 调整公转速度：外圈更慢
  const duration = 20 + index * 5; 
  // 随机起始角度，避免排成一条线
  const initialRotate = index * 72; // (360 / 5) * index

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      {/* 轨道容器：负责公转动画 */}
      <motion.div
        style={{
          width: radius * 2,
          height: radius * 2,
        }}
        initial={{ rotate: initialRotate }}
        animate={{ rotate: initialRotate + 360 }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
        }}
        className="relative rounded-full"
      >
        {/* 行星定位器：将行星定位到轨道边缘 */}
        <div 
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          style={{ width: size, height: size }}
        >
          {/* 行星自转抵消容器：反向旋转，确保图标始终正直 */}
          <motion.div
            style={{ width: '100%', height: '100%' }}
            initial={{ rotate: -initialRotate }}
            animate={{ rotate: -(initialRotate + 360) }}
            transition={{
              duration: duration,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {/* 实际的行星视觉元素 */}
            <motion.div
              variants={planetVariants}
              whileHover={{ 
                scale: 1.2, 
                filter: "brightness(1.2)",
                boxShadow: `0 0 30px ${color}80`,
              }}
              onClick={() => onSelect(item)}
              className="w-full h-full relative cursor-pointer group rounded-full"
            >
              {/* 行星光晕背景 */}
              <div 
                className="absolute inset-0 rounded-full blur-md opacity-40 transition-opacity duration-300 group-hover:opacity-80"
                style={{ backgroundColor: color }}
              />
              
              {/* 玻璃拟态主体 */}
              <div className="absolute inset-0 rounded-full glass-card border border-white/20 flex items-center justify-center overflow-hidden bg-slate-900/40 backdrop-blur-md">
                {/* 内部高光 */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                
                {item.logo ? (
                  <div className="relative w-[60%] h-[60%] transition-transform duration-300 group-hover:scale-110">
                     <Image 
                      src={item.logo} 
                      alt={item.title} 
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <span className="text-[10px] font-bold text-slate-200 text-center px-1 leading-tight">
                    {item.title}
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// 详情卡片组件
const DetailCard = ({ item, onDeselect }: DetailCardProps) => {
  const title = item.content.company || item.content.school || item.content.name || '';
  const { displayText: titleText } = useTypewriter(title, { speed: 25, delay: 100 });
  const { displayText: roleText } = useTypewriter(item.content.role || '', { speed: 20, delay: 400 });
  
  // 鼠标跟随发光效果
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 w-full h-full flex items-center justify-center z-50 px-4 pointer-events-auto"
    >
      {/* 背景遮罩 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md" 
        onClick={onDeselect}
      />
      
      {/* 卡片主体 - 全息数据板风格 */}
      <motion.div 
        layoutId={`card-${item.id}`} 
        initial={{ scale: 0.9, opacity: 0, y: 20, rotateX: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full max-w-4xl bg-slate-900/90 rounded-2xl border border-white/10 shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] overflow-hidden group"
        onMouseMove={handleMouseMove}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* 鼠标跟随聚光灯效果 */}
        <div 
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.1), transparent 40%)`,
          }}
        />

        {/* 动态网格背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] z-0 pointer-events-none" />

        {/* 装饰性角落标记 */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-sky-500/50 rounded-tl-lg z-20" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-sky-500/50 rounded-tr-lg z-20" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-sky-500/50 rounded-bl-lg z-20" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-sky-500/50 rounded-br-lg z-20" />

        {/* 关闭按钮 - 科技感设计 */}
        <button 
          onClick={(e) => { e.stopPropagation(); onDeselect(); }} 
          className="absolute top-6 right-6 z-50 p-2 group/close flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-red-500/10 rounded-full scale-0 group-hover/close:scale-100 transition-transform duration-300" />
          <X className="w-6 h-6 text-slate-400 group-hover/close:text-red-400 transition-colors relative z-10" />
        </button>

        <div className="relative z-10 flex flex-col md:flex-row h-full min-h-[400px]">
          {/* 左侧：标题与元数据区域 */}
          <div className="w-full md:w-2/5 p-8 md:p-10 bg-gradient-to-b from-slate-800/30 to-transparent border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between relative overflow-hidden">
            {/* 巨大的背景水印 Logo */}
            {item.logo && (
              <div className="absolute -right-10 -bottom-10 w-64 h-64 opacity-[0.03] grayscale pointer-events-none transform rotate-12">
                <Image src={item.logo} alt="" fill className="object-contain" unoptimized />
              </div>
            )}

            <div>
              <div className="flex items-center space-x-2 mb-6">
                <span className="h-px w-8 bg-sky-500/50" />
                <span className="text-xs font-mono text-sky-400 uppercase tracking-widest">
                  Experience Log
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight tracking-tight">
                {titleText}
                <span className="inline-block w-2 h-2 bg-sky-500 rounded-full ml-2 animate-pulse" />
              </h2>

              {item.content.role && (
                <div className="inline-block px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded text-sky-300 text-sm font-medium mb-2">
                  {roleText}
                </div>
              )}
            </div>

            <div className="mt-8 md:mt-0">
              {item.content.date && (
                <div className="font-mono text-xs text-slate-500 uppercase tracking-wider border-l-2 border-slate-700 pl-3">
                  Timeframe<br />
                  <span className="text-slate-300 text-sm">{item.content.date}</span>
                </div>
              )}
            </div>
          </div>

          {/* 右侧：详细内容列表 */}
          <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-center bg-slate-900/30">
            <h3 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-6 flex items-center">
              <span className="w-2 h-2 bg-slate-700 mr-2 rotate-45" />
              
            </h3>
            <DetailPoints points={item.content.points} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const DetailPoints = ({ points }: { points: string[] }) => {
  return (
    <ul className="space-y-5">
      {points.map((point, i) => (
        <PointItem key={i} point={point} index={i} />
      ))}
    </ul>
  );
};

const PointItem = ({ point, index }: { point: string; index: number }) => {
  return (
    <motion.li 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 100 }}
      className="flex items-start group relative pl-6"
    >
      {/* 科技感列表项装饰 */}
      <div className="absolute left-0 top-2.5 w-3 h-px bg-slate-600 group-hover:w-4 group-hover:bg-sky-400 transition-all duration-300" />
      <div className="absolute left-0 top-2.5 w-px h-3 bg-slate-600 group-hover:h-4 group-hover:bg-sky-400 transition-all duration-300 origin-top" />
      
      <span className="text-slate-300/90 leading-relaxed font-light tracking-wide text-[15px] group-hover:text-white transition-colors duration-300">
        {point}
      </span>
    </motion.li>
  );
};

// 主组件
const InteractiveExperience = ({ custom }: InteractiveExperienceProps) => {
  const { texts } = useLanguage();
  const experienceData = getExperienceData(texts);
  const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null);
  
  // 霓虹配色方案
  const colors = [
    '#0ea5e9', // Sky Blue
    '#8b5cf6', // Violet
    '#22d3ee', // Cyan
    '#f472b6', // Pink
    '#a78bfa', // Purple
  ];
  
  // 透明度动画控制
  const [shouldAnimateOpacity, setShouldAnimateOpacity] = useState(false);
  
  useEffect(() => {
    if (custom?.prev === 'hero' && custom?.next === 'experience') {
      const rafId = requestAnimationFrame(() => setShouldAnimateOpacity(true));
      return () => cancelAnimationFrame(rafId);
    } else {
      setShouldAnimateOpacity(false);
    }
  }, [custom]);

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

  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      variants={containerVariants}
      custom={custom}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* 沉浸式背景光效 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/5 rounded-full blur-[100px]" />
      </div>

      {/* 太阳系中心 */}
      <motion.div
        layoutId="profile-image-container"
        className="relative z-10 w-48 h-48 md:w-64 md:h-64 rounded-full shadow-[0_0_50px_rgba(14,165,233,0.3)]"
        transition={{ 
          duration: 0.7, 
          ease: [0.4, 0, 0.2, 1]
        }}
        style={{
           // 确保从 hero 跳转时透明度正确过渡
           opacity: shouldAnimateOpacity || (custom?.prev !== 'hero') ? 1 : undefined 
        }}
      >
        <motion.div
          variants={profileImageVariants}
          custom={custom}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full h-full relative rounded-full overflow-hidden border-4 border-slate-800/80 ring-1 ring-white/10"
        >
          <Image
            src="/profile.jpg"
            alt={texts.hero.name}
            fill
            className="object-cover"
            priority
          />
          {/* 叠加光泽效果 */}
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-transparent pointer-events-none" />
        </motion.div>
      </motion.div>

      {/* 轨道系统 */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 flex items-center justify-center"
        variants={orbitContainerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* 绘制静态轨道线 - 使用 svg 获得更完美的圆和发光效果 */}
        <svg className="absolute overflow-visible" style={{ width: '1000px', height: '1000px', pointerEvents: 'none' }}>
           <defs>
             <radialGradient id="orbit-gradient" cx="0.5" cy="0.5" r="0.5">
               <stop offset="90%" stopColor="rgba(56, 189, 248, 0.1)" />
               <stop offset="100%" stopColor="rgba(56, 189, 248, 0.0)" />
             </radialGradient>
           </defs>
           {orbits.map((orbit, i) => (
             <circle 
               key={`orbit-line-${i}`}
               cx="500" 
               cy="500" 
               r={orbit.radius} 
               fill="none" 
               stroke="rgba(255, 255, 255, 0.08)" 
               strokeWidth="1.5"
               strokeDasharray="4 4"
               className="opacity-50"
             />
           ))}
        </svg>

        {/* 行星 */}
        {experienceData.map((item, index) => (
          <Planet
            key={item.id}
            item={item}
            index={index}
            onSelect={setSelectedItem}
            orbit={orbits[index % orbits.length]}
            color={colors[index % colors.length]}
          />
        ))}
      </motion.div>

      {/* 详情卡片弹窗 */}
      <AnimatePresence>
        {selectedItem && <DetailCard item={selectedItem} onDeselect={() => setSelectedItem(null)} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default InteractiveExperience;
