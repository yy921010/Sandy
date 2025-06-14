"use client";

import { useEffect, useState, useRef } from "react";
import { SITE } from "@/config";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Comments } from "@/components/comment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LinksPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
  // 响应式调整大小
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = Math.min(containerRef.current.offsetWidth, 800);
        setDimensions({ width, height: width });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // 尺寸映射
  const sizeMap = {
    "2xl": { size: 120, imgSize: 100, zIndex: 50 },
    xl: { size: 80, imgSize: 64, zIndex: 40 },
    lg: { size: 60, imgSize: 48, zIndex: 30 },
    md: { size: 48, imgSize: 38, zIndex: 20 },
    sm: { size: 36, imgSize: 28, zIndex: 10 },
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground/80">
            Friends
          </h1>
          <p className="text-foreground/50 text-lg mb-6">
            感谢遇见他们，至少这里不是孤岛～！
          </p>
        </div>

        {/* 链接圆形布局 */}
        <div className="flex justify-center mb-16">
          <div
            ref={containerRef}
            className="relative mx-auto"
            style={{
              width: dimensions.width,
              height: dimensions.height,
              maxWidth: "100%",
            }}
          >
            {SITE.friends
              .filter((f) => f.tier === "main")
              .map((friend) => (
                <div
                  key={friend.id}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    zIndex: sizeMap[friend.size as keyof typeof sizeMap].zIndex,
                  }}
                >
                  <div
                    className="rounded-full border-2 border-blue-600/30 flex items-center justify-center bg-black hover:scale-110 transition-all cursor-pointer shadow-lg shadow-blue-500/20"
                    style={{
                      width: sizeMap[friend.size as keyof typeof sizeMap].size,
                      height: sizeMap[friend.size as keyof typeof sizeMap].size,
                    }}
                  >
                    <span className="text-4xl font-bold text-white">
                      {friend.name}
                    </span>
                  </div>
                </div>
              ))}

            {/* 内圈 - 大型链接 */}
            {SITE.friends
              .filter((f) => f.tier === "platinum")
              .map((friend, index) => {
                const totalInTier = SITE.friends.filter(
                  (f) => f.tier === "platinum",
                ).length;
                const angle = (index * 360) / totalInTier;
                const radius = dimensions.width * 0.22;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <div
                    key={friend.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      zIndex:
                        sizeMap[friend.size as keyof typeof sizeMap].zIndex,
                    }}
                  >
                    <a
                      href={friend.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={friend.name}
                    >
                      <div
                        className="rounded-full bg-background border border-gray-700/30 flex items-center justify-center hover:scale-110 transition-all cursor-pointer shadow-md"
                        style={{
                          width:
                            sizeMap[friend.size as keyof typeof sizeMap].size,
                          height:
                            sizeMap[friend.size as keyof typeof sizeMap].size,
                        }}
                      >
                        <Avatar
                          className="rounded-full overflow-hidden"
                          style={{
                            width:
                              sizeMap[friend.size as keyof typeof sizeMap]
                                .imgSize,
                            height:
                              sizeMap[friend.size as keyof typeof sizeMap]
                                .imgSize,
                          }}
                        >
                          <AvatarImage
                            src={friend.logo}
                            alt={friend.name}
                            className="h-full w-full object-cover"
                          />
                          <AvatarFallback className="text-lg">
                            {friend.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </a>
                  </div>
                );
              })}

            {/* 中圈 - 中型链接 */}
            {SITE.friends
              .filter((f) => f.tier === "gold")
              .map((friend, index) => {
                const totalInTier = SITE.friends.filter(
                  (f) => f.tier === "gold",
                ).length;
                const angle = (index * 360) / totalInTier;
                const radius = dimensions.width * 0.33;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <div
                    key={friend.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      zIndex:
                        sizeMap[friend.size as keyof typeof sizeMap].zIndex,
                    }}
                  >
                    <a
                      href={friend.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={friend.name}
                    >
                      <div
                        className="rounded-full bg-background border border-gray-700/30 flex items-center justify-center hover:scale-110 transition-all cursor-pointer"
                        style={{
                          width:
                            sizeMap[friend.size as keyof typeof sizeMap].size,
                          height:
                            sizeMap[friend.size as keyof typeof sizeMap].size,
                        }}
                      >
                        <Avatar
                          className="rounded-full overflow-hidden"
                          style={{
                            width:
                              sizeMap[friend.size as keyof typeof sizeMap]
                                .imgSize,
                            height:
                              sizeMap[friend.size as keyof typeof sizeMap]
                                .imgSize,
                          }}
                        >
                          <AvatarImage
                            src={friend.logo}
                            alt={friend.name}
                            className="h-full w-full object-cover"
                          />
                          <AvatarFallback className="text-lg">
                            {friend.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </a>
                  </div>
                );
              })}

            {/* 外圈 - 多层小型链接，使用斐波那契分布实现更自然的分布 */}
            {SITE.friends
              .filter((f) => f.tier === "silver")
              .map((friend, index) => {
                // 黄金角度，创建更自然的分布
                const goldenAngle = 137.5077;
                const angle = index * goldenAngle;

                // 逐渐增加半径，形成螺旋效果
                const radiusFactor =
                  Math.sqrt(index + 1) /
                  Math.sqrt(
                    SITE.friends.filter((f) => f.tier === "silver").length,
                  );
                const radius = dimensions.width * (0.42 + radiusFactor * 0.08);

                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <div
                    key={friend.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      zIndex:
                        sizeMap[friend.size as keyof typeof sizeMap].zIndex -
                        (index % 5),
                    }}
                  >
                    <a
                      href={friend.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={friend.name}
                    >
                      <div
                        className="rounded-full bg-background border border-gray-700/20 flex items-center justify-center hover:scale-110 transition-all cursor-pointer"
                        style={{
                          width:
                            sizeMap[friend.size as keyof typeof sizeMap].size,
                          height:
                            sizeMap[friend.size as keyof typeof sizeMap].size,
                        }}
                      >
                        <Avatar
                          className="rounded-full overflow-hidden"
                          style={{
                            width:
                              sizeMap[friend.size as keyof typeof sizeMap]
                                .imgSize,
                            height:
                              sizeMap[friend.size as keyof typeof sizeMap]
                                .imgSize,
                          }}
                        >
                          <AvatarImage
                            src={friend.logo}
                            alt={friend.name}
                            className="h-full w-full object-cover"
                          />
                          <AvatarFallback className="text-lg">
                            {friend.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="mt-20 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-foreground/80 border-b pb-2">
            友链申请
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-md border-background/20 ">
              <CardHeader>
                <CardTitle className="text-xl">基本要求</CardTitle>
                <CardDescription>申请友链需满足以下条件</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>网站稳定运行，内容健康积极向上</li>
                  <li>网站已稳定运行至少 3 个月</li>
                  <li>站点内容原创为主，定期更新</li>
                  <li>有独立域名和 HTTPS 支持</li>
                  <li>页面设计简约美观，浏览体验良好</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-md border-background/20">
              <CardHeader>
                <CardTitle className="text-xl">申请流程</CardTitle>
                <CardDescription>如何申请加入友链圈</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>确认您的网站符合基本要求</li>
                  <li>
                    在您的网站添加本站友链信息：
                    <div className="bg-muted p-3 rounded-md my-2 dark:bg-gray-800">
                      <p>
                        <strong>站名：</strong>
                        {SITE.name}
                      </p>
                      <p>
                        <strong>网址：</strong>
                        {SITE.url}
                      </p>
                      <p>
                        <strong>描述：</strong>
                        {SITE.description}
                      </p>
                      <p>
                        <strong>头像：</strong>
                        {SITE.url}/avatar.png
                      </p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
        <div>
          <Comments />
        </div>
      </div>
    </div>
  );
}
