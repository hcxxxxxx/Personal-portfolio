'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTypewriter } from '@/hooks/useTypewriter';

// 定义视图类型
type View = 'hero' | 'experience' | 'chat' | 'contact';

interface CustomAnimationProps {
  prev: View;
  next: View;
}

interface HeroSectionProps {
  custom?: CustomAnimationProps;
}

// 中心头像的动画变体，用于实现丝滑的神奇移动过渡
const profileImageVariants: Variants = {
  initial: (custom?: CustomAnimationProps) => {
    // 从 experience 返回时，添加轻微的缩放和透明度变化，让过渡更丝滑
    if (custom?.prev === 'experience' && custom?.next === 'hero') {
      return {
        opacity: 0.7, // 稍微透明，然后淡入（会与水平透明渐变相乘）
        scale: 0.95, // 稍微缩小，然后放大到正常
      };
    }
    // 初次加载时
    return {
      opacity: 1,
      scale: 1,
    };
  },
  animate: (custom?: CustomAnimationProps) => {
    // 从 experience 返回时，使用更平滑的过渡
    if (custom?.prev === 'experience' && custom?.next === 'hero') {
      return {
        opacity: 1, // 最终完全不透明（会与水平透明渐变相乘）
        scale: 1,
        transition: { 
          duration: 0.7, 
          ease: [0.4, 0, 0.2, 1], // 使用与 layoutId 相同的缓动函数
          opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }, // 透明度变化稍快
          scale: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } // 缩放与位置同步
        }
      };
    }
    return {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
    };
  },
  exit: (custom?: CustomAnimationProps) => {
    // 跳转到 experience 时，保持可见，让 layoutId 处理位置变化
    if (custom?.next === 'experience') {
      return {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
      };
    }
    return {};
  }
};

