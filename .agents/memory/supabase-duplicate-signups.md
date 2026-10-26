---
name: Supabase duplicate signup responses
description: Supabase Auth can return an obfuscated user for duplicate email signups.
---

When email confirmation is enabled, Supabase `auth.signUp()` can return a successful response for an already-registered email with a placeholder user whose `identities` array is empty. Treat that response as an existing account and do not insert its ID into a profile table referencing `auth.users`.

**Why:** The placeholder ID is not a real `auth.users` row, so writing it into a foreign-key profile table fails.

**How to apply:** Before creating a profile after `signUp()`, reject a response with `user.identities.length === 0` and give the user a sign-in or password-reset path.
