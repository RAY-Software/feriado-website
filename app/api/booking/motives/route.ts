import { NextResponse } from 'next/server';
import { rayappConfig } from '@/lib/rayapp-config';

function normalizeMotive(m: { id?: number; value?: string; name?: string; active?: boolean }): { id: number; value: string; active: boolean; companyId?: number } {
  const id = typeof m.id === 'number' ? m.id : Number(m.id) || 0;
  const value = typeof m.value === 'string' ? m.value : (m.name as string) || '';
  return { id, value, active: m.active !== false, companyId: (m as any).companyId };
}

export async function GET() {
  try {
    const qs = new URLSearchParams({
      companyIdentifier: rayappConfig.companyId,
    }).toString();
    const res = await fetch(
      `${rayappConfig.apiBaseUrl}/api/motives/public?${qs}`
    );

    if (!res.ok) {
      const text = await res.text();
      console.error('[motives] Rayapp API error', res.status, text, `${rayappConfig.apiBaseUrl}/api/motives/public?${qs}`);
      return NextResponse.json(
        { success: false, message: 'Unable to fetch motives', motives: [] },
        { status: 500 }
      );
    }

    const data = await res.json();
    const raw = Array.isArray(data) ? data : (data.motives ?? data.data ?? []);
    const motives = raw
      .map(normalizeMotive)
      .filter((m: { active: boolean }) => m.active !== false);

    return NextResponse.json({ success: true, motives });
  } catch (error) {
    console.error('Error fetching motives from Rayapp:', error);
    return NextResponse.json(
      { success: false, message: 'Unable to fetch motives', motives: [] },
      { status: 500 }
    );
  }
}
