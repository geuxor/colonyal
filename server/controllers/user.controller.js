const bcrypt = require('bcrypt');
const User = require('../models/user')
const { validateNewUser, validateOldUser } = require('../utils/validate.user')

const create = async (req, res) => {
  console.log('entering create controller')
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: '🐛 User already exists' });
  try {
    // bcrypt.hash
    const newUser = await validateNewUser(req.body)
    console.log('newUser Created OK', newUser)
    const user = await newUser.save();
    req.session.uid = newUser._id;
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error, message: '🐛 Could not create user' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    // bcrypt.compare
    const validatedPass = await validateOldUser(user, password)
    if (!validatedPass) throw new Error();
    req.session.uid = user._id;
    res.status(200).send(user);
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: '🐛 Username or password is incorrect' });
  }

};

const profile = async (req, res) => {
  try {
    const { _id, firstName, lastName } = req.user;
    const user = { _id, firstName, lastName };
    res.status(200).send(user);
  } catch {
    res.status(404).send({ error, message: '🐛 User not found' });
  }

};

const logout = (req, res) => {
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

module.exports = { create, login, profile, logout };
