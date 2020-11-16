const mongoose = require('mongoose');
const { URL } = require('url');

const checkURL = (url) => {
  try {
    const test = new URL(url);
    return !!test;
  } catch (error) {
    return false;
  }
};

const URLSchema = {
  type: String,
  validate: {
    validator: checkURL,
    message: (props) => `${props.value} is not a valid URL!`,
  },
  required: [true, 'Origin URL required'],
  unique: true,
  index: true,
};

const Short = mongoose.model('Short', {
  origin: { ...URLSchema },
  redirect: { ...URLSchema },
});

module.exports = Short;
