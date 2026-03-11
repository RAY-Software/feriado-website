import { NextResponse } from 'next/server';
import { rayappConfig } from '@/lib/rayapp-config';

export async function GET() {
  try {
    const companyName = encodeURIComponent(rayappConfig.companyName);
    const res = await fetch(
      `${rayappConfig.apiBaseUrl}/api/locations/public/by-company/${companyName}`
    );

    if (!res.ok) {
      return NextResponse.json(
        { success: false, message: 'Unable to fetch locations' },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, locations: data });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { success: false, message: 'Unable to fetch locations' },
      { status: 500 }
    );
  }
}
