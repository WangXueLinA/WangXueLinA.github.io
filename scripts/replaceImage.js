// 图片markdown语法的替换成<ImagePreview src=""></ImagePreview>

const fs = require('fs');
const path = require('path');

function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && path.extname(entry.name) === '.md') {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // 匹配所有Markdown图片语法，包括有描述和无描述的情况
  const regex = /!\[(.*?)\]\((.*?)\)/g;
  const newContent = content.replace(regex, (match, alt, src) => {
    // 保留src属性，忽略alt描述
    return `<ImagePreview src="${src}"></ImagePreview>`;
  });

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

// 启动处理
const docsPath = path.resolve(__dirname, '../docs');
if (fs.existsSync(docsPath)) {
  processDirectory(docsPath);
  console.log('处理完成！');
} else {
  console.error('目录不存在：', docsPath);
}
