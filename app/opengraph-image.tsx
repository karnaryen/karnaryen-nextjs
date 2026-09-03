import { ImageResponse } from 'next/og';

import { OG_IMAGE, SITE_NAME } from '@/lib/site';

/**
 * The card every route is shared and previewed with. It is deliberately
 * language-neutral and static — a per-page image would have to read the locale
 * cookie, which would make it uncacheable for a payoff no crawler measures.
 */
export const alt = OG_IMAGE.alt;
export const size = { width: OG_IMAGE.width, height: OG_IMAGE.height };
export const contentType = 'image/png';

/** Brand primitives, copied as literals because satori cannot read CSS variables. */
const MINT_200 = '#b5eaea';
const MINT_300 = '#8de0e0';
const MINT_800 = '#154b4b';
const MINT_900 = '#0a2828';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        backgroundImage: `linear-gradient(135deg, ${MINT_800} 0%, ${MINT_900} 100%)`,
        color: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: 6,
          textTransform: 'uppercase',
          color: MINT_300,
        }}
      >
        {SITE_NAME}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', fontSize: 84, fontWeight: 700, lineHeight: 1.1 }}>
          Frontend Developer
        </div>
        <div style={{ display: 'flex', marginTop: 12, fontSize: 52, color: MINT_200 }}>
          in Enschede, the Netherlands
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', fontSize: 30, color: 'rgba(255,255,255,0.72)' }}>
          React · Next.js · Angular · TypeScript
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: MINT_300 }}>karnaryen.com</div>
      </div>
    </div>,
    size,
  );
}
