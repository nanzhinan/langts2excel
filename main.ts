// main.ts
import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';

const appName = process.argv[2];
let originalLang = process.argv[3];
let targetLang = process.argv[4];

if (!appName) {
  console.error('请提供应用名称作为命令行参数，例如：ts-node main.ts Dashboard');
  process.exit(1);
}

if (!originalLang) {
  console.warn('请提供原始语言作为命令行参数，例如：ts-node main.ts Dashboard zh-CN 如果不带使用默认语言zh-CN');
  originalLang = 'zh-CN';
}

if (!targetLang) {
  console.warn('请提供目标语言作为命令行参数，例如：ts-node main.ts Dashboard zh-CN en-US 如果不带使用默认语言en-US');
  targetLang = 'en-US';
}

const langDir = path.resolve(__dirname, 'langs', appName);
const originalFile = require(`./langs/${appName}/${originalLang}.ts`).default;
const targetFile = require(`./langs/${appName}/${targetLang}.ts`).default;

// 递归展平嵌套对象
function flatten(obj: any, parentKey = '', result: any = {}) {
  Object.entries(obj).forEach(([key, value]) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flatten(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  });
  return result;
}

const flatOriginal = flatten(originalFile);
const flatTarget = flatten(targetFile);

// 构建 Excel 数据
const data = Object.keys(flatOriginal).map((key) => {
  const originalValue = flatOriginal[key] || '';
  const translatedValue = flatTarget[key] || '';
  const isTranslated = !!translatedValue;

  return [
    /* key, */
    originalValue,
    targetLang.replace('-', '_'),
    translatedValue,
    isTranslated ? '是' : '否',
  ];
});

console.log(data);

// 创建工作簿和工作表
const ws = XLSX.utils.aoa_to_sheet([
  [/* 'Key', */ 'Original Text', 'Target Language', 'Translation', 'Is the Word Translated'],
  ...data,
]);

const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

// 输出路径
const outputFilePath = path.resolve(langDir, `${appName}_术语库_${originalLang}_${targetLang}.xlsx`);

// 检查文件是否存在
if (fs.existsSync(outputFilePath)) {
  console.log(`检测到文件已存在，即将覆盖：${outputFilePath}`);
}

// 写入 Excel 文件
XLSX.writeFile(wb, outputFilePath);

console.log(`导出成功！文件路径：${outputFilePath}`);