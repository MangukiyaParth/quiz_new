'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    googletag: any;
  }
}

const GoogleAds = () => {
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    (window as any).googletag = (window as any).googletag || { cmd: [] };
    const googletag = (window as any).googletag;

    googletag.cmd.push(() => {
      const pubads = googletag.pubads();
      googletag.defineOutOfPageSlot('/23302694015/QOOP-2', googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR).addService(pubads);
      googletag.enableServices();
      
      // pubads.addEventListener('slotOnload', (event: any) => {
      //   console.log('Ad loaded:', event.slot.getSlotElementId());
      // });
    });
  }, []);

  useEffect(() => {
    (window as any).googletag = (window as any).googletag || { cmd: [] };
    const googletag = (window as any).googletag;

    const showInterstitial = () => {
      googletag.cmd.push(() => {
        const pubads = googletag.pubads();

        // Define interstitial slot
        const interstitialSlot = googletag.defineOutOfPageSlot('/23302694015/QOOP-3', googletag.enums.OutOfPageFormat.INTERSTITIAL).addService(pubads);
        googletag.enableServices();

        if (interstitialSlot) {
          googletag.display(interstitialSlot);

          // pubads.addEventListener('slotRenderEnded', (event: any) => {
          //   console.log('✅ Interstitial ad rendered:', event);
          // });

          // pubads.addEventListener('slotVisibilityChanged', (event: any) => {
          //   console.log('👁️ Interstitial visibility:', event.inViewPercentage);
          // });

          // pubads.addEventListener('slotOnload', (event: any) => {
          //   console.log('📦 Interstitial loaded:', event.slot.getSlotElementId());
          // });
        }
      });
    };

    if (prevPath.current && prevPath.current !== pathname) {
      console.log("inter Call");
      showInterstitial();
    }
    prevPath.current = pathname;
  }, [pathname]);

  return null; // No visual DOM element needed
};

export default GoogleAds;
