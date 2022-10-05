import React from 'react';
import {useDotdigitalEnvironment} from '~/components/dotdigital';
import {DotdigitalSiteTrackingClient} from '~/components/dotdigital';

export default function DotdigitalSiteTrackingServer() {
  const dotdigitalEnvironment = useDotdigitalEnvironment();
  return <DotdigitalSiteTrackingClient config={dotdigitalEnvironment} />;
}
