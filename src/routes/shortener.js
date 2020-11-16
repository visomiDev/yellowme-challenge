const KoaRouter = require('koa-router');

const usecases = require('../usecases/shortener');

const router = new KoaRouter();

router
  .post('/', async (ctx, next) => {
    try {
      const redirect = await usecases.create(ctx.request.body.url, ctx.request.origin);

      ctx.status = 201;
      ctx.body = {
        success: true,
        message: 'The shortened was created successfully',
        data: redirect,
      };
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: 'An error ocurred when tried to create redirect',
        data: error.message,
      };
    }

    await next();
  })
  .get('/:id([A-Za-z0-9]{6})', async (ctx, next) => {
    try {
      const url = await usecases.get(ctx.request.params.id, ctx.request.origin);

      ctx.redirect(url);
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: 'An error ocurred when tried to get redirect',
        data: error.message,
      };
    }

    await next();
  });

module.exports = router;
