const randomChars = require('../lib/randomChars');
const Short = require('../models/Short');

const REDIRECT_LENGTH = 6;

async function create(url, origin) {
  const redirect = await randomChars(REDIRECT_LENGTH);

  const short = new Short({
    origin: url,
    redirect: `${origin}/${redirect}`,
  });

  await short.save();

  return short.redirect;
}

async function bulkCreate(urls, origin) {
  const promises = urls.map(async (url) => {
    const redirect = await randomChars(REDIRECT_LENGTH);

    const short = new Short({
      origin: url,
      redirect: `${origin}/${redirect}`,
    });

    return short;
  });

  const redirects = await Promise.all(promises);

  return Short.insertMany(redirects);
}

async function get(redirect, origin) {
  const short = await Short.findOne({ redirect: `${origin}/${redirect}` });

  return short.origin;
}

module.exports = {
  create,
  get,
  bulkCreate,
};
