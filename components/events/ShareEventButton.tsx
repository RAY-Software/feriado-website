'use client';

import { useCallback } from 'react';
import { Share2 } from 'lucide-react';

const FALLBACK_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://feriadocantina.com';

interface ShareEventButtonProps {
  title: string;
  slug: string;
  className?: string;
  iconClassName?: string;
}

export function ShareEventButton({ title, slug, className, iconClassName }: ShareEventButtonProps) {
  const url = typeof window !== 'undefined' ? `${window.location.origin}/events/${slug}` : `${FALLBACK_SITE_URL}/events/${slug}`;

  const handleClick = useCallback(async () => {
    const shareData = {
      title: `${title} | Feriado Cantina`,
      url,
    };
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard?.writeText(url);
      }
    } catch {
      await navigator.clipboard?.writeText(url).catch(() => {});
    }
  }, [title, url]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
    >
      <Share2 className={iconClassName ?? 'w-5 h-5'} />
      <span className="ml-0">Compartir evento</span>
    </button>
  );
}
