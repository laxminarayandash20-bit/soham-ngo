import { NextResponse } from 'next/server';
import { createContactSubmission, getSettings } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, email, phone, subject, message, consent_given, honeypot } = body;

    // Honeypot bot protection
    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Message received' });
    }

    if (!full_name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields (Name, Email, Subject, Message).' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // 1. Store in Database
    const submission = await createContactSubmission({
      full_name: full_name.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || '').trim(),
      subject: subject.trim(),
      message: message.trim(),
      consent_given: Boolean(consent_given)
    });

    // 2. Optionally forward to Formspree if configured
    const settings = await getSettings();
    const formspreeId = settings.formspree_contact_id || process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID;

    if (formspreeId && formspreeId.trim()) {
      try {
        await fetch(`https://formspree.io/f/${formspreeId.trim()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name: full_name,
            email,
            phone,
            subject,
            message,
            submission_id: submission.id,
            source: 'Soham NGO Official Website Contact Form'
          })
        });
      } catch (fErr) {
        console.warn('Formspree dispatch warning:', fErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out to Soham NGO. Your message has been received, and our team will get back to you shortly.',
      id: submission.id
    });
  } catch (error: any) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again or reach us directly at contact@sohamngo.com' },
      { status: 500 }
    );
  }
}
