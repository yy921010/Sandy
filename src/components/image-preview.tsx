"use client";

import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { X, ZoomIn, ZoomOut, RotateCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
}

interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

function ImageModal({ src, alt, isOpen, onClose }: ImageModalProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // 重置状态
  const resetTransform = useCallback(() => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  }, []);

  // 关闭模态框
  const handleClose = useCallback(() => {
    resetTransform();
    onClose();
  }, [onClose, resetTransform]);

  // 鼠标拖拽
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 滚轮缩放
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((prev) => Math.max(0.1, Math.min(5, prev * delta)));
  };

  // 下载图片
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = src;
    link.download = alt;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 图片加载完成
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* 背景遮罩 */}
      <button
        className="absolute inset-0 w-full h-full"
        onClick={handleClose}
        aria-label="关闭预览"
        type="button"
      />

      {/* 工具栏 */}
      <div className="absolute top-4 right-4 z-60 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          onClick={() => setScale((prev) => Math.min(prev * 1.2, 5))}
          aria-label="放大"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          onClick={() => setScale((prev) => Math.max(prev / 1.2, 0.1))}
          aria-label="缩小"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          onClick={() => setRotation((prev) => prev + 90)}
          aria-label="旋转"
        >
          <RotateCw className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          onClick={handleDownload}
          aria-label="下载"
        >
          <Download className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          onClick={handleClose}
          aria-label="关闭"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* 操作提示 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-60">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
          <div className="text-center opacity-80">
            拖拽移动 • 滚轮缩放 • ESC关闭
          </div>
        </div>
      </div>

      {/* 图片容器 */}
      <div
        className="relative max-w-[90vw] max-h-[90vh] cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain select-none"
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg) translate(${position.x / scale}px, ${position.y / scale}px)`,
            transition: isDragging ? "none" : "transform 0.2s ease-out",
          }}
          onLoad={handleImageLoad}
          draggable={false}
        />
      </div>
    </div>,
    document.body,
  );
}

export function ImagePreview({
  src,
  alt,
  className,
  ...props
}: ImagePreviewProps & React.ImgHTMLAttributes<HTMLImageElement>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setHasError(false);
  };

  const handleImageError = () => {
    setHasError(true);
  };

  const openModal = () => {
    if (!hasError) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <span className="relative group inline-block overflow-hidden">
        {hasError && (
          <span className="flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded text-gray-500 dark:text-gray-400">
            <span className="text-sm">图片加载失败</span>
          </span>
        )}

        {/* 图片 */}
        <button
          className={cn(
            "cursor-zoom-in transition-all duration-200 hover:shadow-lg block",
            !hasError && "hover:scale-[1.01]",
          )}
          onClick={openModal}
          aria-label={`预览图片: ${alt}`}
          type="button"
        >
          <img
            {...props}
            src={src}
            alt={alt}
            aria-label={alt}
            className={className}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </button>

        {!hasError && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-foreground/10 transition-all duration-200 pointer-events-none">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="bg-white/90 dark:bg-black/90 rounded-lg px-3 py-1 text-sm font-medium shadow-lg">
                点击预览
              </span>
            </span>
          </span>
        )}
      </span>

      {/* 预览模态框 */}
      <ImageModal
        src={src}
        alt={alt}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
