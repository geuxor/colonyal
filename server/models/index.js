require('dotenv').config()
// const mongoose = require('mongoose');
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'authenticate';

mongoose.connect(
  `mongodb://localhost:${DB_PORT}/${DB_NAME}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(`💥 Something went terribly wrong! ${err}`); // eslint-disable-line no-console
    } else {
      console.log(`⚡ Database connection on ${DB_PORT} with ${DB_NAME}!`); // eslint-disable-line no-console
    }
  }
);

module.exports = mongoose;
