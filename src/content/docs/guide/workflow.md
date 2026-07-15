---
title: Advanced Workflows
description: Build advanced workflows using multiple sources, condition combinations, multiple file operations, and post-organize tasks.
---

An **Advanced Workflow** saves multiple sources, conditions, and file operations within a single flow, and can continue running existing ordinary organize tasks after the main operations complete. It is ideal for scenarios where you need to apply multiple operations after unified filtering, or combine several existing tasks together.

The current editor uses a **sectioned form**, not a free-form node canvas. A workflow is primarily composed of:

```text
Source Paths → Condition Groups → File Operations → Post-Organize Tasks
```

::::caution[Preview before running]
Advanced workflows can include move, overwrite, delete, encrypt, external programs, and cloud transfer operations. Always configure with a small set of files in a test directory, verify the match scope with preview, then run or save the automatic schedule.
::::

<!-- Image: Show the full "File Organization → Advanced Workflows" list page, including the new workflow button, group selector with "Group Management" entry, execute group button, and the workflow table below with name, monitoring status, run status, and edit/delete/run buttons. Include 3–4 fictitious workflows in at least two groups. Use a 16:9 landscape shot at 1200 px minimum width, no real paths. -->
![Advanced workflow list page overview (image placeholder)](/images/en/workflow-page-overview-placeholder.png)

## Quick Workflow Creation

On first use, start from a preset template:

1. Go to **File Organization → Advanced Workflows**.
2. Click the **New Workflow** icon button at the top of the page to open the separate workflow editor window.
3. Expand **Default Rules** and choose a template such as "Image Archive", "PDF Collection", or "Invoice Archive".
4. Replace `%USERPROFILE%` paths in the template with a test directory, and verify the target directory.
5. Click **Preview Results** to see the file list and summary on the right.
6. Once confirmed, click <span class="fluent-icon fluent-icon--save" aria-hidden="true"></span> **Save**, or **Save & Close**.

Selecting a template first resets the current editor, then fills in the template's source, conditions, and operations. If you have already manually configured content, save or export it first to avoid being overwritten by the template.

<!-- Image: Show the two-column layout of the workflow editor. The left column shows expanded "Default Rules" with at least four template cards; the right column shows the pre-preview guidance state. The top menu should include Save, Save & Close, Preview Results, Run Current Task, Stop, Reset, AI Generate Rules, Share, and Import. Use a 16:9 landscape shot. -->
![Workflow editor with preset templates (image placeholder)](/images/en/workflow-editor-overview-placeholder.png)

## Reusing Existing Organize Tasks

The **History Tasks** list at the top of the editor displays existing ordinary [Organize Tasks](/guide/task/). Selecting a task loads its name, source, file rules, filter conditions, operation type, and destination path into the workflow body.

::::caution[Selecting a history task replaces the body configuration]
Reusing an ordinary task resets the current source, conditions, and body operations, but does not clear already-selected post-organize tasks. To keep the current configuration, save the workflow or export a `.etrule` file first.
::::

After reuse, you can continue adding sources, conditions, and operations. It is therefore better suited to using a mature ordinary task as a starting point rather than referencing the task itself. If the original ordinary task is later modified, those changes do not automatically sync to the saved workflow body.

## Entering the Workflow Name

The **Description** input field in the editor doubles as the workflow name:

- After saving, the "Task Name" column in the workflow list displays this content.
- The status bar also uses this content to identify the current workflow.
- This field cannot be empty, or the workflow cannot be saved.

Use a name that describes both the target and result, e.g. "Downloads Invoice Archive & Backup".

## Configuring Source Paths

The "Monitor Folders" area requires at least one valid source. Each source item provides:

- A path input field where you can type or drag in file/folder paths;
- <span class="fluent-icon fluent-icon--folder-open" aria-hidden="true"></span> **Select Folder**;
- <span class="fluent-icon fluent-icon--database" aria-hidden="true"></span> **Path Alias**, supporting built-in aliases like `%Downloads%` and `%USERPROFILE%`;
- A QR code entry for displaying the LAN upload address;
- A settings button to expand trigger method and subdirectory options;
- <span class="fluent-icon fluent-icon--dismiss" aria-hidden="true"></span> **Remove Source**.

