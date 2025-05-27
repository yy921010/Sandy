"use client";
/**
 * RiverBackground.tsx
 * @description 河流背景组件
 *
 */
import type React from "react";
import { useEffect, useRef, useCallback, useMemo } from "react";
import type { P5I } from "p5i";
import { p5i } from "p5i";
import { useTheme } from "next-themes";

const { random, trunc, min } = Math;
const {
  mount,
  unmount,
  createCanvas,
  resizeCanvas,
  background,
  noFill,
  stroke,
  noise,
  noiseSeed,
  cos,
  sin,
  line,
  TWO_PI,
} = p5i();

const CONFIG = {
  SCALE: 70,
  SCALE_Z: window.innerWidth * 1.5,
  LENGTH: 4,
  AMOUNT: 1500, // 减少点的数量以提高性能
  COLORS: {
    light: {
      background: "rgba(255, 255, 255, 0.05)", // 降低透明度
      stroke: [180, 180, 180], // 提高对比度
    },
    dark: {
      background: "rgba(0, 0, 0, 0.05)", // 降低透明度
      stroke: [220, 220, 220], // 提高对比度
    },
  },
  ANIMATION: {
    OPACITY_STEP: 0.3, // 降低透明度变化速度
    MAX_OPACITY: 100, // 降低最大透明度
    FORCE_MULTIPLIER: 40,
  },
  SAFETY: {
    MIN_POINTS: 10,
    MAX_NEW_POINTS_PER_FRAME: 30,
    MIN_DIMENSION: 100,
  },
  RESPONSIVE: {
    BASE_WIDTH: 1920, // 基准宽度
    MIN_SCALE: 0.5, // 最小缩放比例
    MAX_SCALE: 1.5, // 最大缩放比例
  },
} as const;

let points: { x: number; y: number; t: number }[] = [];

const getForceOnPoint = (x: number, y: number, z: number) =>
  (noise(x / CONFIG.SCALE, y / CONFIG.SCALE, z / CONFIG.SCALE_Z) - 0.5) *
  2 *
  TWO_PI;

// 添加计算响应式缩放的函数
const calculateResponsiveScale = (width: number): number => {
  const scale = width / CONFIG.RESPONSIVE.BASE_WIDTH;
  return Math.max(
    CONFIG.RESPONSIVE.MIN_SCALE,
    Math.min(CONFIG.RESPONSIVE.MAX_SCALE, scale),
  );
};

function initializeCanvas(width: number, height: number, isDark: boolean) {
  const scale = calculateResponsiveScale(width);
  const colors = CONFIG.COLORS[isDark ? "dark" : "light"];
  createCanvas(width, height);
  background(colors.background);
  stroke(colors.stroke.join(","));
  noFill();
  noiseSeed(Date.now());

  const scaledAmount = Math.floor(CONFIG.AMOUNT * scale);
  points = Array.from({ length: scaledAmount }, () => ({
    x: random() * width,
    y: random() * height,
    t: 0,
  }));
}

// 添加错误处理和类型保护
const createPoint = (
  width: number,
  height: number,
  source?: { x: number; y: number },
): { x: number; y: number; t: number } => {
  if (
    width < CONFIG.SAFETY.MIN_DIMENSION ||
    height < CONFIG.SAFETY.MIN_DIMENSION
  ) {
    throw new Error("Canvas dimensions too small");
  }

  return {
    x: source
      ? Math.min(
          Math.max(
            0,
            source.x +
              (random() - 0.5) *
                CONFIG.LENGTH *
                CONFIG.ANIMATION.FORCE_MULTIPLIER,
          ),
          width,
        )
      : random() * width,
    y: source
      ? Math.min(
          Math.max(
            0,
            source.y +
              (random() - 0.5) *
                CONFIG.LENGTH *
                CONFIG.ANIMATION.FORCE_MULTIPLIER,
          ),
          height,
        )
      : random() * height,
    t: 0,
  };
};

