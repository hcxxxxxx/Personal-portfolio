'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTypewriter } from '@/hooks/useTypewriter';

// “英雄”部分，即网站的初始欢迎页面
const HeroSection = () => {
  const { texts } = useLanguage();
  const { displayText: nameText, isTyping: isNameTyping } = useTypewriter(texts.hero.name, { speed: 80, delay: 300 });
  const { displayText: descText, isTyping: isDescTyping } = useTypewriter(texts.hero.description, { speed: 30, delay: 800 });
  
  return (
    // 使用 framer-motion 的 section 元素，作为动画容器
    <motion.section 
      className="w-full h-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16 p-8"
    >
      {/* 左侧文本内容区域 */}
      <motion.div
        // 定义进入动画：从左侧 -50px 的位置淡入
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        // 定义退出动画：向左侧 -50px 的位置淡出
        exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center md:text-left flex-1 md:flex-none md:w-1/2 overflow-visible"
        style={{ overflow: 'visible' }}
      >
        {/* 主标题：姓名 - 固定高度容器 */}
        <div className="mb-4 flex items-center" style={{ minHeight: '6rem', paddingTop: '2rem', paddingBottom: '2rem', overflow: 'visible' }}>
          <h1 className="text-5xl md:text-7xl font-bold relative" style={{ overflow: 'visible' }}>
            <span className="gradient-text-wrapper inline-block relative">
              <span className="gradient-text inline-block relative z-10">{nameText}</span>
            </span>
            {isNameTyping && (
              <span className="inline-block w-1 h-12 md:h-16 bg-sky-400 ml-1 animate-pulse relative z-10"></span>
            )}
          </h1>
        </div>
        {/* 副标题：个人简介 - 固定高度容器 */}
        <div className="h-32 md:h-40 mb-8 max-w-2xl">
          <p className="text-lg md:text-xl text-slate-300">
            {descText}
            {isDescTyping && (
              <span className="inline-block w-1 h-5 md:h-6 bg-sky-400 ml-1 animate-pulse"></span>
            )}
          </p>
        </div>
      </motion.div>

      {/* 右侧图片区域 - 固定位置 */}
      <div className="relative flex justify-center flex-shrink-0 w-48 h-48 md:w-64 md:h-64">
        {/* 图片容器，应用布局动画 */}
        <motion.div 
          layoutId="profile-image-container" // 用于在不同视图间共享布局动画
          className="relative w-full h-full"
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* 个人头像 */}
          <img
            src="/profile.jpg"
            alt={texts.hero.name}
            className="w-full h-full rounded-full object-cover border-4 border-slate-800 shadow-2xl"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;