Click <span class="fluent-icon fluent-icon--add" aria-hidden="true"></span> **Add** next to the section title to add multiple sources.

### Source Trigger Methods

Expanding the source settings reveals three modes:

| UI Mode | Saved Configuration | Current Recommendation |
|---|---|---|
| **Trigger on file change** | Saves create, delete, modify, rename events and a 1–3600s delay | Verify actual triggering in a test directory; do not rely solely on the "Monitoring" status in the list |
| **Periodic polling** | Converts minutes or hours to interval seconds | Current save does not create a separate periodic schedule for this mode; not recommended as the primary automatic execution method |
| **Scheduled (CRON)** | Saves a Quartz-compatible six-field CRON expression | Creates a workflow schedule task on save; currently the clearest automatic execution method |

For stable automatic execution, prefer **Scheduled (CRON)**, and observe one actual run after saving. Pausing all monitoring in the tray pauses both file monitoring and scheduled tasks; fully exiting EasyTidy Pro also stops them.

"Include subdirectories" determines whether scanning descends into subdirectories. "Resolve time-based aliases" sets the resolution time for date-based path aliases; ordinary fixed paths usually do not need to be changed.

### QR Code Upload Entry

Clicking the QR code button expands the LAN upload area, showing the access address, QR code, and startup mode. Other devices can scan it to upload files to the current source directory.

- **On-demand**: Start the receiving service only when needed.
- **Start immediately**: Prepare to receive as soon as expanded or configured.

Only use in a trusted LAN, and confirm that the source directory will not be automatically deleted, transferred out, or overwritten by dangerous workflows.

<!-- Image: Show a source item fully expanded. All three modes "Trigger on file change, Periodic polling, Scheduled (CRON)" should be visible, with CRON currently selected and its designer shown. The right side should have the QR code upload area alongside it, using test addresses and test directories. Annotate "CRON Recommended". -->
![Source paths, trigger modes, and QR code upload (image placeholder)](/images/en/workflow-sources-triggers-placeholder.png)

## Setting Execution Order

"Execution Order" offers **Sequential** and **Parallel**:

- **Sequential**: Saved as serial mode; steps are configured with "Continue on success" for the previous step.
- **Parallel**: Saved as parallel mode; steps are configured to always execute.

::::note[Execution boundaries in the current version]
The current file operation executor still submits operations one by one based on their generated mapping, so "Parallel" cannot be treated as a strict concurrency guarantee. When operations involve move, rename, delete, or multiple steps processing the same batch of files, choose Sequential and verify with preview and a test directory.
::::

## Adding Conditions

The root condition group offers:

| Option | Behavior |
|---|---|
| **All files** | Ignore condition items; match all items in the source with `*` |
| **Match any condition** | Any condition in the current group must be true |
| **Match all conditions** | All conditions in the current group must be true |

Click <span class="fluent-icon fluent-icon--add" aria-hidden="true"></span> **Add Condition** to create condition items. Click **Add Condition Group** to nest a group of "All" or "Any" judgments. The <span class="fluent-icon fluent-icon--delete" aria-hidden="true"></span> **Delete** button on the right of each condition or group removes only that item.

### Available Condition Fields

| Category | Fields |
|---|---|
| Name & Type | File name, Extension, File type, True file type, Folder name |
| Size & Time | Size, Modification time, Creation time, Access time |
| Content & Tags | File content, Tag properties |
| System Properties | File attributes |
| Image Analysis | Visual features |

Plain text fields support "is, is not, contains, does not contain, matches regex, is empty" and more. Size and time use greater than, less than, equal to, and range comparisons. File content can match by containing text, any keyword, all keywords, exact match, or regex, with case sensitivity and keyword order options.

- **True file type** depends on the Magika component; a download entry is shown in the condition item if not installed.
- **File content** depends on the Document Content Extraction component; it can be downloaded in the condition item if not installed.
- **Visual features** support automatic clustering, reference samples, and text labels. Reference sample and text label modes require Pro.
- **Tag properties** match file tags already saved in EasyTidy Pro.

Condition groups apply to all body operations, not as independent conditions for a single step. If different operations need different filter scopes, split into multiple workflows or use post-organize ordinary tasks.

