# Dotdigital demo for Shopify Hydrogen

This repository is a Hydrogen demo store with additional components and customisations to demonstrate how to integrate Dotdigital features into your custom storefront.

## Our components

We’ve built components to support three of our popular front-end tools: tracking, chat and abandoned cart. All of these have been added to `/src/App.server.tsx`.

### Tracking

#### Site tracking
```
<DotdigitalSiteTrackingServer />
```

Site tracking allows merchants to track the journey of contacts who go on to access the storefront using links in your campaigns.

Requires:
- a `PUBLIC_DDG_REGION`

Note that our component does not support ROI tracking.

Find out more: 
- [Site Tracking](https://support.dotdigital.com/hc/en-gb/articles/212212388-Site-and-ROI-tracking)

#### Web Behavior Tracking
```
<DotdigitalWebBehaviorTrackingServer />
```

Web Behavior Tracking allows merchants to track visitor activity on the storefront and makes this data available within the platform. This data can be used to trigger follow up campaigns, drive analysis and insights, power some of our product recommendations and is also an integral part of our abandoned carts functionality.

Requires:
- a `PUBLIC_DDG_WBT_PROFILE_ID`

Find out more: 
- [Using Web Behavior Tracking](https://support.dotdigital.com/hc/en-gb/articles/360000183859-Using-Web-Behavior-Tracking)

### Chat
```
<DotdigitalChatWidgetServer />
```

Dotdigital Chat is built from the ground up and enables merchants to speak directly to website visitors in real time. When enabled, a customisable widget is visible on the storefront and a chat interface is built into the Dotdigital platform to handle chats between visitors and agents.

Requires:
- a `PUBLIC_DDG_CHAT_API_SPACE_ID`

Find out more:
- [Get started with Chat](https://support.dotdigital.com/hc/en-gb/articles/360009756460-Get-started-with-Chat)

### Abandoned Cart
```
<DotdigitalAbandonedCartServer />
```

Dotdigital’s Abandoned Cart functionality uses Web Behavior Tracking to track abandoned carts from known customers and (when enabled) guests. Merchants can set up bespoke automations to send triggered campaigns and personalise the customer journey with decisions using logic based on user behaviour and data.

Our component for abandoned cart does not load dmptv4.js itself, therefore currently it requires `<DotdigitalWebBehaviorTrackingServer />` to be loaded above `<DotdigitalAbandonedCartServer />` in `App.server.tsx`. 

This component also uses a custom route in `src/routes/dotdigital-cart-insight.server.tsx`. This route is used to augment the cart data we receive automatically whenever a customer modifies their cart in Hydrogen. 

Requires:
- a `PUBLIC_DDG_WBT_PROFILE_ID`

Find out more:
- [Using Abandoned Cart](https://support.dotdigital.com/hc/en-gb/articles/217384337-Using-abandoned-cart)

## Configuration
Copy the example ENV file and update the values as required:
```
cp env.sample .env
```

---
# Hydrogen Demo Store

Hydrogen is a React framework and SDK that you can use to build fast and dynamic Shopify custom storefronts.

[Check out the docs](https://shopify.dev/custom-storefronts/hydrogen)

[Run this template in JavaScript on StackBlitz](https://stackblitz.com/github/Shopify/hydrogen/tree/dist/templates/demo-store-js?file=package.json)

[Run this template in TypeScript on StackBlitz](https://stackblitz.com/github/Shopify/hydrogen/tree/dist/templates/demo-store-ts?file=package.json)

## Getting started

**Requirements:**

- Node.js version 16.14.0 or higher
- Yarn

To create a new Hydrogen app, run:

```bash
npm init @shopify/hydrogen
```

## Running the dev server

Then `cd` into the new directory and run:

```bash
npm install
npm run dev
```

Remember to update `hydrogen.config.js` with your shop's domain and Storefront API token!

## Building for production

```bash
npm run build
```

## Previewing a production build

To run a local preview of your Hydrogen app in an environment similar to Oxygen, build your Hydrogen app and then run `npm run preview`:

```bash
npm run build
npm run preview
```
