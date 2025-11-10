'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useTime, useTransform, Variants } from 'framer-motion';
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
  initial: (custom?: CustomAnimationProps) => ({
    opacity: custom?.prev === 'chat' ? 0 : 1,
  }),
  animate: {
    opacity: 1,
    transition: { duration: 0.7, delay: 0.2 }
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

// 轨道容器的变体，用于错开每个轨道的动画
const orbitContainerVariants: Variants = {
  hidden: {}, // 退出状态的目标
  visible: {
    transition: {
      staggerChildren: 0.15, // 每个轨道动画依次开始，间隔0.15秒
      delayChildren: 0.2,   // 容器内子动画开始前的延迟
    },
  },
};

// 单个轨道的动画变体
const orbitVariants: Variants = {
  // 隐藏状态（进入前和退出后）：放大到3倍，完全透明
  hidden: {
    scale: 3,
    opacity: 0,
    transition: {
      duration: 0.8, // 退出动画时长
      ease: [0.76, 0, 0.24, 1], // 缓动函数，实现加速退出的效果
    },
  },
  // 可见状态（动画目标）：正常大小，透明度0.3
  visible: {
    scale: 1,
    opacity: 0.3,
    transition: {
      duration: 1.2, // 进入动画时长
      ease: [0.22, 1, 0.36, 1], // 缓动函数，实现柔和减速的进入效果
    },
  },
};


// --- 类型定义 ---

// 经历内容的详细信息
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

// 单个经历项目（如行星）
interface ExperienceItem {
  id: string;
  logo: string | null;
  title: string;
  content: ExperienceContent;
}

// 行星轨道的定义
interface OrbitDef {
  radius: number;
  size: number;
}

// 行星组件的属性
interface PlanetProps {
  item: ExperienceItem;
  index: number;
  onSelect: (item: ExperienceItem) => void;
  orbit: OrbitDef;
  color: string;
}

// 详情卡片的属性
interface DetailCardProps {
  item: ExperienceItem;
  onDeselect: () => void;
}

// --- 数据 ---
// 根据语言获取经历数据的函数
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
  { radius: 180, size: 50 },
  { radius: 230, size: 48 },
  { radius: 280, size: 52 },
  { radius: 330, size: 49 },
  { radius: 380, size: 45 },
];

// --- 组件 ---

// 行星组件，代表一个经历项目
const Planet = ({ item, index, onSelect, orbit, color }: PlanetProps) => {
  const { radius, size } = orbit;
  const time = useTime(); // framer-motion hook，获取动画时间

  // 根据索引设置不同的旋转速度
  const duration = (25 + index * 10) * 1000;
  const initialAngle = index * 72; // 初始角度，使行星均匀分布

  // 创建一个随时间变化的旋转角度
  const rotate = useTransform(
    time,
    [0, duration],
    [initialAngle, initialAngle + 360],
    { clamp: false }
  );

  // 根据旋转角度计算 x 和 y 坐标
  const x = useTransform(rotate, (v) => radius * Math.cos(v * Math.PI / 180));
  const y = useTransform(rotate, (v) => radius * Math.sin(v * Math.PI / 180));

  const style = {
    x,
    y,
    width: size,
    height: size,
    translateX: '-50%',
    translateY: '-50%',
    '--planet-color': color, // CSS 变量，用于行星的颜色
    animationDelay: `${Math.random() * 4}s`,
  };

  return (
    // 行星的容器，带有进入和退出动画
    <motion.div
      style={style}
      className="absolute cursor-pointer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
      onClick={() => onSelect(item)}
      whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
    >
      {/* 行星的视觉实体，应用了霓虹脉冲效果 */}
      <div className="planet-orb flex h-full w-full items-center justify-center rounded-full relative">
        {item.logo ? (
          <Image 
            src={item.logo} 
            alt={item.title} 
            width={orbit.size * 0.6} 
            height={orbit.size * 0.6}
            className="object-contain"
            unoptimized
          />
        ) : (
          <span className="p-1 text-center text-[10px] font-bold text-slate-300">{item.title}</span>
        )}
      </div>
    </motion.div>
  );
};

