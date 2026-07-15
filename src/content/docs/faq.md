---
title: FAQ
description: Frequently asked questions about EasyTidy Pro installation, configuration, rules, automation, data security, and troubleshooting.
---

This page covers common questions when using EasyTidy Pro. If you're using it for the first time, we recommend starting with [Getting Started](/getting-started/). For installation, portable mode, and uninstall instructions, see the [Installation Guide](/install/).

## Installation & Startup

### Which systems does EasyTidy Pro support?

EasyTidy Pro supports 64-bit Windows 11, and Windows 10 v2004 (build 19041) or later. Current releases target the x64 architecture.

The standard installer requires .NET 10 Desktop Runtime and ASP.NET Core Runtime 10 — the setup wizard will guide you if they are missing. Self-contained installers and portable packages bundle the runtime. See the [Download page](/download/) for help choosing between them.

### Which package should I choose: standard installer, self-contained installer, or portable?

- **Standard installer**: Best for most users. Smaller download; install missing runtimes when prompted by the setup wizard.
- **Self-contained installer**: Bundles the required runtime. Larger download; ideal for fresh systems or environments where you prefer not to install runtimes separately.
- **Portable package**: No installation required — extract and run `EasyTidyPro.exe`. Place it in a user-writable directory; do not put it under `Program Files`, Windows system directories, or run it directly from a compressed archive.

### After clicking the <span class="fluent-icon fluent-icon--dismiss" aria-hidden="true"></span> close button, why is the program still running?

When you close the main window, EasyTidy Pro can continue running in the system tray so that file monitoring, scheduled tasks, and other automated workflows keep working. To fully exit, right-click the EasyTidy Pro icon in the notification area and select "Exit".

If you don't see the icon, expand the hidden icons in the Windows notification area first. You can also drag the icon to the visible area for easier access to restore the window or exit.

### What if the download or runtime is blocked by Windows Defender, SmartScreen, or other security software?

