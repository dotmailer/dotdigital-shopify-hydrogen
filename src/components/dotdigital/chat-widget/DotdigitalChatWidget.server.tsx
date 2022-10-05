import React from 'react';
import {DotdigitalChatWidgetClient} from '~/components/dotdigital';
import {useDotdigitalEnvironment} from '~/components/dotdigital';

export default function DotdigitalChatWidgetServer() {
  const dotdigitalEnvironment = useDotdigitalEnvironment();
  return <DotdigitalChatWidgetClient config={dotdigitalEnvironment} />;
}
