'use client';

import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { type Container, type ISourceOptions } from '@tsparticles/engine';
// 使用 'slim' 版本以减小包体积
import { loadSlim } from '@tsparticles/slim';

// 动态粒子背景组件
const ParticlesBackground = () => {
  // 状态，用于跟踪粒子引擎是否已初始化
  const [init, setInit] = useState(false);

  // useEffect hook 在组件挂载后初始化粒子引擎
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // 加载 slim preset
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // 粒子加载完成后的回调函数
  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log('particles.js loaded', container);
  };

  // 使用 useMemo 优化性能，定义粒子效果的配置选项
  const options: ISourceOptions = useMemo(
    () => ({
      // 背景颜色
      background: {
        color: {
          value: '#0d1117',
        },
      },
      // 帧率限制
      fpsLimit: 60,
      // 交互性设置
      interactivity: {
        events: {
          // 鼠标悬停时启用抓取效果
          onHover: {
            enable: true,
            mode: 'grab',
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          // 抓取效果的配置
          grab: {
            distance: 140,
            links: {
              opacity: 0.3,
            },
          },
        },
      },
      // 粒子本身的设置
      particles: {
        // 粒子颜色，从数组中随机选择
        color: {
          value: ['#38bdf8', '#818cf8', '#a855f7'],
        },
        // 粒子之间的连接线
        links: {
          color: '#ffffff',
          distance: 150,
          enable: true,
          opacity: 0.1,
          width: 1,
        },
        // 粒子移动
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'out', // 移出画布的行为
          },
          random: true,
          speed: 0.5, // 移动速度
          straight: false,
        },
        // 粒子数量
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 50,
        },
        // 粒子透明度
        opacity: {
          value: { min: 0.1, max: 0.5 },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
            sync: false,
          },
        },
        // 粒子形状
        shape: {
          type: 'circle',
        },
        // 粒子大小
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 1,
            sync: false,
          },
        },
      },
      // 启用 Retina 屏幕检测
      detectRetina: true,
    }),
    [],
  );

  // 如果引擎已初始化，则渲染粒子组件
  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        // 固定在背景，并设置 z-index 为 -10，使其位于最底层
        className="fixed top-0 left-0 w-full h-full -z-10"
      />
    );
  }

  // 初始化完成前返回 null
  return null;
};

export default ParticlesBackground;