<!-- Image: Show a root condition group set to "Match all conditions" with three conditions: Extension is pdf, Size is greater than 5 MB, Tag property contains "To Archive"; also nest a sub-group set to "Match any condition" with filename keyword conditions. All Add Condition, Add Condition Group, and Delete icons should be visible. Use a vertical tall image. -->
![Conditions and nested condition groups (image placeholder)](/images/en/workflow-conditions-placeholder.png)

## Adding Body Operations

The "Matched Files or Folders" area configures body operations. Click <span class="fluent-icon fluent-icon--add" aria-hidden="true"></span> **Add** next to the title to add operation items. Each item includes operation type, target path, specific parameters, and failure strategy.

Available operations are largely the same as ordinary organize tasks:

| Category | Operations |
|---|---|
| Basic Organization | Move, Copy, Rename, Add Tag, Remove Tag |
| Compress & Convert | Compress, Extract, Format Conversion, Extract Structured Data |
| Security | Encrypt, Decrypt, File Camouflage (Pro) |
| Smart Processing | AI Classification, AI Summary, Duplicate File Organization |
| Links & Transfer | File Snapshot, Hard Link, Symbolic Link, Cloud Transfer, Run External Program |
| Cleanup | Move to Recycle Bin, Permanently Delete |

Add Tag, Remove Tag, Format Conversion, and Extract Structured Data do not show an ordinary destination path. Cloud upload also does not show a local destination path. Other operations require a destination path; the target field supports folder selection, drag-and-drop, and path aliases. The current workflow validation may still require some operations that do not produce ordinary output to fill in a destination path — follow the editor prompts.

Operation items are saved in top-to-bottom creation order. The current UI does not support drag reordering of body operations; to adjust the order, delete and re-add in the desired sequence.

After selecting **File Camouflage**, you can switch between "Create Camouflage File" and "Extract Hidden Content". When creating, you can use a single image, audio, video, or custom file as the carrier, or choose a carrier directory with random, filename, or file-size rules for selecting carriers. When extracting, original content is restored from the camouflage file. Both creation and extraction offer an option to delete the source after completion — keep this disabled for the first configuration, and verify output with preview and test files. File camouflage changes only the encapsulation format and is not equivalent to encryption.

### Failure Strategy

At the bottom of each operation item you can choose:

- **Continue to next task**: Log the failure and continue with subsequent mappings.
- **Stop all tasks**: Terminate the body workflow after the current step fails.
- **Ignore error**: Lower the log level for this error and continue.
- **Retry current task**: Retry the current file operation per the retry policy; continue with subsequent mappings after retries are exhausted.

Failure strategies apply to body operations. Whether post-organize tasks continue after failure is determined by the independent toggle in the post-task area.

<!-- Image: Show three body operation items: Move to a test archive directory, Add "Archived" tag, Create file snapshot. At least one with specific parameters should be expanded, and all four failure strategies at the bottom of each item should be clearly visible. All destination paths should use test directories. -->
![Body operations and failure strategies (image placeholder)](/images/en/workflow-operations-placeholder.png)

## Understanding Source-to-Operation Auto-Mapping

Advanced workflows do not automatically pass "Step 1's output" as "Step 2's input". At execution time, path mappings are established based on the number of sources and configured operations:

| Sources | Operations | Actual Mapping |
|---|---|---|
| 1 | 1 | One source executes one operation |
| Multiple | 1 | Each source executes the first operation |
| 1 | Multiple | The single source executes each operation |
| Multiple (equal count) | Multiple (equal count) | One-to-one pairing by UI order |
| Multiple (different counts) | Multiple (different counts) | Each source executes each operation |

For example, with two sources and two operations, the default is "Source 1 → Operation 1, Source 2 → Operation 2" — not both sources executing both operations. Many-to-many mapping only occurs when the counts differ.

::::caution[Body operations are not output relays]
If a second step must process files generated by the first step, turn the second step into an ordinary organize task whose source points to the first step's output directory, then select it in "Post-Organize Tasks". Alternatively, split into two independent workflows. Do not assume paths are automatically forwarded just because of the body operation display order.
::::

## Configuring Post-Organize Tasks

"Post-Organize Tasks" run existing ordinary organize tasks in sequence after all body operations complete.

