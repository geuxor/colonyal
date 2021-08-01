import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute.component";
import { useSelector } from 'react-redux';
import LogOut from './auth/Logout'
import './App.css';
// import { useHistory } from "react-router-dom";
// components
import Navbar from './components/Navigation/Navbar.component'
import Login from './auth/Login';
import Admin from './components/Admin/Admin.component';
import Register from './auth/Register';
import DashboardBuyer from './components/Dashboard/DashboardBuyer.component';
import DashboardSeller from './components/Dashboard/DashboardSeller.component';
// import { useStatus } from './auth/checkStatus'
// import { useEffect } from 'react';

function App() {
  const user = useSelector((state) => state.user);
  console.log('user is', user);
  
  // const { checkUser } = checkStatus();
  // useEffect(() => {
  // useStatus()
  // }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/admin" component={Admin} />
          <Route path="/logout" component={LogOut} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/dashboard/seller" component={DashboardSeller} />
          <PrivateRoute exact path="/dashboard/buyer" component={DashboardBuyer} />
          <Redirect from="/" to="/" exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
// {/* <Navbar isAuthenticated={isAuthenticated} /> */ }
// {/* <PrivateRoute exact path="/admin" component={Admin} /> */ }
// {/* <Route exact path="/admin" component={Admin} /> */}

  // const initialState = auth.isAuthenticated();
  // const [isAuthenticated, setIsAuthenticated] = useState({
  //   status: 'pending',
  //   error: null,
  //   user: null,
  // })

  // async function getStatus(user) {
  //   console.log('getting status');

  //   try {
  //     let res = await apiAuth.loginUser(user);
  //     console.log("login response", res);
  //     // if (res.data && res.data === email) {
  //     //   console.log("LOGGIN SUCCESSFULL ===> ");
  //     //   console.log(res.data);
  //     // }
  //     setIsAuthenticated({ status: 'success', error: null, user })
  //   } catch (error) {
  //     console.log(error);
  //     setIsAuthenticated({ status: 'error', error, user: null })
  //     // if (error.response && error.response.status >= 400) toast.error(error.response.data);
  //   }
  // }

  // useEffect(() => {
  //   getStatus()
  // }, [])
//{/* <Route exact path="/logout" component={Logout} /> */ }