function draw(
  { frameCount, mouseX, mouseY }: P5I,
  width: number,
  height: number,
  isDark: boolean,
) {
  try {
    const scale = calculateResponsiveScale(width);
    const colors = CONFIG.COLORS[isDark ? "dark" : "light"];
    background(colors.background);

    // 使用缩放后的配置
    const scaledAmount = Math.floor(CONFIG.AMOUNT * scale);
    const scaledLength = CONFIG.LENGTH * scale;

    // 确保points数组始终有效
    if (!points?.length) {
      points = Array.from({ length: CONFIG.SAFETY.MIN_POINTS }, () =>
        createPoint(width, height),
      );
    }

    points = points.filter(
      ({ x, y }) => x >= 0 && x <= width && y >= 0 && y <= height,
    );

    if (points.length < scaledAmount) {
      const newPointsCount = Math.min(
        CONFIG.SAFETY.MAX_NEW_POINTS_PER_FRAME,
        scaledAmount - points.length,
      );

      const newPoints = Array.from({ length: newPointsCount }, () => {
        const sourceIndex = trunc(random() * points.length);
        const sourcePoint = points[sourceIndex];
        return createPoint(width, height, sourcePoint);
      });

      points.push(...newPoints);
    }

    const [r, g, b] = colors.stroke;
    const timeOffset = frameCount / 60;

    // biome-ignore lint/complexity/noForEach: <explanation>
    points.forEach((p) => {
      const { x, y, t } = p;
      stroke(
        r,
        g,
        b,
        min(t * CONFIG.ANIMATION.OPACITY_STEP, CONFIG.ANIMATION.MAX_OPACITY),
      );

      const rad = getForceOnPoint(x, y, (mouseX + mouseY) * 0.5 + timeOffset);
      const nx = Math.min(Math.max(0, x + cos(rad) * scaledLength), width);
      const ny = Math.min(Math.max(0, y + sin(rad) * scaledLength), height);

      line(x, y, nx, ny);
      p.x = nx;
      p.y = ny;
      p.t += CONFIG.ANIMATION.OPACITY_STEP;
    });
  } catch (error) {
    console.error("Error in draw function:", error);
  }
}

const RiverBackground: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const dimensionsRef = useRef({
    width: Math.max(window.innerWidth, CONFIG.SAFETY.MIN_DIMENSION),
    height: Math.max(window.innerHeight, CONFIG.SAFETY.MIN_DIMENSION),
  });

  const handleResize = useCallback(() => {
    if (!canvasRef.current) return;

    const { width, height } = dimensionsRef.current;
    try {
      resizeCanvas(width, height);
      initializeCanvas(width, height, isDark);
    } catch (error) {
      console.error("Error in handleResize:", error);
    }
  }, [isDark]);

  useEffect(() => {
    observerRef.current = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const { width, height } = entry.contentRect;
      if (
        width === dimensionsRef.current.width &&
        height === dimensionsRef.current.height
      )
        return;

      dimensionsRef.current = {
        width: Math.max(width, CONFIG.SAFETY.MIN_DIMENSION),
        height: Math.max(height, CONFIG.SAFETY.MIN_DIMENSION),
      };
      handleResize();
    });

    if (canvasRef.current) {
      observerRef.current.observe(canvasRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [handleResize]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (canvasRef.current) {
      const { width, height } = dimensionsRef.current;
      mount(canvasRef.current, {
        setup: () => initializeCanvas(width, height, isDark),
        draw: (p: P5I) => draw(p, width, height, isDark),
      });
    }

    return () => {
      unmount();
    };
  }, [handleResize, isDark]);

  return (
    <div
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none -z-1 print:hidden"
      style={{
        background: CONFIG.COLORS[isDark ? "dark" : "light"].background,
        maskImage: isDark
          ? "radial-gradient(circle, transparent, black)" // 黑暗背景
          : "radial-gradient(circle, transparent, white)", // 白色背景
      }}
    />
  );
};

export default RiverBackground;
