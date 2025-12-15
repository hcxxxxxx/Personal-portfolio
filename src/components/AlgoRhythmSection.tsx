'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTypewriter } from '@/hooks/useTypewriter';
import { Construction, Hammer, Wrench, Code2 } from 'lucide-react';

const AlgoRhythmSection = () => {
  const { texts, language } = useLanguage();
  
  // Custom text for development state
  const devTitle = "AlgoRhythm";
  const devSubtitle = language === 'zh' 
    ? "正在开发中，敬请期待..." 
    : "Under Development, Stay Tuned...";

  const { displayText: titleText } = useTypewriter(devTitle, { speed: 25, delay: 200 });
  const { displayText: subtitleText } = useTypewriter(devSubtitle, { speed: 10, delay: 600 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const floatingIconVariants = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  return (
    <section className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden flex flex-col justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-sky-500 to-purple-500 blur-3xl"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center h-full w-full"
      >
        {/* Main Content Card */}
        <motion.div 
          variants={itemVariants} 
          className="w-full max-w-3xl aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl relative flex flex-col items-center justify-center p-8 md:p-12 group"
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
          
          {/* Central Animated Icon Group */}
          <div className="relative mb-10">
            <motion.div
              className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-sky-500/20 to-purple-500/20 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.2)]"
              animate={{
                boxShadow: ["0 0 30px rgba(56,189,248,0.2)", "0 0 60px rgba(139,92,246,0.4)", "0 0 30px rgba(56,189,248,0.2)"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Code2 size={48} className="text-sky-400" strokeWidth={1.5} />
            </motion.div>
            
            {/* Floating Tools */}
            <motion.div 
              className="absolute -top-8 -right-8 w-12 h-12 rounded-xl bg-slate-800/80 backdrop-blur border border-white/10 flex items-center justify-center text-purple-400 shadow-lg"
              variants={floatingIconVariants}
              animate="animate"
              style={{ animationDelay: '0s' }}
            >
              <Hammer size={20} />
            </motion.div>
            <motion.div 
              className="absolute -bottom-4 -left-8 w-12 h-12 rounded-xl bg-slate-800/80 backdrop-blur border border-white/10 flex items-center justify-center text-pink-400 shadow-lg"
              variants={floatingIconVariants}
              animate="animate"
              style={{ animationDelay: '1.5s' }}
            >
              <Wrench size={20} />
            </motion.div>
            <motion.div 
              className="absolute top-1/2 -right-16 w-10 h-10 rounded-lg bg-slate-800/60 backdrop-blur border border-white/10 flex items-center justify-center text-amber-400 shadow-lg"
              animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              <Construction size={18} />
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="text-center z-10 space-y-4 max-w-lg">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">{titleText}</span>
              {titleText.length < devTitle.length && (
                <span className="inline-block w-1 h-8 md:h-10 bg-sky-400 ml-1 animate-pulse align-middle"></span>
              )}
            </h2>
            <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide">
              {subtitleText}
            </p>
          </div>

          {/* Progress Bar Decoration */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800/50">
            <motion.div 
              className="h-full bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{
                maskImage: 'linear-gradient(90deg, transparent, black 50%, transparent)',
                WebkitMaskImage: 'linear-gradient(90deg, transparent, black 50%, transparent)'
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AlgoRhythmSection;
