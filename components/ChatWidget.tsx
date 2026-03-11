'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import '@/app/chat-widget.css';

export function ChatWidget() {
  useEffect(() => {
    // Asegura que el widget se inicialice si el script ya fue cargado
    // (útil en navegaciones client-side sin recarga completa)
    return () => {};
  }, []);

  return (
    <Script
      src="/chat-widget.js?v=1"
      strategy="afterInteractive"
    />
  );
}
