import {useDotdigitalEnvironment} from '~/components/dotdigital';
import {DotdigitalWebBehaviorTrackingClient} from '~/components/dotdigital';

export default function DotdigitalWebBehaviorTrackingServer() {
  const dotdigitalEnvironment = useDotdigitalEnvironment();
  return <DotdigitalWebBehaviorTrackingClient config={dotdigitalEnvironment} />;
}
