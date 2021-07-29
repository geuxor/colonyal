// const redis_url = process.env.REDIS_URL || null;
// const redis = require("redis");
// const client = redis.createClient(redis_url);
// const User = require('../../user');

const db = require('../models/index')

const authMiddleware = async (req, res, next) => {
  console.log('🚽 entering authMW')
  try {
    const { uid } = req.session;
    console.log('UID', uid);
    if (!uid) throw new Error();
    const user = await db.User.findOne({ where: { id: uid }});    
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

module.exports = authMiddleware;
