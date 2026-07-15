---
title: Organize Tasks
description: Create, preview, execute, and manage file organization tasks in EasyTidy Pro.
---

An **Organize Task** defines a repeatable file processing rule: **where to find files, which files to match, what action to perform, and where to put the result**. Once created, a task can be run manually or triggered by file changes, startup, periodic intervals, or CRON schedules in [Automation](/guide/automation/).

::::caution[Validate with test directories first]
Operations like move, rename, overwrite, delete, and decrypt directly modify files. When configuring for the first time, use a small number of test files and verify preview results before execution. Important files should have separate backups.
::::

<!-- Image requirements: Fully capture the "File Organization → Organize Tasks" page, including the top import/export/new task area, group selector, task table, and edit/delete/run buttons per row. Use a 16:9 landscape shot at least 1200 px wide; include 3–5 example tasks with test paths, without real usernames, phone numbers, or server addresses. -->
![Organize tasks page overview (image placeholder)](/images/en/task-page-overview-placeholder.png)

## Quick Start

When you only need a simple move or copy, start with Quick Create:

1. Go to **File Organization → Organize Tasks**.
2. Open the <span class="fluent-icon fluent-icon--chevron-down" aria-hidden="true"></span> **dropdown menu** to the right of <span class="fluent-icon fluent-icon--task-add" aria-hidden="true"></span> **New Task**, and select <span class="fluent-icon fluent-icon--flash" aria-hidden="true"></span> **Quick Create**.
3. Choose a source directory. You can pick **Downloads**, **Desktop**, or **Pictures** directly, or browse/drag in another folder.
4. Select the file types to organize; fill in a file matching pattern if you need a custom one.
5. Enter a task name, choose **Move** or **Copy**, then select a destination directory.
6. Click <span class="fluent-icon fluent-icon--eye" aria-hidden="true"></span> **Create & Preview**. The system saves the task and counts matching files — no files are modified during the preview phase.
7. After confirming the match count and operation, execute. Once completed, you can configure automatic execution as prompted.

<!-- Image requirements: Show the Quick Create dialog with its three complete sections: Select Source, Choose Result, and Confirm Task. Use Windows download directory aliases or test directories for the source, and a separate test directory for the destination; highlight the "Create & Preview" button. A vertical tall image or two stacked images is recommended, with clear text. -->
![Quick create task (image placeholder)](/images/en/task-quick-create-placeholder.png)

Quick Create only offers Move and Copy. For rename, compress, tag, deduplication, AI, encryption, cloud transfer and other capabilities, use <span class="fluent-icon fluent-icon--task-add" aria-hidden="true"></span> **Direct Create**.

## Full Task Creation

Open <span class="fluent-icon fluent-icon--task-add" aria-hidden="true"></span> **New Task → Direct Create** and configure in the order below.

### 1. Enter Name & Group

- **Task Name**: It is recommended to describe both the target and the action, e.g. "Move PDFs from Downloads."
- **Task Group**: Choose an existing group from the dropdown. New tasks default to the built-in **"Unassigned"** group — you do not need to create or manually enter a group name first.

To add, rename, or delete custom groups, return to the task list, open the group selector at the top, and click **Group Management**. Group names must be unique; if you create or rename a group to an existing name, the app will prompt you to change it.

Groups are used for filtering and batch execution; they do not imply dependencies between tasks. For branching, conditions, step chains, or failure strategies, use [Advanced Workflows](/guide/workflow/) instead.

### 2. Choose an Operation

Organize Tasks support the following operations:

| Category | Operation | Purpose |
|--- | --- | --- |
| Basic Organization | Move, Copy, Rename | Adjust file locations or names |
| Tags | Add Tag, Remove Tag | Manage file tags and colors |
| Compress & Convert | Compress, Extract, Format Conversion | Create archives, extract content, or convert file formats |
| Security | Encrypt, Decrypt | Protect or restore files with the chosen algorithm and parameters |
| Smart Processing | AI Classification, AI Summary, Duplicate File Organization | Generate classification plans or summaries with models, or identify duplicate files |
| Links & Transfer | File Snapshot, Hard Link, Symbolic Link, Cloud Transfer, Run External Program | Generate directory snapshots, create links, connect cloud nodes, or invoke programs/scripts |
| Cleanup | Move to Recycle Bin, Permanently Delete | Clean up unneeded files |
| Data Extraction | Extract Structured Data | Extract specified fields from file content and output structured results, e.g. Excel |

