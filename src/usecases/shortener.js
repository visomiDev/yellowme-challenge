const randomChars = require('../lib/randomChars');
const Short = require('../models/Short');

const REDIRECT_LENGTH = 6;

async function create(url, origin) {
  const redirect = randomChars(REDIRECT_LENGTH);

  const short = new Short({
    origin: url,
    redirect: `${origin}/${redirect}`,
  });

  await short.save();

  return short.redirect;
}

async function get(redirect, origin) {
  const short = await Short.findOne({ redirect: `${origin}/${redirect}` });

  return short.origin;
}

module.exports = {
  create,
  get,
};
