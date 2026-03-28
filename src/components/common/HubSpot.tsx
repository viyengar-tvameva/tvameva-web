'use client';
import Script from 'next/script';

const HS_ID = process.env.NEXT_PUBLIC_HUBSPOT_ID;

export function HubSpotTracking() {
  if (!HS_ID) return null;
  return (
    <Script id="hs-script-loader" src={`//js.hs-scripts.com/${HS_ID}.js`} strategy="afterInteractive" />
  );
}
