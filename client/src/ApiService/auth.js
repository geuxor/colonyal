import axios from 'axios'
console.log('welcome to actions/auth.js');
console.log(process.env.REACT_APP_API)

const apiAuth = {};
const options = {
  // headers: { 'X-Custom-Header': 'value' },
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
  withCredentials: true
  // xsrfCookieName: 'XSRF-TOKEN',
  // xsrfHeaderName: 'X-XSRF-TOKEN',
};

apiAuth.getStatus = async (sid) => {
  return await axios.post(`${process.env.REACT_APP_API}/status`, sid, options);
};

apiAuth.getProfile = async (sid) => {
  return await axios.post(`${process.env.REACT_APP_API}/profile`, null, options);
};

apiAuth.registerUser = async (user) => {
  return await axios.post(`${process.env.REACT_APP_API}/register`, user);
}

apiAuth.loginUser = async (user) => {
  return await axios.post(`${process.env.REACT_APP_API}/login`, user, options);
};

apiAuth.logout = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/logout`);
};

export default apiAuth;