After selecting an operation, the editor displays the corresponding parameters. For example, Rename shows template settings, Compress shows format and compression parameters, Deduplication shows identification strategies and retention actions, and Cloud Transfer shows direction and cloud nodes. Some AI, visual recognition, tag color, or other advanced capabilities may display a Pro label — refer to the in‑app licensing prompts.

::::caution[Recycle Bin is not the same as Delete]
**Move to Recycle Bin** can usually be recovered from the Windows Recycle Bin; **Permanently Delete** cannot. Always preview and verify the source directory before running cleanup tasks.
::::

### 3. Configure File Matching Rules

Common patterns:

| Rule | What It Matches |
| --- | --- |
| `*` | All files |
| `*.pdf` | PDF files |
| `*Invoice*` | Files whose names contain "Invoice" |
| `*.jpg;*.png;*.webp` | JPG, PNG, or WebP images |
| `#` | Files not yet handled by a higher‑priority task |

Multiple basic rules can be separated with semicolons `;` or vertical bars `|`. For complex filename logic, check **Treat as Regular Expression**. To filter by size, time, attributes, or content, open <span class="fluent-icon fluent-icon--filter" aria-hidden="true"></span> **Filter Conditions**. See [Configuring Rules](/guide/rules/) and [Filter Conditions](/guide/filter/) for detailed syntax and examples.

::::note[File rules vs. folder rules]
Regular file rules and folder rules cannot be mixed in the same task. Folder rules include `**`, `##`, and full folder name matches starting with `=`. When the editor detects mixing, it retains one type and shows a prompt.
::::

The **Smart Rule Assistant** in the editor can generate rules from natural language. The rule editor may also offer visual templates, text labels, and deep semantic understanding. Before using these features, check model, component, and Pro license status, and verify actual match results in the preview.

<!-- Image requirements: Capture the upper half of the "New Task" dialog, showing task name, operation type, rule input, regex toggle, rule preset buttons, filter conditions, and "Smart Rule Assistant." Keep the operation dropdown expanded to show at least Basic Organization, Smart Processing, and Cleanup categories. Use a 4:3 landscape shot with test data. -->
![Task name, operation, and rules (image placeholder)](/images/en/task-editor-rules-placeholder.png)

### 4. Set Source & Destination Locations

- **Source Location**: The file or folder to scan. Click the <span class="fluent-icon fluent-icon--folder-open" aria-hidden="true"></span> **Folder** button to browse, or drag files/folders into the input field.
- **Multiple Source Locations**: Use the selector to add multiple locations; the app saves them separated by semicolons and scans each one.
- **Path Aliases**: Click the <span class="fluent-icon fluent-icon--database" aria-hidden="true"></span> **Path Alias** button next to the path input to use built‑in aliases like `%Downloads%` or `%Documents%`, or custom aliases, for easier rule sharing across devices.
- **Destination Location**: The output location for Move, Copy, Rename, Compress, and similar operations. For Delete, Recycle Bin, Tag, Format Conversion, Structured Extraction and others, the ordinary destination field is hidden based on their own parameters.

Whether subfolders are scanned depends on the **Subfolders** option in **Settings → General Settings**. If both source and destination are left empty, the editor will warn you. Do not rely on implicit behavior of empty paths — always explicitly choose the locations to process.

::::caution[Avoid source–destination loops]
During automatic execution, do not place the destination folder inside a monitored source folder. New files generated by copy, extract, summarize, or convert operations may re‑trigger the same task, causing repeated processing.
::::

### 5. Operation‑Specific Parameters

Parameters vary greatly between operations. The following are most likely to affect results:

