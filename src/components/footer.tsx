import { Github, Rss, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* 移动端优化：简化布局 */}
        <div className="space-y-6">
          {/* 品牌信息 - 移动端居中 */}
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-lg font-semibold">Avatar Demo</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              简洁的头像组件演示应用
            </p>
          </div>

          {/* 移动端：链接分组 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center md:text-left">
            {/* 快速链接 */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">
                快速链接
              </h4>
              <ul className="space-y-1.5 text-sm">
                <li>
                  <a
                    href="/docs"
                    className="text-muted-foreground hover:text-foreground transition-colors block py-1"
                  >
                    文档
                  </a>
                </li>
                <li>
                  <a
                    href="/components"
                    className="text-muted-foreground hover:text-foreground transition-colors block py-1"
                  >
                    组件
                  </a>
                </li>
                <li>
                  <a
                    href="/examples"
                    className="text-muted-foreground hover:text-foreground transition-colors block py-1"
                  >
                    示例
                  </a>
                </li>
              </ul>
            </div>

            {/* 资源 */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">资源</h4>
              <ul className="space-y-1.5 text-sm">
                <li>
                  <a
                    href="/blog"
                    className="text-muted-foreground hover:text-foreground transition-colors block py-1"
                  >
                    博客
                  </a>
                </li>
                <li>
                  <a
                    href="/community"
                    className="text-muted-foreground hover:text-foreground transition-colors block py-1"
                  >
                    社区
                  </a>
                </li>
                <li>
                  <a
                    href="/support"
                    className="text-muted-foreground hover:text-foreground transition-colors block py-1"
                  >
                    支持
                  </a>
                </li>
              </ul>
            </div>

            {/* 社交媒体 - 移动端跨列 */}
            <div className="col-span-2 md:col-span-1 space-y-3 flex flex-col items-center md:items-start">
              <h4 className="text-sm font-semibold text-foreground">
                关注我们
              </h4>
              <div className="flex space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 px-0"
                  asChild
                >
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 px-0"
                  asChild
                >
                  <a
                    href="/rss"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="RSS Feed"
                  >
                    <Rss className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 分割线 */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-between md:items-center">
            {/* 版权信息 */}
            <div className="text-center md:text-left">
              <span className="text-xs text-muted-foreground">
                © 2024 Avatar Demo
              </span>
            </div>

            {/* 制作信息 */}
            <div className="flex items-center justify-center md:justify-start space-x-1 text-xs text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500 fill-current" />
              <span>by</span>
              <a
                href="https://vercel.com"
                className="hover:text-foreground transition-colors"
              >
                Vercel
              </a>
            </div>

            {/* 法律链接 */}
            <div className="flex justify-center md:justify-end space-x-4 text-xs">
              <a
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                隐私政策
              </a>
              <a
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                服务条款
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
