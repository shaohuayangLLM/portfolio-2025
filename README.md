# 杨绍华的个人主页

极简现代风格的个人简历网站，展示个人信息、工作经历和技能专长。

## 特性

- ✨ 极简现代的Apple风格设计
- 📱 完全响应式，支持移动端
- 🎨 精心设计的动画和交互
- ⚡ 纯HTML + CSS，无需构建工具
- 🚀 GitHub Pages自动部署

## 本地预览

直接用浏览器打开 `index.html` 文件即可预览。

## 部署到GitHub Pages

### 1. 创建GitHub仓库

在GitHub上创建新仓库：`portfolio-2025`

### 2. 推送代码

```bash
git remote add origin https://github.com/shaohuayangLLM/portfolio-2025.git
git branch -M main
git push -u origin main
```

### 3. 启用GitHub Pages

1. 进入仓库的 Settings → Pages
2. Source 选择：Deploy from a branch
3. Branch 选择：main / root
4. 点击 Save

### 4. 配置自定义域名

1. 在域名DNS管理中添加CNAME记录：
   - 主机记录：`@` 或 `www`
   - 记录类型：`CNAME`
   - 记录值：`shaohuayangllm.github.io`

2. 在GitHub Pages设置中添加自定义域名：`ainside.cn`

3. 等待DNS生效（通常需要几分钟到几小时）

## 自定义内容

编辑 `index.html` 文件中的以下部分：

- 个人信息（姓名、职位、简介）
- 工作经历（公司、职位、时间、职责）
- 技能标签（技术栈）
- 社交链接（邮箱、GitHub、LinkedIn）

## 技术栈

- HTML5
- CSS3（Grid, Flexbox, Animations）
- Vanilla JavaScript（用于滚动动画）

## 设计灵感

- Apple官网的简洁美学
- Stripe开发者页面的专业感
- 大量留白和精细排版

## License

MIT
