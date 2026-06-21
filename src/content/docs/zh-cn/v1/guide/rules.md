---
title: 配置规则
description: EasyTidy V1 文件处理的重命名与正则规则示例。
---

![预置示例](/images/PixPin_2025-01-07_17-08-41.gif)

## 重命名规则示例

```bash
 # 将文件重命名为上一级文件夹名称+计数器
 D:\db\测试\${parent}${} # 输出：D:\db\测试\测试1.jpg
 D:\db\测试\${parent}${start=10} # 输出：D:\db\测试\测试10.jpg D:\db\测试\测试11.jpg
 D:\db\测试\${parent}${increment=5} # 输出：D:\db\测试\测试5.jpg D:\db\测试\测试10.jpg

 # 正则替换
 D:\db\测试\${regex=^foo,new} # 输出：D:\db\测试\foo.jpg => D:\db\测试\new.jpg
```

支持将多种重命名规则自由组合使用，同时允许在不同模板间添加自定义分隔符或特定字符。