First, confirm the installer was downloaded from the [official download page](/download/) or [GitHub Releases](https://github.com/EasyTidy/EasyTidy-Releases/releases), then verify its SHA-256 hash against the published `checksums.txt`:

```powershell
Get-FileHash .\EasyTidyPro_win-x64_Setup.exe -Algorithm SHA256
```

Some releases may trigger an unknown-publisher warning or ML-based heuristic detection (names containing `!ml`). Do not disable your security software, and never run files whose origin or hash cannot be confirmed. Once origin and hash are verified, try updating your virus definitions and re-checking. If still blocked, submit the detection name, software version, and installer hash to [Issue Tracker](https://github.com/EasyTidy/EasyTidy-Releases/issues).

## Configuration & Upgrades

### Where are configuration, tasks, and the database stored?

The release version uses the following directory by default:

```text
%APPDATA%\EasyTidyPro
```

You can paste `%APPDATA%\EasyTidyPro` into File Explorer's address bar to open it directly. Tasks, settings, integration configurations, and the database are all user data — back them up before troubleshooting or migration. For logs, we recommend opening the log directory from the app's "Run Logs" page.

### How do I use portable configuration? Why are my tasks gone after switching?

Extract the portable package to a writable directory, then create a folder named `portable_config` alongside `EasyTidyPro.exe`. After restarting, the app will use that folder for configuration and the database:

```text
EasyTidyPro\
├── EasyTidyPro.exe
└── portable_config\
```

System and portable configurations are two independent data sets. Creating or deleting `portable_config` does not automatically merge existing data, so seeing an empty task list after switching usually does not mean data is lost. Use the portable configuration switch in **Settings → General Settings** whenever possible, and choose to copy your existing configuration when prompted. Before manual migration, exit the application and keep a backup of the original directory.

### Will upgrading or reinstalling delete my tasks and settings?

Normal in-place upgrades do not actively remove user data, but before major environment upgrades we still recommend stopping running tasks and creating a backup via **Settings → Backup & Restore**. Do not copy database files directly while the application is running. Only manually deleting `%APPDATA%\EasyTidyPro` after uninstalling, or removing the entire directory containing `portable_config`, will remove the corresponding data.

## Rules & Automation

### Why does the preview show no files, or only a subset?

Check in the following order:

1. Is the source folder correct and currently accessible? Are the files inside an excluded subfolder?
2. Do your file matching rules use correct wildcards? For example, `*.jpg;*.png` — separate multiple rules with semicolons or pipes.
3. Are file size, date, attribute, regex, or combination conditions excluding those files?
4. Is the task enabled? Are the files locked by another program? Does the current account have read permissions?
5. Check the "Run Logs" for the specific reason a file was skipped or failed.

See [Rules Reference](/guide/rules/) for rule syntax and examples.

### Why does it say my rule is invalid?

Regular file matching uses wildcards, not full regular expressions. For example, use `*.pdf` to match PDFs, or `*.jpg;*.png;*.webp` to match multiple formats. When you need regular expressions, use the dedicated regex condition or rename parameter — do not paste a regex directly into a plain wildcard field.

Also check that separators, parentheses, and template parameters are complete. Try selecting a preset rule from the button next to the input field, then modify item by item. If you still cannot save, submit a report with sanitized rules and the error message.

### Why are only some files moved, copied, or renamed?

The most common cause is that identically-named files already exist at the destination and the current conflict strategy is set to "Skip". Check both the task-level conflict setting and the global conflict policy, then choose overwrite or auto-rename as needed. Overwriting can cause data loss — after changing the strategy, preview again and verify with test files first.

Other common causes include locked files, unavailable paths, insufficient permissions, files that changed after scanning, or subsequent filter conditions excluding them. Check the "Run Logs" for the exact reason.

### Does the preview modify files? Can I skip the preview?

The preview only calculates matches and file flow — it does not perform any move, copy, rename, or delete operations. Always check the source, destination, and file count in the preview after creating a new task, modifying rules, or processing important directories.

In some scenarios you can reduce confirmation steps in Settings, but skipping the preview is not recommended for deletion, overwriting, batch moves, or batch renames.

### Why didn't an automated task run as expected?

Confirm that both the task and its trigger are enabled and saved, that EasyTidy Pro is still running, and that the source directory is accessible at trigger time. File change triggers should also set an appropriate delay to avoid processing files before writing is complete. Scheduled or CRON triggers require checking system time, the expression, and the next run time.

If the application has fully exited, file monitoring and scheduled triggers that depend on the app process will not continue. See [Automation](/guide/automation/) for detailed configuration, and check the "Run Logs" for failure reasons.

### Why does file monitoring repeatedly trigger the same task?

This usually happens when the destination folder is inside the monitored source folder — the task generates or moves files, which in turn triggers new file change events. Move the destination directory outside the monitored scope, or use exclusion rules to explicitly ignore the destination directory and temporary files. Also set an appropriate trigger delay to avoid repeated processing within a short interval.

## Data Security & Privacy

### Can I undo if something was organized incorrectly?

Supported local operations (move, copy, rename, etc.) generate undo records under the right conditions. Use the <span class="fluent-icon fluent-icon--undo" aria-hidden="true"></span> **Undo** entry or `Ctrl+Z` to revert the most recent operation. Whether an undo is possible also depends on the operation type, whether the backup still exists, and the undo record retention period.

Cloud uploads, external programs, certain transformation operations, or expired records may not be undoable. Only rely on this feature when the interface explicitly shows an available undo record; undo is not a substitute for independent backups.

### Does EasyTidy Pro upload my files?

Basic rule matching, preview, and local file operations are performed on the current device by default. Files, text, images, metadata, or prompts are sent to the respective service providers only when you actively enable and configure online AI, MinerU cloud OCR, WebDAV, S3, Baidu Cloud, 123 Pan, or other remote services.

Before processing sensitive files, review the configuration and the third-party service terms for the features you are using. For fully offline use, do not enable online AI, cloud OCR, cloud storage, or other remote integrations. Update checks and license validation may also access the network.

### What's the difference between the free edition and Pro?

Basic capabilities are available for free. Certain advanced workflows, AI, integrations, or enhanced features require EasyTidy Pro authorization. The **Pro** badge in the interface indicates a feature restricted by licensing policy. If you cannot use a badge-marked feature, check your current authorization status rather than reinstalling.

## Troubleshooting & Feedback

### What information should I provide when the app fails to start, a task errors, or results are unexpected?

First restart the app and try to reproduce the issue with a small set of test files. Then check the "Run Logs" page for errors and open the log directory. Before submitting an issue, prepare:

- EasyTidy Pro full version number and installer type;
- Windows version and system architecture;
- Reproducible steps, expected results, and actual results;
- Relevant logs and screenshots;
- Sanitized rules, source directory structure, and trigger methods.

Please remove private paths, file names, tokens, keys, and personal data from logs and screenshots before submitting to [EasyTidy Releases Issues](https://github.com/EasyTidy/EasyTidy-Releases/issues).
