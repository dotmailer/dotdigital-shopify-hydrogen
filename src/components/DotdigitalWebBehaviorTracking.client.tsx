import {useEffect} from 'react';

export default function WebBehaviorTracking() {
  const wbtProfileId = import.meta.env.PUBLIC_DDG_WBT_PROFILE_ID;
  let init = false;

  // dmptv4 for WBT
  useEffect(() => {
    if (wbtProfileId && !init) {
      init = true;
      const script = document.createElement('script');

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(`WBT profile id: ${wbtProfileId}`);
      }

      script.innerHTML = `
      (function(w,d,u,t,o,c){w['dmtrackingobjectname']=o;c=d.createElement(t);c.async=1;c.src=u;t=d.getElementsByTagName(t)[0];t.parentNode.insertBefore(c,t);w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments);};})(window, document, '//static.trackedweb.net/js/_dmptv4.js', 'script', 'dmPt'); window.dmPt('create', '${wbtProfileId}');
      `;

      document.body.appendChild(script);

      if (typeof window.dmPt == 'function') {
        window.dmPt('track');

        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log(
            'Dotdigital triggered web behaviour tracking: ' +
              window.location.pathname,
          );
        }
      }

      return () => {
        if (document.body) {
          document.body.removeChild(script);
        }
      };
    }
  }, [wbtProfileId]);

  return null;
}
