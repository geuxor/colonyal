import { useSelector } from "react-redux";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import { useLogOut } from "../../auth/Logout";

const Navbar = () => {
  const loggedIn = useSelector((state) => state.loggedIn);
  console.log("Navbar: user is loggedin:", loggedIn);
  const { logoutUser } = useLogOut();
 
  return (
    <div className="nav bg-light d-flex justify-content-center">
      <Link className="nav-link" to="/">
        Home
      </Link>
      {loggedIn ? (
        <>
          <Link className="nav-link p-2" to="/stripe/callback">
            stripeCallback
          </Link>
          <Link className="nav-link p-2" to="/products">
            Products
          </Link>
          <Link className="nav-link p-2" to="/admin">
            Admin
          </Link>
          <Link className="nav-link m-2" to="/dashboard/buyer">
            Dashboard
          </Link>
          <Link className="nav-link" to="/products/new">
            Add Product
          </Link>
          <Link className="nav-link" to="/cloudinary">
            Cloudinary
          </Link>

          <Button
            className="nav-link m-2"
            component={NavLink}
            color="white"
            to="/logout"
            // you can safely logout user since no hooks are being called
            onClick={function () {
              logoutUser();
            }}
          >
            Logout
          </Button>
        </>
      ) : (
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
          <Link className="nav-link" to="/stripe/callback">
            StripeCallback
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
