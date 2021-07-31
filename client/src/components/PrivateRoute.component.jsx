import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLogin } from "../utils/auth"
import Admin from './Admin/Admin.component';


const PrivateRoute = ({ component: Component, ...rest }) => {
  //  isAuthenticated ? (
  const { loggedIn } = useSelector((state) => ({ ...state }));

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