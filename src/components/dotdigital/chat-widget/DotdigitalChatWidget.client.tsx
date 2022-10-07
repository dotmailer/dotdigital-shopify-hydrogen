import {useEffect} from 'react';
import {DotdigitalEnvironment} from '~/components/dotdigital';
import {isBrowser} from '@shopify/hydrogen';

let init = false;

export default function DotdigitalChatWidgetClient({
  config,
}: {
  config: DotdigitalEnvironment;
}): null {
  useEffect(() => {
    window._ddgChatConfig = {
      apiSpace: config.chat_api_space_id,
      urlBase: 'https://webchat.dotdigital.com',
    };
  }, [config.chat_api_space_id]);

  useEffect(() => {
    if (!isBrowser() && init) return;
    if (document.getElementById('ddg-chat-widget')) return;

    init = true;
    const script = document.createElement('script');
    script.setAttribute(
      'src',
      'https://webchat.dotdigital.com/widget/bootstrap.js',
    );
    script.setAttribute('id', 'ddg-chat-widget');
    document.head.appendChild(script);
  }, []);

  return null;
}
