# 使用 Playwright 官方支持的基础镜像
FROM mcr.microsoft.com/playwright:focal

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY . .

# 安装项目依赖
RUN npm install

# 构建项目
RUN npm run build

# 暴露应用程序端口（根据你的应用需要）
EXPOSE 4321

# 启动应用
CMD ["npm", "start"]