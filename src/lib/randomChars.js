const crypto = require('crypto');

const DEFAULT_CHARS = 'AaBbCcDdEeFfGgHhIiJkKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';

function genRandomChars(length = 0, chars = DEFAULT_CHARS) {
  const random = crypto.randomBytes(length);

  const chain = new Array(length).fill(null);

  const len = 256 / Math.min(256, chars.length);

  const result = chain.map((_, index) => chars[Math.floor(random[index] / len)]);

  return result.join('');
}

module.exports = genRandomChars;
