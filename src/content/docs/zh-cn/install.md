---
title: 安装指南
description: EasyTidy Pro 安装、便携模式配置与卸载的完整指引。
---

本文档涵盖 EasyTidy Pro 的获取方式、标准安装、便携模式配置、升级与卸载的全流程说明。

## 软件获取与环境要求

### 支持的操作系统

- **Windows 11**（64 位）
- **Windows 10** v2004（内部版本 19041）或更高版本（64 位）
- Arm64 架构理论上支持，但未经过完整测试

### 所需依赖

| 依赖 | 版本要求 | 说明 |
|------|----------|------|
| [.NET Desktop Runtime](https://dotnet.microsoft.com/zh-cn/download/dotnet/10.0/runtime) | 10.0 | 必需运行时，若已安装则可跳过 |

### 官方安全下载渠道

请仅从以下渠道获取安装包，以确保文件安全完整：

- **GitHub 官方发布页**：[https://github.com/EasyTidy/EasyTidy-Releases/releases](https://github.com/EasyTidy/EasyTidy-Releases/releases)
- **EasyTidy 官网**：[https://easytidy.net](https://easytidy.net)

### 文件校验（可选）

下载完成后，可校验文件完整性。在 GitHub Releases 页面找到对应的 `.sha256` 校验文件，使用 PowerShell 验证：

```powershell
Get-FileHash .\EasyTidy_Setup_<版本>.exe -Algorithm SHA256
```

将输出的哈希值与 `.sha256` 文件内容比对，确保一致。

## 安装指南

### 安装步骤

1. 双击下载的 `EasyTidyPro_Setup_<版本>.exe` 安装程序。
2. 在安装向导中阅读并同意许可协议。
3. **选择安装路径**：
   - **默认路径**：`C:\Program Files\EasyTidyPro`
   - **自定义路径**：点击「浏览」选择其他目录
4. 根据需要勾选「创建桌面快捷方式」等附加选项。
5. 点击「安装」并等待安装完成。
6. 点击「完成」退出安装向导，EasyTidy 将自动启动。

### 用户数据存储位置

标准安装模式下，用户配置、日志等数据默认写入系统 AppData 目录：

```
C:\Users\<用户名>\AppData\Roaming\EasyTidy\
```

也可通过运行 `%APPDATA%\EasyTidyPro` 快速打开该目录。

## 便携模式配置指引

便携模式允许 EasyTidyPro 将所有数据保存在程序自身目录中，方便放置在 U 盘等移动设备上使用。

:::caution[便携模式目录要求]
为确保 EasyTidy Pro 正常运行，**请勿**将便携版安装或解压到以下受系统保护的目录：

- `C:\Program Files`
- `C:\Program Files (x86)`
- `C:\Windows`
- 其他需要管理员权限才能写入的目录

建议将软件放置在普通用户可写目录，例如：

 - `D:\Tools\EasyTidyPro`
 - `E:\Applications\EasyTidyPro`
 - U 盘或其他移动存储设备

这样可以确保便携模式的配置、日志和数据能够正常读写。
:::

### 激活方法

在 EasyTidyPro 程序所在目录（与 `EasyTidyPro.exe` 同级）下，手动新建一个名为 **`portable_config`** 的空文件夹：

```
EasyTidyPro\
├── EasyTidyPro.exe
└── portable_config\      ← 手动创建此空文件夹
```

### 运行机制

- 当 `portable_config` 文件夹存在时，EasyTidy 的所有配置、日志、数据库等数据将**自动写入该文件夹**，不再使用系统 AppData 目录。
- 当 `portable_config` 文件夹不存在时，回退至标准模式，数据写入 `%APPDATA%\EasyTidyPro`。
- 切换模式后，已有的配置文件**不会自动迁移**，需要手动复制。

## 升级与卸载说明

### 升级更新

两种模式均支持内置的「检查更新」功能：

1. 打开 EasyTidy Pro，进入「设置」页面。
2. 点击「检查更新」按钮。
3. 若检测到新版本，按照提示下载并安装更新。

也可访问 [GitHub Releases](https://github.com/EasyTidy/EasyTidy-Releases/releases) 手动下载最新版本覆盖安装。

### 卸载

#### 标准安装模式

1. 打开 Windows「设置」→「应用」→「已安装的应用」。
2. 搜索 `EasyTidyPro`，点击「卸载」。
3. 按照卸载程序提示完成移除。

:::tip
卸载后如需彻底清理残留数据，请手动删除 `%APPDATA%\EasyTidyPro` 文件夹。
:::

#### 便携模式

直接删除 EasyTidyPro 软件文件夹即可实现**无残留卸载**，所有数据均包含在该文件夹内，不会在系统中留下任何痕迹。
