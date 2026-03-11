'use client';

import React from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * Derives the mobile image path from the desktop path.
 * Convention: /images/foo.webp → /images/foo-mobile.webp
 */
export function getMobileImageSrc(desktopSrc: string): string {
  if (!desktopSrc || typeof desktopSrc !== 'string') return desktopSrc;
  return desktopSrc.replace(/\.(webp|png|jpe?g|gif)$/i, '-mobile.webp');
}

export interface ResponsiveImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /** Desktop image URL (.webp). Mobile will be derived as -mobile.webp */
  src: string;
  /** Optional override for mobile src (default: src with -mobile.webp) */
  mobileSrc?: string;
  alt: string;
  /** When true, image fills the parent (use with a wrapper that has position and size) */
  fill?: boolean;
  /** Breakpoint in px below which mobile image is used (default 768) */
  mobileBreakpoint?: number;
}

/**
 * Renders a <picture> that serves desktop image on large screens and mobile image (≤80KB) on small screens.
 * Use for all content images that have been optimized with scripts/optimize-images.js.
 */
export function ResponsiveImage({
  src,
  mobileSrc,
  alt,
  fill = false,
  mobileBreakpoint = MOBILE_BREAKPOINT,
  className,
  style,
  loading = 'lazy',
  decoding = 'async',
  ...imgProps
}: ResponsiveImageProps) {
  const mobile = mobileSrc ?? getMobileImageSrc(src);

  const pictureContent = (
    <>
      <source
        media={`(max-width: ${mobileBreakpoint}px)`}
        srcSet={mobile}
        type="image/webp"
      />
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={className}
        style={
          fill
            ? {
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                ...style,
              }
            : style
        }
        {...imgProps}
      />
    </>
  );

  if (fill) {
    return (
      <picture
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
          backgroundColor: '#e8e2db',
        }}
      >
        {pictureContent}
      </picture>
    );
  }

  return <picture className={className}>{pictureContent}</picture>;
}
