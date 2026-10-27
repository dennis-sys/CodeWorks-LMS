---
name: Paystack card initialization
description: The server-side transaction setup convention for Paystack card checkout.
---

Initialize Paystack card transactions on the backend with the authoritative amount, currency, reference, and signed metadata; have the browser resume the returned access code with Popup V2 callbacks. Keep the secret key on the server.

**Why:** Client-side transaction setup produced invalid-parameter errors and duplicated trusted payment parameters in the browser.

**How to apply:** For certificate card checkout, derive the KES-to-USD amount and signature on the backend, initialize through Paystack's transaction API, and resume that access code in the frontend.
