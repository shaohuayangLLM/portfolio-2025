# 个人主页 CMS 使用指南

本网站已集成 **Decap CMS**（原Netlify CMS），提供可视化的后台管理界面，方便您更新网站内容。

## 🎯 功能特点

- ✅ 可视化编辑界面
- ✅ 无需代码知识即可更新内容
- ✅ 修改自动提交到GitHub
- ✅ 实时预览效果
- ✅ 支持移动端编辑

## 📝 使用步骤

### 1. 访问管理后台

在浏览器中打开：
```
https://ainside.cn/admin/
```

或者通过GitHub Pages访问：
```
https://shaohuayangllm.github.io/portfolio-2025/admin/
```

### 2. GitHub 身份验证

首次访问时需要进行身份验证：

1. 点击 "Login with GitHub"
2. 授权 Decap CMS 访问您的仓库
3. 验证成功后即可进入管理界面

### 3. 编辑内容

#### 网站设置
- **姓名**：您的姓名
- **职位**：职业标题
- **简介**：个人简介
- **联系方式**：邮箱、电话、GitHub、所在地

#### 工作经历
点击左侧菜单 "工作经历"：
- 查看所有工作经历
- 点击 "Add new" 添加新经历
- 点击任意记录进行编辑
- 支持编辑：公司名称、职位、时间、职责描述

#### 教育背景
- 添加或修改教育经历
- 支持多个学历记录

#### 项目经历
- 管理您的项目展示
- 添加项目描述和时间

#### 技能
- 管理技能分类
- 每个分类下的技能列表

### 4. 保存和发布

1. 点击顶部 "Save" 按钮保存更改
2. 点击 "Publish" 发布内容
3. 内容会自动提交到GitHub仓库
4. GitHub Pages会在几分钟后自动重新部署网站

## 📁 内容文件结构

```
portfolio-2025/
├── admin/
│   ├── config.yml       # CMS配置文件
│   └── index.html       # CMS管理界面
├── content/
│   ├── about.md         # 关于我
│   ├── experience/      # 工作经历
│   │   ├── iflytek.md
│   │   ├── tulin.md
│   │   ├── zezhong.md
│   │   └── guangxing.md
│   ├── education/       # 教育背景
│   │   └── ustc.md
│   ├── projects/        # 项目经历
│   │   ├── xinghuo.md
│   │   ├── cloud-platform.md
│   │   └── iflytek-cloud.md
│   └── skills/          # 技能
│       ├── llm.md
│       ├── cloud.md
│       ├── product.md
│       └── solution.md
├── js/
│   └── content-loader.js  # 内容加载脚本
└── index.html          # 主页面
```

## 🔧 手动编辑内容

如果您熟悉Git和Markdown，也可以直接编辑 `content/` 目录下的文件：

1. Clone仓库到本地
2. 编辑相应的 `.md` 文件
3. Commit并Push到GitHub
4. 等待GitHub Pages自动部署

## ⚠️ 注意事项

1. **身份验证**：每次访问管理后台都需要GitHub登录
2. **自动部署**：发布内容后需要等待几分钟，GitHub Pages才会完成部署
3. **备份**：所有内容都会保存在GitHub仓库中，不用担心丢失
4. **预览**：在CMS中可以预览更改效果，但最终显示以网站为准

## 🆘 常见问题

### Q: 无法访问 /admin/ 页面？
A: 确保网站已正确部署，使用完整的URL访问。

### Q: GitHub登录后没有权限？
A: 确保您的GitHub账号有该仓库的写入权限。

### Q: 修改后网站没有更新？
A: GitHub Pages需要几分钟重新部署，请耐心等待。也可以在GitHub仓库的Actions页面查看部署状态。

### Q: 如何撤销已发布的内容？
A: 访问GitHub仓库，在 "Commits" 页面找到对应的提交，可以 "Revert" 恢复。

## 📞 技术支持

如有问题，请访问：
- GitHub仓库：https://github.com/shaohuayangLLM/portfolio-2025
- Decap CMS文档：https://decapcms.org/docs/
