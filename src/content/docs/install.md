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

### Enable from Settings (Recommended)

If EasyTidy Pro is currently using the system configuration, you can switch to portable mode directly in the application:

1. Make sure EasyTidy Pro is located in a directory writable by the current user.
2. Open EasyTidy Pro and go to **Settings → General Settings**.
3. Find **Portable Configuration → Portable Configuration Mode** and confirm that the current mode is **System Config**.
4. Click **Switch Mode**.
5. Choose how the existing configuration should be handled:
   - **Copy and Switch**: Copy the current settings, tasks, and database into the program directory before switching. Use this to keep your existing data.
   - **Use Empty Config**: Create a new portable configuration without copying data from the system configuration.
6. Wait for the application to restart, then return to the same section and confirm that the current mode is **Portable Config**.

![Switching to portable configuration mode in General Settings](/images/en/portable-config-settings.gif)

:::tip
Choose **Copy and Switch** if you need to retain existing tasks and settings. You can also create a backup from **Settings → Backup and Restore** before switching.
:::

:::note
After the mode is changed, EasyTidy Pro displays a notification and automatically restarts after approximately three seconds.
:::

### Enable Manually

Create an empty folder named **`portable_config`** in the same directory as `EasyTidyPro.exe`:

```
EasyTidyPro\
├── EasyTidyPro.exe
└── portable_config\      ← Create this empty folder manually
```

Exit and restart EasyTidy Pro to use the new, empty portable configuration. Creating the directory manually does not copy your existing system configuration; use **Copy and Switch** in Settings when you need to retain existing data.

### How It Works

- When the `portable_config` folder exists, EasyTidy automatically writes all configuration, logs, and database files into this folder instead of the system AppData directory.
- When the `portable_config` folder does not exist, EasyTidy falls back to standard mode, storing data in `%APPDATA%\EasyTidyPro`.
- When switching from Settings, you can copy the existing configuration or start with an empty one. Creating `portable_config` manually does not migrate existing data.
- To return to the system configuration, click **Switch Mode** in the same section and choose whether to copy the portable configuration into the system configuration directory.

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
