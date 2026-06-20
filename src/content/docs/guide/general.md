---
title: Settings
description: Configure EasyTidy's interface and runtime settings.
---

Customize EasyTidy's user interface and operational configuration, including:

- **Appearance**: Adjust interface themes and visual elements to match personal preferences.
- **Display Language**: Select the application's interface language, supporting multiple locales.
- **Runtime Parameters**: Configure processing rules, scheduling options, and other advanced settings.

## Application Language

EasyTidy supports multilingual globalization. The default language matches the system language. You can also select a language from the dropdown. Currently supported: **Simplified Chinese**, **Traditional Chinese**, **English**, **Japanese**, and **French**. After changing the language, the software will prompt a restart to apply the new language.

## General Settings

### File Processing

**Conflict Handling**: Determines how to resolve file conflicts. Default is **Skip**. Available options:

- **Skip**: Keep the original file without changes.
- **Overwrite**: Replace with the new file, regardless of attributes.
- **Overwrite if Newer**: Replace only when the new file is newer.
- **Overwrite if Different Size**: Replace only when sizes differ.
- **Rename (Numbered)**: Add a numeric suffix like `filename(01)`.
- **Rename (Timestamp)**: Add a current timestamp to avoid conflicts.

**Process Subfolders**: Enable to recursively process subdirectories. Default is **disabled**.

**Process In-Use Files**: When enabled, EasyTidy will attempt to process files currently in use. Default is **disabled**.

**Process Empty Files**: When enabled, EasyTidy will ignore file size and process all matching files. Default is **enabled**.

**Process Hidden Files**: When enabled, EasyTidy will process hidden files. Default is **disabled**.

**WebDAV Upload Path**: The destination folder for WebDAV uploads. Default is `/EasyTidy_UploadFiles`.

**Auto-Fix Date Conflicts**: When enabled, EasyTidy automatically fixes scheduling date conflicts. Default is **disabled**.

**Preserve Folder Structure**: When enabled, EasyTidy preserves the original directory hierarchy during file operations. Default is **enabled**.

### Application Settings

**Auto-Start**: Launch EasyTidy on system startup. Default is **disabled**.

**Check for Updates**: Automatically check for new versions on startup. Default is **disabled**.

**Minimize to Tray**: Minimize to system tray on startup instead of showing the main window. Default is **disabled**.

**Update Mirror**: Enable using a mirror for update checks. Useful when direct GitHub access is problematic. Default mirror: `https://gh-proxy.com/`.

**Multiple Instances**: Allow multiple EasyTidy instances to run simultaneously (experimental). Default is **disabled**.

## Appearance and Animation

### Theme

EasyTidy follows the system theme by default, but you can manually choose light or dark mode.

### Material

The default material is **Mica**, providing a modern visual experience. Additional options include:

- **Mica Alt**: An alternative mica variant.
- **Acrylic**: Mimics real-world acrylic with blur and depth effects.
- **Background Acrylic**: Acrylic effect adjusted to background color.
- **Translucent Acrylic**: Higher transparency acrylic effect.

## About

View EasyTidy development information and credits.
