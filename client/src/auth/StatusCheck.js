import React from 'react';
import { get_cookie } from "../utils/cookieHandler"
import apiAuth from "../ApiService/auth"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify";

async function StatusCheck () {
  console.log('status check *****');
  
  const dispatch = useDispatch();
  console.log('dispatched ok');
  
  const sid = get_cookie();
  console.log("App: cookie:", sid);
  if (sid) {
    let res = await apiAuth.getProfile();
    console.log("App: profile response:", res.data);
    if (res.data) {
      console.log("App: reLoggedIn SUCCESSFULL ===> ");
      // save log in state to redux
      dispatch({
        type: "LOGGED_IN_USER",
        payload: { user: res.data },
      });
    } else {
      console.log('App: err relogging - redirect to login')
      toast.error("App: Error reLogging you in - Please relogin");
    }
    // return false
    // setIsLoading(false)
  } else {
    // history.push("/login");
    // return false
  }

  return (false);

}

export default StatusCheck;