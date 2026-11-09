# Qixev Website (`qixev.studio`)

The official public website for **Qixev**, an independent software and engineering studio developing practical developer tools, native applications, and offline-first open-source technology.

---

## Architecture & Principles

- **Static & Client-Side**: Pure HTML5, CSS3, and modern vanilla JavaScript.
- **Zero Backend Dependencies**: No database, no accounts, and no server runtime. Hosted on GitHub Pages.
- **Zero Tracking**: No analytics, cookies, tracking beacons, or third-party advertising SDKs.
- **Clean Separation of Concerns**: Software source code, release artifacts, and website presentations reside in distinct, dedicated repositories.

---

## Directory Structure

```text
qixev-website/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml   # Official GitHub Actions Pages deployment
├── assets/
│   └── favicon.svg            # Scalable SVG brand icon
├── src/
│   ├── config.js              # Centralized configuration & external link registry
│   ├── main.js                # Vanilla JS: navigation & client interaction handlers
│   └── style.css              # Dark modern engineering design system
├── 404.html                   # Custom 404 error page
├── CNAME                      # Custom domain mapping (qixev.studio)
├── contact.html               # Business inquiries & quote requests
├── fieldkit.html              # Qixev FieldKit product showcase
├── index.html                 # Qixev home page
├── license.html               # Open-source licensing information
├── LICENSE                    # MIT license for website code
├── privacy.html               # Honest static-site privacy policy
├── README.md                  # Project overview & operations guide
├── robots.txt                 # Search engine directives
├── SECURITY.md                # Security policy & credential boundary rules
├── services.html              # Commercial software engineering services
├── sitemap.xml                # Canonical XML sitemap
└── support.html               # Voluntary support & technical assistance hub
```

---

## Local Development & Testing

Because the project uses standard ES modules (`import PAYMENT_CONFIG from './config.js';`), run a simple local HTTP server to preview:

### Using Python
```bash
python -m http.server 8000
```
Open `http://localhost:8000/` in your browser.

### Using Node.js / npx
```bash
npx serve .
```

---

## Support & External Payment Architecture

The website **does not embed payment gateways** or run client-side payment SDKs. Instead, users who wish to voluntarily support development are redirected externally to Razorpay's official hosted Payment Page.

### Security & Privacy Boundary
1. **Never commit secrets**: Razorpay `key_secret` or private API tokens must **never** be placed in this repository or in frontend code.
2. **Client credential protection**: The website does not process, store, or receive credit card numbers, UPI credentials, or net banking logins.
3. **External redirection model**: Voluntary support CTAs link directly to the centralized hosted Razorpay Payment Page (`https://rzp.io/rzp/qixev`).

```text
qixev.studio/support.html (or home page CTA)
        ↓
External Razorpay hosted Payment Page (https://rzp.io/rzp/qixev)
        ↓
Payment Provider (Razorpay)
        ↓
Qixev
```

### Configuration (`src/config.js`)
The external checkout URL is centralized in `src/config.js`:
```javascript
const PAYMENT_CONFIG = {
  enabled: true,
  provider: "razorpay",
  url: "https://rzp.io/rzp/qixev",
  contactEmail: "qixevstudios@gmail.com"
};
```

All support buttons with `data-support-url` open the verified Razorpay hosted Payment Page without collecting or processing credentials on `qixev.studio`.

---

## GitHub Pages Deployment

The repository is configured for automated deployment via GitHub Actions (`.github/workflows/deploy-pages.yml`):
- Triggers on push to `main`.
- Uses official GitHub Actions: `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`.
- Requires zero repository secrets.

### Repository Configuration on GitHub:
1. Go to repository **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **GitHub Actions**.

---

## Custom Domain Setup (`qixev.studio`)

The repository contains a `CNAME` file pointing to `qixev.studio`.

### DNS Configuration:
1. **Apex Domain (`@` / `qixev.studio`)**:
   - `185.199.108.153` (A record)
   - `185.199.109.153` (A record)
   - `185.199.110.153` (A record)
   - `185.199.111.153` (A record)
2. **WWW Subdomain (`www` / `www.qixev.studio`)**:
   - `akshanshk19.github.io.` (CNAME record)
