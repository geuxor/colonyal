const db = require('../models/index')

const authMiddleware = async (req, res, next) => {
  console.log('authMW:.......................🚽 entering authMiddelWare')
  console.log('with session:', req.sessionID, req.body);
  
  try {
    const { uid } = req.session;
    console.log('MW: UID', uid);
    if (!uid) throw new Error('no Cookie');
    const user = await db.User.findOne({ where: { id: uid }});    //and where { email: req.body }?
    console.log('User.id', user.id)
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send(err)
  }
};

module.exports = authMiddleware;
