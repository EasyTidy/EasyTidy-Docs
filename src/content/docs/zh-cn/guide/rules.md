---
title: 配置规则
description: EasyTidy 文件处理规则和重命名模板参考。
---

## 重命名规则示例

```bash
# 将文件重命名为上一级文件夹名称+计数器
D:\db\测试\${parent}${}           # 输出：D:\db\测试\测试1.jpg
D:\db\测试\${parent}${start=10}   # 输出：D:\db\测试\测试10.jpg 测试11.jpg
D:\db\测试\${parent}${increment=5} # 输出：D:\db\测试\测试5.jpg 测试10.jpg

# 正则替换
D:\db\测试\${regex=^foo,new}      # 输出：foo.jpg → new.jpg
```

支持将多种重命名规则自由组合使用，同时允许在不同模板间添加自定义分隔符或特定字符。

## 文件匹配规则

规则使用标准通配符格式，多个规则用 `;` 或 `|` 分隔：

- `*.txt` — 所有文本文件
- `*.7z;*.zip;*.rar` — 常见压缩文件
- `*.jpg;*.png;*.gif` — 常见图片格式
- `*.docx;*.xlsx;*.pptx` — Office 文档

点击规则输入框旁的紫色按钮可以从预设规则中选择。
