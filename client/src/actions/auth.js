// require('dotenv').config()
import axios from 'axios'
console.log('welcome to actions/auth.js');
console.log(process.env.REACT_APP_API)

export const registerUser = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/register`, user);

async function loginUser (user) {
  console.log('ready to send', user);
  
  await axios.post(`${process.env.REACT_APP_API}/login`, user, () => {
    console.log(user);
  });
}


// export const loginUser = async (user) =>
//   await axios.get(`${process.env.REACT_APP_API}/login`, user, { withCredentials: true });


// update user in local storage / next() call back to redirect user to dashboard 
export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem("auth")) {
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = user;
    localStorage.setItem("auth", JSON.stringify(auth));
    next();
  }
};

export { loginUser }