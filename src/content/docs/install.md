---
title: Installation Guide
description: Complete guide for installing, configuring portable mode, upgrading, and uninstalling EasyTidy Pro.
---

This document covers how to obtain EasyTidy Pro, standard installation, portable mode setup, upgrading, and uninstallation.

## System Requirements & Download

### Supported Operating Systems

- **Windows 11** (64-bit)
- **Windows 10** v2004 (build 19041) or higher (64-bit)
- Arm64 is theoretically supported but not fully tested

### Required Dependencies

| Dependency | Version | Notes |
|------------|---------|-------|
| [.NET Desktop Runtime](https://dotnet.microsoft.com/download/dotnet/10.0/runtime) | 10.0 | Required runtime; skip if already installed |

### Official Download Channels

Always download from the following trusted sources to ensure file integrity:

- **GitHub Releases**: [https://github.com/EasyTidy/EasyTidy-Releases/releases](https://github.com/EasyTidy/EasyTidy-Releases/releases)
- **EasyTidy Official Website**: [https://easytidy.net](https://easytidy.net)

### File Verification (Optional)

After downloading, you can verify file integrity using the `.sha256` checksum file available on the GitHub Releases page. Run the following in PowerShell:

```powershell
Get-FileHash .\EasyTidy_Setup_<version>.exe -Algorithm SHA256
```

Compare the output with the hash value in the `.sha256` file to confirm a match.

## Installation

### Installation Steps

1. Double-click the downloaded `EasyTidyPro_Setup_<version>.exe` installer.
2. Read and accept the license agreement in the setup wizard.
3. **Choose installation path**:
   - **Default path**: `C:\Program Files\EasyTidyPro`
   - **Custom path**: Click "Browse" to select another directory
4. Check optional items such as "Create desktop shortcut" as needed.
5. Click "Install" and wait for the installation to complete.
6. Click "Finish" to exit the wizard; EasyTidy will launch automatically.

### User Data Storage Location

In standard installation mode, user configuration, logs, and other data are stored in the system AppData directory:

```
C:\Users\<Username>\AppData\Roaming\EasyTidyPro\
```

You can also open this folder quickly by navigating to `%APPDATA%\EasyTidyPro` in File Explorer.

## Portable Mode Setup

Portable mode stores all data for EasyTidy Pro within the program folder, making it ideal for USB drives and portable use.

:::caution[Portable Mode Directory Requirements]
To ensure EasyTidy Pro runs properly, **DO NOT** install or extract the portable version into the following system-protected directories:

- `C:\Program Files`
- `C:\Program Files (x86)`
- `C:\Windows`
- Any other directory requiring administrator privileges to write

It is recommended to place the software in a user-writable directory, such as:

 - `D:\Tools\EasyTidyPro`
 - `E:\Applications\EasyTidyPro`
 - A USB flash drive or other removable storage

This ensures that portable mode configuration, logs, and data can be read and written correctly.
:::

### Activation

Create an empty folder named **`portable_config`** in the same directory as `EasyTidyPro.exe`:

```
EasyTidyPro\
├── EasyTidyPro.exe
└── portable_config\      ← Create this empty folder manually
```

### How It Works

- When the `portable_config` folder exists, EasyTidy automatically writes all configuration, logs, and database files into this folder instead of the system AppData directory.
- When the `portable_config` folder does not exist, EasyTidy falls back to standard mode, storing data in `%APPDATA%\EasyTidyPro`.
- Switching modes does **not** auto-migrate existing configuration files; you must copy them manually.

## Upgrade & Uninstall

### Upgrading

Both standard and portable modes support the built-in "Check for Updates" feature:

1. Open EasyTidy Pro and navigate to the **Settings** page.
2. Click the **"Check for Updates"** button.
3. If a new version is found, follow the prompts to download and install the update.

You can also visit [GitHub Releases](https://github.com/EasyTidy/EasyTidy-Releases/releases) to manually download and install the latest version over the existing one.

### Uninstall

#### Standard Installation

1. Open Windows **Settings** → **Apps** → **Installed apps**.
2. Search for `EasyTidyPro` and click **"Uninstall"**.
3. Follow the uninstaller prompts to complete removal.

:::tip
To fully clean up residual data after uninstalling, manually delete the `%APPDATA%\EasyTidyPro` folder.
:::

#### Portable Mode

Simply delete the EasyTidyPro program folder for a **clean, residue-free uninstall**. All data is contained within the folder, leaving no traces on the system.
