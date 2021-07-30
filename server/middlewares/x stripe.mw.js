const expressJwt = require('express-jwt')

//generates req.user by default with content depending on jwt.sign({ _id: user._id }) in auth.controller
const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

module.exports = { requireSignin }
