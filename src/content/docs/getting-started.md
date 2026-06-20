---
title: Quick Start
description: Get started with EasyTidy - a simple file automatic classification and organization tool.
---

EasyTidy is a simple file automatic classification and organization tool that allows you to easily create file workflows. It is built using WinUI 3 and .NET 8.

## Quick Start

It is recommended to download the latest version from [GitHub](https://github.com/SaboZhang/EasyTidy/releases) or [cloud drive](/download). Of course, if you prefer to modify and compile the source code yourself, that option is also available.

**Requirements**

- Supported Operating Systems:
  - Windows 11 (all versions)
  - Windows 10 v2004 (19041) or higher
- System Architecture:
  - Currently supports x64 and Arm64 (theoretical support, no device testing).
- The installer requires the following runtime:
  - [.NET Runtime 8.0](https://dotnet.microsoft.com/download/dotnet/8.0) Desktop Runtime

**After Downloading**

Use any decompression tool to extract the files, then go to the `EasyTidy` directory and run `EasyTidy.exe`, or run `run.bat` to create a desktop shortcut and automatically launch the application.

Upon first launch, the `EasyTidy` tray icon will be hidden by the system. It is recommended to manually drag the `EasyTidy` icon to the tray area.

![pin_logo](/images/logo_pin.gif)

### Set Filter Rules

Filter rules allow further refinement of files beyond just moving them, providing more precise selection. These rules are optional, depending on your needs. You can use regular expressions to match file names, content, and other attributes.

- Click the "Add Filter" button
- Set the filter name, which will be used for associating with tasks in [Task Management](/guide/task)
- Check the attributes you want to filter (at least one attribute is required)
- Filterable attributes include: file name, file path, file size, creation time, modification time, access time, visibility, read-only, system file, etc. For more details, see the [Advanced Rules](/guide/filter) section.

### Add Task

Create a relationship between the files or folders (rules, including associated filters) and the operations (processing methods).

### Set Processing Rules

1. **Define File or Folder Rules**
   - Click the "Add Task" button on the Task Management page
   - Enter the task name and task group name, try to ensure task names are unique for easier association with tasks in [Automation](/guide/automation)
   - Click the purple button next to the "Processing Rules" field, and choose a predefined system rule or manually enter a file rule. Separate multiple rules using `|` or `;`. For example, a rule for processing compressed files: `*.7z;*.zip;*.rar`

2. **Associate Advanced Rules (Optional)**
   - Click the "Funnel" button next to the processing rule field to choose a rule defined in the filter page. Once selected, the rule will be associated with the task.

3. **Choose File Handling Method**
   - `Move`: Moves files from the source folder to the target folder without changing file structure or names.
   - `Copy`: Copies files from the source folder to the target folder without changing file structure or names.
   - `Rename`: Copies files from the source folder to the target folder, but renames them according to the specified rules.
   - `Recycle`: Deletes files but keeps them in the system's Recycle Bin, recoverable unless the Recycle Bin has been emptied.
   - `Delete`: Deletes files permanently and cannot be recovered (use this option with caution).
   - `Extract`: Automatically extracts compressed files.
   - `Compress`: Automatically compresses files into a zip file.
   - `Upload to WebDAV`: Automatically uploads matching files to a configured WebDAV server.
   - `Hard Link`: Creates a new link pointing to the original file within the same file system.
   - `Symbolic Link`: Creates a symbolic link pointing to the original file or directory.
   - `File Snapshot`: Captures and exports folder hierarchy as an HTML formatted snapshot.
   - `File Encryption`: Encrypts files via 7z compression or AES-256 with PBKDF2.
   - `Run External Program`: Executes external programs or scripts.
   - `AI Summary`: Uses AI to summarize file content and outputs as PDF.
   - `AI Classification`: Uses natural language to specify classification methods and organizes files automatically.

4. **Shortcut and Enable**
   - `Enable`: Whether to enable this task.
   - `Shortcut`: Whether to create a desktop shortcut for the target folder.

### Set Automatic Execution Method

Configure automatic task processing and define triggers for automatic execution.

1. **Trigger Method**
   - `File Change`: Runs the associated task when a file is modified.
   - `On Startup`: Runs the associated task when EasyTidy starts.
   - `Periodic Execution`: Runs the associated task at the specified time interval.
   - `Scheduled Execution`: Executes based on a specified schedule or CRON expression.

2. **Associate Tasks**
   - `Task Group`: All tasks under the same group name will be associated with the same trigger method.
   - `Individual Configuration`: Configure individual tasks separately.

## Running Logs

Running logs display the first 100 real-time log entries for easy troubleshooting. Click the "Log Directory" button to open the log folder for more logs.

## Features

- Support for classification based on document content
- Real-time monitoring
- WebDAV automatic upload
- Regular expression support
- Real-time log display
- CRON expression support

## Acknowledgements

- [.NET](https://dotnet.microsoft.com/)
- [WinUI Gallery](https://github.com/microsoft/WinUI-Gallery) - Official component design reference
- [Windows Community Toolkit](https://github.com/CommunityToolkit/dotnet) - Localization, MVVM design, and useful community extension libraries
- [WinUIEx](https://github.com/dotMorten/WinUIEx) - Useful extension libraries
- [PowerToys](https://github.com/microsoft/PowerToys) - Design inspiration for the interface
