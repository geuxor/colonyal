import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import apiStripe from "../../ApiService/stripe";
// import apiAuth from "../../ApiService/auth";
// import { updateUserInLocalStorage } from "../../actions/auth";
import DesignSpin from "../Design/Spin.component";
import { toast } from "react-toastify";
import { get_cookie } from "../../utils/cookieHandler";
import { useHistory } from "react-router-dom";

const StripeCallback = () => {  //{ history }
  console.log("Stripe onboarding completed");
  // const store = useSelector((state) => ({ ...state }));
  // const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    //if user is logged in run accountStatus
    //  if (auth && auth.token) accountStatus();
    //read cookie
    //if cookie is there
    // send a login req

    (async () => {
      try {
        console.log("fetching profile");
        const sid = get_cookie();
        console.log("read the cookie:", sid);
        if (sid) {
          // let res = await apiAuth.getProfile();
          // console.log("profile response", res.data);
          // if (res.data) {
          //   console.log("Stripecall back LOGGED IN SUCCESSFULL ===> ");
          //   // save log in state to redux
          //   dispatch({
          //     type: "LOGGED_IN_USER",
          //     payload: { user: res.data },
          //   });
          //   // window.location.href = res.data;
          //   history.push("/dashboard/seller");
          // } else {
          //   toast.error("Error getting profile in - Please relogin");
          // }
          history.push("/dashboard/seller");
        }
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status >= 400)
          toast.error(err.response.data);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const accountStatus = async () => {
  //   try {
  //     //call stripe.js and then backend
  //     const res = await apiStripe.getAccountStatus(auth.token);
  //     console.log("USER ACCOUNT STATUS ON STRIPE CALLBACK", res);

  //     // after response update user in local storage / clear it before testing
  //     // updateUserInLocalStorage(res.data, () => {
  //     //this call back executes thanks to using next() in action/auth/updateUserInLocalStorage
  //     // update user in redux (make sure you clear localstorage before testing this)
  //     dispatch({
  //       type: "LOGGED_IN_USER",
  //       payload: res.data,
  //     });
  //     // redirect user to dashboard - not using Link!
  //     window.location.href = "/dashboard/seller";
  //     // });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return <DesignSpin message={"Checking if Stripe is ready..."} />;
};

export default StripeCallback;
