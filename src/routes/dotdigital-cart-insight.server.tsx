import {gql} from '@shopify/hydrogen';

interface MergableCartLineItems {
  sku: string;
  name: string;
  category: string;
  unitPrice: string;
  salePrice: string;
  totalPrice: string;
  quantity: number;
  imageUrl: string;
  productUrl: string;
}

const CART_QUERY = gql`
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      lines(first: 100) {
        nodes {
          merchandise {
            ... on ProductVariant {
              id
              sku
              title
              product {
                description
                collections(first: 100) {
                  nodes {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const buildCartInsight = (
  cartData: any,
  eventPayload: any,
  productUrl: any,
): any => {
  const cartHash = new URL(eventPayload.cart.id);
  const cartContent = {
    cartID: cartHash.pathname.replace('/Cart/', ''),
    cartPhase: 'ORDER_PENDING',
    currency: eventPayload.cart.cost.totalAmount.currencyCode,
    subtotal: eventPayload.cart.cost.subtotalAmount.amount || 0,
    discountAmount: 0,
    taxAmount: eventPayload.cart.cost.totalTaxAmount || 0,
    grandTotal: eventPayload.cart.cost.totalAmount.amount || 0,
    cartUrl: eventPayload.cart.checkoutUrl,
    lineItems: mergeLineItems(cartData, eventPayload, productUrl),
  };
  return cartContent;
};

const mergeLineItems = (fetchData: any, origData: any, url: any): any => {
  const mergedItems: MergableCartLineItems[] = [];
  origData.cart.lines.edges.forEach((originalPayloadLineItem: any) => {
    const lineId = originalPayloadLineItem.node.merchandise.id;
    let linesku = '';
    let product_category = '';
    fetchData.cart.lines.nodes.forEach(
      (element: any) => {
        if (element.merchandise.id === lineId) {
          linesku = element.merchandise.sku;
          product_category = element.merchandise.product.collections.nodes
            .length
            ? element.merchandise.product.collections.nodes[0].title
            : '';
        }
      },
      lineId,
      linesku,
      product_category,
    );
    mergedItems.push({
      sku: linesku,
      name: originalPayloadLineItem.node.merchandise.product.title,
      category: product_category,
      unitPrice: originalPayloadLineItem.node.merchandise.priceV2.amount,
      salePrice: originalPayloadLineItem.node.merchandise.priceV2.amount,
      totalPrice: originalPayloadLineItem.node.cost.totalAmount.amount,
      quantity: originalPayloadLineItem.node.quantity,
      imageUrl: originalPayloadLineItem.node.merchandise.image.url,
      productUrl: url,
    });
  });

  return mergedItems;
};

export async function api(request: any, {queryShop}: any) {
  const requestData = await request.json();
  const {data: cartData} = await queryShop({
    query: CART_QUERY,
    variables: {
      cartId: requestData.cart.id,
    },
  });

  const productUrl = requestData.url;
  const merged = buildCartInsight(cartData, requestData, productUrl);

  return new Response(JSON.stringify({data: merged}), {
    headers: {'Content-Type': 'application/json'},
  });
}
