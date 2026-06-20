---
title: Automation
description: Configure automatic task execution triggers in EasyTidy.
---

This feature configures automatic processing for tasks defined in [Task Management](/guide/task).

![automation](/images/auto.png)

## Folder Monitoring

When the automatic run condition is set to **File Change**, the source folder configured in your tasks will be automatically monitored. When a file changes, matching files will be processed automatically.

:::caution
When using folder monitoring, it's recommended to set a delay to avoid triggering processing while files are being edited.
:::

## Periodic Execution

Set EasyTidy to automatically process files at a specified interval. The maximum interval is 23 hours 59 minutes. For longer intervals, use **Scheduled Execution**.

## Scheduled Execution

Set EasyTidy to execute file organization tasks on a schedule using CRON expressions or a custom time schedule.

In a time schedule table:
- Empty values match any value
- `Val1,Val2..ValN` matches a list of values
- `n1-n2` matches a range from n1 to n2
- `n1-n2/n3` matches range n1 to n2 with step n3

Example: `Minute=15, Hour=03, Month=3-10/3, DayOfWeek=1,3,5` — Tasks will run at 3:15 AM on Mondays, Wednesdays, and Fridays in the 3rd, 6th, and 9th months.

:::note
CRON expressions and the first five time schedule fields are mutually exclusive. If a CRON expression is entered, the five time fields will not take effect.
:::

## On Startup

Set tasks to execute automatically once when EasyTidy starts.

## On Exit / Shutdown

Configure EasyTidy to automatically run specified tasks when the program exits or the system shuts down. (Not guaranteed to work on all systems.)

## Global Automation Settings

When you enable a trigger method in this menu, all auto-tasks configured in **Task Association** will use that execution method. This simplifies configuring consistent automation across multiple tasks.

:::note
- Once a trigger method is enabled globally, all checked and unconfigured auto-tasks will share this method.
- Click "Save Configuration" to apply changes.
:::

## Task Association

Task Association allows setting individual automation methods for each task, with file preview and execution flow visualization.

### Features

1. **Individual Automation**: Each task can independently configure its execution method:
   - **File Change**: Trigger on file changes.
   - **On Startup**: Execute when EasyTidy starts.
   - **Periodic**: Execute at set intervals.
   - **Scheduled**: Execute on a schedule or CRON expression.
   - **On Exit / Shutdown**: Execute on program exit or system shutdown.
   - Enabling "Configure Individually" only affects the current task.

2. **File Preview and Execution Flow**: View the list of files to be processed and visualize the execution path.

3. **Toggle Task List View**: Switch between detailed list view and compact icon view.

### Configuration Steps

1. **Select Tasks**: Check the tasks to configure in the tree list.
2. **Set Individual Execution Methods**: Click the pencil icon to choose an execution method. Click "Save Configuration" to apply.
3. **Preview Files**: Review the list of files to be processed and their execution paths.
4. **Toggle View**: Click the toggle icon next to "Task Selection" to switch views.

## CRON Expression Examples

```bash
*/5 * * * * ?    Every 5 seconds
0 */1 * * * ?    Every 1 minute
0 0 23 * * ?     Every day at 23:00
0 0 1 * * ?      Every day at 1:00 AM
0 0 1 1 * ?      First day of each month at 1:00 AM
0 0 23 L * ?     Last day of each month at 23:00
0 0 1 ? * L      Every Sunday at 1:00 AM
0 26,29,33 * * * ?  At minute 26, 29, and 33
0 0 0,13,18,21 * * ?  At 0:00, 13:00, 18:00, and 21:00 daily
```

## CRON Expression Values

| Field            | Allowed Values      | Special Characters     |
|-----------------|--------------------|------------------------|
| Second          | 0-59               | `, - * /`             |
| Minute          | 0-59               | `, - * /`             |
| Hour            | 0-23               | `, - * /`             |
| Day of Month    | 1-31               | `, - * ? / L W C`     |
| Month           | 1-12 or JAN-DEC   | `, - * /`             |
| Day of Week     | 1-7 or SUN-SAT    | `, - * ? / L C #`     |
| Year (optional) | empty or 1970-2099 | `, - * /`             |

## CRON Symbols

- `*`: Represents the entire time period ("every").
- `/`: Specifies increments. `0/15` = every 15 minutes starting at 0; `3/20` = every 20 minutes starting at 3.
- `?`: Indicates no specific value (used for day-of-month and day-of-week exclusivity).
- `L`: Represents "last". `6L` = last Friday of the month.
- `W`: Represents the nearest weekday. `15W` = nearest weekday to the 15th.
- `#`: Specifies the nth occurrence. `6#3` or `FRI#3` = third Friday of the month.
- `,`: Separates multiple values.
- `-`: Specifies a range of values.
