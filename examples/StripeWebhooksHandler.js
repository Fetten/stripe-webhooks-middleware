function StripeWebhooksHandler(req, res, next) {
    if(req.stripeEvent) {
        // Do something with the event
        // ...
        res.json(req.stripeEvent);
    }
    else {
        next();
    }
}

export default StripeWebhooksHandler;
