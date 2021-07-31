// require('dotenv').config()
import axios from 'axios'
console.log('welcome to actions/auth.js');
console.log(process.env.REACT_APP_API)

const apiService = {};
const options = {
  // headers: { 'X-Custom-Header': 'value' },
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
  withCredentials: true
  // xsrfCookieName: 'XSRF-TOKEN',
  // xsrfHeaderName: 'X-XSRF-TOKEN',
};

apiService.getStatus = async (user) => {
  return await axios.post(`${process.env.REACT_APP_API}/status`, user, options);
};

apiService.registerUser = async (user) => {
// async function registerUser (user) {
  return await axios.post(`${process.env.REACT_APP_API}/register`, user);
}

// async function loginUser (user) {
//   console.log('ready to send', user);
//   return await axios.post(`${process.env.REACT_APP_API}/login`, user, { withCredentials: true });
// }

apiService.loginUser = async (user) => {
  return await axios.post(`${process.env.REACT_APP_API}/login`, user, options);
};

// export const loginUser = async (user) =>
//   await axios.get(`${process.env.REACT_APP_API}/login`, user, { withCredentials: true });


// update user in local storage / next() call back to redirect user to dashboard 
// export const updateUserInLocalStorage = (user, next) => {
//   if (window.localStorage.getItem("auth")) {
//     let auth = JSON.parse(localStorage.getItem("auth"));
//     auth.user = user;
//     localStorage.setItem("auth", JSON.stringify(auth));
//     next();
//   }
// };

// export { loginUser, registerUser }

apiService.logout = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/logout`);
};

export default apiService;
