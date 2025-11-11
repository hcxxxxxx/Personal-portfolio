'use client';

import { useState, useEffect, useMemo, useRef, cloneElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import InteractiveExperience from '@/components/InteractiveExperience';
import AIChatSection from '@/components/AIChatSection';
import ContactSection from '@/components/ContactSection';
import SideNav from '@/components/SideNav';

// 定义视图类型的联合类型，用于表示当前显示的页面部分
type View = 'hero' | 'experience' | 'chat' | 'contact';

// 主页组件，管理整个单页应用的视图切换和状态
export default function Home() {
  // 'view' state 用于跟踪当前显示的页面部分
  const [view, setView] = useState<View>('hero');
  const prevViewRef = useRef<View>(view);
  // 'pendingView' 用于在圆形消失动画期间暂存目标视图
  const [pendingView, setPendingView] = useState<View | null>(null);

  useEffect(() => {
    prevViewRef.current = view;
  });
  // 'isWheeling' state 用于防止滚轮事件在动画期间重复触发
  const [isWheeling, setIsWheeling] = useState(false);

  // 使用 useMemo 优化性能，定义所有可用的页面部分
  // 每个部分包含一个唯一的 id, 对应的组件, 以及索引
  const sections = useMemo(() => [
    { id: 'hero' as View, component: <HeroSection />, index: 0 },
    { id: 'experience' as View, component: <InteractiveExperience />, index: 1 },
    { id: 'chat' as View, component: <div className="w-full h-full flex items-center justify-center"><AIChatSection /></div>, index: 2 },
    { id: 'contact' as View, component: <div className="w-full h-full flex items-center justify-center"><ContactSection /></div>, index: 3 },
  ], []);

  // useEffect 用于处理鼠标滚轮事件，实现页面内容的滚动切换
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isWheeling) return; // 如果正在滚动动画中，则忽略新的滚动事件

      const currentSectionIndex = sections.findIndex(s => s.id === view);
      let nextView: View | null = null;

      // 向下滚动，且不是最后一个部分
      if (e.deltaY > 5 && currentSectionIndex < sections.length - 1) {
        nextView = sections[currentSectionIndex + 1].id;
      } 
      // 向上滚动，且不是第一个部分
      else if (e.deltaY < -5 && currentSectionIndex > 0) {
        nextView = sections[currentSectionIndex - 1].id;
      }

      if (nextView) {
        // 如果从 hero 跳转到 experience，先设置 pendingView 触发消失动画
        if (view === 'hero' && nextView === 'experience') {
          setIsWheeling(true);
          setPendingView(nextView); // 设置待跳转的视图，触发 HeroSection 的消失动画
          // 等待圆形消失动画完成（0.8秒总时长 + 0.3秒单个动画时长 = 1.1秒）
          setTimeout(() => {
            setView(nextView);
            setPendingView(null);
            setTimeout(() => setIsWheeling(false), 1200);
          }, 1100);
        } else {
          setView(nextView); // 更新视图
          setIsWheeling(true); // 设置滚动锁定
          // 1.2秒后解除锁定，以匹配动画时长
          setTimeout(() => setIsWheeling(false), 1200);
        }
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [view, isWheeling, sections]);


  // 根据当前 'view' state 找到要渲染的组件
  const activeComponent = sections.find((sec) => sec.id === view)?.component;

  // 侧边导航栏的导航处理函数
  const handleNavigate = (newView: View) => {
    if (isWheeling) return; // 防止在动画期间重复点击
    
    // 如果从 hero 跳转到 experience，先设置 pendingView 触发消失动画
    if (view === 'hero' && newView === 'experience') {
      setIsWheeling(true);
      setPendingView(newView); // 设置待跳转的视图，触发 HeroSection 的消失动画
      // 等待圆形消失动画完成（0.8秒总时长 + 0.3秒单个动画时长 = 1.1秒）
      setTimeout(() => {
        setView(newView);
        setPendingView(null);
        setTimeout(() => setIsWheeling(false), 1200);
      }, 1100);
    } 
    // 如果从 experience 跳转到 hero，等待退出动画完成
    else if (view === 'experience' && newView === 'hero') {
      setIsWheeling(true);
      setPendingView(newView); // 设置待跳转的视图，触发 InteractiveExperience 的退出动画
      // 等待 experience 页向下推出动画完成（1.0秒）
      setTimeout(() => {
        setView(newView);
        setPendingView(null);
        setTimeout(() => setIsWheeling(false), 1200);
      }, 1000);
    } 
    else {
      setView(newView);
      setIsWheeling(true);
      setTimeout(() => setIsWheeling(false), 1200);
    }
  };

  return (
    <>
      {/* 侧边导航栏，显示当前活动视图并处理导航 */}
      <SideNav activeView={view} onNavigate={handleNavigate} />
      {/* 主内容区域，占据整个屏幕 */}
      <div className="relative w-screen h-screen overflow-hidden">
        {/* AnimatePresence 用于处理组件进入和退出时的动画 */}
        <AnimatePresence initial={false} custom={{ next: view, prev: prevViewRef.current }}>
          {activeComponent && (
            // motion.div 用于为视图切换添加动画效果
            <motion.div
              key={view} // key 的变化会触发组件的重新渲染和动画
              className="absolute inset-0 w-full h-full"
            >
              {cloneElement(activeComponent, { custom: { next: pendingView || view, prev: prevViewRef.current } })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
