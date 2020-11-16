const colors = require('colors');

const logger = require('../lib/logger');

function logRequestData(ctx) {
  const data = [
    `headers: ${JSON.stringify(ctx.request.headers)}`,
  ];

  if (Object.keys(ctx.query).length > 0) {
    data.push(`query: ${JSON.stringify(ctx.query)}`);
  }

  return data.join(', ');
}

const logMessageIn = (ctx) => (
  `${ctx.method} ${colors.blue('✦')} ${ctx.url} - ${colors.blue('request')}: ${logRequestData(ctx)}`
);

function logMessageOut(ctx, duration, isError = false) {
  const message = [ctx.method];

  if (isError) message.push(colors.red('✖️'));
  else message.push(colors.green('✔️'));

  message.push(ctx.url, '->');

  if (isError) message.push(colors.red(ctx.status.toString()));
  else message.push(colors.green(ctx.status.toString()));

  message.push('-', duration.toString(), 'ms,');

  if (isError) message.push(colors.red('response:'));
  else message.push(colors.green('response:'));

  return message.join(' ');
}

async function loggerMiddleware(ctx, next) {
  const start = Date.now();

  try {
    await next();

    const ms = Date.now() - start;

    logger.info(logMessageIn(ctx));
    logger.info(logMessageOut(ctx, ms));
  } catch (error) {
    const ms = Date.now() - start;

    logger.error(logMessageOut(ctx, ms, true));
    logger.error(`${colors.red('[ERROR]')} in (${ctx.path}) -> status: ${ctx.status} -> message: ${error.message || '🤷‍♀️'}`);
    logger.error(error);

    throw error;
  }
}

module.exports = loggerMiddleware;
