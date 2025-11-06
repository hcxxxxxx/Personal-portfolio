'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, getTexts, LocaleTexts } from '@/locales';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  texts: LocaleTexts;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // 初始状态：服务器端和客户端都使用默认值 'zh'，确保水合一致
  const [language, setLanguageState] = useState<Language>('zh');
  const [isMounted, setIsMounted] = useState(false);

  // 客户端挂载后，从 localStorage 读取保存的语言设置
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved === 'zh' || saved === 'en') {
        setLanguageState(saved);
      }
    }
  }, []);

  // 当语言改变时，保存到 localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  // 获取当前语言的文本
  const texts = getTexts(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, texts }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 自定义 Hook，用于在组件中使用语言上下文
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

