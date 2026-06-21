---
title: Configuration Rules
description: Sample rename and regex rules for EasyTidy V1 file processing.
---

![Preset Examples](/images/PixPin_2025-01-07_17-08-41.gif)

## Sample rename rule

```bash
 # Rename the file to the name of the parent folder + counter
 D:\db\测试\${parent}${} # out：D:\db\测试\测试1.jpg
 D:\db\测试\${parent}${start=10} # out：D:\db\测试\测试10.jpg D:\db\测试\测试11.jpg
 D:\db\测试\${parent}${increment=5} # out：D:\db\测试\测试5.jpg D:\db\测试\测试10.jpg

 # Regular replace
 D:\db\测试\${regex=^foo,new} # out：D:\db\测试\foo.jpg => D:\db\测试\new.jpg
```

Support to flexibly combine multiple renaming rules for free use, and allow to add customized separators or specific characters between different templates.
