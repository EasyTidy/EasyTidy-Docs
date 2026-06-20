---
title: Task Management
description: Add, configure, and manage file processing tasks in EasyTidy.
---

This feature allows you to easily add and manage tasks for complex workflow orchestration. Through an intuitive interface, you can define detailed file processing rules and select specific processing methods.

- **Add Tasks**: Create new task entries with names, descriptions, and metadata.
- **Task Orchestration**: Drag-and-drop to arrange task execution order.
- **Define Processing Rules**: Set detailed rules including file type, path, size limits, etc.
- **Select Processing Methods**: Choose the most suitable method (move, copy, rename, etc.).
- **Associate Filters**: Apply advanced filter conditions for precise file targeting.

## Adding a Task

### Steps

1. **Click "Add Task"**: Click the "Add Task" button on the main interface.

2. **Fill in Task Information**:
   - **Task Name and Group Name**: Enter a name and group name for identification and management.

3. **Set File Processing Rules**:
   - **Processing Rules**: Define file extension suffixes, regular expressions, or specific character matches. Click the purple button for preset rules. Separate multiple rules with `;` or `|`. See the [Rules Reference](/guide/rules) for details.
   - **Additional Rules**: Click the blue funnel icon to select filter rules defined in [Advanced Rules](/guide/filter) and associate them with the task.

4. **Choose File Handling Method**:
   - **Move**: Transfer files from source to target folder, preserving structure.
   - **Copy**: Duplicate files to target folder, preserving structure.
   - **Rename**: Copy files to target folder with renamed filenames.
   - **Recycle Bin**: Move files to system Recycle Bin (recoverable).
   - **Delete**: Permanently delete files (use with caution).
   - **Extract**: Automatically decompress archive files.
   - **Compress**: Compress files to ZIP format.
   - **Upload to WebDAV**: Upload matching files to a configured WebDAV server.
   - **Hard Link**: Create hard links within the same file system.
   - **Symbolic Link**: Create symbolic links supporting cross-file-system linking.
   - **File Snapshot**: Capture folder hierarchy as HTML snapshots.
   - **File Encryption**: Encrypt files via 7z or AES-256 with PBKDF2.
   - **Run External Program**: Execute external programs or scripts.
   - **AI Summary**: Summarize file content and output as PDF.
   - **AI Classification**: Use natural language to classify and organize files.

5. **Specify Source and Target Folders**:
   - **Source Folder**: Select the folder containing files to process (defaults to Desktop).
   - **Target Folder**: Specify where processed files should go.

6. **Advanced Options**:
   - **Create Desktop Shortcut**: Optionally create a desktop shortcut for the task.

7. **Save and Apply**: Click "Save" to confirm the configuration.

## Task Priority

After adding tasks, all tasks have the same priority by default and execute in the order they were added. To customize priority, simply drag and drop tasks to reorder them.

## Task List

The task list interface displays all tasks and supports:

1. **Manual Execution**: Trigger a selected task immediately.
2. **Enable/Disable**: Toggle a task's active state.
3. **Edit Task**: Modify task name, rules, filters, processing method, etc.
4. **Delete Task**: Remove a task along with its configurations.

## Group Execution

Use the dropdown next to the "Add Task" button to filter by task group. Click "Execute Group" to run all tasks in the selected group at once.
