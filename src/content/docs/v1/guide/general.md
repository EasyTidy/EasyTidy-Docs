---
title: Settings
description: Configure EasyTidy V1's user interface, file handling, and runtime parameters.
---

Settings for the EasyTidy user interface and runtime configuration, including:

- **Appearance Customization**: Adjust the interface theme and visual elements to match personal preferences.
- **Display Language**: Choose the application's interface language, supporting multiple language environments.
- **Runtime Parameters**: Configure processing rules, scheduling options, and other advanced settings to ensure EasyTidy runs efficiently according to your specific needs.

These settings allow you to personalize your EasyTidy experience and optimize its functionality to meet your workflow requirements.

## Application Language

EasyTidy supports globalized multi-language settings, with the default language matching the system's language. Users can also select the desired language from a dropdown list. The currently supported languages are **Simplified Chinese**, **Traditional Chinese**, **English**, **Japanese**, and **French**. After changing the language, the software will prompt for a restart. Once restarted, the language settings will take effect, and the interface will switch to the selected language.

## General Settings

Settings for configuring EasyTidy's runtime parameters.

### File Handling

![File Conflict](/images/PixPin_2024-12-26_14-37-06.png)

File conflict handling refers to the actions taken when file conflicts arise. The default action is **Skip**. The available conflict resolution options are:

- **Skip**: Retain the existing file without making any changes.
- **Overwrite**: Replace the existing file with the new one, regardless of file properties.
- **Overwrite if Newer**: Replace the existing file only if the new file is newer.
- **Overwrite if Size Differs**: Replace the existing file only if the new file's size differs.
- **Rename (Numbered)**: To avoid conflicts, a numbered suffix is added to the new file, such as "FileName(01)".
- **Rename with Current Timestamp**: Rename the new file based on the current date and time (accurate to seconds) to avoid conflicts.

![Subfolders](/images/PixPin_2024-12-26_14-44-22.png)

Configure EasyTidy's recursive processing options to decide whether to include subfolders when performing file operations. When enabled, EasyTidy will automatically dive into each subdirectory to ensure files in all levels are processed. This feature is **disabled** by default.

![In-Use Files](/images/PixPin_2024-12-26_14-49-14.png)

Set EasyTidy's behavior for processing in-use files. When enabled, EasyTidy will attempt to force-process files that are currently in use. This feature is **disabled** by default.

![Empty Files](/images/PixPin_2024-12-26_14-56-30.png)

Configure EasyTidy's handling of empty files. When enabled, EasyTidy will ignore file size and process any files that meet the specified conditions. This feature is **enabled** by default.

![Hidden Files](/images/PixPin_2024-12-26_15-01-58.png)

Configure EasyTidy's handling of hidden files. When enabled, EasyTidy will process hidden files. This feature is **disabled** by default.

![Path](/images/PixPin_2024-12-26_15-06-22.png)

Configure the folder where files are uploaded when using WebDAV for file uploads. The default folder path is `/EasyTidy_UploadFiles`.

![Auto-Fix](/images/PixPin_2024-12-26_15-10-05.png)

Configure EasyTidy's scheduling options, including the ability to enable automatic date conflict resolution to ensure the accuracy of scheduling. This feature is **disabled** by default.

![Preserve Structure](/images/PixPin_2024-12-26_15-14-44.png)

Configure whether to maintain the original folder structure when processing files. When enabled, EasyTidy will preserve the original directory hierarchy. This feature is **enabled** by default.

### Application Settings

![Auto-Start](/images/PixPin_2024-12-26_15-21-31.png)

Configure whether EasyTidy should start with the system. When enabled, EasyTidy will launch automatically with the system. This feature is **disabled** by default.

![Check for Updates](/images/PixPin_2024-12-26_15-31-04.png)

Configure whether EasyTidy should automatically check for updates when the program starts. When enabled, EasyTidy will check for new versions (excluding beta versions) at startup and prompt for updates if a new version is available. This feature is **disabled** by default.

![Update image](/images/PixPin_2025-02-24_13-58-58.png)
Configure EasyTidy to enable or disable checking through a mirror source when updating, and to specify a mirror source address for automatic updates. This is provided to address difficulties directly connecting to GitHub for automatic updates. By default, the update mirror check is **disabled**, and the default mirror address is `https://gh-proxy.com/`.

![Minimize](/images/PixPin_2024-12-26_15-34-50.png)

Configure whether EasyTidy should minimize to the system tray on startup. When enabled, EasyTidy will start minimized to the system tray without displaying the main interface. This feature is **disabled** by default.

![Multiple Instances](/images/PixPin_2024-12-26_15-40-26.png)

Configure whether EasyTidy should allow multiple instances to run simultaneously. When enabled, multiple instances of EasyTidy can be run. This feature is **disabled** by default.

**Note**: This feature is experimental.

## Behavior and Animations

Customize the application's appearance, materials, and style preferences.

### Theme Settings

By default, the application follows the system's theme color setting. Additionally, custom theme colors are available, and users can select between dark or light modes to personalize the interface display.

### Materials

The program by default applies a mica effect, providing a modern and smooth visual experience. Several material effects are available for customizing the interface appearance, including:

- **Mica Alt**: An alternative version of the mica effect.
- **Acrylic**: Mimicking real-world acrylic materials with subtle blur and depth effects.
- **Background Acrylic**: Acrylic effect based on the background color.
- **Semi-transparent Acrylic**: Acrylic effect with higher transparency to enhance layering.

Users can choose from different material effects based on their personal preferences to achieve their ideal visual style.

## About

Information about EasyTidy's development and related content.
