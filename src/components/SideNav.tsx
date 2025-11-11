'use client';

import { useState } from 'react';
import { User, Briefcase, MessageCircle, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTypewriter } from '@/hooks/useTypewriter';

// 定义视图类型的联合类型
type View = 'hero' | 'experience' | 'chat' | 'contact';

// 侧边导航组件的属性接口
interface SideNavProps {
  activeView: View;
  onNavigate: (view: View) => void;
}

// 提示框内容组件（带打字机效果）
const TooltipContent = ({ name, description }: { name: string; description: string }) => {
  const { displayText: nameText } = useTypewriter(name, { speed: 20, delay: 0 });
  const { displayText: descText } = useTypewriter(description, { speed: 10, delay: 150 });
  
  return (
    <div className="absolute left-full ml-5 top-1/2 transform -translate-y-1/2 glass-card px-5 py-3 text-sm font-semibold rounded-lg whitespace-nowrap opacity-0 animate-fade-in border border-white/10 shadow-xl">
      <div className="flex items-center space-x-3">
        <span className="gradient-text font-bold">{nameText}</span>
      </div>
      <div className="text-xs text-slate-400 mt-1">
        {descText}
      </div>
      {/* 提示框的小尾巴 */}
      <div className="absolute left-[-6px] top-1/2 transform -translate-y-1/2 h-3 w-3 rotate-45 bg-slate-800/50 border-l border-b border-white/10 backdrop-blur-sm"></div>
    </div>
  );
};

// 侧边导航组件
export default function SideNav({ activeView, onNavigate }: SideNavProps) {
  const { texts } = useLanguage();
  
  // 定义导航的各个部分
  const sections = [
    { id: 'hero' as View, name: texts.nav.hero.name, description: texts.nav.hero.description, icon: User },
    { id: 'experience' as View, name: texts.nav.experience.name, description: texts.nav.experience.description, icon: Briefcase },
    { id: 'chat' as View, name: texts.nav.chat.name, description: texts.nav.chat.description, icon: MessageCircle },
    { id: 'contact' as View, name: texts.nav.contact.name, description: texts.nav.contact.description, icon: Mail },
  ];
  
  // 状态，用于跟踪当前鼠标悬停在哪个部分上
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  // 找到当前活动部分的索引
  const activeIndex = sections.findIndex(sec => sec.id === activeView);
  
  // 判断一个部分是否已被访问（当前页面及之前的页面都算已访问）
  const isVisited = (sectionIndex: number) => sectionIndex <= activeIndex;

  return (
    // 导航栏容器，固定在屏幕左侧中间，仅在 md 及以上屏幕尺寸显示
    <nav className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
      {/* 玻璃质感的卡片作为导航背景 */}
      <div className="relative glass-card p-3 backdrop-blur-lg border border-white/10 shadow-lg">
        <ul className="flex flex-col items-center space-y-4">
          {/* 遍历所有部分，创建导航按钮 */}
          {sections.map((section, index) => {
            const isActive = activeView === section.id;
            const visited = isVisited(index);
            
            return (
              <li key={section.id} className="relative group">
                <button
                  onClick={() => onNavigate(section.id as View)}
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ease-in-out
                    ${isActive
                      ? 'bg-sky-400/30 shadow-[0_0_20px_8px] shadow-sky-400/50 border-2 border-sky-400/50' // 当前活动项：最亮的高光
                      : visited
                        ? 'bg-sky-400/15 shadow-[0_0_8px_3px] shadow-sky-400/30 border border-sky-400/25 group-hover:bg-sky-400/20 group-hover:shadow-[0_0_12px_5px] group-hover:shadow-sky-400/35' // 已访问项：中等亮度
                        : 'bg-slate-800/30 border border-slate-600/20 group-hover:bg-sky-400/10 group-hover:border-sky-400/20 group-hover:shadow-[0_0_12px_4px] group-hover:shadow-sky-400/20' // 未访问项：较暗
                    }`}
                  aria-label={`Navigate to ${section.name} section`}
                >
                  {/* 图标，用于指示当前活动项和悬停项 */}
                  {(() => {
                    const IconComponent = section.icon;
                    return (
                      <IconComponent
                        className={`w-5 h-5 transition-all duration-300 ease-in-out
                          ${isActive
                            ? 'text-sky-300 scale-110 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]' // 当前活动项：最亮
                            : visited
                              ? 'text-sky-400/80 scale-105 drop-shadow-[0_0_4px_rgba(56,189,248,0.5)] group-hover:text-sky-300 group-hover:scale-110' // 已访问项：中等亮度
                              : 'text-slate-400 group-hover:text-sky-400 group-hover:scale-105' // 未访问项：较暗
                          }`}
                      />
                    );
                  })()}
                </button>

              {/* 当鼠标悬停在按钮上时，显示提示框 */}
              {hoveredSection === section.id && (
                <TooltipContent name={section.name} description={section.description} />
              )}
            </li>
          );
          })}
        </ul>
      </div>

      {/* 使用 JSX-style 定义局部动画，避免污染全局 CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-50%) translateX(-10px); }
          to { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .gradient-text {
          background: linear-gradient(135deg, #38BDF8, #a855f7);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
      `}</style>
    </nav>
  );
}