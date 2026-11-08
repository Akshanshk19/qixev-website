# Qixev Security Policy

## Principles

The **Qixev Website** is a static, client-side project deployed to GitHub Pages. It has no server-side backend, no database, no session storage, and no privileged API access.

Because the code and assets in this repository are entirely public and served directly to the user's browser, **any credential, key, or secret placed in this repository is instantly and permanently compromised.**

---

## Strict Rules on Credentials

1. **Never Commit Secrets or Private Keys**:
   - Never commit API secrets, private keys, authentication tokens, database connection strings, or merchant private keys.
   - Any sensitive file (such as `.env`, `*.pem`, `*.key`, `credentials.json`) is strictly barred from Git.

2. **No Payment Provider Secrets in Frontend Code**:
   - Razorpay `key_secret` or equivalent private merchant credentials must **NEVER** exist in frontend JavaScript or HTML.
   - The Qixev static frontend must only ever receive **public external hosted checkout URLs** or public link identifiers when payments are enabled.
   - Processing card, UPI, or banking credentials client-side is strictly prohibited. All financial transactions must be handled entirely on the payment provider's hosted infrastructure.

3. **No Dynamic or Speculative Code Evaluation**:
   - No `eval()`, `new Function()`, or dynamic script injections.
   - No untrusted third-party CDN scripts, tracking beacons, or analytics scripts.

---

## Reporting a Security Vulnerability

If you discover a security vulnerability or sensitive information in this repository, please do **not** open a public issue.

Report it responsibly by creating a confidential report on GitHub or contacting the maintainer directly through the public repository profile:
- Maintainer GitHub: [github.com/Akshanshk19](https://github.com/Akshanshk19)
- Repository: [github.com/Akshanshk19/qixev-website](https://github.com/Akshanshk19/qixev-website)
