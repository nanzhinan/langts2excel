# langts2excel

这是一个用于将 TypeScript 多语言文件转换为 Excel 表格的小工具，便于翻译管理和查看。

## 功能特性

- 从命令行参数读取应用名称和多语言配置。
- 支持嵌套对象的递归展平，以兼容复杂的多语言结构。
- 自动生成包含原文、目标语言、翻译状态等信息的 Excel 表格。
- 默认支持 `zh-CN` 和 `en-US`，但可以通过参数自定义语言。
- 覆盖已有输出文件时会提示用户。

---

## 使用步骤

### 1.整理多语言文件夹 （应用名称->多语言文件）
整理自己应用的多语言文件夹 放置在langs文件夹下 目录结构参考：langs下的Dashboard文件夹
请确保项目中存在如下结构的语言文件：
langs/ └── <appName>/ ├── <originalLang>.ts └── <targetLang>.ts

### 2.安装依赖

确保安装了以下依赖库：

```bash
npm install
```

如果没有安装ts-node，可以使用以下命令安装：
```bash
npm install -g ts-node
```

## 3.执行命令

请使用以下命令运行该工具：

```bash
ts-node main.ts <appName> [originalLang] [targetLang]
```

## 参数说明

该工具支持以下命令行参数：

| 参数名           | 含义描述                                       | 是否必填 | 默认值     |
|------------------|------------------------------------------------|----------|------------|
| `appName`        | 应用名称，用于定位语言文件目录                 | 是       | 无         |
| `originalLang`   | 原始语言代码（如 `zh-CN`）                     | 否       | `zh-CN`    |
| `targetLang`     | 目标语言代码（如 `en-US`）                     | 否       | `en-US`    |

> **说明**：  
> - [appName](file://e:\nodejs-service\langts2excel\langs\VisualSuite\zh-CN.ts#L3337-L3337) 必须提供，用于确定要处理的语言文件路径。  
> - 如果未指定 `originalLang` 或 `targetLang`，程序会使用默认值进行处理。

## 示例命令

以下是一些常见的使用示例：

语言参数的值为 en-US 和 zh-CN 和 zh-TW 且和语言文件名称相对应

```bash
# 示例1: 只提供应用名称，使用默认语言 zh-CN 和 en-US
ts-node main.ts Dashboard

# 示例2: 指定原始语言为 zh-CN，目标语言为 en-US
ts-node main.ts Dashboard zh-CN en-US

# 示例3: 使用其他语言对，例如从 en-US 翻译成 zh-TW
ts-node main.ts Dashboard en-US zh-TW
```

## 注意事项

- **默认语言格式使用下划线**：工具中默认使用的语言代码是 `zh-CN` 和 `en-US`，请确保语言文件名与之匹配。
- **语言文件需为 default 导出**：每个语言 `.ts` 文件必须使用 `export default` 导出翻译对象。
- **文件结构要求**：请确保项目中存在如下结构的语言文件：
langs/ └── <appName>/ ├── <originalLang>.ts └── <targetLang>.ts

示例：
langs/ └── Dashboard/ ├── zh-CN.ts └── en-US.ts


- **输出路径固定格式**：生成的 Excel 文件会保存在 `langs/<appName>/` 目录下，文件名为 `<appName>_术语库_originalLang_targetLang.xlsx`。
- **覆盖已有文件**：如果目标文件已存在，程序会自动覆盖，并输出提示信息。
- **翻译状态判断依据**：若目标语言值为空，则标记为“否”，否则标记为“是”。
- **依赖项**：需要安装以下依赖，请提前通过 npm 安装：



