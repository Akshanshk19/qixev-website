/**
 * Qixev Website Client Scripts
 *
 * Implements:
 * - Accessible mobile menu toggling and keyboard navigation
 * - Client-side interaction handling
 * - Centralized links to external hosted Razorpay support page via PAYMENT_CONFIG
 */

import PAYMENT_CONFIG from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initActionButtons();
});

function initNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      navLinks.classList.toggle('active');
    });

    // Close menu when pressing Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        menuToggle.focus();
      }
    });
  }
}

function initActionButtons() {
  // Contact buttons routing to official email
  const contactButtons = document.querySelectorAll('[data-contact-btn]');
  contactButtons.forEach(btn => {
    btn.href = `mailto:${PAYMENT_CONFIG.contactEmail}?subject=Qixev%20Project%20Inquiry`;
  });

  // Support / payment buttons linking to the centralized hosted Razorpay Payment Page
  const supportButtons = document.querySelectorAll('[data-support-url], [data-payment-url]');
  supportButtons.forEach(btn => {
    if (PAYMENT_CONFIG.enabled && PAYMENT_CONFIG.url) {
      btn.href = PAYMENT_CONFIG.url;
      btn.target = '_blank';
      btn.rel = 'noopener noreferrer';
    } else {
      btn.href = `mailto:${PAYMENT_CONFIG.contactEmail}?subject=Qixev%20Support%20Inquiry`;
    }
  });
}
