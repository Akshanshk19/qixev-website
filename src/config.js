/**
 * Qixev Centralized Configuration
 *
 * ARCHITECTURAL MANDATES:
 * 1. Qixev's website is a static, client-side project and MUST NOT process cards, UPI credentials, or banking details.
 * 2. Never place Razorpay API secrets, private keys, or merchant tokens in this file or any frontend script.
 * 3. Voluntary support is handled strictly by linking users externally to the hosted Razorpay Payment Page.
 * 4. Commercial client invoices are handled separately through direct client communication.
 */

const PAYMENT_CONFIG = {
  // Enabled toggle for external hosted Razorpay support page
  enabled: true,

  // Selected payment provider
  provider: "razorpay",

  // Centralized hosted Razorpay Payment Page URL for voluntary support
  url: "https://rzp.io/rzp/qixev",

  // Official Qixev business contact email
  contactEmail: "qixevstudios@gmail.com",

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
