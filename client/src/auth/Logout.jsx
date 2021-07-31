import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import apiService from "../ApiService/auth";
import { toast } from "react-toastify";
import { useEffect } from 'react';

export const Logout = async () => {
  console.log("LOGOUT");
  const dispatch = useDispatch();
  const history = useHistory();
  
  // useEffect
  try {
    let res = await apiService.logout();
    console.log("logout response", res);
    // if (res) {  //&& res.data
    dispatch({
      type: "LOGOUT",
      // payload: null,
    });
    history.push("/login");
    // }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.status >= 400)
      toast.error(err.response.data);
  }

  history.push("/login");
};
