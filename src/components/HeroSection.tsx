'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTypewriter } from '@/hooks/useTypewriter';

// “英雄”部分，即网站的初始欢迎页面
const HeroSection = () => {
  const { texts } = useLanguage();
  const { displayText: nameText, isTyping: isNameTyping } = useTypewriter(texts.hero.name, { speed: 40, delay: 300 });
  const { displayText: descText, isTyping: isDescTyping } = useTypewriter(texts.hero.description, { speed: 15, delay: 800 });
  
  // 圆形图片的尺寸
  const circleSize = { base: 192, md: 256 }; // w-48 h-48 = 192px, md:w-64 md:h-64 = 256px
  const [dimensions, setDimensions] = useState({ 
    width: 1920, 
    height: 1080 
  });
  const [isMounted, setIsMounted] = useState(false);
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const placeholderRef = useRef<HTMLDivElement>(null);

  // 监听窗口大小变化和更新圆形位置
  useEffect(() => {
    setIsMounted(true);
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        setDimensions({ 
          width: window.innerWidth, 
          height: window.innerHeight 
        });
      }
    };

    const updateCirclePosition = () => {
      if (placeholderRef.current && typeof window !== 'undefined') {
        const rect = placeholderRef.current.getBoundingClientRect();
        setCirclePosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    updateDimensions();
    updateCirclePosition();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        updateDimensions();
        updateCirclePosition();
      });
      return () => {
        window.removeEventListener('resize', updateDimensions);
        window.removeEventListener('resize', updateCirclePosition);
      };
    }
  }, []);

  // 生成多列竖向排列的圆形
  const generateCircles = () => {
    if (!isMounted) return { allCircles: [], size: circleSize.base };
    
    const isMd = dimensions.width >= 768;
    const size = isMd ? circleSize.md : circleSize.base;
    const allCircles: Array<{
      id: string;
      x: number;
      y: number;
      opacity: number;
      isCenter: boolean;
      columnIndex: number;
    }> = [];
    
    // 计算需要多少个圆形来填满屏幕高度（圆形紧贴，垂直间距等于直径）
    const circlesPerColumn = Math.ceil(dimensions.height / size) + 2; // 多生成一些确保覆盖
    
    // 使用现有圆形的实际位置作为基准
    const columnX = circlePosition.x || (isMd ? dimensions.width * 0.7 : dimensions.width * 0.6);
    const centerY = circlePosition.y || dimensions.height / 2;
    
    // 计算两列圆形之间的水平距离：半径的根号3倍
    const horizontalDistance = (size / 2) * Math.sqrt(3);
    
    // 找到中心圆形的索引（基于现有圆形的位置）
    const centerCircleIndex = Math.round(centerY / size);
    
    // 计算起始位置，使中心圆形对齐到现有圆形的位置
    const startY = centerY - (centerCircleIndex * size);
    
    // 计算需要多少列才能超出屏幕右边界
    // 从最左侧的列开始（columnX - horizontalDistance），向右添加列直到超出屏幕
    const leftmostColumnX = columnX - horizontalDistance;
    let currentColumnX = leftmostColumnX;
    let columnIndex = 0;
    
    // 先计算所有列的位置，以确定最左侧和最右侧的x坐标
    const columnPositions: number[] = [];
    while (currentColumnX - size / 2 <= dimensions.width) {
      columnPositions.push(currentColumnX);
      currentColumnX += horizontalDistance;
    }
    
    // 找到最左侧和最右侧的x坐标
    const minX = Math.min(...columnPositions);
    const maxX = Math.max(...columnPositions);
    const xRange = maxX - minX;
    
    // 重置当前列位置
    currentColumnX = leftmostColumnX;
    columnIndex = 0;
    
    // 继续向右添加列，直到超出屏幕右边界
    while (currentColumnX - size / 2 <= dimensions.width) {
      // 判断当前列是否需要交错排列（奇数列和偶数列交替）
      const isOffsetColumn = columnIndex % 2 === 1; // 奇数列（索引1,3,5...）需要偏移
      const verticalOffset = isOffsetColumn ? size / 2 : 0;
      
      // 计算水平方向的透明度系数：从左侧0.3到右侧1.0
      const normalizedX = xRange > 0 ? (currentColumnX - minX) / xRange : 0;
      const horizontalOpacity = 0.2 + normalizedX * 0.8; // 从 0.3 渐变到 1.0
      
      // 生成当前列的圆形
      for (let i = -1; i <= circlesPerColumn; i++) {
        const y = startY + (i * size) + verticalOffset; // 根据列索引决定是否偏移
        
        // 从上方到下方透明度渐变：顶部 opacity=1.0，底部 opacity=0.3
        const normalizedY = Math.min(1, Math.max(0, (y + size / 2) / dimensions.height));
        const verticalOpacity = 1.0 - normalizedY * 0.2; // 从 1.0 渐变到 0.3
        
        // 将垂直透明度和水平透明度相乘，得到最终透明度
        const finalOpacity = Math.max(0.2, verticalOpacity * horizontalOpacity);
        
        // 只有第一列（columnIndex === 0）的中心圆形保持 layoutId 和动画
        const isCenter = columnIndex === 0 && i === centerCircleIndex;
        
        allCircles.push({
          id: `circle-col${columnIndex}-row${i}`,
          x: currentColumnX,
          y: y,
          opacity: finalOpacity,
          isCenter: isCenter,
          columnIndex: columnIndex,
        });
      }
      
      // 移动到下一列
      currentColumnX += horizontalDistance;
      columnIndex++;
    }
    
    return { allCircles, size };
  };

  const { allCircles, size } = generateCircles();
  
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

      {/* 右侧图片区域 - 固定位置（占位，保持布局） */}
      <div ref={placeholderRef} className="relative flex justify-center flex-shrink-0 w-48 h-48 md:w-64 md:h-64">
        {/* 占位元素，保持原有布局空间 */}
        <div className="relative w-full h-full" />
      </div>

      {/* 多列竖向排列的圆形图片 - 使用 fixed 定位相对于视口，仅在客户端渲染 */}
      {isMounted && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {allCircles.map((circle) => (
            circle.isCenter ? (
              // 中心圆形（第一列的中心圆形），保持 layoutId 和动画
              <motion.div
                key={circle.id}
                layoutId="profile-image-container"
                className="absolute pointer-events-none"
                style={{
                  left: `${circle.x - size / 2}px`,
                  top: `${circle.y}px`,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: circle.opacity,
                }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/profile.jpg"
                    alt={texts.hero.name}
                    fill
                    className="rounded-full object-cover border-4 border-slate-800 shadow-2xl"
                    priority
                  />
                </div>
              </motion.div>
            ) : (
              // 其他圆形，普通 div
              <div
                key={circle.id}
                className="absolute pointer-events-none"
                style={{
                  left: `${circle.x - size / 2}px`,
                  top: `${circle.y}px`,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: circle.opacity,
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/profile.jpg"
                    alt=""
                    fill
                    className="rounded-full object-cover border-4 border-slate-800 shadow-2xl"
                  />
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default HeroSection;