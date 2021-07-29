const bcrypt = require('bcrypt');
const User = require('../../user')
console.log('🚷 Entering user Validation')

const validateNewUser = async (userData) => {
  console.log('-------', userData, '-------');
  const { password, firstName, lastName, email } = userData
  try {

    if (password === '') throw new Error('x');
    const hash = await bcrypt.hash(password, 10);
    if (!firstName || !firstName >= 2) return res.status(400).send('First Name must be bigger than 2 characters');
    if (!lastName || !lastName >= 2) return res.status(400).send('Last Name must be bigger than 2 characters');
    console.log('bcrypt.hash=', hash)
    const newUser = new User({
      email,
      password: hash,
      firstName,
      lastName,
    });
    return newUser
  } catch (err) {
    console.log(err)
    return err
  }
}

const validateEmail = () => {
  //   Your User model should have an active attribute that is false by default
  //   When the user submits a valid signup form, create a new User(who's active will be false initially)
  //   Create a long random string(128 characters is usually good) with a crypto library and store it in your database with a reference to the User ID
  //   Send an email to the supplied email address with the hash as part of a link pointing back to a route on your server
  //   When a user clicks the link and hits your route, check for the hash passed in the URL
  //   If the hash exists in the database, get the related user and set their active property to true
  //   Delete the hash from the database, it is no longer needed
}

const validateOldUser = async (user, password) => {
  console.log('-------', user, password, '-------');
  const validatedPass = await bcrypt.compare(password, user.password);
  return validatedPass
}

module.exports = { validateNewUser, validateOldUser }
