'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTypewriter } from '@/hooks/useTypewriter';

// 联系表单部分组件
const ContactSection = () => {
  const { texts } = useLanguage();
  const { displayText: titleText } = useTypewriter(texts.contact.title, { speed: 50, delay: 200 });
  const { displayText: subtitleText } = useTypewriter(texts.contact.subtitle, { speed: 20, delay: 600 });
  
  // 表单字段的状态
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  // 表单提交状态的反馈信息
  const [status, setStatus] = useState('');

  // 表单提交处理函数
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(texts.contact.form.sending);

    // 构建一个 mailto 链接，用于调用用户的默认邮件客户端
    const mailtoLink = `mailto:22300240021@m.fudan.edu.cn?subject=${encodeURIComponent(
      `Message from ${name} (${email})`
    )}&body=${encodeURIComponent(message)}`;

    // 尝试打开邮件客户端
    window.location.href = mailtoLink;

    // 这是一个纯客户端的解决方案，无法确认邮件是否真的发送成功。
    // 这里假设用户的邮件客户端已成功打开，并提供反馈。
    setTimeout(() => {
      setStatus(texts.contact.form.success);
      // 清空表单
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  // 动画配置
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

  return (
    // 联系表单区域的根元素
    <section className="w-full max-w-7xl mx-auto px-4 py-24 relative overflow-hidden">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 左上角装饰圆 */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-sky-500 to-purple-500 blur-3xl"
        />
        {/* 右下角装饰圆 */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl"
        />
        {/* 几何装饰线条 */}
        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute top-1/4 right-1/4 w-64 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent"
        />
      </div>

      {/* 主容器 */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* 标题区域 */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">{titleText}</span>
              {titleText.length < texts.contact.title.length && (
                <span className="inline-block w-1 h-12 md:h-16 bg-sky-400 ml-1 animate-pulse"></span>
              )}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500 mx-auto rounded-full mb-8"></div>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            {subtitleText}
          </motion.p>
        </motion.div>

        {/* 联系表单网格布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* 左侧信息面板 */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="glass-card p-8 glow-effect h-full">
              <div className="space-y-8">
                {/* 联系方式 */}
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-sky-400">{texts.contact.connectWithMe}</h3>
                  <div className="space-y-6">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-4 group cursor-pointer"
                      onClick={() => window.location.href = 'mailto:22300240021@m.fudan.edu.cn'}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-slate-200">{texts.contact.email}</div>
                        <div className="text-sm text-slate-400">22300240021@m.fudan.edu.cn</div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-4 group cursor-pointer"
                      onClick={() => window.open('https://github.com', '_blank')}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-slate-200">{texts.contact.github}</div>
                        <div className="text-sm text-slate-400">@yourusername</div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-4 group cursor-pointer"
                      onClick={() => window.open('https://linkedin.com', '_blank')}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-slate-200">{texts.contact.linkedin}</div>
                        <div className="text-sm text-slate-400">Your Name</div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* 响应时间信息 */}
                <div className="border-t border-slate-700 pt-6">
                  <h4 className="text-lg font-semibold mb-3 text-slate-200">{texts.contact.responseTime}</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-400">{texts.contact.responseTimeText}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 右侧表单 */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="glass-card p-8 md:p-10 glow-effect">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 姓名和邮箱输入框 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative group"
                  >
                    <label className="block text-sm font-medium text-slate-300 mb-2">{texts.contact.form.name}</label>
                    <input
                      type="text"
                      placeholder={texts.contact.form.namePlaceholder}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full p-4 rounded-xl bg-slate-800/60 border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:outline-none transition-all duration-300 placeholder:text-slate-500 group-hover:border-slate-500"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                  </motion.div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative group"
                  >
                    <label className="block text-sm font-medium text-slate-300 mb-2">{texts.contact.form.email}</label>
                    <input
                      type="email"
                      placeholder={texts.contact.form.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full p-4 rounded-xl bg-slate-800/60 border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:outline-none transition-all duration-300 placeholder:text-slate-500 group-hover:border-slate-500"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                  </motion.div>
                </div>

                {/* 消息文本域 */}
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  className="relative group"
                >
                  <label className="block text-sm font-medium text-slate-300 mb-2">{texts.contact.form.message}</label>
                  <textarea
                    placeholder={texts.contact.form.messagePlaceholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={8}
                    className="w-full p-4 rounded-xl bg-slate-800/60 border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:outline-none transition-all duration-300 resize-none placeholder:text-slate-500 group-hover:border-slate-500"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
                </motion.div>

                {/* 提交按钮 */}
                <motion.div
                  className="pt-6"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    type="submit"
                    className="w-full tech-button px-8 py-4 text-lg font-semibold rounded-xl relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>{texts.contact.form.sendMessage}</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </motion.div>

                {/* 状态消息 */}
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-800/60 border border-slate-600">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-slate-300 font-medium">{status}</span>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;