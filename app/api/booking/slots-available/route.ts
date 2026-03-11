import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rayappConfig } from '@/lib/rayapp-config';

type Slot = { startTime: string; available?: boolean } & Record<string, unknown>;

function extractSlotsArray(data: unknown): Slot[] {
  if (Array.isArray(data)) {
    return data as Slot[];
  }
  if (data && typeof data === 'object') {
    const obj = data as Record<string, unknown>;
    if (Array.isArray(obj.slots)) return obj.slots as Slot[];
    if (Array.isArray(obj.data)) return obj.data as Slot[];
  }
  return [];
}

function toSlotWithStartTime(slot: unknown): Slot | null {
  if (!slot || typeof slot !== 'object') return null;
  const s = slot as Record<string, unknown>;
  if (typeof s.startTime === 'string') {
    return { startTime: s.startTime, available: s.available !== false };
  }
  return null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const locationId = searchParams.get('locationId');
  const date = searchParams.get('date');
  const partySize = searchParams.get('partySize');

  try {
    const paramsSchema = z.object({
      locationId: z.string().regex(/^\d+$/),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      partySize: z.string().regex(/^\d+$/),
    });

    const validated = paramsSchema.parse({ locationId, date, partySize });

    // Usar companyName del .env (mismo identificador que /locations) como en Temple
    const companyParam = rayappConfig.companyName;

    const qs = new URLSearchParams({
      locationId: validated.locationId,
      date: validated.date,
      partySize: validated.partySize,
      companyId: companyParam,
    }).toString();

    const rayappUrl = `${rayappConfig.apiBaseUrl}/api/bookings/public/available-slots?${qs}`;
    const res = await fetch(rayappUrl);

    if (!res.ok) {
      const text = await res.text();
      console.error('[slots-available] Rayapp API error', res.status, text);
      throw new Error(`Rayapp API error ${res.status}: ${text}`);
    }

    const data = await res.json();
    const rawSlots = extractSlotsArray(data);

    const filtered: Slot[] = rawSlots
      .map(toSlotWithStartTime)
      .filter((s): s is Slot => s !== null)
      .filter((slot) => slot.available !== false);

    return NextResponse.json({ success: true, slots: filtered });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid parameters', errors: (error as z.ZodError).issues },
        { status: 400 }
      );
    }
    console.error('Error fetching slots available:', error);
    return NextResponse.json(
      { success: false, message: 'Unable to fetch slots available' },
      { status: 500 }
    );
  }
}
