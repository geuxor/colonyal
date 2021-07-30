import axios from 'axios'

export const registerUser = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/register`, user);

export const loginUser = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/login`, user);

// update user in local storage / next() call back to redirect user to dashboard 
export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem("auth")) {
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = user;
    localStorage.setItem("auth", JSON.stringify(auth));
    next();
  }
};