const db = require('../models/index')

const statusMiddleware = async (req, res, next) => {
  console.log('statusMW:.......................🚽 entering statusMiddelWare')
  console.log('with session:', req.session.loggedIn);

  if (req.session.loggedIn) { //req.path === '/login'
    console.log(req.session.loggedIn)
    // next();
  } else {
    console.log('redirecting to /login');
    
    res.send(redirect("/login"))
  }
}


//   try {
//     const { uid } = req.session;
//     console.log('MW: UID', uid);
//     if (!uid) throw new Error('no Cookie');
//     const user = await db.User.findOne({ where: { id: uid } });
//     console.log('User.id', user.id)
//     if (!user) throw new Error();
//     req.user = user;
//     next();
//   } catch (err) {
//     // return res.sendStatus(402);
//     res.status(401).send(err)
//   }
// };

module.exports = statusMiddleware;