// 点击行星后显示的详情卡片
const DetailCard = ({ item, onDeselect }: DetailCardProps) => {
  const title = item.content.company || item.content.school || item.content.name || '';
  const { displayText: titleText } = useTypewriter(title, { speed: 25, delay: 100 });
  const { displayText: roleText } = useTypewriter(item.content.role || '', { speed: 20, delay: 400 });
  const { displayText: dateText } = useTypewriter(item.content.date || '', { speed: 15, delay: 600 });
  
  return (
    // 卡片容器，带有进入和退出动画
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 w-full h-full flex items-center justify-center z-20"
    >
      {/* 半透明背景遮罩，点击可关闭卡片 */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onDeselect}></div>
      {/* 玻璃质感的卡片本体 */}
      <motion.div layoutId={`card-${item.id}`} className="relative glass-card w-full max-w-3xl p-12 rounded-2xl shadow-2xl border-white/20">
        {/* 关闭按钮 */}
        <button onClick={onDeselect} className="absolute top-4 right-4 text-slate-400 hover:text-white z-10">
          <X size={24} />
        </button>
        {/* 卡片内容 */}
        <h2 className="text-3xl font-bold gradient-text mb-2">
          {titleText}
          {titleText.length < title.length && (
            <span className="inline-block w-1 h-8 bg-sky-400 ml-1 animate-pulse"></span>
          )}
        </h2>
        {item.content.role && (
          <h3 className="text-xl text-sky-400 font-semibold mb-2">
            {roleText}
          </h3>
        )}
        {item.content.date && (
          <p className="text-sm text-slate-400 mb-6">{dateText}</p>
        )}
        <DetailPoints points={item.content.points} />
      </motion.div>
    </motion.div>
  );
};

// 详情点列表组件（带打字机效果）
const DetailPoints = ({ points }: { points: string[] }) => {
  const [displayedPoints, setDisplayedPoints] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    setDisplayedPoints([]);
    setCurrentIndex(0);
  }, [points]);
  
  useEffect(() => {
    if (currentIndex < points.length) {
      const timer = setTimeout(() => {
        setDisplayedPoints(prev => [...prev, points[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 300 * (currentIndex + 1));
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, points]);
  
  return (
    <ul className="space-y-3 text-slate-300 list-disc list-inside">
      {displayedPoints.map((point, i) => (
        <PointItem key={i} point={point} delay={i * 50} />
      ))}
    </ul>
  );
};

// 单个点项组件（带打字机效果）
const PointItem = ({ point, delay }: { point: string; delay: number }) => {
  const { displayText } = useTypewriter(point, { speed: 10, delay });
  
  return (
    <li>
      {displayText}
      {displayText.length < point.length && (
        <span className="inline-block w-1 h-4 bg-sky-400 ml-1 animate-pulse"></span>
      )}
    </li>
  );
};

// 交互式体验部分的主组件
const InteractiveExperience = ({ custom }: InteractiveExperienceProps) => {
  const { texts } = useLanguage();
  const experienceData = getExperienceData(texts);
  
  // 当前选中的经历项目
  const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null);
  const colors = ['#00aaff', '#ff00ff', '#00ffaa', '#ffaa00', '#aaff00'];

  return (
    // 整个交互式体验区域的容器
    <motion.div
      className="relative w-full h-full flex items-center justify-center"
    >
      {/* 中心个人头像，作为太阳系中心 */}
      <motion.div
        layoutId="profile-image-container" // 与 HeroSection 的头像共享布局动画
        className="relative w-80 h-80"
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          variants={profileImageVariants}
          custom={custom}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full h-full relative"
        >
          <Image
            src="/profile.jpg"
            alt={texts.hero.name}
            fill
            className="rounded-full object-cover border-4 border-slate-800 shadow-2xl"
            priority
          />
        </motion.div>
      </motion.div>

      {/* 太阳系的中心点，所有行星和轨道都相对于此定位 */}
      <motion.div
        className="absolute top-1/2 left-1/2"
        variants={orbitContainerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {/* 渲染所有虚线轨道 */}
        {orbits.map((orbit, index) => (
          <motion.div
            key={`orbit-${index}`}
            className="absolute rounded-full"
            variants={orbitVariants}
            style={{
              width: orbit.radius * 2,
              height: orbit.radius * 2,
              left: -orbit.radius,
              top: -orbit.radius,
              border: `1px dashed ${colors[index % colors.length]}`,
            }}
          />
        ))}
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

      <AnimatePresence>
        {selectedItem && <DetailCard item={selectedItem} onDeselect={() => setSelectedItem(null)} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default InteractiveExperience;