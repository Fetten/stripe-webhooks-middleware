# Stripe Webhooks Middleware
> A middleware for [express.js](http://expressjs.com/) that validates incoming Webhooks from [Stripe](https://stripe.com/).
 
 [![bitHound Dependencies](https://www.bithound.io/github/Fetten/stripe-webhooks-middleware/badges/dependencies.svg)](https://www.bithound.io/github/Fetten/stripe-webhooks-middleware/master/dependencies/npm)
 [![bitHound Overall Score](https://www.bithound.io/github/Fetten/stripe-webhooks-middleware/badges/score.svg)](https://www.bithound.io/github/Fetten/stripe-webhooks-middleware)
 [![bitHound Code](https://www.bithound.io/github/Fetten/stripe-webhooks-middleware/badges/code.svg)](https://www.bithound.io/github/Fetten/stripe-webhooks-middleware)
 [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Fetten/stripe-webhooks-middleware/master/LICENSE)

## Usage
Simply use the Stripe Webhooks Middleware as you would any other middleware.

The validated event is available as `req.StripeEvent`, so you can handle the webhook.

```
import express from 'express';
import bodyParser from 'body-parser';
import stripeWebhooksMiddleware from 'stripe-webhooks-middleware';

const app = express();

const config = {
  stripeApiSecretKey: 'Your-Stripe-Api-Secret-Key'
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/stripe', stripeWebhooksMiddleware(config.stripeApiSecretKey));
```

## Example App
You can find an example app in the `/examples` directory. Run it with `npm run example`.

## Stripe Documentation
For an in-depth overview on Stripe Webhooks see the official [Stripe API Documentation](https://stripe.com/docs/api). 


## Copyright and License
Copyright 2016 [Marcel Fetten](http://www.fetten-meier.com). Code released under the MIT license.
