// Content Loader - 动态加载CMS内容

// 解析front matter的简单实现
function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: content };

  const yaml = match[1];
  const body = match[2];

  // 简单的YAML解析器
  const data = {};
  let currentKey = null;
  let inList = false;
  let listItems = [];

  yaml.split('\n').forEach(line => {
    const keyMatch = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    const itemMatch = line.match(/^-\s*"(.*)"$/) || line.match(/^-\s*(.+)$/);

    if (keyMatch) {
      if (currentKey && listItems.length > 0) {
        data[currentKey] = listItems;
        listItems = [];
      }
      currentKey = keyMatch[1];
      const value = keyMatch[2].trim();
      if (value) {
        if (value.startsWith('"') && value.endsWith('"')) {
          data[currentKey] = value.slice(1, -1);
        } else {
          data[currentKey] = value;
        }
      }
      inList = false;
    } else if (itemMatch && currentKey) {
      const item = itemMatch[1] || itemMatch[2];
      listItems.push(item.startsWith('"') ? item.slice(1, -1) : item);
      inList = true;
    }
  });

  if (currentKey && listItems.length > 0) {
    data[currentKey] = listItems;
  }

  return { data, content: body };
}

// 加载单个文件
async function loadFile(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load ${path}`);
    const text = await response.text();
    return parseFrontMatter(text);
  } catch (error) {
    console.error(`Error loading ${path}:`, error);
    return null;
  }
}

// 加载目录中的所有文件
async function loadDirectory(dirPath) {
  try {
    const indexResponse = await fetch(`${dirPath}index.json`);
    if (indexResponse.ok) {
      const index = await indexResponse.json();
      const files = await Promise.all(
        index.map(file => loadFile(`${dirPath}${file}`))
      );
      return files.filter(f => f !== null);
    }
  } catch (error) {
    console.log(`Index not found, loading files directly from ${dirPath}`);
  }

  // 如果没有index，返回已知文件列表
  const knownFiles = {
    'content/experience/': ['iflytek.md', 'tulin.md', 'zezhong.md', 'guangxing.md'],
    'content/education/': ['ustc.md'],
    'content/projects/': ['xinghuo.md', 'cloud-platform.md', 'iflytek-cloud.md'],
    'content/skills/': ['llm.md', 'cloud.md', 'product.md', 'solution.md']
  };

  if (knownFiles[dirPath]) {
    const files = await Promise.all(
      knownFiles[dirPath].map(file => loadFile(`${dirPath}${file}`))
    );
    return files.filter(f => f !== null);
  }

  return [];
}

// 渲染关于我
async function renderAbout() {
  const file = await loadFile('content/about.md');
  if (!file) return;

  const data = file.data;

  // 更新Hero区域
  document.querySelector('.hero-info h1').textContent = data.name;
  document.querySelector('.hero-info .title').textContent = data.title;

  // 更新社交链接
  const socialLinks = document.querySelector('.social-links');
  socialLinks.innerHTML = `
    <a href="tel:${data.phone}">📱 ${data.phone}</a>
    <a href="mailto:${data.email}">📧 Email</a>
    <a href="${data.github}" target="_blank">💻 GitHub</a>
  `;

  // 更新关于我内容
  const aboutContent = document.querySelector('.about-content p');
  if (aboutContent) {
    aboutContent.textContent = data.description;
  }

  // 更新页脚
  const footerContact = document.querySelector('footer p:last-of-type');
  if (footerContact) {
    footerContact.innerHTML = `📧 ${data.email} | 📱 ${data.phone} | 📍 ${data.location}`;
  }
}

// 渲染工作经历
async function renderExperience() {
  const files = await loadDirectory('content/experience/');
  const timeline = document.querySelector('#experience .timeline');
  if (!timeline) return;

  timeline.innerHTML = files.map(file => {
    const data = file.data;
    const startDate = data.startDate.replace('-', '.');
    const endDate = data.endDate.replace('-', '.');

    return `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <h3>${data.position}</h3>
          <p class="company">${data.company}</p>
          <p class="period">${startDate} - ${endDate}</p>
          <ul>
            ${data.description.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }).join('');
}

// 渲染教育背景
async function renderEducation() {
  const files = await loadDirectory('content/education/');
  const timeline = document.querySelector('#education .timeline');
  if (!timeline) return;

  timeline.innerHTML = files.map(file => {
    const data = file.data;
    const startDate = data.startDate.replace('-', '.');
    const endDate = data.endDate.replace('-', '.');

    return `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <h3>${data.degree}</h3>
          <p class="company">${data.school} | ${startDate} - ${endDate}</p>
        </div>
      </div>
    `;
  }).join('');
}

// 渲染项目经历
async function renderProjects() {
  const files = await loadDirectory('content/projects/');
  const timeline = document.querySelector('#projects .timeline');
  if (!timeline) return;

  timeline.innerHTML = files.map(file => {
    const data = file.data;
    const startDate = data.startDate.replace('-', '.');
    const endDate = data.endDate.replace('-', '.');

    return `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <h3>${data.name}</h3>
          <p class="company">${data.position} | ${startDate} - ${endDate}</p>
          <ul>
            ${data.description.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }).join('');
}

// 渲染技能
async function renderSkills() {
  const files = await loadDirectory('content/skills/');
  const skillsGrid = document.querySelector('#skills .skills-grid');
  if (!skillsGrid) return;

  skillsGrid.innerHTML = files.map(file => {
    const data = file.data;

    return `
      <div class="skill-category">
        <h3>${data.category}</h3>
        <div class="skill-tags">
          ${data.items.map(item => `<span class="skill-tag proficient">${item}</span>`).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// 初始化
async function init() {
  console.log('Loading CMS content...');

  await Promise.all([
    renderAbout(),
    renderExperience(),
    renderEducation(),
    renderProjects(),
    renderSkills()
  ]);

  console.log('CMS content loaded successfully!');
}

// 页面加载完成后执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
