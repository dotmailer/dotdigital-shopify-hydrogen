import {useEffect} from 'react';

let init = false;
const api_space = import.meta.env.PUBLIC_DDG_CHAT_API_SPACE_ID;

export default function ChatWidget() {
  useEffect(() => {
    if (!init) {
      init = true;
      const script = document.createElement('script');

      script.innerHTML =
        ((window._ddgChatConfig = {
          apiSpace: api_space,
          urlBase: 'https://webchat.dotdigital.com',
        }),
        (function (d, s, id) {
          let js,
            cjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {
            return;
          }
          js = d.createElement(s);
          js.id = id;
          js.src = 'https://webchat.dotdigital.com/widget/bootstrap.js';
          cjs.parentNode.insertBefore(js, cjs);
        })(document, 'script', 'ddg-chat-widget'));
    }
  });

  return null;
}
