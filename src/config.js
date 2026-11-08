/**
 * Qixev Centralized Payment & Support Configuration
 *
 * ARCHITECTURAL MANDATES:
 * 1. Qixev's website is a static, client-side project and MUST NOT process cards, UPI credentials, or banking details.
 * 2. Never place Razorpay API secrets, private keys, or merchant tokens in this file or any frontend script.
 * 3. All financial support transactions MUST route to external, official Razorpay-hosted payment pages or payment links.
 * 4. When `enabled: false`, UI displays clear unavailable status and prevents broken navigation or empty redirects.
 */

const PAYMENT_CONFIG = {
  // Master toggle for external hosted financial support
  enabled: true,

  // Selected payment provider for hosted checkout
  provider: "razorpay",

  // Default general support hosted page URL (configured in Razorpay merchant dashboard)
  supportUrl: "https://rzp.io/rzp/qixev",

  // Pre-configured tier URLs (hosted Razorpay payment links / pages)
  tiers: {
    100: "https://rzp.io/rzp/qixev",
    250: "https://rzp.io/rzp/qixev",
    500: "https://rzp.io/rzp/qixev"
  },

  // Public GitHub repository and issue tracking URLs
  externalLinks: {
    githubOrg: "https://github.com/Akshanshk19",
    fieldkitRepo: "https://github.com/Akshanshk19/qixev-fieldkit",
    fieldkitIssues: "https://github.com/Akshanshk19/qixev-fieldkit/issues",
    fieldkitDiscussions: "https://github.com/Akshanshk19/qixev-fieldkit/discussions",
    fieldkitReleases: "https://github.com/Akshanshk19/qixev-fieldkit/releases"
  }
};

export default PAYMENT_CONFIG;
