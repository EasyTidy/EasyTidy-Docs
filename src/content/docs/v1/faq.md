---
title: Frequently Asked Questions
description: Common questions and answers about EasyTidy V1.
---

**Q: Why doesn't the program exit when I click the close button?**

- A: This is because clicking the close button only closes the window, and the program is minimized to the system tray. To exit, please right-click on the tray icon and select the "Exit" option.

**Q: Where is EasyTidy's configuration file, and can I customize it?**

- A: Solution:
  - 1. By default, the configuration file is located in the `EasyTidy` folder under the `%AppData%` directory.
  - 2. You can create a `portable_config` folder in the program's root directory. When you restart the program, the configuration file will be regenerated in the `portable_config` folder. After changing the directory, the configuration will be reset to default, and all settings will be restored to their original state.

**Q: Why are only some files moved or not moved correctly after setting the rules?**

- A: Please first check whether there are files with the same name in the target directory. If so, go to Settings => General Settings => Conflict Handling to choose how to handle files/folders with the same name. The default behavior is to automatically skip duplicates.
If the files are still not handled correctly after adjusting this setting, please report the issue on GitHub, or use the provided contact methods or leave a message on this page.

**Q: Why does it say the rule is invalid when I set it?**

- A: Please click the purple button next to the rule input box to view example rules. Make sure your rule follows the same format and usage as the example. If it does and the issue persists, please report it on GitHub, or contact us through the provided methods or leave a message on this page.
