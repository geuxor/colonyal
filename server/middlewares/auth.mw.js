const db = require('../models/index')

const authMiddleware = async (req, res, next) => {
  console.log('authMW:.......................🚽 entering authMiddelWare')
  console.log('with session:', req.sessionID);
  // console.log('with headers:', req.rawHeaders);
  
  try {
    const { uid } = req.session;
    console.log('MW: UID', uid);
    if (!uid) throw new Error('no Cookie');
    const user = await db.User.findOne({ where: { id: uid }});    
    console.log('User.id', user.id)
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (err) {
    // return res.sendStatus(402);
    res.status(401).send(err)
  }
};

module.exports = authMiddleware;
