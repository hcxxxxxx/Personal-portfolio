'use client';

import { Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-6 left-6 z-50 flex items-center space-x-3 glass-card px-6 py-3 rounded-full backdrop-blur-lg border-2 border-sky-400/40 shadow-[0_0_20px_8px] shadow-sky-400/20 hover:bg-sky-400/20 hover:border-sky-400/60 hover:shadow-[0_0_25px_12px] hover:shadow-sky-400/30 transition-all duration-300 group"
      aria-label="Toggle language"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
      >
        <Languages className="w-6 h-6 text-sky-400 group-hover:text-sky-300 transition-colors" />
      </motion.div>
      <span className="text-base font-bold text-sky-400 group-hover:text-sky-300 transition-colors">
        {language === 'zh' ? 'EN' : '中文'}
      </span>
    </motion.button>
  );
}

