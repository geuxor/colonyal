import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Navbar(props) {
  // const { auth } = useSelector((state) => ({ ...state }));
  const auth = 'loggedin'
  //logout-
  // const logout = () => {
  //   dispatch({
  //     type: "LOGOUT",
  //     payload: null,
  //   });
  //   window.localStorage.removeItem("auth");
  //   // history.push("/login");
  // };

  // console.log(JSON.stringify(auth));

  return (
    <div className="nav bg-light d-flex justify-content-center">
      <Link className="nav-link" to="/">
        Home
      </Link>
      {auth !== null && (
        <>
          <Link className="nav-link p-2" to="/stripe/callback">
            stripeCallback
          </Link>
          <Link className="nav-link p-2" to="/">
            Products
          </Link>
          <Link className="nav-link p-2" to="/admin">
            Admin
          </Link>
          <Link className="nav-link m-2" to="/dashboard">
            Dashboard
          </Link>
          <Link className="nav-link p-2" to="/login" href="/login">
            Logout
          </Link>
        </>
      )}

      {auth === null && (
        <>
          <Link className="nav-link" to="/">
            Products
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </>
      )}
    </div>
  );
}

export default Navbar;

// Logout {//JSON.stringify(auth.user.username)}