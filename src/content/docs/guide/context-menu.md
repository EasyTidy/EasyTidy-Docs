---
title: Windows Context Menu
description: Register EasyTidy Pro in File Explorer and organize selected files or folders through the default task group.
---

The Windows context-menu integration sends selected files or folders directly to EasyTidy Pro. It uses a silent organization workflow — no task selection window opens. Instead, the configured **default task group** is used to automatically match and route items.

::::caution[Configure a default task group first]
The context menu only organizes via the default task group. If no default group is set, the group contains no enabled tasks, or no files match any rule, the organization fails with a notification or failure window.
::::

## Registering the Context Menu

1. Open EasyTidy Pro and go to **Settings → General Settings → Application Settings**.
2. Under **Context Menu**, choose **Classic Menu** or **Modern Menu**.
3. Click **Register Context Menu**.
4. When Windows shows a User Account Control prompt, approve the operation.

<!-- Image requirements: Capture the "General Settings → Application Settings → Context Menu" card, fully showing the style dropdown, Register, and Uninstall buttons. -->
![Context menu settings](/images/zh/context-menu-settings.png)

### Classic Menu

The classic menu uses Windows 10-style Explorer menu entries and supports both files and folders. On Windows 11, it typically appears inside the classic menu opened via **Show more options**.

The classic menu writes to the current user's file association settings; the menu entry shows the EasyTidy Pro name and application icon.

### Modern Menu

The modern menu targets Windows 11 and can integrate directly into the new context menu. During installation, the application registers the menu component shipped with the program. Windows may require administrator privileges and restarts File Explorer for the menu to take effect.

When File Explorer restarts, the desktop and taskbar may briefly disappear and reappear — this is normal. Finish any ongoing file copy, rename, or other Explorer operations before installing.

::::note[After reinstalling or moving the application]
The classic menu records the current EasyTidy Pro executable location; the modern menu also depends on components in the installation directory. If the menu stops working after changing the upgrade method, moving a portable directory, or reinstalling, uninstall the menu first, then re-register from the current version.
::::

## Organizing via the Context Menu

1. First, create and enable tasks on the Organization Tasks page, and set the group you want to use as the default group.
2. Select one or more files or folders in File Explorer.
3. Right-click and choose the EasyTidy Pro menu entry.
4. The application passes each path to the default task group, where rules automatically route them.

<!-- Image requirements: Prepare separate screenshots for the Windows 11 modern context menu and the classic menu under "Show more options"; a composite placeholder image is fine for the body. The EasyTidy Pro menu entry must be clearly labeled. -->
![Windows File Explorer context menu](/images/zh/context-menu-explorer.png)

The default group's execution order matches drag-and-drop organization:

- Regular tasks are tried from highest to lowest priority;
- `#` and `##` fallback rules are tried last;
- Once a task successfully processes a path, processing stops — other tasks in the group are skipped for that path;
- When no rule matches, the original file is left unchanged and a failure is reported.

If EasyTidy Pro is already running in the background, the path passed from Explorer is forwarded to the existing instance without opening another full main window. Successful runs are normally silent; failures show a lightweight failure window and system notification — use these to check the default group, file locks, permissions, or rule matches.

::::note[Difference between context menu and drag-and-drop organization]
The context menu always uses the default task group — you cannot temporarily pick a single task or workflow before execution. Use [Drag & Quick Organize](/guide/drag-organize/) when you need to select a target per-run, review the file list, or undo immediately.
::::

## Uninstalling or Switching Menu Styles

To disable the context menu entry, click **Uninstall Menu**. The uninstall operation cleans up both classic and modern menu components; simply setting the style dropdown to "Disabled" is not a substitute for uninstalling.

When switching styles, follow this order:

1. Click **Uninstall Menu**;
2. Select the new menu style;
3. Click **Register Context Menu**;
4. Reopen File Explorer and verify the menu.

Uninstalling the modern menu may also restart File Explorer.

## FAQ

### The context menu doesn't appear

First confirm that the registration operation reported success. On Windows 11 with classic style, check under **Show more options**; with modern style, reopen the Explorer window. If the application directory was moved or the path changed after an upgrade, uninstall and re-register.

### Clicking the menu entry doesn't organize files

Confirm that a default task group is set, the group contains at least one enabled task, and the selected files match rules in that group. Context menu organization does not use the single task saved via "Remember my task choice" in the organization window as a fallback.

### Permission or installation failure

Allow the Windows User Account Control prompt and confirm that security software is not blocking the application's context menu components. If files required by the modern menu are missing, reinstall the full version rather than copying only the main executable.

### Menu points to an older version

First run **Uninstall Menu** from the current application, confirm the old installation directory has been removed, then re-register from the current version. Portable copies also need re-registration after moving directories.

For default groups and task priority, see [Organization Tasks](/guide/task/); for application permissions and background settings, see [General Settings](/guide/general/).
