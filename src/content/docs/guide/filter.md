---
title: Advanced Rules
description: Configure advanced filter rules for precise file targeting in EasyTidy.
---

## Overview

Advanced rules specify additional conditions for file filtering. EasyTidy checks files against the conditions you set in filters, and if matched, performs the specified operation. These conditions work alongside [task processing rules](/guide/task) as "AND" logic.

## Filter Rule Conditions

Advanced rules act as additional conditions on top of file processing rules, using "AND" logic. All conditions within a filter are also combined with "AND" logic.

For example, if a processing rule is set to `*.7z;*.bz2;*.gz;*.iso;*.rar;*.xz;*.z;*.zip` and you associate a filter requiring:
- File size greater than 200 bytes
- Creation and modification dates older than 2 days
- Access time older than 1 hour

Then the file must satisfy ALL conditions above AND match one of the file extensions in the processing rule.

:::note
You must set at least one rule condition and provide a filter name.
:::

## File Content

Filters support content-based filtering with several comparison methods including:
- Contains
- Does not contain
- Matches regex
- Does not match regex

## File Size

Filter files by size with comparisons: **Greater Than**, **Less Than**, **Between**, and **Not Between**. Units include Bytes (B), Kilobytes (KB), Megabytes (MB), and Gigabytes (GB).

## Date

Filter files by creation date, modification date, and access date. Supported comparisons: **Greater Than**, **Less Than**, **Between**, and **Not Between**, with time units including Seconds, Minutes, Hours, Days, Months, and Years.

## Usage Examples

### Size-Based Filtering

- **Process files larger than a specified size**: Set to process files larger than 10 MB.

### Date-Based Filtering

- **Process files older than a certain time**: Set to process files with a modification date older than 1 month.

### Attribute-Based Filtering

- **Process files with specific attributes**: Set to process read-only files.

### Range-Based Filtering

- **File size within a range**: Process files between 5 MB and 100 MB (inclusive).
- **Date within a range**: Process files with creation dates between 10 and 100 days (inclusive).

The format for range comparisons is `min,max`, where min is the lower bound and max is the upper bound.

:::tip
All filter conditions use "AND" logic. If multiple conditions are set, files must satisfy ALL conditions to be processed.
:::
