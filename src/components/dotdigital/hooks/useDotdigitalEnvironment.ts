import {useMemo} from 'react';

export interface DotdigitalEnvironment {
  chat_api_space_id: string;
  region: string;
  wbt_api_profile_id: string;
}

export function useDotdigitalEnvironment(): DotdigitalEnvironment {
  return useMemo(() => {
    return {
      chat_api_space_id: Oxygen?.env?.PUBLIC_DDG_CHAT_API_SPACE_ID || '',
      region: Oxygen?.env?.PUBLIC_DDG_REGION || '',
      wbt_api_profile_id: Oxygen?.env?.PUBLIC_DDG_WBT_PROFILE_ID || '',
    };
  }, []);
}
