'use client';

import { useState, useEffect, ReactNode } from 'react';
import MobileBlock from './MobileBlock';

// 检测是否为移动设备
const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // 检测用户代理
  const userAgent = navigator.userAgent || navigator.vendor || (window as Window & { opera?: string }).opera || '';
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  
  // 检测屏幕宽度（小于 1024px 视为移动设备）
  const isSmallScreen = window.innerWidth < 1024;
  
  return mobileRegex.test(userAgent) || isSmallScreen;
};

interface MobileBlockWrapperProps {
  children: ReactNode;
}

export default function MobileBlockWrapper({ children }: MobileBlockWrapperProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(isMobileDevice());
    
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 如果是移动设备，不渲染子内容
  if (isMobile === true) {
    return <MobileBlock />;
  }

  // 如果不是移动设备或还未检测完成，渲染正常内容
  return <>{children}</>;
}

