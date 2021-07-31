import apiService from "../../ApiService/auth"
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Logout } from "../../auth/Logout"
const Navbar = () => {
  const user = useSelector((state) => state.user);
  console.log("Navbar: user is", user);

  // const Navbar = ({ isAuthenticated }) => {
  // console.log("isAuthenticated", isAuthenticated);
  // const initialState = auth.isAuthenticated();
  // const [isAuthenticated, setIsAuthenticated] = useState(true);
  // isAuthenticated=true

  // console.log(JSON.stringify(auth));

  return (
    <div className="nav bg-light d-flex justify-content-center">
      <Link className="nav-link" to="/">
        Home
      </Link>
      {user ? (
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
          <Link className="nav-link m-2" to="/logout">
            Logout
          </Link>
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
        </>
      )}
    </div>
  );
};

export default Navbar;

// Logout {//JSON.stringify(auth.user.username)}
// {isAuthenticated ? (
//         ) : (
// )}

// <Link to="/logout">Logout</Link>;
          // <button onClick={Logout} className="nav-link">
          //   Logout
          // </button>;