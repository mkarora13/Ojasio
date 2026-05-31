/// <reference types="vite/client" />
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
  console.log("[EmailJS Diagnostic] PUBLIC_KEY:", !!EMAILJS_CONFIG.publicKey);
  console.log("[EmailJS Diagnostic] SERVICE_ID:", !!EMAILJS_CONFIG.serviceId);
  console.log("[EmailJS Diagnostic] OWNER_TEMPLATE_ID:", !!EMAILJS_CONFIG.ownerTemplateId);
  
  if (!EMAILJS_CONFIG.publicKey || !EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.ownerTemplateId) {
    console.error('[EmailJS Diagnostic] EmailJS Configuration missing.');
    throw new Error('EmailJS Error: Missing Vercel Environment Variables (PUBLIC_KEY, SERVICE_ID, or OWNER_TEMPLATE_ID). Please add them to Vercel and redeploy.');
  }

  // Exact template parameters - mapping both standard and potentially expected fields
  const templateParams = {
    user_name: subscriberName,
    user_email: email,
    to_name: "Ojasio Admin",
    reply_to: email,
    subscriber_name: subscriberName,
    subscriber_email: email,
    to_email: email,
    first_name: subscriberName.split(' ')[0],
    message: "New newsletter subscription from the website",
    subscribe_date: new Date().toLocaleString(),
    page_url: window.location.href,
    total_count: "Subscribed via Website"
  };

  // Send Emails via EmailJS
  emailjs.init({
    publicKey: EMAILJS_CONFIG.publicKey,
    // blockHeadless: true
  });

  // Owner Notification
  try {
    const ownerResult = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.ownerTemplateId,
      templateParams
    );
    console.log('[EmailJS Diagnostic] Owner Notification Sent successfully.', ownerResult);
  } catch (err: any) {
    console.error('[EmailJS Error] Owner Notification Failed:', err);
    const errorDetails = err?.text || err?.message || JSON.stringify(err);
    throw new Error(`EmailJS Error: ${errorDetails}. Please try again later.`);
  }

  // Welcome Email (Optional)
  if (EMAILJS_CONFIG.welcomeTemplateId) {
    try {
      const welcomeResult = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.welcomeTemplateId,
        templateParams
      );
      console.log('[EmailJS Diagnostic] Welcome Email Sent successfully.', welcomeResult);
    } catch (err: any) {
      console.error('[EmailJS Error] Welcome Email Failed:', err);
    }
  }

  localStorage.setItem('ojasio_subscribed', 'true');
  console.log(`[EmailJS Diagnostic] Subscription succeeded for ${email}`);

  return { 
    success: true, 
    message: subscriberName !== 'Subscriber' 
      ? `Welcome to the Ojasio family, ${subscriberName.split(' ')[0]}. Check your inbox for a personal note.` 
      : 'Thank you for subscribing.'
  };
}
