/**
 * Qixev Website Client Scripts
 *
 * Implements:
 * - Accessible mobile menu toggling
 * - Keyboard navigation helpers
 * - Dynamic support UI binding driven safely by PAYMENT_CONFIG
 */

import PAYMENT_CONFIG from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSupportPage();
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

function initSupportPage() {
  const primarySupportBtn = document.getElementById('primary-support-btn');
  const tierButtons = document.querySelectorAll('.tier-button');
  const customSupportBtn = document.getElementById('custom-support-btn');
  const supportLinks = document.querySelectorAll('[data-support-url]');
  const statusNotice = document.getElementById('payment-status-notice');

  // If we are not on a page with support elements, exit cleanly
  if (!primarySupportBtn && !tierButtons.length && !customSupportBtn && !supportLinks.length) {
    return;
  }

  if (!PAYMENT_CONFIG.enabled || !PAYMENT_CONFIG.supportUrl) {
    // Show clear status notice
    if (statusNotice) {
      statusNotice.textContent = 'Financial support is temporarily unavailable.';
      statusNotice.classList.remove('hidden');
    }

    if (primarySupportBtn) {
      primarySupportBtn.classList.add('disabled');
      primarySupportBtn.setAttribute('aria-disabled', 'true');
      primarySupportBtn.addEventListener('click', (e) => {
        e.preventDefault();
        announceUnavailable();
      });
    }

    tierButtons.forEach(btn => {
      btn.classList.add('disabled');
      btn.setAttribute('aria-disabled', 'true');
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        announceUnavailable();
      });
    });

    if (customSupportBtn) {
      customSupportBtn.classList.add('disabled');
      customSupportBtn.setAttribute('aria-disabled', 'true');
      customSupportBtn.addEventListener('click', (e) => {
        e.preventDefault();
        announceUnavailable();
      });
    }

    return;
  }

  // When PAYMENT_CONFIG.enabled is true, configure active links to the hosted payment page
  if (primarySupportBtn) {
    primarySupportBtn.classList.remove('disabled');
    primarySupportBtn.removeAttribute('aria-disabled');
    primarySupportBtn.href = PAYMENT_CONFIG.supportUrl;
    primarySupportBtn.target = '_blank';
    primarySupportBtn.rel = 'noopener noreferrer';
  }

  tierButtons.forEach(btn => {
    btn.classList.remove('disabled');
    btn.removeAttribute('aria-disabled');
    const amount = btn.getAttribute('data-amount');
    const targetUrl = (PAYMENT_CONFIG.tiers && PAYMENT_CONFIG.tiers[amount]) || PAYMENT_CONFIG.supportUrl;
    if (btn.tagName.toLowerCase() === 'a') {
      btn.href = targetUrl;
      btn.target = '_blank';
      btn.rel = 'noopener noreferrer';
    } else {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
      });
    }
  });

  if (customSupportBtn) {
    customSupportBtn.classList.remove('disabled');
    customSupportBtn.removeAttribute('aria-disabled');
    if (customSupportBtn.tagName.toLowerCase() === 'a') {
      customSupportBtn.href = PAYMENT_CONFIG.supportUrl;
      customSupportBtn.target = '_blank';
      customSupportBtn.rel = 'noopener noreferrer';
    } else {
      customSupportBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(PAYMENT_CONFIG.supportUrl, '_blank', 'noopener,noreferrer');
      });
    }
  }

  supportLinks.forEach(link => {
    link.href = PAYMENT_CONFIG.supportUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

function announceUnavailable() {
  const statusNotice = document.getElementById('payment-status-notice');
  if (statusNotice) {
    statusNotice.textContent = 'Financial support is temporarily unavailable.';
    statusNotice.classList.remove('hidden');
    statusNotice.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
