import {useEffect} from 'react';
import {isBrowser} from '@shopify/hydrogen';
import {DotdigitalEnvironment} from '~/components/dotdigital';

export default function DotdigitalSiteTrackingClient({
  config,
}: {
  config: DotdigitalEnvironment;
}): null {
  const browser = isBrowser();
  const pathname = isBrowser() ? window?.location?.pathname : '';

  useEffect(() => {
    if (!browser) return;
    if (document.getElementById('ddg-site-tracking')) return;

    const script = `//r${config.region}-t.trackedlink.net/_dmmpt.js`;
    const scriptElement = document.createElement('script');

    scriptElement.src = script;
    scriptElement.async = true;
    scriptElement.setAttribute('id', 'ddg-site-tracking');
    document.body.appendChild(scriptElement);

    // @ts-ignore - process is a global variable
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.info('dotdigital injected: ' + scriptElement.src);
    }
  }, [config.region, browser]);

  useEffect(() => {
    if (!browser) return;
    if (!window?.location?.pathname) return;

    const intervalCallAttemptAndWait = setInterval(() => {
      // @ts-ignore - _dmCallHandler() is a window. global function
      if (window._dmCallHandler) {
        // @ts-ignore - _dmCallHandler() is a window. global function
        window._dmCallHandler();
        clearInterval(intervalCallAttemptAndWait);
      }
    }, 0);
  }, [browser, pathname]);

  return null;
}
