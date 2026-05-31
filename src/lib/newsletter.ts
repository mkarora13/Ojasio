import emailjs from '@emailjs/browser';

const DEBUG_MODE = process.env.NODE_ENV !== 'production';

export const EMAILJS_CONFIG = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  welcomeTemplateId: import.meta.env.VITE_EMAILJS_WELCOME_TEMPLATE_ID || '',
  ownerTemplateId: import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID || ''
};

export interface SubscribeResult {
  success: boolean;
  message: string;
}

export async function subscribeUser(name: string | undefined | null, email: string): Promise<SubscribeResult> {
  const subscriberName = name?.trim() || 'Subscriber';
  
  if (DEBUG_MODE) console.log('[DEBUG] Form Submitted', { subscriberName, email });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) throw new Error('Please enter a valid email address.');

  if (DEBUG_MODE) console.log('[DEBUG] Validation Passed');

  // Validate Configuration
  if (!EMAILJS_CONFIG.publicKey || !EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.ownerTemplateId) {
    if (DEBUG_MODE) console.error('[DEBUG] EmailJS Configuration missing.', EMAILJS_CONFIG);
    throw new Error('Subscription service is temporarily unavailable.');
  }

  // Send Emails via EmailJS
  if (DEBUG_MODE) console.log('[DEBUG] Initializing EmailJS...');
  emailjs.init(EMAILJS_CONFIG.publicKey);
  
  // Welcome Email (Optional if welcomeTemplateId is provided)
  if (EMAILJS_CONFIG.welcomeTemplateId) {
    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.welcomeTemplateId,
        {
          to_email: email,
          first_name: subscriberName.split(' ')[0]
        }
      );
      if (DEBUG_MODE) console.log('[DEBUG] Welcome Email Sent successfully.');
    } catch (err) {
      if (DEBUG_MODE) console.error('[DEBUG] Welcome Email Failed:', err);
    }
  }

  // Owner Notification
  try {
    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.ownerTemplateId,
      {
        subscriber_name: subscriberName,
        subscriber_email: email,
        subscribe_date: new Date().toLocaleString(),
        page_url: window.location.href,
        total_count: "Subscribed via Website"
      }
    );
    if (DEBUG_MODE) console.log('[DEBUG] Owner Notification Sent successfully.');
  } catch (err) {
    if (DEBUG_MODE) console.error('[DEBUG] Owner Notification Failed:', err);
    throw new Error('Subscription service is temporarily unavailable.');
  }

  localStorage.setItem('ojasio_subscribed', 'true');

  return { 
    success: true, 
    message: subscriberName !== 'Subscriber' 
      ? `Welcome to the Ojasio family, ${subscriberName.split(' ')[0]}. Check your inbox for a personal note.` 
      : 'Thank you for subscribing.'
  };
}
