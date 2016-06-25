import express from 'express';
import StripeWebhooksMiddleware from '../../lib/StripeWebhooksMiddleware';
import StripeWebhooksHandler from '../StripeWebhooksHandler';

const router = express.Router();

const config = {
  stripeApiSecretKey: 'Your-Stripe-Api-Secret-Key'
};

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send('OK')
);

/** POST / - mount Stripe Webhooks Middleware */
router.post('/', StripeWebhooksMiddleware(config.stripeApiSecretKey));

/** POST / - mount example Webhooks Handler */
router.post('/', StripeWebhooksHandler);


export default router;
