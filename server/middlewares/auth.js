// const redis_url = process.env.REDIS_URL || null;
// const redis = require("redis");
// const client = redis.createClient(redis_url);

const User = require('./../models/user');

const authMiddleware = async (req, res, next) => {
  console.log('🚽 entering authMW')
  try {
    const { uid } = req.session;
    console.log('UID', uid);
    const user = await User.findOne({ _id: uid });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};


// const authCaching = (req, res, next) => {
//     const { redis_key } = req.headers
//     client.get(redis_key, function (err, reply) {
//       if (err) {
//         res.status(500).json({
//           message: "Somethin Went Wrong"
//         })
//       }
//       if (reply == null) {
//         next()
//       } else {
//         res.status(200).json({
//           message: `Success Read ${redis_key}`,
//           data: JSON.parse(reply)
//         })
//       }
//     }),
//   caching: (key, data) => {
//     client.set(key, JSON.stringify(data))
//   },
//   delCache: (key) => {
//     client.del(key)
//   }
// }

module.exports = authMiddleware;
