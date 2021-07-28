const express = require('express');
const cors = require('cors');
const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 4001;
const session = require('express-session');
const SECRET = process.env.SECRET || '*&^%$£$%TYUJIKL?<HDTYUKO<MKNBFE£$R%T^Y&UJNBFW';
const router = require('./routers/router');
require('dotenv').config()
const corsConfig = {
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());

app.use(
  session({
    // the store property, if not specified, defaults to the in-memory store
    name: 'C-sid',
    saveUninitialized: false,
    resave: false,
    secret: SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1hr
      sameSite: true,
      httpOnly: false,
      // we would want to set secure and httponly =true in a production environment
      secure: false,
    },
  })
);

app.use(router);
app.get('*', (req, res) => {
  res.status(404).send('Nothing found 🌵');
});

const server = app.listen(SERVER_PORT, (err) => {
  if (err) {
    console.log(`👽 Bad errors occuring! ${err}`); // eslint-disable-line no-console
  } else {
    console.log(`🛰️ Server (sessions) is listening on port ${SERVER_PORT}!`); // eslint-disable-line no-console
  }
});

// server needs to be exported for the tests to work
module.exports = server;
