const Koa = require('koa');
const Router = require('koa-router');
const url = require('url');
const microserviceKit = require('./mskit'); // RabbitMQ connection

const app = new Koa();
const router = new Router();

router.get('/search', async (ctx, next) => {
  ctx.is('application/json'); // => 'application/json'

  const query = url.parse(ctx.req.url, true).query;

  console.log('Search for:', query.keyword);

  // the queue handler of opened connection
  const coreQueue = microserviceKit.amqpKit.getQueue('core');

  if (!coreQueue) {
    throw new Error('rmq-down', `Can't reach RabbitMQ server.`);
  }

  await coreQueue
    .sendEvent('search', { keyword: query.keyword }, { persistent: true })
    .then(response => {
      // We getting response already JSON, so pass it to frontend
      ctx.body = response;
      console.log('We get result: ' + response.length);
    })
    .catch(console.error);
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(8080);
