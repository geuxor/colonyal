import React from "react";
import { useState } from "react";
import RegisterForm from "../components/RegisterForm.component";
import { toast } from "react-toastify";
import apiAuth from "../ApiService/auth";

function Register({ history }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const saveUser = async (e) => {
    e.preventDefault();
    // validation needed
    // if (!username || !email || !password) return console.log('error')
    try {
      const res = await apiAuth.registerUser({
        firstname,
        lastname,
        email,
        password,
      });
      console.log("Registered user:", res.data);
      toast.success(`Registration completed! - ${res.data.userID}`);
      history.push("/login"); //part of the BrowserRoute
    } catch (err) {
      if (err.response.status >= 400) {
        console.log(err.response.data);
        toast.error(`Something went bad - ${err.response.data}`);
      }
    }
  };

  return (
    <>
      <div className="container-fluid bg-primary text-center p-5 text-white">
        <h1>Register</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <RegisterForm
              saveUser={saveUser}
              firstname={firstname}
              setFirstname={setFirstname}
              lastname={lastname}
              setLastname={setLastname}
              password={password}
              setPassword={setPassword}
              email={email}
              setEmail={setEmail}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
