const bcrypt = require('bcrypt');
const db = require('../models/index')
const { validateNewUser, validateOldUser } = require('../utils/validate.user')


// // Create instance
// const jane = User.build({ firstName: "Jane", lastName: "Doe" });
// await jane.save(); // save to database
// // Shortcut for creating instance and saving to database at once
// const jane = await User.create({ firstName: "Jane", lastName: "Doe" });
console.log('entering user.controller');

const getUsers = async (req, res) => {
  console.log('fetching All users');
  try {
    const users = await db.User.findAll();
    console.log('-----', users);
    // console.log(users.every(user => user instanceof User)); // true
    // console.log("All users:", JSON.stringify(users, null, 2));
    // users.row.forEach(m => m.timestamp = +m.timestamp)
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(404).send({ err, message: '🐛 Users not found' });
  }
}

// exports.post = async ctx => {
//   const msg = ctx.request.body;
//   try {
//     await db.Message.create({
//       authorId: msg.authorId,
//       content: msg.content
//     });
//     ctx.status = 200;
//   } catch (e) {
//     ctx.status = 500;
//     // Further handle your error on the back-end
//   }
// };

const profile = async (req, res) => {
  try {
    // const { _id, firstName, lastName } = req.user;
    // const user = { _id, firstName, lastName };
    const user = req.user
    res.status(200).send(user);
  } catch {
    res.status(404).send({ error, message: '🐛 User not found' });
  }

};


const create = async (req, res) => {
  console.log('entering create controller')
  const { email, password } = req.body;
  const user = await db.User.findOne({ where: {email: email}});
  if (user)
  return res
  .status(409)
  .send({ error: '409', message: '🐛 User already exists' });
  try {
    // bcrypt.hash
    // const newUser = await validateNewUser(req.body)

    console.log('newUser Created OK')
    const user = await db.User.create(req.body);
    req.session.uid = user.id;
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    
    res.status(400).send({ error, message: '🐛 Could not create user' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email: email, password: password }});
    console.log(user.email, user.password, 'found in DB!!!')
      // bcrypt.compare
    // const validatedPass = await validateOldUser(user, password)
    // if (!validatedPass) throw new Error();
    req.session.uid = user.id;
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ error: '401', message: '🐛 Username or password is incorrect' });
  }
};


const logout = (req, res) => {
  console.log('entering logout');
  
  req.session.destroy((error) => {
    if (error) {
      res
        .status(500)
        .send({ error, message: '🐛 Could not log out, please try again' });
    } else {
      res.clearCookie('sid');
      res.sendStatus(200);
    }
  });

};

module.exports = { getUsers, create, login, logout };
