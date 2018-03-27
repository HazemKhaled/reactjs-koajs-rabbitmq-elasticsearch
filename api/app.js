const Koa = require('koa');
const Router = require('koa-router');
const url = require('url');

const app = new Koa();
const router = new Router();

// Open RabbitMQ connection
const microserviceKit = require('./mskit');

router.get('/search', async (ctx, next) => {
    ctx.is('application/json'); // => 'application/json'

    const query = url.parse(ctx.req.url, true).query;

    console.log(query.keyword);

    // the queue handler of opened connection
    const coreQueue = microserviceKit.amqpKit.getQueue('core');

    await coreQueue
        .sendEvent('search', { keyword: query.keyword }, { persistent: true })
        .then((response) => {

            // We getting response already JSON, so pass it to frontend
            ctx.body = response;
            console.log('We get result: ' + response.length);
        })
        .catch((err) => {
            console.log('Negative response: ', err);
        });

});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(8080);

