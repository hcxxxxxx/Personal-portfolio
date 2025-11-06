'use client';

import { useState, useEffect, useRef } from 'react';

interface UseTypewriterOptions {
  speed?: number; // 每个字符的延迟时间（毫秒）
  delay?: number; // 开始打字前的延迟时间（毫秒）
}

/**
 * 打字机效果 Hook
 * @param text 要显示的文本
 * @param options 配置选项
 * @returns 当前显示的文字
 */
export function useTypewriter(text: string, options: UseTypewriterOptions = {}) {
  const { speed = 30, delay = 0 } = options;
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // 使用 ref 来跟踪定时器，确保能正确清理
  const delayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    // 标记组件已挂载
    isMountedRef.current = true;
    
    // 立即清理之前的定时器
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = null;
    }
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    
    // 立即重置状态
    setDisplayText('');
    setIsTyping(true);

    // 延迟开始打字
    delayTimeoutRef.current = setTimeout(() => {
      if (!isMountedRef.current) return;
      
      let currentIndex = 0;
      
      typingIntervalRef.current = setInterval(() => {
        if (!isMountedRef.current) {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
          return;
        }
        
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
          setIsTyping(false);
        }
      }, speed);
    }, delay);

    // 清理函数
    return () => {
      isMountedRef.current = false;
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
        delayTimeoutRef.current = null;
      }
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };
  }, [text, speed, delay]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
      }
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  return { displayText, isTyping };
}