- **Name conflict handling for Move/Copy**: Choose from Skip, Overwrite, Overwrite if Newer, Overwrite if Different Size, Append Number/Date, or use Git version control. The overwrite strategy affects whether a preview is forced during manual execution.
- **Rename**: Combine template components from the original filename, parent folder, counter, date, random string, or photo metadata. Verify extensions and counter results with a few files first.
- **Compress/Extract/Encrypt/Decrypt**: Check format, password, output location, and name‑conflict policy. Lost passwords may render data unrecoverable.
- **Duplicate File Organization**: Select an identification strategy first, then choose to Keep, Tag, Move, or Delete duplicates. The initial scan of large directories may take considerable time.
- **AI Classification**: No ordinary matching rules are required. At runtime, a classification plan is generated first, with a plan preview provided. The model provider may receive file information or content.
- **Cloud Transfer**: Use a local source location for uploads and a local destination location for retrievals. Complete the node configuration and test the connection in Integration Settings before running.
- **Run External Program**: Verify the executable, parameters, and working directory. Only run trusted programs or scripts.

### File Camouflage (Pro)

"File Camouflage" appends files to be processed to the end of an image, audio, video, or custom carrier file. The resulting carrier file remains openable in its original format. It is designed for concealed encapsulation and later restoration — it is **not** an encryption feature. Anyone who can read the binary contents of the file may still discover the appended data; sensitive content should be encrypted first.

After selecting **File Camouflage**, choose an operation:

- **Create Camouflage File**: Select an image, audio, video, or custom carrier. The carrier can be a single file or a directory. When using a directory, carriers are chosen for each processed file by random, filename, or file-size rules. Optionally enable "Delete original file after completion" and explicitly set the output location.
- **Extract Hidden Content**: Use an already-generated camouflage file as the source, and extract the appended original content to the target location. You may optionally delete the camouflage file after successful extraction.

::::caution[Keep the original files until verified]
Do not enable the delete option on first use. First create a camouflage file with test data, confirm that the carrier file opens normally and the hidden content can be fully extracted, then decide whether to delete the originals or the camouflage file. File camouflage is not a substitute for encryption or backup.
::::

### 6. Set Advanced Options & Save

Expand **Advanced Options** to adjust the group again and use the following settings:

- **Enable/Disable**: A disabled task remains in the list but does not participate in group execution or automatic runs.
- **Create Desktop Shortcut**: Create a desktop entry for applicable tasks. This option only appears for operations that require a destination location.
- **Mobile Source**: Start local network file reception and use the phone upload location as the task source. Confirm the device is on a trusted network before use.
- <span class="fluent-icon fluent-icon--eye" aria-hidden="true"></span> **Preview Current Task**: Scan and display the match count only, with prompts for unavailable source locations — no files are modified.

At minimum, fill in the task name, group, operation type, and matching rules before saving (AI Classification is the exception — its matching rules are handled by the system). After a normal task is saved, it defaults to manual‑only execution. The app will ask whether to go to **Automation** to add a trigger.

<!-- Image requirements: Capture the lower half of the "New Task" dialog, showing source location, destination location, path alias button, "Preview Current Task," and the expanded Advanced Options (group, enable, desktop shortcut). Use mutually exclusive test directories for source and destination; two vertically stacked images are acceptable. -->
![Source, destination, and advanced options (image placeholder)](/images/en/task-editor-paths-advanced-placeholder.png)

## Preview & Manual Execution

Each row in the task list has <span class="fluent-icon fluent-icon--edit" aria-hidden="true"></span> **Edit**, <span class="fluent-icon fluent-icon--delete" aria-hidden="true"></span> **Delete**, and <span class="fluent-icon fluent-icon--play" aria-hidden="true"></span> **Run** buttons on the right. Double‑clicking a task row also runs it, but double‑clicking the actions column or the enable checkbox does not trigger execution.

When running manually, EasyTidy Pro decides whether to preview first based on the operation's risk level:

- Move, Rename, Delete, and Copy that may overwrite destination files default to a dry run that only counts matches without modifying files.
- Add Tag, Remove Tag, AI Summary, File Snapshot, Hard Link, Symbolic Link, and Copy that will not overwrite files may execute directly.
- AI Classification generates a classification plan first and lets you confirm it before execution.

The preview confirmation dialog shows the match count and operation type. After checking **Do not show dangerous operation preview again**, subsequent dangerous operations will execute directly. To restore previews, adjust the relevant preference in General Settings → File Processing.

