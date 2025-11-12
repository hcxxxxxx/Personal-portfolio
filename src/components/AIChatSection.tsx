'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Bot } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTypewriter } from '@/hooks/useTypewriter';
import { getPersonalInfo, formatPersonalInfoForAI } from '@/data/personalInfo';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// 定义消息对象的接口
interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: Date;
  isNew?: boolean; // 标记是否是新消息（需要打字机效果）
}

// AI 消息组件（带打字机效果和 Markdown 渲染）
const AIMessage = ({ 
  content, 
  skipTypewriter = false,
  onTextUpdate
}: { 
  content: string; 
  skipTypewriter?: boolean;
  onTextUpdate?: () => void;
}) => {
  const { displayText, isTyping } = useTypewriter(content, { speed: 10, delay: 0 });
  
  // 当文本更新时，触发滚动回调（仅在打字机效果进行时）
  useEffect(() => {
    if (!skipTypewriter && isTyping && onTextUpdate) {
      // 使用 requestAnimationFrame 确保 DOM 更新后再滚动
      requestAnimationFrame(() => {
        onTextUpdate();
      });
    }
  }, [displayText, isTyping, skipTypewriter, onTextUpdate]);
  
  // Markdown 渲染样式配置
  const markdownComponents = {
    // 段落样式
    p: ({ children }: any) => <p className="mb-3 last:mb-0">{children}</p>,
    // 标题样式
    h1: ({ children }: any) => <h1 className="text-xl font-bold mb-3 mt-4 first:mt-0 text-slate-100">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-lg font-semibold mb-2 mt-3 first:mt-0 text-slate-100">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-base font-semibold mb-2 mt-3 first:mt-0 text-slate-200">{children}</h3>,
    // 列表样式
    ul: ({ children }: any) => <ul className="list-disc list-inside mb-3 space-y-1 ml-2">{children}</ul>,
    ol: ({ children }: any) => <ol className="list-decimal list-inside mb-3 space-y-1 ml-2">{children}</ol>,
    li: ({ children }: any) => <li className="text-slate-200">{children}</li>,
    // 代码块样式
    code: ({ inline, children, className }: any) => {
      if (inline) {
        return (
          <code className="bg-slate-700/50 text-cyan-300 px-1.5 py-0.5 rounded text-sm font-mono">
            {children}
          </code>
        );
      }
      return (
        <code className={`block bg-slate-900/60 text-slate-200 p-3 rounded-lg overflow-x-auto text-sm font-mono my-3 ${className || ''}`}>
          {children}
        </code>
      );
    },
    pre: ({ children }: any) => <pre className="mb-3">{children}</pre>,
    // 引用样式
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-cyan-500/50 pl-4 my-3 italic text-slate-300">
        {children}
      </blockquote>
    ),
    // 链接样式
    a: ({ href, children }: any) => (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-cyan-400 hover:text-cyan-300 underline"
      >
        {children}
      </a>
    ),
    // 强调样式
    strong: ({ children }: any) => <strong className="font-semibold text-slate-100">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-slate-200">{children}</em>,
    // 水平线
    hr: () => <hr className="my-4 border-slate-600" />,
    // 表格样式
    table: ({ children }: any) => (
      <div className="overflow-x-auto my-3">
        <table className="min-w-full border-collapse border border-slate-600">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => <thead className="bg-slate-800/50">{children}</thead>,
    tbody: ({ children }: any) => <tbody>{children}</tbody>,
    tr: ({ children }: any) => <tr className="border-b border-slate-600">{children}</tr>,
    th: ({ children }: any) => (
      <th className="border border-slate-600 px-4 py-2 text-left font-semibold text-slate-100">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="border border-slate-600 px-4 py-2 text-slate-200">
        {children}
      </td>
    ),
  };
  
  // 如果跳过打字机效果，直接渲染完整内容的 Markdown
  if (skipTypewriter) {
    return (
      <div className="markdown-content">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  }
  
  // 打字机效果时，渲染当前显示文本的 Markdown
  return (
    <div className="markdown-content">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {displayText}
      </ReactMarkdown>
      {isTyping && (
        <span className="inline-block w-0.5 h-4 bg-cyan-400 ml-1.5 animate-pulse rounded-full shadow-[0_0_4px_rgba(56,189,248,0.6)] align-middle"></span>
      )}
    </div>
  );
};

// 极简风格的 AI 头像 - 冷色调，科技感
const AIIcon = () => (
  <div className="relative w-10 h-10 flex-shrink-0" style={{ marginRight: '20px' }}>
    {/* 外层发光环 */}
    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 blur-sm"></div>
    {/* 主容器 - 极简几何设计 */}
    <div className="relative w-full h-full rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center overflow-hidden">
      {/* 内部几何图案 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1 left-1 w-2 h-2 rounded-sm bg-cyan-400"></div>
        <div className="absolute bottom-1 right-1 w-2 h-2 rounded-sm bg-blue-500"></div>
      </div>
      {/* AI 图标 - 极简设计 */}
      <Bot size={18} className="text-cyan-300 relative z-10" strokeWidth={2} />
      {/* 底部科技感线条 */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
    </div>
  </div>
);

// 极简风格的用户头像 - 暖色调，与 AI 形成反差
const UserIcon = () => (
  <div className="relative w-10 h-10 flex-shrink-0" style={{ marginLeft: '20px' }}>
    {/* 外层发光环 */}
    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-amber-400/20 to-orange-500/20 blur-sm"></div>
    {/* 主容器 - 极简几何设计 */}
    <div className="relative w-full h-full rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-600/10 backdrop-blur-sm border border-amber-400/30 flex items-center justify-center overflow-hidden">
      {/* 内部几何图案 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1 left-1 w-2 h-2 rounded-sm bg-amber-400"></div>
        <div className="absolute bottom-1 right-1 w-2 h-2 rounded-sm bg-orange-500"></div>
      </div>
      {/* 用户图标 - 极简设计 */}
      <User size={18} className="text-amber-300 relative z-10" strokeWidth={2} />
      {/* 底部科技感线条 */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
    </div>
  </div>
);

// AI 正在输入时的指示器组件
const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex justify-start"
    style={{ marginBottom: '24px' }}
  >
    <AIIcon />
    <div className="relative bg-slate-800/30 backdrop-blur-md border border-cyan-500/20 rounded-xl max-w-xl shadow-lg shadow-cyan-500/5" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', minHeight: '48px' }}>
      {/* 科技感边框效果 */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 opacity-50"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
      <div className="relative w-full flex items-center justify-center">
        <div className="typing-indicator">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div>
    </div>
  </motion.div>
);

// OpenAI API 配置
const OPENAI_API_KEY = 'sk-SDYc0d98e619cef4373aa7d9cb59eeb7aa42fc7fb83SHvPv';
const OPENAI_API_BASE_URL = 'https://api.gptsapi.net';
const OPENAI_MODEL = 'gpt-4o-mini';

// AI 聊天部分的主组件
export default function AIChatSection() {
  const { texts, language } = useLanguage();
  
  // 从 localStorage 加载保存的消息
  const loadMessagesFromStorage = (): Message[] => {
    if (typeof window === 'undefined') {
      return [{
        id: '1',
        content: texts.chat.initialMessage,
        isAI: true,
        timestamp: new Date(),
        isNew: false // 已存在的消息不需要打字机效果
      }];
    }
    
    try {
      const saved = localStorage.getItem('chatMessages');
      if (saved) {
        const parsed = JSON.parse(saved);
        // 将时间戳字符串转换回 Date 对象，并标记为已存在的消息
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
          isNew: false // 从存储加载的消息都是已存在的，不需要打字机效果
        }));
      }
    } catch (error) {
      console.error('加载聊天记录失败:', error);
    }
    
    return [{
      id: '1',
      content: texts.chat.initialMessage,
      isAI: true,
      timestamp: new Date(),
      isNew: false // 初始消息不需要打字机效果
    }];
  };

  // 保存消息到 localStorage
  const saveMessagesToStorage = (msgs: Message[]) => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('chatMessages', JSON.stringify(msgs));
    } catch (error) {
      console.error('保存聊天记录失败:', error);
    }
  };

  // 存储所有聊天消息的状态 - 初始化为空数组，在 useEffect 中加载
  const [messages, setMessages] = useState<Message[]>([]);
  // 标记是否已经加载过消息
  const [isMessagesLoaded, setIsMessagesLoaded] = useState(false);
  // 用户输入框的内容
  const [inputValue, setInputValue] = useState('');
  // AI 是否正在输入的标志
  const [isTyping, setIsTyping] = useState(false);
  // 聊天容器的引用，用于滚动到底部
  const chatContainerRef = useRef<HTMLDivElement>(null);
  // 存储对话历史，用于上下文
  const conversationHistoryRef = useRef<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  // 存储累积的滚动距离，用于控制页面切换的灵敏度
  const wheelAccumulatorRef = useRef({ top: 0, bottom: 0 });
  // 滚动阈值，需要累积滚动这个距离才触发页面切换
  const WHEEL_THRESHOLD = 1000;

  // 组件挂载时，从 localStorage 加载消息
  useEffect(() => {
    if (!isMessagesLoaded && typeof window !== 'undefined') {
      const loadedMessages = loadMessagesFromStorage();
      setMessages(loadedMessages);
      setIsMessagesLoaded(true);
    }
  }, [isMessagesLoaded]);

  // 从保存的消息中恢复对话历史（排除初始消息）
  useEffect(() => {
    if (messages.length > 1) {
      const history: Array<{ role: 'user' | 'assistant'; content: string }> = [];
      for (let i = 1; i < messages.length; i++) {
        const msg = messages[i];
        history.push({
          role: msg.isAI ? 'assistant' : 'user',
          content: msg.content
        });
      }
      conversationHistoryRef.current = history;
    } else {
      conversationHistoryRef.current = [];
    }
  }, [messages.length]); // 当消息数量变化时更新历史

  // 当语言改变时，更新初始消息并清空对话历史
  useEffect(() => {
    if (!isMessagesLoaded) return; // 等待消息加载完成
    
    const savedMessages = loadMessagesFromStorage();
    // 如果保存的消息只有初始消息，则更新它
    if (savedMessages.length === 1 && savedMessages[0].id === '1') {
      const updatedInitialMessage = {
        id: '1',
        content: texts.chat.initialMessage,
        isAI: true,
        timestamp: new Date(),
        isNew: false
      };
      setMessages([updatedInitialMessage]);
      saveMessagesToStorage([updatedInitialMessage]);
    } else if (savedMessages.length > 0 && savedMessages[0].id === '1') {
      // 如果有多个消息，只更新初始消息的内容
      const updatedMessages = [...savedMessages];
      updatedMessages[0] = {
        ...updatedMessages[0],
        content: texts.chat.initialMessage,
        isNew: false
      };
      setMessages(updatedMessages);
      saveMessagesToStorage(updatedMessages);
    }
    // 清空对话历史，因为系统提示词会改变
    conversationHistoryRef.current = [];
  }, [texts.chat.initialMessage, language, isMessagesLoaded]);

  // 当消息更新时，保存到 localStorage（仅在消息加载完成后）
  useEffect(() => {
    if (!isMessagesLoaded || messages.length === 0) return; // 等待消息加载完成，避免初始加载时覆盖
    saveMessagesToStorage(messages);
  }, [messages, isMessagesLoaded]);

  // 滚动到聊天窗口底部的函数
  const scrollToBottom = useCallback((immediate = false) => {
    if (chatContainerRef.current) {
      if (immediate) {
        // 立即滚动，不使用动画
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      } else {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  // 实时滚动回调，用于打字机效果
  const handleTextUpdate = useCallback(() => {
    scrollToBottom(true);
  }, [scrollToBottom]);

  // 当消息列表或输入状态变化时，自动滚动到底部
  useEffect(() => {
    // 使用 requestAnimationFrame 确保 DOM 更新后再滚动
    requestAnimationFrame(() => {
      scrollToBottom();
    });
  }, [messages, isTyping]);

  // 组件首次加载或消息加载完成后，滚动到底部
  useEffect(() => {
    if (!isMessagesLoaded) return; // 等待消息加载完成
    
    // 延迟一点确保 DOM 完全渲染
    const timer = setTimeout(() => {
      scrollToBottom(true); // 立即滚动，不使用动画
    }, 150);
    return () => clearTimeout(timer);
  }, [isMessagesLoaded, scrollToBottom]); // 当消息加载完成时执行

  // 处理滚轮事件，阻止在聊天区域滚动时触发页面切换
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!chatContainerRef.current) return;

    const container = chatContainerRef.current;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtTop = scrollTop <= 5; // 5px 容差
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5; // 5px 容差

    // 如果不在顶部或底部，或者正在向上滚动但不在顶部，或者正在向下滚动但不在底部
    // 则阻止事件冒泡，让聊天区域自己处理滚动，并重置累积器
    if ((!isAtTop && e.deltaY < 0) || (!isAtBottom && e.deltaY > 0)) {
      e.stopPropagation();
      // 重置累积器
      wheelAccumulatorRef.current = { top: 0, bottom: 0 };
      return;
    }

    // 如果滚动到顶部且继续向上滚动
    if (isAtTop && e.deltaY < 0) {
      wheelAccumulatorRef.current.top += Math.abs(e.deltaY);
      wheelAccumulatorRef.current.bottom = 0; // 重置另一个方向的累积
      
      // 只有累积滚动距离达到阈值时才允许页面切换
      if (wheelAccumulatorRef.current.top >= WHEEL_THRESHOLD) {
        wheelAccumulatorRef.current.top = 0; // 重置累积器
        // 允许事件冒泡，触发页面切换
      } else {
        e.stopPropagation(); // 阻止事件冒泡
      }
    }
    // 如果滚动到底部且继续向下滚动
    else if (isAtBottom && e.deltaY > 0) {
      wheelAccumulatorRef.current.bottom += e.deltaY;
      wheelAccumulatorRef.current.top = 0; // 重置另一个方向的累积
      
      // 只有累积滚动距离达到阈值时才允许页面切换
      if (wheelAccumulatorRef.current.bottom >= WHEEL_THRESHOLD) {
        wheelAccumulatorRef.current.bottom = 0; // 重置累积器
        // 允许事件冒泡，触发页面切换
      } else {
        e.stopPropagation(); // 阻止事件冒泡
      }
    }
  };

  // 调用 OpenAI API 获取 AI 回复
  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      // 获取个人信息库并格式化为系统提示词
      const personalInfo = getPersonalInfo(texts);
      const systemPrompt = formatPersonalInfoForAI(personalInfo, language);

      // 构建消息历史（包含系统提示词）
      const messagesForAPI = [
        {
          role: 'system' as const,
          content: systemPrompt,
        },
        ...conversationHistoryRef.current,
        {
          role: 'user' as const,
          content: userMessage,
        },
      ];

      // 调用 OpenAI API
      const response = await fetch(`${OPENAI_API_BASE_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          messages: messagesForAPI,
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API 请求失败: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage = data.choices[0]?.message?.content || texts.chat.responses.default;

      // 更新对话历史
      conversationHistoryRef.current.push(
        { role: 'user', content: userMessage },
        { role: 'assistant', content: aiMessage }
      );

      // 限制历史记录长度，避免 token 过多
      if (conversationHistoryRef.current.length > 20) {
        conversationHistoryRef.current = conversationHistoryRef.current.slice(-20);
      }

      return aiMessage;
    } catch (error) {
      console.error('AI API 调用失败:', error);
      // 返回友好的错误消息
      const errorMessage = language === 'zh' 
        ? '抱歉，AI 服务暂时不可用。请稍后再试。'
        : 'Sorry, the AI service is temporarily unavailable. Please try again later.';
      return errorMessage;
    }
  };

  // 发送消息的处理函数
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessageText = inputValue.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      content: userMessageText,
      isAI: false,
      timestamp: new Date(),
      isNew: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // 调用真实的 AI API
      const aiResponseText = await getAIResponse(userMessageText);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseText,
        isAI: true,
        timestamp: new Date(),
        isNew: true
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('发送消息失败:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: language === 'zh' 
          ? '抱歉，发生了错误。请稍后再试。'
          : 'Sorry, an error occurred. Please try again later.',
        isAI: true,
        timestamp: new Date(),
        isNew: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
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
      <div 
        className="flex-1 overflow-y-auto p-6" 
        style={{ gap: '24px' }} 
        ref={chatContainerRef}
        onWheel={handleWheel}
      >
        {!isMessagesLoaded ? (
          // 加载中状态
          <div className="flex justify-center items-center h-full">
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        ) : (
          messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start ${message.isAI ? 'justify-start' : 'justify-end'}`}
            style={{ marginBottom: '24px' }}
          >
            {message.isAI ? (
              <>
                <AIIcon />
                {/* AI 消息框 - 冷色调，科技感 */}
                <div className="relative max-w-xl group">
                  {/* 外层发光效果 */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* 主消息框 */}
                  <div className="relative bg-slate-800/40 backdrop-blur-md border border-cyan-500/20 rounded-xl py-3.5 shadow-lg shadow-cyan-500/5" style={{ paddingLeft: '18px', paddingRight: '18px' }}>
                    {/* 顶部科技感线条 */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"></div>
                    {/* 左侧装饰线条 */}
                    <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-gradient-to-b from-cyan-400/30 via-cyan-400/20 to-transparent rounded-full"></div>
                    {/* 内容 */}
                    <div className="relative pl-1 text-slate-200">
                      {message.isAI ? (
                        <AIMessage 
                          content={message.content} 
                          skipTypewriter={!message.isNew}
                          onTextUpdate={handleTextUpdate}
                        />
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* 用户消息框 - 暖色调，科技感 */}
                <div className="relative max-w-xl group ml-auto">
                  {/* 外层发光效果 */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* 主消息框 */}
                  <div className="relative bg-gradient-to-br from-amber-950/40 to-orange-950/40 backdrop-blur-md border border-amber-500/20 rounded-xl py-3.5 shadow-lg shadow-amber-500/5" style={{ paddingLeft: '18px', paddingRight: '18px' }}>
                    {/* 顶部科技感线条 */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>
                    {/* 右侧装饰线条 */}
                    <div className="absolute right-0 top-3 bottom-3 w-0.5 bg-gradient-to-b from-amber-400/30 via-amber-400/20 to-transparent rounded-full"></div>
                    {/* 内容 */}
                    <div className="relative pr-1 text-amber-50">
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                </div>
                <UserIcon />
              </>
            )}
          </motion.div>
          ))
        )}
        {isTyping && <TypingIndicator />}
      </div>

      <div className="p-6">
        <div className="relative group">
          {/* 外层发光效果 */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
          {/* 科技感输入框容器 */}
          <div className="relative bg-slate-900/60 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-700/50 focus-within:border-cyan-500/50 focus-within:shadow-[0_0_25px_rgba(56,189,248,0.2)] transition-all duration-300">
            {/* 顶部科技感线条 */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
            {/* 左侧装饰线条 */}
            <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-400/20 via-blue-500/20 to-transparent rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={texts.chat.placeholder}
              className="w-full bg-transparent py-4 text-slate-200 placeholder:text-slate-500/60 focus:outline-none resize-none scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent relative z-10"
              rows={1}
              style={{ 
                minHeight: '56px',
                maxHeight: '200px',
                paddingLeft: '20px',
                paddingRight: '5.5rem',
                paddingTop: '1rem',
                paddingBottom: '1rem'
              }}
            />
            {/* 发送按钮 - 科技感设计 */}
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '44px',
                zIndex: 20
              }}
              className="rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-cyan-500/30 relative group/btn"
            >
              {/* 按钮内部发光效果 */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              <Send size={18} className="text-white relative z-10" strokeWidth={2.5} />
            </button>
            {/* 底部发光线条 */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        <p className="text-center text-xs text-slate-500/70 mt-3">
          {texts.chat.disclaimer}
        </p>
      </div>
    </motion.div>
  );
}