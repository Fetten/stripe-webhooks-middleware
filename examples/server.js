import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import compress from 'compression';
import httpStatus from 'http-status';
import expressWinston from 'express-winston';
import winstonInstance from './winston';
import routes from './routes';

const app = express();
const config = {
    env: process.env.NODE_ENV || 'development',
    port: 3000
};

if (config.env === 'development') {
    app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(compress());

// disable 'X-Powered-By' header in response
app.disable('x-powered-by');

// enable detailed API logging in dev env
if (config.env === 'development') {
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    app.use(expressWinston.logger({
        winstonInstance,
        meta: true, 	// optional: log meta data about request (defaults to true)
        msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
        colorStatus: true 	// Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
    }));
}

// mount all routes on /stripe path
app.use('/stripe', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not found', httpStatus.NOT_FOUND);
    return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) =>
    res.status(err.status).json({
        message: err.isPublic ? err.message : httpStatus[err.status],
        stack: config.env === 'development' ? err.stack : {}
    })
);

// listen on port config.port
app.listen(config.port, () => {
    /*eslint no-console: "off"*/
    console.log(`server started on port ${config.port} (${config.env})`);
});

export default app;
