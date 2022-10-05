import {useEffect} from 'react';
import {DotdigitalEnvironment} from '~/components/dotdigital';

let init = false;

export default function DotdigitalChatWidgetClient({
  config,
}: {
  config: DotdigitalEnvironment;
}): null {
  useEffect(() => {
    if (!init) {
      init = true;
      const script = document.createElement('script');

      // @ts-ignore - innerHTML expects a string
      script.innerHTML =
        // @ts-ignore - _ddgChatConfig type not defined
        ((window._ddgChatConfig = {
          apiSpace: config.chat_api_space_id,
          urlBase: 'https://webchat.dotdigital.com',
        }),
        (function (d, s, id) {
          let js,
            // eslint-disable-next-line prefer-const
            cjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {
            return;
          }
          // eslint-disable-next-line prefer-const
          js = d.createElement(s);
          js.id = id;
          // @ts-ignore - direct assignment over setAttribute
          js.src = 'https://webchat.dotdigital.com/widget/bootstrap.js';
          // @ts-ignore - object is expected to always exists here
          cjs.parentNode.insertBefore(js, cjs);
        })(document, 'script', 'ddg-chat-widget'));
    }
  });

  return null;
}
