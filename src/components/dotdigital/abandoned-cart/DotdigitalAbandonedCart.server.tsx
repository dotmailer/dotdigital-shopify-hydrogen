import {
  DotdigitalAbandonedCartClient,
  useDotdigitalEnvironment,
} from '~/components/dotdigital';

import {gql, useSession, useShopQuery} from '@shopify/hydrogen';

const CUSTOMER_QUERY = gql`
  query getCustomer($accessToken: String!) {
    customer(customerAccessToken: $accessToken) {
      email
    }
  }
`;

export default function DotdigitalAbandonedCartServer() {
  let {customerAccessToken} = useSession();
  customerAccessToken = customerAccessToken ?? '';
  const {data: customer} = useShopQuery({
    query: CUSTOMER_QUERY,
    variables: {
      accessToken: customerAccessToken,
    },
  });
  const customerEmail = customer.customer ? customer.customer.email : null;
  const dotdigitalEnvironment = useDotdigitalEnvironment();
  return (
    <DotdigitalAbandonedCartClient
      config={dotdigitalEnvironment}
      customerEmail={customerEmail}
    />
  );
}
