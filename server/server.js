const express = require('express');
const app = express();
const session = require('express-session');
const router = require('./routers/router');
const redis = require('redis')
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()
const cors = require('cors');
const SERVER_PORT = process.env.SERVER_PORT || 4001;
const { sequelize } = require('./models/index')

require('dotenv').config()

const corsConfig = {
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: process.env.SECRET || '*&^%$£$%TYUJIKL?<HDTYUKO<MKNBFE£$R%T^Y&UJNBFW',
    cookie: {
      maxAge: 1000 * 60 * 60, // 1hr
      sameSite: true,
      httpOnly: false,
      // set secure and httponly =true in prod
      secure: false,
    },
  })
);
redisClient.on('server: error', console.error)
console.log(redisClient._events.data);


app.use(router);
app.get('*', (req, res) => {
  res.status(404).send('server ERR:                   🌵 Nothing found');
});

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('server:                       💽 database synced')
    app.listen(process.env.SERVER_PORT, (err) => {  //SERVER_PORT
      if (err) {
        console.log(`server ERR:          👽 Bad errors occuring! ${err}`); // eslint-disable-line no-console
      } else {
        console.log(`===========================   🛰️ Server listening on port ${process.env.SERVER_PORT}! =========================`); // eslint-disable-line no-console
      }
    })
  } catch (err) {
    console.log(err)
  }
})();
