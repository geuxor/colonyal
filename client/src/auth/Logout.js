import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import apiAuth from "../ApiService/auth"
import { delete_cookie } from "../utils/cookieHandler";
import { toast } from "react-toastify";
import { useEffect } from 'react';

export const useLogOut = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const logoutUser = async () => {
    try {
      // console.log("logged out?-----------------");
      delete_cookie();
      dispatch({
        type: "LOGOUT",
      });
      toast.info('You are now Logged out...');
      let res = await apiAuth.logout();
      console.log("logout response", res);
      history.push("/login");
    } catch (err) {
      console.log("Error fetching users:", err.response.data);
      history.push("/login");
      if (err.response && err.response.status >= 400)
        toast.error(err.response.data);
    }
  }
  return { logoutUser }
};

export default function LogOut() {
  const { logoutUser } = useLogOut();
  useEffect(() => {
    logoutUser()
  });
  return <div>Logout</div>;
};
