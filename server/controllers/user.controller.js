const bcrypt = require('bcrypt');
const db = require('../models/index')
const { validateNewUser, validateOldUser } = require('../utils/validate.user')


function logme() {
  console.log('controller:                   🎮 entering user.controller *************');
}

const getUsers = async (req, res) => {
  logme()
  console.log('getUsers');
  try {
    const users = await db.User.findAll();
    console.log('   #', users.length, 'users found');
    // console.log(users.every(user => user instanceof db.User)); // true
    // console.log("All users:", JSON.stringify(users, null, 2));
    users.forEach(m => console.log(m.email))
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(404).send({ err, message: '🐛 Users not found' });
  }
}

const getUserProfile = async (req, res) => {
  logme()
  console.log('userProfile');
  try {
    // const { _id, firstName, lastName } = req.user;
    // const user = { _id, firstName, lastName };
    const user = req.user
    res.status(200).send(user);
  } catch {
    res.status(404).send({ error, message: '🐛 User not found' });
  }

};

const addUser = async (req, res) => {
  logme()
  console.log('addUser')
  const { email, password, firstname, lastname } = req.body;
  const user = await db.User.findOne({ where: {email: email}});
 
  if (user)
  return res
  .status(409)
  .send({ error: '409', message: '🐛 User already exists' });
  try {
    console.log('addUser: will soon bcrypting hash');
     const newUser = await validateNewUser(req.body)
     console.log('addUser: creating Validated newUser:', newUser);
    const user = await db.User.create(newUser);
    console.log('addUser: newUser Created:', user.toJSON())
    req.session.uid = user.id;
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: 'addUser: 🐛 Could not create user' });
  }
};

const loginUser = async (req, res) => {
  logme()
  console.log('loginUser');
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


const logoutUser = (req, res) => {
  console.log('logoutUser');
  req.session.destroy((error) => {
    if (error) {
      res
        .status(500)
        .send({ error, message: '🐛 Could not log out, please try again' });
    } else {
      res.clearCookie('sid');
      console.log('sid destroyed!!');      
      res.sendStatus(200);
    }
  });
};

module.exports = { getUsers, addUser, loginUser, logoutUser, getUserProfile };
