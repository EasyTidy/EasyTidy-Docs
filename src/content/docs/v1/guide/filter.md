---
title: Advanced Rules
description: Specify additional filter conditions in EasyTidy V1 based on content, size, and date.
---

## Overview

Advanced rules are used to specify additional conditions for file filters. EasyTidy checks files against the conditions you set in the filters, and if the files match, EasyTidy performs the specified actions. These rules can be standalone filter conditions or combined with existing rules.

![Overview](/images/image.png)

## Filter Rule Conditions

Advanced rules are typically additional conditions for file filters. The relationship between advanced rules and existing rules is "AND". Similarly, the relationship between the filter's rules is also "AND". For example, if the filter rules are set as shown below:  
![Rule Example](/images/filter_ruls.png)  
When selecting this rule through the `funnel` icon in the [Task Orchestration](/v1/guide/task/) page, files must satisfy both the defined rule and all the conditions shown above to be processed.  

For example:

- Task orchestration rules specify `*.7z;*.bz2;*.gz;*.iso;*.rar;*.xz;*.z;*.zip`.
- The associated advanced rule (as shown above) states:
  - File size must exceed 200 bytes.
  - Creation and modification dates must be older than 2 days.
  - Access date must be older than 1 hour.

Only files meeting all these conditions will be processed.

**Note**: At least one rule must be defined when setting advanced rules, and a filter name is mandatory.

## File Content

Filters also support defining conditions for file content using several methods, as shown below:  
![Content Filtering](/images/PixPin_2024-12-26_13-53-40.png)

## File Size

The advanced rule feature enables users to filter files based on size using precise comparison operations such as "greater than," "less than," "between," and "not between." Users can choose among multiple units, such as bytes (B), kilobytes (KB), megabytes (MB), and gigabytes (GB), to cater to various needs. This flexible filtering helps efficiently locate and process target files.

## Date

Advanced rules allow users to filter files based on creation, modification, and access dates using comparison operations like "greater than," "less than," "between," and "not between." Supported time units include seconds, minutes, hours, days, months, and years. This flexibility helps users accurately locate and process files based on specific time conditions.

These advanced filtering options enable users to manage and organize files more effectively, meeting specific requirements.

## Examples of Use

1. **Data Matching a Specific Condition**
   - Process files larger than a specified size:  
     ![Specified Size](/images/PixPin_2025-01-07_15-26-28.png)  
     The above setting processes files larger than 10MB.
   - Process files older than a specific time:  
     ![Specific Time](/images/PixPin_2025-01-07_15-35-49.png)  
     The above rule processes files whose modification date is older than one month.

2. **Processing Files by Attributes**
   - Process files matching a specific attribute:  
     ![File Attribute](/images/PixPin_2025-01-07_15-32-10.png)  
     The above rule processes files with the "Read-only" attribute.

3. **Data Between Two Values**
   - File size between two values:  
     Advanced rules support processing files whose size falls within a specified range.  
     ![Size Between](/images/PixPin_2025-01-07_15-43-03.png)  
     The above rule processes files with sizes between 5MB and 100MB, including 5MB and 100MB.
   - Date attributes between two values:  
     ![Date Between](/images/PixPin_2025-01-07_15-46-41.png)  
     The above rule processes files created between 10 and 100 days ago, including exactly 10 and 100 days.
   - For comparisons between two values, the first value is the minimum, and the second is the maximum, separated by a comma.

4. **Data Not Between Two Values**
   - The "not between" condition is similar to "between," but the comparison operation excludes the specified range. Usage is the same, with values taken from outside the specified range.

### Important Notes

- All advanced rule conditions have an "AND" relationship. If multiple conditions are set, files must satisfy all conditions to be processed.
