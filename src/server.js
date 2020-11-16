const Koa = require('koa');
const koaBody = require('koa-body');
const koaCors = require('@koa/cors');

const logger = require('./lib/logger');

const loggerMiddleware = require('./middlewares/logger');

const PORT = process.env.PORT || 8000;
const MAX_FILE_SIZE = 10000000;

async function server() {
  const app = new Koa();

  app.use(loggerMiddleware);
  app.use(koaCors());
  app.use(koaBody({ multipart: true, formidable: { maxFileSize: MAX_FILE_SIZE } }));

  app.listen(PORT, () => {
    logger.info(`server up & running... listening on ${PORT}`);
  });
}

module.exports = server;
