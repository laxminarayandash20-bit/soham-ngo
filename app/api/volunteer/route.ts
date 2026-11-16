import { NextResponse } from 'next/server';
import { createVolunteerApplication, getSettings } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      full_name,
      email,
      phone,
      address,
      age,
      occupation,
      area_of_interest,
      skills,
      availability,
      motivation,
      consent_given,
      honeypot
    } = body;

    // Honeypot spam check
    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Application received' });
    }

    if (!full_name || !email || !phone || !area_of_interest || !motivation) {
      return NextResponse.json(
        { error: 'Please fill in all mandatory fields: Full Name, Email, Phone, Area of Interest, and Motivation.' },
        { status: 400 }
      );
    }

    // 1. Store application in Database
    const application = await createVolunteerApplication({
      full_name: full_name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      address: (address || '').trim(),
      age: age ? parseInt(age, 10) : undefined,
      occupation: (occupation || '').trim(),
      area_of_interest: area_of_interest.trim(),
      skills: (skills || '').trim(),
      availability: (availability || '').trim(),
      motivation: motivation.trim(),
      consent_given: Boolean(consent_given)
    });

    // 2. Optionally forward to Formspree volunteer endpoint
    const settings = await getSettings();
    const formspreeId = settings.formspree_volunteer_id || process.env.NEXT_PUBLIC_FORMSPREE_VOLUNTEER_ID;

    if (formspreeId && formspreeId.trim()) {
      try {
        await fetch(`https://formspree.io/f/${formspreeId.trim()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name: full_name,
            email,
            phone,
            address,
            age,
            occupation,
            area_of_interest,
            skills,
            availability,
            motivation,
            application_id: application.id,
            source: 'Soham NGO Volunteer Portal'
          })
        });
      } catch (fErr) {
        console.warn('Formspree dispatch warning:', fErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for stepping forward to serve humanity with Soham NGO! Our volunteer coordinator will connect with you soon.',
      id: application.id
    });
  } catch (error: any) {
    console.error('Volunteer application error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again or email us directly.' },
      { status: 500 }
    );
  }
}
