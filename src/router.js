const KoaRouter = require('koa-router');

const shortener = require('./routes/shortener');

const router = new KoaRouter();

router.use(shortener.routes()).use(shortener.allowedMethods());

module.exports = router;
