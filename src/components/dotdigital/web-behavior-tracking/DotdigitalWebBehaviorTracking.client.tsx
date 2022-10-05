import {useEffect, useState} from 'react';
import {isBrowser, useUrl, useServerProps} from '@shopify/hydrogen';
import {DotdigitalEnvironment} from '~/components/dotdigital';

// @ts-ignore
export default function DotdigitalWebBehaviorTrackingClient({
  config,
}: {
  config: DotdigitalEnvironment;
}): null {
  const url = useUrl();
  const {pending} = useServerProps();
  const [hasScript, setHasScript] = useState(false);
  const [path, setPath] = useState(url.pathname);
  const browser = isBrowser();

  useEffect(() => {
    if (!browser || !config.wbt_api_profile_id) return;
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`WBT profile id: ${config.wbt_api_profile_id}`);
    }

    const script = document.createElement('script');
    script.innerHTML = `(function (w, d, u, t, o, c) {
        if( document.getElementById('dmptv4') ) return;
        w['dmtrackingobjectname'] = o;
        c = d.createElement(t);
        c.setAttribute('id', 'dmptv4');
        c.async = 1;
        c.src = u;
        t = d.getElementsByTagName(t)[0];
        t.parentNode.insertBefore(c, t);
        w[o] =
          w[o] ||
          function () {
            (w[o].q = w[o].q || []).push(arguments);
          };
      })(
        window,
        document,
        '//static.trackedweb.net/js/_dmptv4.js',
        'script',
        'dmPt',
      )
      window.dmPt('create', '${config.wbt_api_profile_id}');
      `;

    document.body.appendChild(script);
    setHasScript(true);
    return () => {
      if (document.body) document.body.removeChild(script);
    };
  }, [config.wbt_api_profile_id, browser]);

  useEffect(() => setPath(url.pathname), [url.pathname]);

  useEffect(() => {
    if (!isBrowser() || !hasScript || pending) return;
    // @ts-ignore - dmPt is injected by the script above
    if (typeof window?.dmPt == 'function') {
      // @ts-ignore - dmPt is injected by the script above
      window.dmPt('track');
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('Dotdigital triggered web behavior tracking: ' + path);
      }
    }
  }, [hasScript, path, pending]);

  return null;
}