1. Use the search box to filter by task name, group, or operation type.
2. Check the tasks you want to run; selected tasks move to the front of the list.
3. Drag the sort handles on the right between selected tasks to adjust execution order.
4. Optionally check **Continue subsequent tasks when a post task fails**.

When the "continue" option is unchecked, a failed post task stops subsequent tasks and causes the workflow to report failure. When checked, remaining post tasks continue to run, with failures summarized at the end.

Post tasks are saved by ordinary task ID. If the corresponding ordinary task is later deleted, the editor displays an unavailable record like `Task #ID`, and execution may fail at runtime — remove or reselect it promptly.

<!-- Image: Expand the "Post-Organize Tasks" area with a search keyword entered, three ordinary tasks checked and sorted as "Archive → Tag → Backup", with sort handles visible on the right. Also show the "Continue on failure" checkbox. -->
![Post-organize task selection and sorting (image placeholder)](/images/en/workflow-post-tasks-placeholder.png)

## Preview, Run & Stop

After clicking **Preview Results** at the top, the right side provides two views:

- **File List**: Shows file name, type, size, modification time, and target path.
- **Summary**: Shows match count, operation type count, total size, and match distribution by operation.

Preview does not modify files. The list displays up to the first **500** matching records, but the summary total continues to count more results.

::::note[Match counts may exceed actual file counts]
Preview counts by "source × operation". When one file matches three operations, the summary may count three operation matches rather than one unique file. Some operations that do not use an ordinary destination path may not appear in the current preview distribution — judge by combining conditions with actual testing.
::::

After modifying source paths, destination paths, operation types, or conditions, old previews become invalid. You must re-preview before clicking <span class="fluent-icon fluent-icon--play" aria-hidden="true"></span> **Run Current Task**; the current editor content does not need to be saved first to run.

During execution, you can click **Stop**. The stop request takes effect when the current operation checks its cancellation state; ongoing large file compression, external programs, or network operations may not end immediately.

<!-- Image: Composite screenshot of the right preview area. The left tab shows 5–8 fictitious files with target paths; the right summary shows match count, operation type count, total size, and operation distribution. The "Refresh Preview" button should be visible at the top. All paths use test directories. -->
![Workflow preview file list and summary (image placeholder)](/images/en/workflow-preview-placeholder.png)

## Save, Reset & Share

The top menu provides:

- <span class="fluent-icon fluent-icon--save" aria-hidden="true"></span> **Save**: Save and stay in the editor.
- <span class="fluent-icon fluent-icon--save" aria-hidden="true"></span> **Save & Close**: Save and return to the main window.
- <span class="fluent-icon fluent-icon--reset" aria-hidden="true"></span> **Reset Current Workflow**: Clear the current editing state and restore one empty source and one empty operation item.
- <span class="fluent-icon fluent-icon--share" aria-hidden="true"></span> **Share Workflow**: Export a `.etrule` file.
- <span class="fluent-icon fluent-icon--import" aria-hidden="true"></span> **Import Workflow**: Only accepts `.etrule` share packages containing an advanced workflow, and creates a new workflow.
- **AI Generate Rules**: Fill in source, conditions, and operations from natural language. This is a Pro feature; after generation, manually verify paths and dangerous operations.

Saving requires at minimum a name, one valid source, and one configured operation. Tags must be filled in when adding tags; most operations require a destination path. A security confirmation is shown when system directories are involved.

Import and sharing use path aliases wherever possible, but do not verify directories, cloud nodes, components, AI models, or external programs on the target machine. Only import rules from trusted sources.

## Managing the Workflow List

Each row in the workflow list provides <span class="fluent-icon fluent-icon--edit" aria-hidden="true"></span> **Edit**, <span class="fluent-icon fluent-icon--delete" aria-hidden="true"></span> **Delete**, and <span class="fluent-icon fluent-icon--play" aria-hidden="true"></span> **Run**.

The status column uses icons and colors to indicate Idle, Running, Error, or Disabled. The monitoring status column summarizes the source count, number of sources marked as monitored, subdirectory settings, and delay information — this text is a summary of the saved configuration and does not guarantee that the corresponding background trigger is successfully running.

