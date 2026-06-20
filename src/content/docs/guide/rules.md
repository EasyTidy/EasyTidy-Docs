---
title: Rules Reference
description: Reference for file processing rules and rename patterns in EasyTidy.
---

## Rename Rule Examples

```bash
# Rename file to parent folder name + counter
D:\db\test\${parent}${}           # Output: D:\db\test\test1.jpg
D:\db\test\${parent}${start=10}   # Output: D:\db\test\test10.jpg, test11.jpg
D:\db\test\${parent}${increment=5} # Output: D:\db\test\test5.jpg, test10.jpg

# Regex replacement
D:\db\test\${regex=^foo,new}      # Output: foo.jpg → new.jpg
```

You can freely combine multiple rename rules and add custom separators or specific characters between different templates.

## File Matching Rules

Rules use standard glob patterns separated by `;` or `|`:

- `*.txt` — All text files
- `*.7z;*.zip;*.rar` — Common archive formats
- `*.jpg;*.png;*.gif` — Common image formats
- `*.docx;*.xlsx;*.pptx` — Office documents

Click the purple button next to the rule input to select from preset rules.
