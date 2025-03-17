const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// 获取 Git 提交记录（限制 50 条）
const gitLog = execSync(
  'git log --pretty=format:"%h|%an|%ad|%s" --date=iso -50 --diff-filter=AMCRD',
).toString();

// 解析为对象数组
const commits = gitLog.split('\n').map((line) => {
  const [hash, author, date, message] = line.split('|');
  const isoDate = date.trim(); // 示例输入: "2023-10-05 14:30:00 +0800"
  const [yearMonthDay] = isoDate.split(' '); // 提取 "2023-10-05"
  return { hash, author, date: yearMonthDay, message };
});

// 写入到 React 项目的 public 或 src 目录
const outputPath = path.join(__dirname, '../.dumi/git-commits.json');
fs.writeFileSync(outputPath, JSON.stringify(commits, null, 2));
