import apiService from '../ApiService/auth';
import axios from 'axios'
export function get_cookie() {
  // console.log("document.cookie=>", document.cookie);
  return document.cookie.split(';').some(c => {
    return c.trim().startsWith(process.env.REACT_APP_KUK + '=');
  });
}

export function delete_cookie() {
  document.cookie = process.env.REACT_APP_KUK + '=; Max-Age=-99999999;'
}

//check cookie upon refresh on initial pageload to avoid relogin
export function check_cookie() {
  console.log('checking cookie');  
  const sid = document.cookie.split(';').find(c => {
    return c.trim().startsWith(process.env.REACT_APP_KUK + '=')
  })

  // const res = await apiService.loginUser(sid)
  // console.log('res', res)
  return sid

}