// “英雄”部分，即网站的初始欢迎页面
const HeroSection = ({ custom }: HeroSectionProps) => {
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
  const [showCircles, setShowCircles] = useState(false); // 初始为 false，触发出场动画
  const [showCenterCircle, setShowCenterCircle] = useState(false); // 控制中心圆形是否显示（初次加载时）
  const [animationKey, setAnimationKey] = useState(0); // 用于强制重新渲染以触发出场动画
  const hasAnimatedRef = useRef(false); // 标记是否已经执行过初次动画
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null); // 用于清理定时器
  const layoutAnimationInProgressRef = useRef(false); // 标记 layoutId 动画是否正在进行
  const lockedCenterPositionRef = useRef<{ x: number; y: number } | null>(null); // 锁定动画期间的中心圆形位置
  
  // 在页面切换时更新中心圆形位置（不再需要 layoutId 动画相关逻辑）
  useEffect(() => {
    if (custom?.next === 'hero' && custom?.prev === 'experience' && typeof window !== 'undefined') {
      // 从 experience 返回 hero 时，更新位置（用于计算圆形位置）
      requestAnimationFrame(() => {
        if (placeholderRef.current) {
          const rect = placeholderRef.current.getBoundingClientRect();
          const placeholderPosition = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
          setCirclePosition(placeholderPosition);
        }
      });
    }
  }, [custom]);

  // 检测页面跳转状态
  useEffect(() => {
    // 清理之前的定时器
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }

    // 检测是否从 hero 跳转到 experience
    if (custom?.next === 'experience' && custom?.prev === 'hero') {
      // 开始消失动画：隐藏所有非中心圆形
      setShowCircles(false);
      // 中心圆形保持显示，参与神奇移动动画（hero -> experience）
      setShowCenterCircle(true);
      hasAnimatedRef.current = false; // 重置标记，允许返回时重新触发
    } 
    // 检测是否从 experience 返回 hero 页（且之前没有触发过）
    else if (custom?.next === 'hero' && custom?.prev === 'experience' && !hasAnimatedRef.current) {
      // 从 experience 返回 hero 页
      // 先隐藏所有圆形（包括中心圆形），等待 experience 页退出动画完成
      setShowCircles(false);
      setShowCenterCircle(false);
      // 等待 experience 页向下推出动画完成（1.0秒）后再触发出场动画
      animationTimeoutRef.current = setTimeout(() => {
        setAnimationKey(prev => prev + 1); // 更新 key 强制重新渲染
        setShowCircles(true); // 显示圆形，触发 initial 动画
        setShowCenterCircle(true); // 同时显示中心圆形，参与出场动画
        hasAnimatedRef.current = true; // 标记已触发
        animationTimeoutRef.current = null;
      }, 1000); // 等待 experience 页退出动画完成
    }
    // 初次加载时（没有 custom 或 custom.next 为 'hero' 且 prev 也为 'hero'）
    else if ((!custom || (custom?.next === 'hero' && custom?.prev === 'hero')) && !hasAnimatedRef.current && isMounted) {
      // 初次加载，触发出场动画（包括中心圆形）
      setShowCenterCircle(false); // 初始隐藏中心圆形
      animationTimeoutRef.current = setTimeout(() => {
        setAnimationKey(prev => prev + 1);
        setShowCircles(true);
        setShowCenterCircle(true); // 同时显示中心圆形
        hasAnimatedRef.current = true;
        animationTimeoutRef.current = null;
      }, 100); // 稍微延迟，确保 DOM 已准备好
    }
    
    // 清理函数
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
        animationTimeoutRef.current = null;
      }
    };
  }, [custom, isMounted]);

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
      // 如果 layoutId 动画正在进行，不更新位置，避免干扰动画
      if (layoutAnimationInProgressRef.current) {
        return;
      }
      if (placeholderRef.current && typeof window !== 'undefined') {
        const rect = placeholderRef.current.getBoundingClientRect();
        setCirclePosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    // 立即更新位置，不等待下一帧
    updateDimensions();
    updateCirclePosition();
    
    // 使用 requestAnimationFrame 确保 DOM 已准备好
    requestAnimationFrame(() => {
      updateCirclePosition();
    });
    
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

  // HeroPic 图片列表
  const heroPicImages = [
    '/HeroPic/HeroPic01.JPG',
    '/HeroPic/HeroPic02.JPG',
    '/HeroPic/HeroPic03.JPG',
    '/HeroPic/HeroPic04.JPG',
    '/HeroPic/HeroPic05.JPG',
    '/HeroPic/HeroPic06.JPG',
    '/HeroPic/HeroPic07.JPG',
    '/HeroPic/HeroPic08.JPG',
    '/HeroPic/HeroPic09.JPG',
    '/HeroPic/HeroPic10.JPG',
    '/HeroPic/HeroPic11.JPG',
    '/HeroPic/HeroPic12.JPG',
    '/HeroPic/HeroPic14.JPG',
    '/HeroPic/HeroPic15.JPG',
    '/HeroPic/HeroPic16.JPG',
  ];

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
      imageSrc: string;
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
    
    // 维护图片使用状态：标记哪些图片已被使用
    const usedImages = new Array(heroPicImages.length).fill(false);
    
    // 获取下一个未使用的图片索引
    const getNextUnusedImageIndex = (): number => {
      // 查找第一个未使用的图片
      const unusedIndex = usedImages.findIndex(used => !used);
      
      if (unusedIndex !== -1) {
        // 找到未使用的图片，标记为已使用
        usedImages[unusedIndex] = true;
        return unusedIndex;
      } else {
        // 所有图片都已使用，重置标记数组并重新开始
        usedImages.fill(false);
        usedImages[0] = true; // 标记第一个为已使用
        return 0;
      }
    };
    
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
        
        // 判断圆形是否在屏幕可见范围内（考虑圆形的半径）
        const circleLeft = currentColumnX - size / 2;
        const circleRight = currentColumnX + size / 2;
        const circleTop = y;
        const circleBottom = y + size;
        
        // 检查圆形是否与屏幕有重叠（允许部分超出屏幕）
        const isVisible = circleRight > 0 && 
                         circleLeft < dimensions.width && 
                         circleBottom > 0 && 
                         circleTop < dimensions.height;
        
        // 从上方到下方透明度渐变：顶部 opacity=1.0，底部 opacity=0.3
        const normalizedY = Math.min(1, Math.max(0, (y + size / 2) / dimensions.height));
        const verticalOpacity = 1.0 - normalizedY * 0.2; // 从 1.0 渐变到 0.3
        
        // 将垂直透明度和水平透明度相乘，得到最终透明度
        const finalOpacity = Math.max(0.2, verticalOpacity * horizontalOpacity);
        
        // 只有第一列（columnIndex === 0）的中心圆形保持 layoutId 和动画
        const isCenter = columnIndex === 0 && i === centerCircleIndex;
        
        // 为非中心圆形分配 HeroPic 图片（只对屏幕可见范围内的圆形进行统计和分配）
        let imageSrc: string;
        if (isCenter) {
          imageSrc = '/profile.jpg';
        } else if (isVisible) {
          // 只对可见范围内的圆形进行图片分配和统计
          const imageIndex = getNextUnusedImageIndex();
          imageSrc = heroPicImages[imageIndex];
        } else {
          // 不在可见范围内的圆形使用占位图片（不进行统计）
          imageSrc = heroPicImages[0]; // 使用第一张图片作为占位
        }
        
        allCircles.push({
          id: `circle-col${columnIndex}-row${i}`,
          x: currentColumnX,
          y: y,
          opacity: finalOpacity,
          isCenter: isCenter,
          columnIndex: columnIndex,
          imageSrc: imageSrc,
        });
      }
      
      // 移动到下一列
      currentColumnX += horizontalDistance;
      columnIndex++;
    }
    
    return { allCircles, size };
  };

  // 使用 useMemo 缓存计算结果，避免每次渲染都重新计算
  const { allCircles, size } = useMemo(() => generateCircles(), [isMounted, dimensions.width, dimensions.height, circlePosition.x, circlePosition.y]);
  
  // 只渲染可见的圆形，减少 DOM 节点和图片加载
  const visibleCircles = useMemo(() => {
    if (!isMounted) return [];
    // 添加一个缓冲区，提前加载即将进入视口的圆形
    const buffer = size * 2; // 2倍圆形大小的缓冲区
    return allCircles.filter(circle => {
      if (circle.isCenter) return true; // 中心圆形始终渲染
      // 检查圆形是否在视口范围内（包括缓冲区）
      const circleLeft = circle.x - size / 2;
      const circleRight = circle.x + size / 2;
      const circleTop = circle.y;
      const circleBottom = circle.y + size;
      
      return circleRight > -buffer && 
             circleLeft < dimensions.width + buffer && 
             circleBottom > -buffer && 
             circleTop < dimensions.height + buffer;
    });
  }, [allCircles, size, dimensions.width, dimensions.height, isMounted]);
  
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
      {/* 中心圆形需要立即渲染以支持 layoutId 动画，但必须在客户端渲染以避免 hydration mismatch */}
      {isMounted && (() => {
        // 计算中心圆形的实际位置（第一列的位置，而不是占位元素的位置）
        const getCenterCircleActualPosition = () => {
          if (!circlePosition.x || !circlePosition.y) {
            return null;
          }
          // 计算第一列（中心圆形所在列）的 x 坐标
          const isMd = dimensions.width >= 768;
          const size = isMd ? circleSize.md : circleSize.base;
          const horizontalDistance = (size / 2) * Math.sqrt(3);
          // 占位元素的位置是 columnX，但中心圆形在第一列，位置是 leftmostColumnX
          const columnX = circlePosition.x;
          const leftmostColumnX = columnX - horizontalDistance;
          return {
            x: leftmostColumnX,
            y: circlePosition.y,
            opacity: 1,
          };
        };

        // 计算中心圆形的位置（仅在客户端计算，避免 hydration mismatch）
        const centerCircleForLayout = (() => {
          // 如果动画正在进行，使用锁定的位置（占位元素的位置，这是 layoutId 的目标位置）
          if (layoutAnimationInProgressRef.current && lockedCenterPositionRef.current) {
            return {
              x: lockedCenterPositionRef.current.x,
              y: lockedCenterPositionRef.current.y,
              opacity: 1,
            };
          }
          // 优先使用已计算的位置（占位元素的位置，用于 layoutId 动画）
          if (circlePosition.x > 0 && circlePosition.y > 0) {
            return {
              x: circlePosition.x,
              y: circlePosition.y,
              opacity: 1,
            };
          }
          // 如果还没有位置，尝试从占位元素获取
          if (placeholderRef.current) {
            const rect = placeholderRef.current.getBoundingClientRect();
            return {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
              opacity: 1,
            };
          }
          // 最后使用默认位置（仅在客户端）
          return {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            opacity: 1,
          };
        })();

        return (
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* 中心圆形（第一列的中心圆形），保持 layoutId 和动画 - 始终显示，不受 showCircles 影响 */}
            {(() => {
              // 如果 layoutId 动画正在进行，始终使用锁定的位置，避免闪烁和位置跳跃
              let currentCenterCircle;
              let currentSize;
              
              if (layoutAnimationInProgressRef.current) {
                // 动画期间，使用锁定的位置（占位元素的位置，这是 layoutId 的目标位置）
                currentCenterCircle = centerCircleForLayout;
                currentSize = circleSize.base; // 使用基础尺寸
              } else {
                // 动画完成后，优先使用计算出的中心圆形实际位置
                const centerCircle = visibleCircles.find(circle => circle.isCenter);
                if (centerCircle) {
                  // 使用计算出的中心圆形位置（第一列的位置）
                  currentCenterCircle = centerCircle;
                  currentSize = size;
                } else {
                  // 如果没有找到，尝试使用实际位置
                  const actualPosition = getCenterCircleActualPosition();
                  if (actualPosition) {
                    currentCenterCircle = actualPosition;
                    currentSize = size;
                  } else {
                    // 最后使用占位元素的位置
                    currentCenterCircle = centerCircleForLayout;
                    currentSize = circleSize.base;
                  }
                }
              }
            
              // 创建动态的动画变体，将水平透明渐变合并进去
              const dynamicVariants: Variants = {
                initial: (custom?: CustomAnimationProps) => {
                  const baseOpacity = currentCenterCircle.opacity;
                  // 初次加载或从 experience 返回时，中心圆形都参与出场动画（从 opacity: 0, scale: 0 开始）
                  const isInitialLoad = !custom || (custom?.next === 'hero' && custom?.prev === 'hero');
                  const isFromExperience = custom?.next === 'hero' && custom?.prev === 'experience';
                  if (isInitialLoad || isFromExperience) {
                    return {
                      opacity: 0,
                      scale: 0,
                    };
                  }
                  // 跳转到 experience 时，从当前透明度（baseOpacity）开始
                  const isToExperience = custom?.next === 'experience' && custom?.prev === 'hero';
                  if (isToExperience) {
                    return {
                      opacity: baseOpacity, // 从 hero 页的透明度开始
                      scale: 1,
                    };
                  }
                  return {
                    opacity: baseOpacity, // 水平透明渐变
                    scale: 1,
                  };
                },
                animate: (custom?: CustomAnimationProps) => {
                  const baseOpacity = currentCenterCircle.opacity;
                  // 初次加载或从 experience 返回时，中心圆形都参与出场动画
                  const isInitialLoad = !custom || (custom?.next === 'hero' && custom?.prev === 'hero');
                  const isFromExperience = custom?.next === 'hero' && custom?.prev === 'experience';
                  if ((isInitialLoad || isFromExperience) && showCenterCircle) {
                    // 计算中心圆形在排序中的位置，以便与其他圆形一起依次出现
                    const centerCircle = visibleCircles.find(circle => circle.isCenter);
                    const sortedCircles = [...visibleCircles]
                      .sort((a, b) => {
                        if (Math.abs(a.x - b.x) > currentSize / 2) {
                          return a.x - b.x;
                        }
                        return a.y - b.y;
                      });
                    const centerIndex = centerCircle ? sortedCircles.findIndex(c => c.id === centerCircle.id) : 0;
                    const totalCircles = sortedCircles.length;
                    const staggerDelay = (centerIndex / totalCircles) * 0.8;
                    
                    return {
                      opacity: baseOpacity,
                      scale: 1,
                      transition: {
                        duration: 0.3,
                        delay: staggerDelay,
                        ease: 'easeInOut',
                      }
                    };
                  }
                  // 跳转到 experience 时，透明度从 baseOpacity 过渡到 1（完全不透明）
                  // 注意：这个 animate 会在 experience 页显示时执行，与 layoutId 动画同步
                  const isToExperience = custom?.next === 'experience' && custom?.prev === 'hero';
                  if (isToExperience) {
                    return {
                      opacity: 1, // 过渡到完全不透明（experience 页中应该完全不透明）
                      scale: 1,
                      transition: { 
                        duration: 0.7, 
                        ease: [0.4, 0, 0.2, 1],
                        // 不单独设置 opacity 的 transition，让它使用默认的 transition，与 layoutId 同步
                      }
                    };
                  }
                  return {
                    opacity: baseOpacity,
                    scale: 1,
                    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
                  };
                },
                exit: (custom?: CustomAnimationProps) => {
                  // exit 在组件离开时触发，对于 layoutId 动画，透明度过渡在 animate 中处理
                  return {};
                }
              };

              // 初次加载或从 experience 返回时，中心圆形都需要参与出场动画
              const isInitialLoad = !custom || (custom?.next === 'hero' && custom?.prev === 'hero');
              const isFromExperience = custom?.next === 'hero' && custom?.prev === 'experience';
              const isToExperience = custom?.next === 'experience' && custom?.prev === 'hero';
              
              // 使用 AnimatePresence 来处理出场动画（初次加载或从 experience 返回）
              if (isInitialLoad || isFromExperience) {
                return (
                  <AnimatePresence>
                    {showCenterCircle && (
                      <motion.div 
                        key={`profile-image-container-${animationKey}`} // 使用 animationKey 确保重新渲染
                        // 从 experience 返回时不使用 layoutId，其他情况也不使用（因为使用 AnimatePresence）
                        className="absolute pointer-events-none"
                        style={{
                          left: `${currentCenterCircle.x - currentSize / 2}px`,
                          top: `${currentCenterCircle.y}px`,
                          width: `${currentSize}px`,
                          height: `${currentSize}px`,
                        }}
                        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                        initial={false} // 让内层 motion.div 处理 initial
                      >
        <motion.div 
                          variants={dynamicVariants}
                          custom={custom}
                          initial="initial"
                          animate="animate"
                          exit="exit"
          className="relative w-full h-full"
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
                    )}
                  </AnimatePresence>
                );
              }

              // hero -> experience 时，使用 layoutId 实现神奇移动
              if (isToExperience) {
                // 计算透明度：保持 hero 页的透明度，让 experience 页处理过渡
                const baseOpacity = currentCenterCircle.opacity;
                return (
                  <motion.div 
                    key="profile-image-container" // 使用固定的 key 确保 layoutId 匹配
                    layoutId="profile-image-container"
                    className="absolute pointer-events-none"
                    style={{
                      left: `${currentCenterCircle.x - currentSize / 2}px`,
                      top: `${currentCenterCircle.y}px`,
                      width: `${currentSize}px`,
                      height: `${currentSize}px`,
                      opacity: baseOpacity, // 保持 hero 页的透明度，让 layoutId 动画时保持
                    }}
                    transition={{ 
                      duration: 0.7, 
                      ease: [0.4, 0, 0.2, 1],
                      // 不在这里处理 opacity 过渡，让 experience 页处理
                    }}
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
                );
              }

              // 其他情况（不应该到达这里）
              return null;
            })()}
          </div>
        );
      })()}
      
      {/* 非中心圆形，仅在 isMounted 时渲染 */}
      {isMounted && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <AnimatePresence mode="popLayout">
            {showCircles && (() => {
              // 对圆形进行排序：从左到右，从上到下
              const sortedCircles = [...visibleCircles.filter(circle => !circle.isCenter)]
                .sort((a, b) => {
                  // 先按 x 坐标排序（从左到右）
                  if (Math.abs(a.x - b.x) > size / 2) {
                    return a.x - b.x;
                  }
                  // 如果 x 坐标相近，按 y 坐标排序（从上到下）
                  return a.y - b.y;
                });
              
              return sortedCircles.map((circle, index) => {
                // 计算 stagger 延迟：从左到右、从上到下依次动画
                const totalCircles = sortedCircles.length;
                const staggerDelay = (index / totalCircles) * 0.8; // 总动画时长 0.8 秒
                
                return (
                  <motion.div
                    key={`${circle.id}-${animationKey}`} // 使用 animationKey 强制重新渲染
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: circle.opacity, 
                      scale: 1,
                      transition: {
                        duration: 0.3,
                        delay: staggerDelay,
                        ease: 'easeInOut',
                      }
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                      transition: {
                        duration: 0.3,
                        delay: staggerDelay,
                        ease: 'easeInOut',
                      },
                    }}
                    className="absolute pointer-events-none"
                    style={{
                      left: `${circle.x - size / 2}px`,
                      top: `${circle.y}px`,
                      width: `${size}px`,
                      height: `${size}px`,
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={circle.imageSrc}
                        alt=""
                        fill
                        className="rounded-full object-cover border-4 border-slate-800 shadow-2xl"
                        loading="lazy"
                        sizes={`${size}px`}
                        quality={75}
                      />
                    </div>
                  </motion.div>
                );
              });
            })()}
          </AnimatePresence>
      </div>
      )}
    </motion.section>
  );
};

export default HeroSection;