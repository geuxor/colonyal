import { useHistory } from "react-router-dom";
import apiAuth from "../ApiService/auth"
import { toast } from "react-toastify";
// import { useEffect } from 'react';
import { check_cookie } from '../utils/cookieHandler'


export const useStatus = async () => {

  const history = useHistory();

  // const checkUser = async () => {
  try {
    // dispatch({
    //   type: "STATUS",
    // });
    const sid = check_cookie()
    console.log('--------', sid);
    if (!sid) history.push("/login");
    console.log('###########', sid);

    // toast.info('whats happening?...');
    let res = await apiAuth.getStatus();
    console.log("status response", res);
    history.push("/login");
  } catch (err) {
    if (err.response && err.response.status >= 400) {
      console.log("Error fetching users:", err.response.data);
      toast.error(err.response.data);
      history.push("/login");
    } else {
      console.log("Error fetching users:", err);
    }
  } 
}
  // return { checkUser }
// };

// export default function checkStatus() {
//   const { checkUser } = useStatus();
//   useEffect(() => {
//     checkUser()
//   });
//   return <div>checked</div>;
// };
