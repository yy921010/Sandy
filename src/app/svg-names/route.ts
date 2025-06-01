import { getSvgFileNames } from "@/lib/svg-utils";
import { NextResponse } from "next/server";

// 使用 Node.js 的缓存而不是全局变量，避免在热重载时丢失缓存
let svgNamesCache: string[] | null = null;
let cacheTime = 0; // 移除不必要的类型注解
const CACHE_TTL = 3600000; // 缓存有效期1小时，可以根据需要调整

export async function GET() {
  try {
    const now = Date.now();

    // 检查缓存是否有效
    if (svgNamesCache && now - cacheTime < CACHE_TTL) {
      return NextResponse.json({ svgNames: svgNamesCache }, { status: 200 });
    }

    // 获取新数据并更新缓存
    const svgNames = getSvgFileNames();
    svgNamesCache = svgNames;
    cacheTime = now;

    // 使用 NextResponse 简化 API 响应的创建
    return NextResponse.json({ svgNames }, { status: 200 });
  } catch (error) {
    console.error("Error fetching SVG names:", error);
    return NextResponse.json(
      { error: "Failed to fetch SVG names", message: (error as Error).message },
      { status: 500 },
    );
  }
}
