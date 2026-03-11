import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rayappConfig } from '@/lib/rayapp-config';

const bookingSchema = z.object({
  customerName: z.string().min(1, 'First name is required'),
  customerLastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().min(8, 'Valid phone number is required'),
  email: z.string().email('Valid email is required').optional().default(''),
  locationId: z.number().int('Location id must be an integer'),
  bookingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  bookingTime: z.string().regex(/^(\d{2}):(\d{2}):(\d{2})$/, 'Time must be HH:MM:SS'),
  partySize: z.number().min(1).max(40),
  motive: z.number().int().optional(),
  specialRequests: z.string().optional().default(''),
  source: z.enum([
    'WEBSITE',
    'AGENT_IG',
    'AGENT_WPP',
    'AGENT_FB_MSN',
    'AGENT_WIDGET',
    'AGENT_PHONECALL',
    'WALK_IN',
    'MANUAL',
  ]).optional().default('WEBSITE'),
  companyIdentifier: z.any().optional(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be YYYY-MM-DD').optional(),
});

export async function POST(req: NextRequest) {
  const requestId = `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  try {
    const body = await req.json();
    const validatedData = bookingSchema.parse(body);

    const cappedPayload = {
      ...validatedData,
      partySize: Math.min(validatedData.partySize, 40),
      specialRequests:
        validatedData.partySize > 20
          ? `${validatedData.specialRequests || ''} [Se solicitaron ${validatedData.partySize} comensales]`
          : validatedData.specialRequests,
      companyIdentifier: Number(rayappConfig.companyId),
      source: validatedData.source ?? 'WEBSITE',
    };

    const rayappRes = await fetch(`${rayappConfig.apiBaseUrl}/api/bookings/public/v2`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cappedPayload),
    });

    if (!rayappRes.ok) {
      const text = await rayappRes.text();
      throw new Error(`Rayapp API error: ${rayappRes.status} – ${text}`);
    }

    const rayappData = await rayappRes.json();

    const zapierWebhookUrl = process.env.ZAPIER_BOOKING_WEBHOOK_URL;
    if (zapierWebhookUrl) {
      fetch(zapierWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'ohmexico-api',
          requestId,
          booking: validatedData,
          rayappResponse: rayappData,
        }),
      }).catch((e) => console.error(`[${requestId}] Zapier webhook error`, e));
    }

    return NextResponse.json(
      { success: true, message: 'Booking created successfully', data: rayappData },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation error', errors: (error as z.ZodError).issues },
        { status: 400 }
      );
    }
    console.error(`[${requestId}] Booking error:`, error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
