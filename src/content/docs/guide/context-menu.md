---
title: Windows Context Menu
description: Register EasyTidy Pro in File Explorer and organize selected files through the default task group.
---

The Windows context-menu integration sends selected files or folders directly to EasyTidy Pro. It is a silent workflow: no target picker is shown, and the configured **default task group** is used for routing.

:::caution
Set a default task group before using this entry point. Missing or disabled tasks, or an item that matches no rule, are reported as failures and leave the source unchanged.
:::

## Register the menu

1. Open **Settings → General Settings → Application Settings**.
2. Choose **Classic menu** or **Modern menu** under **Context menu**.
3. Select **Register context menu** and approve the Windows elevation prompt if shown.

<!-- Screenshot required: the General Settings context-menu card with style, register, and uninstall controls. -->
![Context-menu settings (image placeholder)](/images/en/context-menu-settings-placeholder.png)

The classic style supports files and folders and normally appears under **Show more options** on Windows 11. The modern style integrates into the first-level Windows 11 menu. Installing or removing the modern component can restart File Explorer, briefly hiding and restoring the desktop and taskbar.

After reinstalling EasyTidy Pro or moving a portable installation, uninstall and register the menu again so it points to the current application files.

## Organize from File Explorer

1. Create and enable the required tasks, then mark their task group as the default group.
2. Select one or more files or folders in File Explorer.
3. Right-click and choose the EasyTidy Pro menu item.

<!-- Screenshot required: a Windows 11 modern menu and the classic menu under Show more options, with the EasyTidy Pro item clearly visible. -->
![EasyTidy Pro in the Explorer context menu (image placeholder)](/images/en/context-menu-explorer-placeholder.png)

Each path is routed through the default task group. Regular tasks are tried from higher to lower priority, `#` and `##` fallback rules run last, and processing stops after one task succeeds. If the app is already running, the path is forwarded to that instance instead of opening another full main window.

Successful processing is normally silent. A failure opens a lightweight failure view and notification so the default group, permissions, file locks, or rule match can be corrected.

:::note
The Explorer context menu cannot choose an individual task or workflow for each run. Use [Drag and Quick Organize](/guide/drag-organize/) when you need the target picker, file review, or immediate undo.
:::

## Uninstall or change styles

Use **Uninstall menu** to remove both classic and modern registrations. Selecting the disabled style by itself does not replace the uninstall operation.

To switch styles, uninstall the current integration, select the new style, register it, and reopen File Explorer. If a menu still points to an older app version, repeat this process from the current installation.

See [Organize Tasks](/guide/task/) for default groups and priority, and [General Settings](/guide/general/) for application permissions.
