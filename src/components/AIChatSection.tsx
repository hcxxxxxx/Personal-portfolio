'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Bot } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTypewriter } from '@/hooks/useTypewriter';

// 定义消息对象的接口
interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: Date;
}

// AI 消息组件（带打字机效果）
const AIMessage = ({ content }: { content: string }) => {
  const { displayText, isTyping } = useTypewriter(content, { speed: 10, delay: 0 });
  
  return (
    <p className="whitespace-pre-wrap">
      {displayText}
      {isTyping && (
        <span className="inline-block w-1 h-4 bg-sky-400 ml-1 animate-pulse"></span>
      )}
    </p>
  );
};

// Gemini 风格的 AI 图标
const GeminiIcon = () => (
  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-sky-500 to-purple-500 mr-3 flex-shrink-0 shadow-lg shadow-sky-500/50">
    <Bot size={20} className="text-white" />
  </div>
);

// 用户头像图标
const UserIcon = () => (
  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 mr-3 flex-shrink-0">
    <User size={20} className="text-slate-300" />
  </div>
);

// AI 正在输入时的指示器组件
const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex justify-start"
  >
    <GeminiIcon />
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3.5 max-w-xl">
      <div className="typing-indicator">
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
      </div>
    </div>
  </motion.div>
);

// AI 聊天部分的主组件
export default function AIChatSection() {
  const { texts } = useLanguage();
  
  // 存储所有聊天消息的状态
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: texts.chat.initialMessage,
      isAI: true,
      timestamp: new Date()
    }
  ]);
  // 用户输入框的内容
  const [inputValue, setInputValue] = useState('');
  // AI 是否正在输入的标志
  const [isTyping, setIsTyping] = useState(false);
  // 聊天容器的引用，用于滚动到底部
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 当语言改变时，更新初始消息
  useEffect(() => {
    setMessages([
      {
        id: '1',
        content: texts.chat.initialMessage,
        isAI: true,
        timestamp: new Date()
      }
    ]);
  }, [texts.chat.initialMessage]);

  // 滚动到聊天窗口底部的函数
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  // 当消息列表或输入状态变化时，自动滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // 模拟 AI 回复的函数，根据用户输入匹配关键词
  const simulateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('internship') ||
        lowerMessage.includes('经历') || lowerMessage.includes('工作') || lowerMessage.includes('实习')) {
      return texts.chat.responses.experience;
    }
    // ... 其他关键词匹配
    return texts.chat.responses.default;
  };

  // 发送消息的处理函数
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isAI: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // 模拟 AI 思考和回复的延迟
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: simulateAIResponse(inputValue),
        isAI: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // 处理键盘事件，实现回车发送
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto flex flex-col"
      style={{ height: '85vh' }}
    >
      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={chatContainerRef}>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start ${message.isAI ? 'justify-start' : 'justify-start'}`}
          >
            {message.isAI ? <GeminiIcon /> : <UserIcon />}
            <div
              className={`px-4 py-3 rounded-lg max-w-xl ${
                message.isAI 
                  ? 'bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 text-slate-200' 
                  : 'bg-transparent text-slate-300'
              }`}
            >
              {message.isAI ? (
                <AIMessage content={message.content} />
              ) : (
                <p className="whitespace-pre-wrap">{message.content}</p>
              )}
            </div>
          </motion.div>
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      <div className="p-6">
        <div className="relative group">
          {/* 玻璃质感输入框容器 */}
          <div className="relative glass-card rounded-2xl overflow-hidden border border-slate-700/50 focus-within:border-sky-500/50 focus-within:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all duration-300">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={texts.chat.placeholder}
              className="w-full bg-transparent pl-5 pr-20 py-4 text-slate-200 placeholder:text-slate-500 focus:outline-none resize-none scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent"
              rows={1}
              style={{ 
                minHeight: '56px',
                maxHeight: '200px',
                paddingLeft: '1.5rem',
                paddingRight: '5.5rem',
                paddingTop: '1rem',
                paddingBottom: '1rem'
              }}
            />
            {/* 发送按钮 */}
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-purple-500 flex items-center justify-center shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-sky-500/30"
            >
              <Send size={18} className="text-white" />
            </button>
            {/* 底部发光线条 */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        <p className="text-center text-xs text-slate-500 mt-3">
          {texts.chat.disclaimer}
        </p>
      </div>
    </motion.div>
  );
}