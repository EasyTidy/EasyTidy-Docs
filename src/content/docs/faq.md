---
title: FAQ
description: Frequently asked questions about EasyTidy.
---

## Common Questions

**Q: Why doesn't the program exit when I click the close button?**

- A: Clicking the close button only minimizes the program to the system tray. To fully exit, right-click the tray icon and select "Exit".

**Q: Where is EasyTidy's configuration file? Can I customize it?**

- A:
  1. The configuration file is located in the `EasyTidy` folder under `%AppData%` by default.
  2. You can create a `portable_config` folder in the program's root directory. On restart, the configuration will be regenerated in the `portable_config` folder with all settings reset to defaults.

**Q: Why are only some files moved or not moved correctly after setting up rules?**

- A: First check if there are files with the same name in the target directory. If so, go to Settings → General Settings → Conflict Handling to choose an appropriate handling method (the default is to skip on conflict). If the issue persists, please report it on [GitHub](https://github.com/SaboZhang/EasyTidy/issues).

**Q: Why does it say my rule is invalid?**

- A: Click the purple button next to the rule field to view example rules. Verify that your rule matches the expected format. If your rule follows the example format but still shows as invalid, please report it on [GitHub](https://github.com/SaboZhang/EasyTidy/issues).