After execution, the number of processed items is displayed. If the current operation supports undo, the completion window provides <span class="fluent-icon fluent-icon--undo" aria-hidden="true"></span> **Undo Last Operation**. You can also use <span class="fluent-icon fluent-icon--undo" aria-hidden="true"></span> **Undo** in the task list's right‑click menu.

- **Non‑Pro users**: Temporary undo is supported. Undo records are stored in memory and are available during the same app session, within **1 hour** after the operation completes. Do not rely on these records for recovery beyond 1 hour or after fully exiting EasyTidy Pro.
- **Pro users**: In addition to in‑memory records during a session, persistent undo history can be loaded from the database, with configurable retention days.

Not all operations can be undone. If a file has been moved, renamed, or deleted again by another program, undo may also fail. Undo is not a substitute for backup.

<!-- Image requirements: A side‑by‑side composite. Left side shows the dangerous‑operation preview confirmation dialog with match count, operation name, "Do not show dangerous operation preview again," and the execute button clearly visible. Right side shows the execution completion window with "Undo Last Operation." Use 3–5 fictitious files without real paths. -->
![Task preview and execution result (image placeholder)](/images/en/task-preview-result-placeholder.png)

## Managing the Task List

The task table provides a checkbox at the beginning of each row and displays task name, source location, destination location, shortcut creation status, enabled state, and action buttons.

- <span class="fluent-icon fluent-icon--checkbox" aria-hidden="true"></span> **Enable/Disable**: Click the checkbox in the **Enabled** column directly.
- <span class="fluent-icon fluent-icon--edit" aria-hidden="true"></span> **Edit**: Modify rules, paths, and operation parameters. After saving, associated file monitors refresh automatically — a restart is usually not needed.
- <span class="fluent-icon fluent-icon--delete" aria-hidden="true"></span> **Delete**: Single deletion requires confirmation. Deleting a task also removes its file‑monitoring configuration.
- <span class="fluent-icon fluent-icon--copy" aria-hidden="true"></span> **Duplicate**: Select a task, right‑click and choose **Duplicate** to quickly create a timestamped copy.
- **Batch Move or Delete**: Check the selection boxes at the start of each row, then use the batch toolbar that appears at the top of the list to move tasks to another group, or delete all selected tasks at once.
- <span class="fluent-icon fluent-icon--share" aria-hidden="true"></span> **Share Rule**: Select a task, right‑click, and export a `.etrule` file.
- <span class="fluent-icon fluent-icon--sync" aria-hidden="true"></span> **Refresh**: Reload the task list from the database.

### Adjusting Execution Order

Drag task rows to reorder them; the new order is saved immediately. Tasks use the saved order when executed as a group. This is sequential ordering only — task dependencies are not created.

New tasks are added to the end of the current list. Execution order follows the saved drag-sorted order.

If multiple tasks match the same file, order directly affects the outcome. For example, after the first task moves a file, subsequent tasks may no longer find it. It is recommended to make rules mutually exclusive, or verify the entire flow with Copy first.

### Using Task Groups

The group selector at the top of the page allows you to:

- Filter tasks by the current group.
- Click <span class="fluent-icon fluent-icon--play" aria-hidden="true"></span> **Execute Group** to run all enabled tasks in that group in order.
- Set a group as the default display group.
- Click **Group Management** to add, rename, or delete custom groups in a single dialog.

**"All Groups"** and **"Unassigned"** are built-in items that are always present and cannot be renamed or deleted. **"All Groups"** is used to view all tasks. New tasks that are not assigned a custom group go into **"Unassigned"**.

::::note[Deleting a group does not delete its tasks]
When a custom group is deleted, tasks within it are automatically moved to **"Unassigned"**. Task definitions and their configurations remain intact. Batch task deletion is a separate operation — always double-check the selected count in the confirmation dialog.
::::

Group execution runs normal tasks first, then AI Classification tasks that require plan previews, one by one. Verify each task individually before batch execution, especially whether the output of an earlier task becomes the input of a later one.

<!-- Image requirements: Show the task list with multi‑select and the right‑click menu, where Refresh, Duplicate, Share Rule, Delete, and Undo should be visible. Use annotation arrows to point out the row drag‑and‑drop reordering area and the top "Execute Group" button. A side‑by‑side image is acceptable; task names and paths should use test data. -->
![Task list batch operations and group execution (image placeholder)](/images/en/task-list-management-placeholder.png)

