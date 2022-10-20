import {useMemo} from 'react';

export interface DotdigitalEnvironment {
  chat_api_space_id: string;
  region: string;
  wbt_profile_id: string;
  ac_program_id: string;
  ac_cart_delay: string;
}

export function useDotdigitalEnvironment(): DotdigitalEnvironment {
  return useMemo(() => {
    return {
      chat_api_space_id: Oxygen?.env?.PUBLIC_DDG_CHAT_API_SPACE_ID || '',
      region: Oxygen?.env?.PUBLIC_DDG_REGION || '',
      wbt_profile_id: Oxygen?.env?.PUBLIC_DDG_WBT_PROFILE_ID || '',
      ac_program_id: Oxygen?.env?.PUBLIC_DDG_ABANDONED_CART_PROGRAM_ID || '',
      ac_cart_delay: Oxygen?.env?.PUBLIC_DDG_ABANDONED_CART_DELAY || '',
    };
  }, []);
}
