import Stripe from 'stripe';

function StripeWebhooksMiddleware(stripeApiSecretKey) {
    return function (req, res, next) {

        if (!stripeApiSecretKey) {
            let err = new Error('Stripe API Secret Key not provided.');
            err.status = 500;

            next(err);
        }

        if (!req.body || !req.body.id || req.body.object !== 'event') {
            let err = new Error('Stripe Event data is missing.');
            err.status = 400;

            next(err);
        }

        // Test Webhook from Stripe
        if (req.body.id === 'evt_00000000000000') {

            res.send('Test Webhook received.').end();
        }

        // Validate event
        const stripeApi = Stripe(stripeApiSecretKey);
        stripeApi.events.retrieve(req.body.id, function (err, event) {
            if (err) {
                err.status = (err.type === 'StripeAuthenticationError') ? 401 : 500;
                err.message = 'Stripe event could not be validated.';

                next(err);
            }

            if (!event) {
                let error = new Error('Stripe event could not be validated.');
                error.status = 400;

                next(error);
            }

            req.stripeEvent = event;
            next();
        });
    };
}

export default StripeWebhooksMiddleware;
