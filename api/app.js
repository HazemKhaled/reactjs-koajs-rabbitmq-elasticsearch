const Koa = require('koa');
const Router = require('koa-router');
const url = require('url');

const app = new Koa();
const router = new Router();

router.get('/search', (ctx, next) => {
    ctx.is('application/json'); // => 'application/json'

    ctx.body = [
        { sku: '123', name: 'Product #1' },
        { sku: '234', name: 'Product #2' },
        { sku: '345', name: 'Product #3' },
        { sku: '456', name: 'Product #4' }
    ];

    const query = url.parse(ctx.req.url, true).query;

    console.log(query.keyword);
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(8080);