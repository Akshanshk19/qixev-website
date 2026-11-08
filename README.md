# Qixev Website (`qixev.com`)

The official public website and community support portal for **Qixev**, an independent software engineering project developing practical tools and offline-first open-source technology.

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
│   ├── config.js              # Centralized payment & external link configuration
│   ├── main.js                # Vanilla JS: navigation & support UI state handlers
│   └── style.css              # Dark modern engineering design system
├── 404.html                   # Custom 404 error page
├── CNAME                      # Custom domain mapping (qixev.com)
├── fieldkit.html              # Qixev FieldKit product showcase
├── index.html                 # Qixev home page
├── license.html               # Open-source licensing information
├── LICENSE                    # MIT license for website code
├── privacy.html               # Honest static-site privacy policy
├── README.md                  # Project overview & operations guide
├── robots.txt                 # Search engine directives
├── SECURITY.md                # Security policy & credential boundary rules
├── sitemap.xml                # Canonical XML sitemap
└── support.html               # Community backing & financial support page
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

## Payment & Support Architecture

Financial backing for Qixev is handled strictly via **external hosted checkout links**.

### Security & Privacy Boundary
1. **Never commit secrets**: Razorpay `key_secret` or private API tokens must **never** be placed in this repository or in frontend code.
2. **Client credential protection**: The website does not process, store, or receive credit card numbers, UPI credentials, or net banking logins.
3. **External redirection model**: When financial support is enabled, users are redirected directly to Razorpay's official hosted payment pages.

```text
qixev.com/support
        ↓ (user clicks tier)
External Razorpay hosted checkout page
        ↓
Payment Provider (Razorpay)
        ↓
Qixev
```

### Enabling Real Financial Support (Future Phase)
Currently, `src/config.js` is set to:
```javascript
const PAYMENT_CONFIG = {
  enabled: false,
  provider: "razorpay",
  supportUrl: "",
  tiers: {
    100: "",
    250: "",
    500: ""
  }
};
```
When `enabled: false`:
- Support tier buttons and custom amount inputs are gracefully disabled (`aria-disabled="true"`).
- The page renders a clear notice: *"Financial support is coming soon. Payment gateway verification is currently underway."*
- No broken links or placeholder redirects are triggered.

#### Steps to Activate Payments:
1. Complete Razorpay merchant onboarding and business verification (KYC).
2. Generate public payment links or hosted button pages inside the Razorpay dashboard for ₹100, ₹250, ₹500, and custom support.
3. Insert the **public external checkout URLs** into `src/config.js`.
4. Set `enabled: true`.
5. Verify test transactions in staging before public deployment.

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

## Custom Domain Setup (`qixev.com`)

The repository contains a `CNAME` file pointing to `qixev.com`.

### Required DNS Configuration:
To map `qixev.com` to GitHub Pages, configure the following DNS records with your domain registrar:

1. **Apex Domain (`@` / `qixev.com`)**:
   Create 4 `A` records pointing to GitHub Pages IP addresses:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

2. **Subdomain (`www`)**:
   Create a `CNAME` record:
   - Name: `www`
   - Target: `Akshanshk19.github.io.`

3. **Enforce HTTPS**:
   In GitHub repository **Settings** → **Pages**, check **Enforce HTTPS** once DNS propagation completes and the TLS certificate is issued.

---

## Security Policy

For vulnerability reporting and credential handling policies, refer to [SECURITY.md](SECURITY.md).
