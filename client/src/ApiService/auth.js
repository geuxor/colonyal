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

apiService.getStatus = async (sid) => {
  return await axios.post(`${process.env.REACT_APP_API}/status`, sid, options);
};

apiService.registerUser = async (user) => {
  return await axios.post(`${process.env.REACT_APP_API}/register`, user);
}

apiService.loginUser = async (user) => {
  return await axios.post(`${process.env.REACT_APP_API}/login`, user, options);
};

apiService.logout = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/logout`);
};

export default apiService;
