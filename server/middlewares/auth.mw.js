const db = require('../models/index')

const authMiddleware = async (req, res, next) => {
  console.log('authMW:                       🚽 entering authMiddelWare')
  console.log('with session:', req.sessionID);
  console.log('with headers:', req.rawHeaders);
  
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