### Group Management

- Open the group selector at the top and click **Group Management** to add, rename, or delete custom groups in a dialog.
- Group names must be unique; creating or renaming to an existing name prompts you to change it.
- **"All Groups"** and **"Unassigned"** are fixed built-in items that cannot be renamed or deleted. New workflows default to **"Unassigned"**.
- When a custom group is deleted, workflows within it are moved to **"Unassigned"** — the workflows themselves are not deleted.
- <span class="fluent-icon fluent-icon--play" aria-hidden="true"></span> **Execute Group** requires selecting a specific group first; it cannot be performed directly on "All Groups".

### Batch Operations

After checking multiple workflows, the batch toolbar provides:

- <span class="fluent-icon fluent-icon--play" aria-hidden="true"></span> **Run Now**;
- <span class="fluent-icon fluent-icon--checkmark" aria-hidden="true"></span> **Enable**;
- **Move to Group**;
- <span class="fluent-icon fluent-icon--delete" aria-hidden="true"></span> **Delete**.

Batch runs and group runs execute selected workflows sequentially in list order.

New workflows are added to the end of the list. The workflow list does not display database IDs; identify workflows by name and group instead.

<!-- Image: Show the workflow list with multiple items selected and the batch toolbar. At least three workflows should be selected, with the "Move to Group" menu expanded. The specific group at the top and the "Execute Group" button should also be visible. Annotate that deleting a group moves workflows, not deletes them. -->
![Workflow group and batch operations (image placeholder)](/images/en/workflow-list-management-placeholder.png)

## Free Tier Quotas & Pro Features

The current workflow policy:

- The free tier provides **10 successful save quotas**; both creating new and editing existing workflows count.
- The free tier provides **10 execution quotas**; running the current workflow, running from the list, batch running, or executing a group all consume execution quotas.
- Batch runs or executing a group count as one command toward the quota, not per workflow within it.
- Pro users' workflow saves and executions are not subject to these free tier limits.
- AI Generate Rules, visual sample/text label classification, deep semantic understanding, and other features have their own separate Pro limitations.

Preview, opening the editor, viewing the list, group management, and editing configurations do not consume save or execution quotas; only successful saves or permission-checked executions are counted.

## FAQ

### "Preview first" when clicking Run Current Task

This is a normal safety restriction. Click **Preview Results**, wait for the preview to complete, then run. Modifying source, destination, operations, or conditions invalidates the preview and requires re-previewing.

### Configured two sources and two operations, but not all ran

When the source count equals the operation count, sources and operations are paired one-to-one by order. To have each source execute each operation, split the workflow or reorganize the sources and operations, and verify the mapping with preview.

### The second operation did not process the first operation's output

Body operations share the workflow source and do not automatically relay the previous step's destination directory. Turn the next step into an ordinary organize task with the first step's output directory as its source, then add it as a post-organize task.

### Preview count is higher than the file count

When the same file matches multiple operations, each "file × operation" combination counts toward the total. Check the operation distribution and file list to determine if it is duplicate counting.

### Configuration disappeared after selecting a history task

History tasks and preset templates both replace the current body configuration. Unsaved content cannot be automatically recovered; reconfigure or import from a previously exported `.etrule`.

### File change or periodic polling did not auto-execute

The current save logic creates explicit schedule tasks for CRON sources. File change and periodic polling configurations should not be treated directly as stable established schedules. Switch to CRON, keep the app running in the tray after saving, and check actual trigger records in [Logs](/guide/logs/).

### Post task shows `Task #Number`

The original ordinary organize task may have been deleted. Deselect that record and reselect from the currently available task list. Otherwise, execution may fail when reaching that post task.

### "Missing target path" prompt when saving

Check each body operation. Add Tag, Remove Tag, Format Conversion, Structured Extraction, and Cloud Upload typically do not show an ordinary destination path; other operations should have a destination path filled in. The current version may still apply unified path validation to some operations without ordinary output — follow the UI prompts to add a test path and preview.

For ordinary single-step organization, see [Organize Tasks](/guide/task/). Condition field meanings for size, time, attributes, and content can be understood alongside [Filter Conditions](/guide/filter/). Execution errors can be viewed in [Logs](/guide/logs/).
