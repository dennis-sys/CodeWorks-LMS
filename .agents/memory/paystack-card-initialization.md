---
name: Paystack card initialization
description: The server-side transaction setup convention for Paystack card checkout.
---

This Paystack merchant rejects USD for certificate card transactions. Initialize new certificate card transactions on the backend in KES using the exact certificate fee, then have the browser resume the returned access code with Popup V2 callbacks. Keep the secret key on the server.

**Why:** Paystack returned “Currency not supported by merchant” for USD. KES is the merchant's local supported currency; USD depends on merchant-level activation and account setup.

**How to apply:** For certificate card checkout, use the authoritative KES fee and signed metadata in Paystack's server-side transaction initialization, then resume that access code in the frontend. Keep M-Pesa behavior unchanged.