## Import, Export & Sharing

The top of the page provides two data‑exchange approaches for different purposes.

### Excel Batch Maintenance

The export menu includes:

- <span class="fluent-icon fluent-icon--document-table" aria-hidden="true"></span> **Export Template**: Generate a fillable `.xlsx` template, ideal for creating multiple tasks at once.
- <span class="fluent-icon fluent-icon--export" aria-hidden="true"></span> **Export Tasks**: Export tasks currently in the list as `.xlsx`, which can be modified and re‑imported.
- <span class="fluent-icon fluent-icon--import" aria-hidden="true"></span> **Import**: Read `.xlsx`. Valid rows in a template file create new tasks. Rows exported by **Export Tasks** that retain their task IDs update the corresponding tasks; rows without IDs create new ones.

Excel import/export depends on the **Document Content Extraction** component. If the component is not installed, the app will first ask whether to download and enable it. When import errors occur on some rows, the app generates an error file. Correct the invalid rows by line number and import again — do not ignore invalid paths or operation parameters.

### `.etrule` Single Rule Sharing

Select a task, open the export menu or right‑click menu, and choose <span class="fluent-icon fluent-icon--share" aria-hidden="true"></span> **Share Rule** to generate a `.etrule` file. When importing a `.etrule`, the app only accepts **Organize Task** type share packages. Absolute paths are converted to path aliases wherever possible; custom aliases that cannot be resolved will require local re‑specification.

`.etrule` is suitable for sharing a single task definition; Excel is better for batch maintenance. Neither creates automation triggers for you. After importing, always check paths, rules, operation parameters, and license status, then preview manually.

::::caution[Only import trusted files]
Shared files may contain local paths, network addresses, external program parameters, or cloud configuration references. Importing tasks from unknown sources can result in files being moved, overwritten, uploaded, or deleted.
::::

## Configuring Auto Run

A newly created or imported task does not execute automatically just because it is **enabled**. To set up automatic organization:

1. First preview and successfully execute the task once manually.
2. After saving, choose to go to settings in the prompt dialog, or navigate to **Automation** from the main menu.
3. Select the task and add a File Change, Startup, Periodic, CRON Schedule, or Shutdown trigger.
4. Save and verify using **Preview Results**.

When the main window is closed and minimized to the tray, automatic tasks can still work. After fully exiting EasyTidy Pro from the tray, file monitoring and scheduled scheduling will not continue. See [Automation Configuration](/guide/automation/) for full details.

## FAQ

### The Save button does not respond

Check that the task name, group, operation type, and file matching rules are filled in, and watch for validation messages below the input fields. A normal task cannot be saved without matching rules; AI Classification automatically handles matching rules.

### Preview shows no matching files

Check whether the source location exists, whether subfolders need to be scanned, whether the extension includes a dot, and whether regex mode was accidentally enabled. When both basic rules and advanced filters are used together, overly strict conditions may also yield no results.

### The task is enabled but does not run automatically

**Enabled** only means the task is allowed to execute; it does not mean a trigger has been configured. Go to **Automation**, check the task card and trigger type, and confirm that the app is still running in the tray and that all tasks have not been paused.

### Group execution skips certain tasks

Group execution only runs enabled tasks within that group. Check whether the task is disabled, assigned to a different group, or whether an earlier task has already moved or deleted files that a later task was supposed to process.

### Duplicate filenames appear after copy or move

Edit the task and check the name‑conflict handling strategy. For initial verification, choose **Skip** or automatic numbering. Only consider overwrite strategies after confirming the source and destination are correct.

### Can I recover files after execution?

If the completion window shows **Undo Last Operation**, you can try to undo immediately. Recycle Bin operations can also be recovered from the Windows Recycle Bin. Non‑Pro users' temporary undo is only available during the same app session, with records retained for at most 1 hour. Pro users can use persistent undo history. Permanent deletion, external programs, cloud operations, and files whose state has already changed again provide no undo guarantee — important data must be backed up separately.

For more execution records and error details, see [Logs](/guide/logs/).
