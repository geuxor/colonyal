import { get_cookie } from '../utils/cookieHandler'
import { useState } from "react";
import { toast } from "react-toastify";
import apiService from "../ApiService/auth";
import LoginForm from "../components/LoginForm.component";
import { useDispatch } from "react-redux";

const Login = ({ history }) => {
  console.log("welcome to login");
  const [email, setEmail] = useState("x@x.ggg");
  const [password, setPassword] = useState("1234");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SEND LOGIN DATA", { email, password });
    const user = { email, password };
    try {
      let res = await apiService.loginUser(user);
      console.log("login response", res);
      if (res.data && res.data === email) {
        console.log("LOGGIN SUCCESSFULL ===> ");
        console.log(res.data);
        //cookie read
        const mycookie = get_cookie()
        console.log("newcookie", mycookie);
        if (mycookie) {
          // save log in state to redux
          dispatch({
            type: "LOGGED_IN_USER",
            payload: res.data,
          });
          history.push("/admin");
        } else {
          toast.error('Error logging in');
        }
        
      }
    } catch (err) {
      console.log(err);

      if (err.response && err.response.status >= 400)
        toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Login</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <LoginForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
