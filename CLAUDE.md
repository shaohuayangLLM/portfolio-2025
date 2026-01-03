# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal portfolio website for 杨绍华 (Yang Shaohua), built with pure HTML/CSS/JavaScript and deployed on GitHub Pages. The site uses a custom YAML-based content system to dynamically load personal information, work experience, education, projects, and skills.

**Key Characteristic:** No build step required - all content is loaded client-side via fetch API from markdown files with YAML front matter.

## Development Commands

### Local Preview

```bash
# Python 3
python3 -m http.server 8000

# Node.js (if available)
npx serve

# Then visit http://localhost:8000
```

### Deployment

```bash
# Deploy to GitHub Pages (automatic on push)
git add .
git commit -m "Update content"
git push origin main

# GitHub Pages automatically builds from main branch
# Wait 2-3 minutes for deployment
```

### Content Updates

To update site content, edit files in the `content/` directory and refresh the browser - no rebuild needed.

## Architecture

### Content System

The site uses a **client-side content loading system** rather than server-side CMS:

1. **Content Storage:** `content/` directory contains markdown files with YAML front matter
   - `content/about.md` - Personal info (single file)
   - `content/experience/*.md` - Work history (multiple files)
   - `content/education/*.md` - Education (multiple files)
   - `content/projects/*.md` - Projects (multiple files)
   - `content/skills/*.md` - Skills categories (multiple files)

2. **Content Loader:** `js/content-loader.js` provides:
   - Custom YAML parser (`parseFrontMatter`) - handles simple YAML without external libraries
   - File loading via fetch API
   - Hard-coded file lists for each content type
   - Render functions that inject data into DOM elements

3. **Data Flow:**
   ```
   Browser loads index.html
       ↓
   content-loader.js runs on DOMContentLoaded
       ↓
   Fetches .md files from content/ directory
       ↓
   Parses YAML front matter
       ↓
   Renders data into DOM elements
   ```

### File Format

Content files use YAML front matter format:

**about.md** (single file):
```yaml
---
name: 杨绍华
title: 产品经理
description:
  - 拥有11年产品管理经验
email: example@email.com
phone: '13865943361'
github: https://github.com/shaohuayangLLM
location: 安徽合肥
---
```

**experience/*.md** (multiple files):
```yaml
---
company: "科大讯飞股份有限公司"
position: "产品经理"
startDate: "2018-05"
endDate: "至今"
description:
  - "成功规划公司大模型产品"
  - "撰写大模型训练解决方案"
---
```

**Note:** Two YAML formats exist in the codebase:
- Files with `---` delimiters (standard front matter)
- Files without `---` delimiters (entire file is YAML)

The `parseFrontMatter()` function in `js/content-loader.js` handles both formats.

### DOM Integration

The main page (`index.html`) contains placeholder elements that content-loader.js targets:

```javascript
// Examples from content-loader.js:
document.querySelector('.hero-info h1').textContent = data.name;
document.querySelector('#experience .timeline').innerHTML = files.map(...);
document.querySelector('#skills .skills-grid').innerHTML = files.map(...);
```

**Critical CSS Selectors:**
- `.hero-info h1` - Name
- `.hero-info .title` - Job title
- `#experience .timeline` - Work experience container
- `#education .timeline` - Education container
- `#projects .timeline` - Projects container
- `#skills .skills-grid` - Skills grid

### Design System

The site uses CSS variables for theming (Apple-inspired design):

```css
:root {
    --bg-primary: #ffffff;
    --bg-secondary: #f5f5f7;
    --text-primary: #1d1d1f;
    --text-secondary: #86868b;
    --accent: #0066cc;
    --border: #d2d2d7;
}
```

All styling is inline in `index.html` - no external CSS files.

## Important Constraints

### YAML Parser Limitations

The custom YAML parser in `js/content-loader.js` has limitations:
- No complex YAML features (anchors, aliases, multi-line strings)
- List items must use `- "value"` or `- value` format
- Date handling is manual (YYYY-MM format)
- Cannot parse nested objects deeply

**When adding content:** Keep YAML structure simple and flat.

### Hard-coded File Lists

The `loadDirectory()` function contains hard-coded file lists:

```javascript
const knownFiles = {
    'content/experience/': ['iflytek.md', 'tulin.md', 'zezhong.md', 'guangxing.md'],
    'content/education/': ['ustc.md'],
    'content/projects/': ['xinghuo.md', 'cloud-platform.md', 'iflytek-cloud.md'],
    'content/skills/': ['llm.md', 'cloud.md', 'product.md', 'solution.md']
};
```

**When adding new content files:** You must update these arrays in `js/content-loader.js`.

### No Build Process

- No npm/yarn dependencies for the site itself
- No bundlers, no transpilation
- All code must work in browsers natively (ES6+ is fine)
- Font loading uses Google Fonts CDN

## Custom Domain

The site uses custom domain `ainside.cn` configured via:
- CNAME file in root
- GitHub Pages settings
- DNS CNAME record pointing to `shaohuayangllm.github.io`

## Modifying the Site

### Adding New Content Type

1. Create markdown files in `content/[new-type]/`
2. Add file list to `knownFiles` in `js/content-loader.js`
3. Create render function (`renderNewType()`)
4. Add render call to `init()` function
5. Add corresponding section in `index.html`

### Changing Styling

All CSS is in `<style>` tag within `index.html`. Modify CSS variables or component styles directly there.

### Updating Personal Info

Edit `content/about.md` and refresh browser - no code changes needed.

## Deployment Details

- **Platform:** GitHub Pages
- **Branch:** main
- **Source:** root (/)
- **Custom Domain:** ainside.cn
- **Build:** Static (no build step)
- **Auto-deploy:** On push to main branch

Deployment takes 2-3 minutes after pushing to GitHub.
