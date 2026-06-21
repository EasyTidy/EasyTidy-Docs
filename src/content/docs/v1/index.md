---
title: User Guide
description: Getting started with EasyTidy V1, a simple file auto-classification tool built with WinUI 3 and .NET 8.
---

EasyTidy is a simple file automatic classification and organization tool that allows you to easily create file workflows. It is built using WinUI 3 and .NET 8.

## Quick Start

It is recommended to download the latest version from [GitHub](https://github.com/SaboZhang/EasyTidy/releases) or [cloud drive](/v1/download/). Of course, if you prefer to modify and compile the source code yourself, that option is also available.

**Requirements**

- Supported Operating Systems:
  - Windows 11 (all versions)
  - Windows 10 v2004 (19041) or higher
- System Architecture:
  - Currently supports x64 and Arm64 (theoretical support, no device testing).
- The installer requires the following runtime:
  - [.NET Runtime 8.0](https://dotnet.microsoft.com/zh-cn/download/dotnet/8.0) Desktop Runtime

**After Downloading**

Use any decompression tool to extract the files, then go to the `EasyTidy` directory and run `EasyTidy.exe`, or run `run.bat` to create a desktop shortcut and automatically launch the application.

Upon first launch, the `EasyTidy` tray icon will be hidden by the system. It is recommended to manually drag the `EasyTidy` icon to the tray area.
![pin_logo](/images/logo_pin.gif)

### Set Filter Rules

Filter rules allow further refinement of files beyond just moving them, providing more precise selection. These rules are optional, depending on your needs. You can use regular expressions to match file names, content, and other attributes.

- Click the "Add Filter" button
- Set the filter name, which will be used for associating with tasks in [Task Scheduling](/v1/guide/task/)
- Check the attributes you want to filter (at least one attribute is required)
- Filterable attributes include: file name, file path, file size, creation time, modification time, access time, visibility, read-only, system file, etc. For more details, see the [Filter](/v1/guide/filter/) section.

### Add Task

Create a relationship between the files or folders (rules, including associated filters) and the operations (processing methods).

### Set Processing Rules

1. **Define File or Folder Rules**
   - Click the "Add Task" button on the Task Scheduling page
   - Enter the task name and task group name, try to ensure task names are unique for easier association with tasks in [Automation](/v1/guide/automation/)
   - Click the purple button next to the "Processing Rules" field, and choose a predefined system rule or manually enter a file rule. Separate multiple rules using `|` or `;`. For example, a rule for processing compressed files: `*.7z;*.zip;*.rar`

2. **Associate Advanced Rules (Optional)**
   - Click the "Funnel" button next to the processing rule field to choose a rule defined in the filter page. Once selected, the rule will be associated with the task.

3. **Choose File Handling Method**
   - `Move`: Moves files from the source folder to the target folder without changing file structure or names.
   - `Copy`: Copies files from the source folder to the target folder without changing file structure or names.
   - `Rename`: Copies files from the source folder to the target folder, but renames them according to the specified rules.
   - `Recycle`: Deletes files but keeps them in the system's Recycle Bin, recoverable unless the Recycle Bin has been emptied.
   - `Delete`: Deletes files permanently and cannot be recovered (use this option with caution).
   - `Extract`: Automatically extracts compressed files. If no target folder is provided, the files will be extracted in the source folder. For single files, extraction will occur in a folder named after the compressed file. If multiple files without a root directory are found, they will be extracted into a folder named after the compressed file. Only files matching the given rules will be extracted.
   - `Compress`: Automatically compresses files into a zip file. The zip file's name will be the same as the file's name, and the zip file's size and path will match the source file.
   - `Upload to WebDAV`: Automatically uploads matching files to a WebDAV server. Configuration of the WebDAV server must be done in the settings.
   - `File encryption`: File encryption provides two methods: 1) 7z compressed file encryption, to create an encrypted compressed file; 2) AES-256 combined with PBKDF2 derived key encryption, which can be decrypted with commonly used tools like OpenSSL, ensuring a high level of security and compatibility.
   - `File Snapshot`: Captures and exports a complete hierarchical file and directory structure of a hard disk drive as an HTML formatted snapshot document.

4. **Shortcut and Enable**
   - `Enable`: Whether to enable this task. When enabled and associated with an automation trigger, EasyTidy will automatically run this task.
   - `Shortcut`: Whether to create a shortcut on the desktop. When checked, a shortcut to the target folder will be created on the desktop with the task name.

### Set Automatic Execution Method

Configure automatic task processing and define triggers for automatic execution.

![automation](/images/auto.png)

1. **Trigger Method**
   - `File Change`: Automatically runs the associated task when a file is modified.
   - `On Startup`: Automatically runs the associated task when EasyTidy starts.
   - `Periodic Execution`: Automatically runs the associated task at the specified time interval.
   - `Scheduled Execution`: Executes the task based on a specified schedule or a CRON expression.

2. **Associate Tasks**
   - `Task Group`: Click the task group button to select tasks defined in Task Scheduling. All tasks under the same group name will be associated and use the same trigger method. Click "Save Configuration" to save the settings.
   - `Individual Configuration`: Check this option to configure individual tasks separately. The configuration method and content are the same as task group configuration.

## Running Logs

Running logs are used to view real-time logs generated during EasyTidy's operation. Only the first 100 logs are displayed for easy troubleshooting. For more logs, click the "Log Directory" button to open the log folder.

## Features

- Support for classification based on document content
- Real-time monitoring
- WebDAV automatic upload
- Regular expression support
- Log display functionality
- CRON expression support

## Acknowledgements

- [.NET](https://dotnet.microsoft.com/)
- [WinUI Gallery](https://github.com/microsoft/WinUI-Gallery) - Official component design reference
- [Windows Community Toolkit](https://github.com/CommunityToolkit/dotnet) - Localization, MVVM design, and useful community extension libraries
- [WinUIEx](https://github.com/dotMorten/WinUIEx) - Useful extension libraries
- [PowerToys](https://github.com/microsoft/PowerToys) - Design inspiration for the interface
