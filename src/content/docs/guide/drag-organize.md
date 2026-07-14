---
title: Drag and Quick Organize
description: Use the Pro auto drag popup, the manual quick-organize popup, and the shared file organization window.
---

EasyTidy Pro has two separate drag-in entry points. The **auto drag popup** appears while a Pro user is dragging files, while the **quick-organize popup** is opened manually from a hotkey or the system tray. Both entry points send dropped items to the same organization window.

| Entry point | How it opens | Availability |
|---|---|---|
| Auto drag popup | Appears after Windows detects a file or folder drag | Pro |
| Quick-organize popup | Quick Organize hotkey, tray icon click, or tray menu | All users |

:::note
Turning off the Pro auto drag popup does not disable the quick-organize popup.
:::

## Auto drag popup (Pro)

1. Open **Settings → General Settings → Application Settings**.
2. Enable **Auto drag & drop popup** and choose its **Window position**.
3. Start dragging one or more files or folders in File Explorer.
4. Drop the selection on the temporary popup.
5. Select an organization target in the window that follows.

Releasing the mouse without dropping on the popup hides it without changing any files.

<!-- Screenshot required: File Explorer dragging several files while the Pro auto drag popup is visible. Hide personal paths. -->
![Pro auto drag popup (image placeholder)](/images/en/drag-auto-popup-placeholder.png)

## Quick-organize popup

Open the manual popup by assigning the **Quick Organize** hotkey, clicking the EasyTidy Pro tray icon, or selecting **Open quick organize popup** from the tray menu. Drag files or folders onto the round popup to open the organization window.

<!-- Screenshot required: the round quick-organize popup on the desktop, preferably with its first-use guide or drop hint visible. -->
![Quick-organize popup (image placeholder)](/images/en/quick-organize-popup-placeholder.png)

Right-click the popup to pin or unpin it, lock or unlock its position, show the usage guide, show the main window, or close the popup. When unlocked, drag it with the left mouse button. Double-clicking it with the left button also closes it.

<!-- Screenshot required: the complete quick-organize popup context menu. -->
![Quick-organize popup menu (image placeholder)](/images/en/quick-organize-popup-menu-placeholder.png)

## Organization window

The organization window accepts additional dropped files and provides stacked, large-icon, and compact small-icon views. The selected display mode is remembered.

<!-- Screenshot required: the full organization window with files, target picker, remember/automatic options, and the organize button. -->
![File organization window (image placeholder)](/images/en/file-organize-window-placeholder.png)

Right-click the file area to skip the current or selected files, refresh paths that no longer exist, or open an item's location in File Explorer. Skipping removes an item only from the current batch and does not delete the source.

### Choose a target

The target picker supports recent targets, search, and browsing by source and business group:

- Individual task or task group: available to all users.
- Workflow or workflow group: Pro only.

When a task group is selected, regular rules are evaluated by priority, fallback rules using `#` or `##` run last, and processing stops after one task successfully handles the item.

<!-- Screenshot required: the expanded target picker showing recent targets, search, task groups, and workflows for a Pro account. -->
![Organization target picker (image placeholder)](/images/en/file-organize-target-picker-placeholder.png)

### Remember and organize automatically

**Remember this task choice** stores the selected task or group as the default drag target. After it is enabled, **Skip this window, organize automatically on drop** sends future items from either popup directly to that target.

Use automatic processing only after verifying rules that move, overwrite, rename, or delete files.

## Results and undo

Successful items leave the list. Failed items remain with a warning badge that opens the failure reason, allowing the remaining items to be retried after the cause is fixed.

After all items succeed, the completion screen provides **Undo last operation**. Free users have temporary undo during the current run and short-term recovery for up to one hour; Pro users also have persistent undo history. Hovering over the window pauses its automatic close countdown.

<!-- Screenshot required: the all-success screen with Undo last operation and the countdown confirmation button. -->
![Organization success and undo (image placeholder)](/images/en/file-organize-success-placeholder.png)

If drag and drop fails, make sure EasyTidy Pro and File Explorer are running at the same privilege level. Running the app as administrator at all times can prevent drag input from a normally elevated Explorer process.

See [General Settings](/guide/general/), [Shortcuts](/guide/shortcut/), and [Organize Tasks](/guide/task/) for related configuration.
