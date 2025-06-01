import fs from "node:fs";
import path from "node:path";

export function getSvgFileNames(): string[] {
  try {
    // 获取 public/svg 目录的绝对路径
    const svgDirPath = path.join(process.cwd(), "public", "svg");

    // 读取目录中的所有文件
    const files = fs.readdirSync(svgDirPath);

    // 过滤出 .svg 文件并去掉扩展名
    const svgFiles = files
      .filter((file) => file.endsWith(".svg"))
      .map((file) => file.replace(".svg", ""));

    return svgFiles;
  } catch (error) {
    console.error("Error reading SVG files:", error);
    return [];
  }
}
