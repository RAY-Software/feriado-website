import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/chat
 * Proxy: reenvía los mensajes del widget al webhook privado de n8n,
 * manteniendo la URL del webhook oculta del cliente.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, session_id, page_url, source } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('💬 Chat proxy error: N8N_WEBHOOK_URL is not configured');
      return NextResponse.json(
        { error: 'Chat service is not available. N8N webhook is not configured.' },
        { status: 503 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, session_id, page_url, source }),
    });

    if (!response.ok) {
      throw new Error(`N8N webhook error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('💬 Chat proxy error:', message);
    return NextResponse.json(
      { error: 'Chat proxy error', details: message },
      { status: 500 }
    );
  }
}
