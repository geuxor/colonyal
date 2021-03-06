import { get_cookie } from "../utils/cookieHandler";
import { useState } from "react";
import { toast } from "react-toastify";
import apiAuth from "../ApiService/auth";
import LoginForm from "../components/LoginForm.component";
import { useDispatch } from "react-redux";

const Login = ({ history }) => {
  console.log("Login: welcome");
  const [email, setEmail] = useState("x@x.ggg");
  const [password, setPassword] = useState("1234");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SEND LOGIN DATA", { email, password });
    const user = { email, password };
    try {
      let res = await apiAuth.loginUser(user);
      console.log("login response", res);
      if (res.data && res.data.email === email) {
        console.log("LOGGIN SUCCESSFULL ===> ");
        console.log(res.data);
        const mycookie = get_cookie();
        console.log("newcookie", mycookie);
        if (mycookie) {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: { user: { ...res.data } },
          });
          history.push("/dashboard/buyer");
        } else {
          toast.error("Error logging in");
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
