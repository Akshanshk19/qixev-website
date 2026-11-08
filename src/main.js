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
  const tierButtons = document.querySelectorAll('.tier-button');
  const customAmountInput = document.getElementById('custom-amount');
  const customSupportBtn = document.getElementById('custom-support-btn');
  const statusNotice = document.getElementById('payment-status-notice');

  // If we are not on the support page, exit cleanly
  if (!tierButtons.length && !customSupportBtn) {
    return;
  }

  if (!PAYMENT_CONFIG.enabled) {
    // Show clear status notice
    if (statusNotice) {
      statusNotice.textContent = 'Financial support is coming soon. Payment gateway verification is currently underway.';
      statusNotice.classList.remove('hidden');
    }

    // Disable buttons gracefully without broken links
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

    if (customAmountInput) {
      customAmountInput.disabled = true;
    }

    return;
  }

  // When PAYMENT_CONFIG.enabled is true, configure external checkout redirects
  tierButtons.forEach(btn => {
    btn.classList.remove('disabled');
    btn.removeAttribute('aria-disabled');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const amount = btn.getAttribute('data-amount');
      const targetUrl = PAYMENT_CONFIG.tiers[amount] || PAYMENT_CONFIG.supportUrl;
      if (targetUrl) {
        window.location.href = targetUrl;
      } else {
        announceUnavailable();
      }
    });
  });

  if (customSupportBtn && customAmountInput) {
    customSupportBtn.classList.remove('disabled');
    customSupportBtn.removeAttribute('aria-disabled');
    customAmountInput.disabled = false;

    customSupportBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = parseInt(customAmountInput.value, 10);
      if (isNaN(val) || val < 50) {
        alert('Please enter a valid amount (minimum ₹50).');
        customAmountInput.focus();
        return;
      }
      if (PAYMENT_CONFIG.supportUrl) {
        window.location.href = PAYMENT_CONFIG.supportUrl;
      } else {
        announceUnavailable();
      }
    });
  }
}

function announceUnavailable() {
  const statusNotice = document.getElementById('payment-status-notice');
  if (statusNotice) {
    statusNotice.textContent = 'Financial support is coming soon. Real payment links are currently disabled.';
    statusNotice.classList.remove('hidden');
    statusNotice.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
