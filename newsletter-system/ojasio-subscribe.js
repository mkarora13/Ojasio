const EMAILJS_CONFIG = {
  publicKey: "YOUR_PUBLIC_KEY_HERE",
  serviceId: "YOUR_SERVICE_ID_HERE",
  welcomeTemplateId: "YOUR_WELCOME_TEMPLATE_ID",
  articleTemplateId: "YOUR_ARTICLE_TEMPLATE_ID",
  ownerTemplateId: "YOUR_OWNER_NOTIFICATION_TEMPLATE_ID"
};

const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

/**
 * Validates email format
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Generates a unique unsubscribe token
 */
function generateToken() {
  return 'token_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

/**
 * Main subscription function
 */
async function subscribeUser(name, email, sourceElementId) {
  if (!name || name.trim() === '') {
    throw new Error('Please enter your name.');
  }
  if (!validateEmail(email)) {
    throw new Error('Please enter a valid email address.');
  }

  const token = generateToken();
  const date = new Date().toISOString();

  // 1. Save to Google Sheets first
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors', // standard for simple sheets posts to avoid CORS issues
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'subscribe',
      name: name,
      email: email,
      date: date,
      token: token
    })
  });

  // Since mode is no-cors, we can't easily read JSON response, we assume success if no JS error
  // Now send emails via EmailJS
  try {
    // Welcome Email
    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.welcomeTemplateId,
      {
        to_email: email,
        first_name: name.split(' ')[0],
        unsubscribe_token: token
      },
      EMAILJS_CONFIG.publicKey
    );

    // Owner Notification Email
    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.ownerTemplateId,
      {
        subscriber_name: name,
        subscriber_email: email,
        subscribe_date: new Date().toLocaleString(),
        page_url: window.location.href,
        total_count: "Check Google Sheet" // Could be returned by API, but no-cors prevents it
      },
      EMAILJS_CONFIG.publicKey
    );

    // Set local storage flag so popups don't show again
    localStorage.setItem('ojasio_subscribed', 'true');
    return true;
  } catch (error) {
    console.error("EmailJS Error:", error);
    throw new Error('Could not send welcome email. Please try again.');
  }
}

/**
 * Widget Setup
 */
document.addEventListener("DOMContentLoaded", function() {
  emailjs.init(EMAILJS_CONFIG.publicKey);

  const hasSubscribed = localStorage.getItem('ojasio_subscribed');

  // Trigger Exit Intent Popup
  if (!hasSubscribed) {
    let popupShown = false;
    
    // 45 second timer
    setTimeout(() => {
      if (!popupShown) {
        showPopup();
        popupShown = true;
      }
    }, 45000);

    // Mouse exit intent
    document.addEventListener("mouseleave", function(e) {
      if (e.clientY <= 0 && !popupShown) {
        showPopup();
        popupShown = true;
      }
    });
  }

  function showPopup() {
    const popup = document.getElementById('ojasio-exit-popup');
    if (popup) {
      popup.style.display = 'flex';
      popup.classList.add('fade-in');
    }
  }

  // Handle all forms with class 'ojasio-subscribe-form'
  const forms = document.querySelectorAll('.ojasio-subscribe-form');
  forms.forEach(form => {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const nameInput = form.querySelector('.ojasio-name-input');
      const emailInput = form.querySelector('.ojasio-email-input');
      const submitBtn = form.querySelector('.ojasio-submit-btn');
      const messageDiv = form.querySelector('.ojasio-message');

      const name = nameInput ? nameInput.value : 'Subscriber';
      const email = emailInput.value;

      submitBtn.disabled = true;
      submitBtn.innerText = 'Subscribing...';
      messageDiv.style.display = 'none';

      try {
        await subscribeUser(name, email, form.id);
        
        form.innerHTML = `
          <div class="ojasio-success-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ojasio-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <p>Welcome to the Ojasio family, ${name.split(' ')[0]}. Check your inbox for a personal note from Disha.</p>
          </div>
        `;
        
        // Hide popups after 3 seconds if this was the popup form
        if (form.closest('#ojasio-exit-popup')) {
          setTimeout(() => {
            document.getElementById('ojasio-exit-popup').style.display = 'none';
          }, 3000);
        }
      } catch (error) {
        messageDiv.innerText = error.message;
        messageDiv.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.innerText = 'Subscribe';
      }
    });
  });

  // Floating button toggle
  const floatingBtn = document.getElementById('ojasio-floating-btn');
  const floatingModal = document.getElementById('ojasio-floating-modal');
  if (floatingBtn && floatingModal) {
    floatingBtn.addEventListener('click', () => {
      const isVisible = floatingModal.style.display === 'block';
      floatingModal.style.display = isVisible ? 'none' : 'block';
      if (!isVisible) floatingModal.classList.add('slide-up');
    });
  }
});
