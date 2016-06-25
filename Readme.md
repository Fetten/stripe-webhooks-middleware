# Stripe Webhooks Middleware
> A middleware for [express.js](http://expressjs.com/) that validates incoming Webhooks from [Stripe](https://stripe.com/). 

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
