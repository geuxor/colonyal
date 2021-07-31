import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //  isAuthenticated ? (
  const { loggedIn } = useSelector((state) => ({ ...state }));
console.log('privateRoute loggedIn?', loggedIn);
  // return auth && auth.token ? <Route {...rest} /> : <Redirect to="/login" />;
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
// isLogin() ? <Component {...props} /> : <Redirect to="/login" />