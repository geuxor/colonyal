// import { get_cookie, delete_cookie } from "./client/src/utils/cookieHandler";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import apiAuth from "./client/src/ApiService/auth";
// import { toast } from "react-toastify";
// import { useEffect } from "react";

// // export const Logout = async () => {
// function Logout() {
//   console.log("LOGOUT");
//   const history = useHistory();
//   const dispatch = useDispatch();

//   useEffect((dispatch, history) => {
//     (async () => {
//       try {
//         console.log("logged out?-----------------");
//         delete_cookie(get_cookie());
//         let res = await apiAuth.logout();
//         console.log("logout response", res);
//         dispatch({
//           type: "LOGOUT",
//         });

//         history.push("/login");
//       } catch (err) {
//         console.log("Error fetching users:", err.response.data);
//         // history.push("/login");
//         if (err.response && err.response.status >= 400)
//           toast.error(err.response.data);
//       }
//     })();
//   }, []);
//   return history.push("/login");
// }
// // const { auth } = useSelector((state) => state); //(state) => ({ ...state })

// // export default Logout;
