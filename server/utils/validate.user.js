const bcrypt = require('bcrypt');

const validateNewUser = async (userData) => {
  console.log('validation: 🚷 validating new user')
  console.log(userData.email, userData.password)
  const { password, firstname, lastname, email } = userData
  if (email === '') throw new Error('missing email address?');
  if (!firstname && !firstname >= 2) throw new Error('First Name must be bigger than 2 characters');
  if (!lastname && !lastname >= 2) throw new Error('Last Name must be bigger than 2 characters');
  if (password === '') throw new Error('missing password!');
  // if (user.isModified('password')) {
  const hashed = await encryptPw(password)
  const newUser = ({
    email,
    password: hashed,
    firstname,
    lastname,
  });
  console.log('validation: ready with newUser', newUser);
  return newUser;
}

const encryptPw = async (pw) => {
  console.log('encrypting pw');
  try {
    const hash = await bcrypt.hash(pw, 10)
    console.log('bcrypt.hash=', hash)
    return hash
    } catch (err) {
    console.log(err)
    throw new Error('Hashing Err:', err);
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

const validateOldUser = async (user, email, password) => {
  console.log('validation: 🚷 validating old user')
  console.log(user.email, ' with ', email)
  console.log(user.password, ' with ', password)
  if (user.email !== email) return console.log('the correct email is ', user.email)
  try {
    const validatedPw = await bcrypt.compare(password, user.password);
    validatedPw ? console.log('you passed') : console.log('you failed');
    return validatedPw
  } catch (err) {
    console.log("validation: 🚷 comparison ERR", err);
    throw new Error('Hashing Comparison Err:', err);
    }
  }

module.exports = { validateNewUser, validateOldUser }
