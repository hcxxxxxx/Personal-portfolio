'use client';

import { motion } from 'framer-motion';
import { User, Briefcase, MessageSquare, Music } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type View = 'hero' | 'experience' | 'chat' | 'contact';

interface MobileNavProps {
  activeView: View;
  onNavigate: (view: View) => void;
}

export default function MobileNav({ activeView, onNavigate }: MobileNavProps) {
  const { texts } = useLanguage();

  const navItems: { id: View; icon: React.ReactNode; label: string }[] = [
    { id: 'hero', icon: <User size={20} />, label: texts.nav.hero.name },
    { id: 'experience', icon: <Briefcase size={20} />, label: texts.nav.experience.name },
    { id: 'chat', icon: <MessageSquare size={20} />, label: texts.nav.chat.name },
    { id: 'contact', icon: <Music size={20} />, label: texts.nav.contact.name },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      {/* 背景模糊层 */}
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl border-t border-white/10" />
      
      {/* 导航内容 */}
      <div className="relative flex items-center justify-around px-2 py-2 safe-area-bottom">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 min-w-[60px] ${
                isActive 
                  ? 'text-cyan-400' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* 图标 */}
              <div className={`relative ${isActive ? 'scale-110' : ''} transition-transform duration-300`}>
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-glow"
                    className="absolute -inset-2 bg-cyan-500/20 rounded-full blur-md"
                    transition={{ duration: 0.3 }}
                  />
                )}
                <span className="relative z-10">{item.icon}</span>
              </div>
              
              {/* 标签 */}
              <span className={`text-[10px] mt-1 font-medium transition-colors duration-300 ${
                isActive ? 'text-cyan-400' : 'text-slate-500'
              }`}>
                {item.label}
              </span>
              
              {/* 激活指示器 */}
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute -bottom-1 w-1 h-1 bg-cyan-400 rounded-full"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}

