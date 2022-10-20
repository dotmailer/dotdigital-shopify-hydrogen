import {useEffect} from 'react';
import {ClientAnalytics} from '@shopify/hydrogen';
import {DotdigitalEnvironment} from '~/components/dotdigital';

let init = false;

const cartInsight = (
  payload: any,
  ddgConfig: DotdigitalEnvironment,
  customerEmail: string,
): void => {
  payload.data.programId = parseInt(ddgConfig.ac_program_id);
  payload.data.cartDelay = parseInt(ddgConfig.ac_cart_delay);
  if (typeof window?.dmPt != 'function') {
    console.log('Could not send cart insight. window.dmPt is not available.');
    return;
  }
  if (customerEmail) {
    window.dmPt('identify', customerEmail);
  }
  window.dmPt('cartInsight', payload.data);
};

const augmentPayload = async (
  cartData: any,
  config: DotdigitalEnvironment,
  customerEmail: string,
) => {
  const response = await fetch('/dotdigital-cart-insight', {
    method: 'POST',
    body: JSON.stringify(cartData),
  });

  const result = await response.text();
  const payload = JSON.parse(result);
  cartInsight(payload, config, customerEmail);
};

export default function DotdigitalAbandonedCartClient({
  config,
  customerEmail,
}: {
  config: DotdigitalEnvironment;
  customerEmail: string;
}): null {
  console.log(customerEmail);
  useEffect(() => {
    if (!init) {
      init = true;
      ClientAnalytics.subscribe(
        ClientAnalytics.eventNames.ADD_TO_CART,
        (payload) => augmentPayload(payload, config, customerEmail),
      );
      ClientAnalytics.subscribe(
        ClientAnalytics.eventNames.UPDATE_CART,
        (payload) => augmentPayload(payload, config, customerEmail),
      );
      ClientAnalytics.subscribe(
        ClientAnalytics.eventNames.REMOVE_FROM_CART,
        (payload) => augmentPayload(payload, config, customerEmail),
      );
    }
  });
  return null;
}
