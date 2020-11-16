const mongoose = require('mongoose');

const URI = process.env.MONGO_DB_URL;
const CONFIG = { useNewUrlParser: true };

const createDBConnection = () => (
  new Promise((resolve, reject) => {
    mongoose.connect(URI, CONFIG);
    mongoose.connection
      .once('open', () => { resolve(); })
      .on('error', (error) => { reject(error); });
  })
);

module.exports = createDBConnection;
