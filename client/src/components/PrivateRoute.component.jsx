import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loggedIn } = useSelector((state) => ({ ...state }));

  loggedIn
    ? console.log("privateRoute: loggedIn!")
    : console.log("privateRoute: NOT loggedIn! - redirect to Login");

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
