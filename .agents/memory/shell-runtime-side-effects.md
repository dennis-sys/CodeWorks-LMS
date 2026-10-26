---
name: Shell runtime side effects
description: Unexpected `.replit` module changes caused by ad hoc shell commands.
---

An ad hoc Python command in ShellExec was followed by Replit adding `python-base-3.13` to `.replit`. For one-off inspection, prefer Node.js or standard shell tools; check `git status` after shell commands that invoke an unconfigured runtime.

**Why:** The automatic runtime change altered project configuration even though the task did not require Python.

**How to apply:** Avoid invoking Python just to parse or search text. If a shell command changes `.replit` unexpectedly, restore it through the validated `.replit` update flow rather than editing it directly.
