'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Smartphone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// 检测是否为移动设备
const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // 检测用户代理
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  
  // 检测屏幕宽度（小于 1024px 视为移动设备）
  const isSmallScreen = window.innerWidth < 1024;
  
  return mobileRegex.test(userAgent) || isSmallScreen;
};

export default function MobileBlock() {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState<boolean | null>(null); // null 表示还未检测

  useEffect(() => {
    // 初始检测
    setIsMobile(isMobileDevice());
    
    // 监听窗口大小变化
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 如果还未检测完成，不显示任何内容（避免闪烁）
  if (isMobile === null) {
    return null;
  }

  // 如果不是移动设备，不显示任何内容
  if (!isMobile) {
    return null;
  }

  // 移动设备提示文本
  const mobileTexts = {
    zh: {
      title: '请使用电脑访问',
      message: '本网站专为桌面端设计，为了获得最佳体验，请使用电脑浏览器访问。',
      icon: '💻'
    },
    en: {
      title: 'Please Use Desktop',
      message: 'This website is designed for desktop. For the best experience, please access it using a desktop browser.',
      icon: '💻'
    }
  };

  const text = mobileTexts[language];

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900 flex items-center justify-center p-6">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-800/90 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8 shadow-2xl"
        >
          {/* 图标 */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl"></div>
              <div className="relative bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full p-6 border border-cyan-500/30">
                <Monitor size={48} className="text-cyan-400" />
              </div>
            </div>
          </div>

          {/* 标题 */}
          <h1 className="text-2xl font-bold text-center mb-4 text-slate-100">
            {text.title}
          </h1>

          {/* 消息 */}
          <p className="text-center text-slate-300 mb-6 leading-relaxed">
            {text.message}
          </p>

          {/* 装饰线条 */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
            <div className="mx-4">
              <Smartphone size={20} className="text-slate-500" />
            </div>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
          </div>

          {/* 提示信息 */}
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
            <p className="text-sm text-center text-slate-400">
              {language === 'zh' 
                ? '📱 移动设备暂不支持访问' 
                : '📱 Mobile devices are not supported'}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

