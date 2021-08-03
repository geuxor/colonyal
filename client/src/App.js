import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from "./components/PrivateRoute.component";
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
//hanlders
import { get_cookie } from "./utils/cookieHandler";
//css
import './App.css';
import "react-toastify/dist/ReactToastify.css";
// components
import Login from './auth/Login';
import LogOut from './auth/Logout'
import Register from './auth/Register';
import apiAuth from './ApiService/auth';
import Navbar from './components/Navigation/Navbar.component'
import Admin from './components/Admin/Admin.component';
import DashboardBuyer from './components/Dashboard/DashboardBuyer.component';
import DashboardSeller from './components/Dashboard/DashboardSeller.component';
import StripeCallback from './components/Stripe/StripeCallback.component';
import Cloudinary from './components/Cloudinary'
import Products from './Products/Products.component';
import NewProduct from './Products/NewProduct.component'
import ViewProduct from './Products/ViewProduct.component';
import StripeSuccess from './components/Stripe/StripeSuccess.component'
import StripeFailure from './components/Stripe/StripeFailure.component'

function App() {
  // const user = useSelector((state) => state.user);
  // const [{ user, isLoggedIn }, dispatch] = useStateValue();
  // console.log('user is', user);
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch();
  // const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const sid = get_cookie();
        console.log("App: cookie:", sid);
        if (sid) {
          let res = await apiAuth.getProfile();
          console.log("App: profile response:", res.data);
          if (res.data) {
            console.log("App: reLoggedIn SUCCESSFULL ===> ");
            // save log in state to redux
            dispatch({
              type: "LOGGED_IN_USER",
              payload: { user: res.data },
            });
          } else {
            console.log('App: err relogging - redirect to login')
            toast.error("App: Error reLogging you in - Please relogin");
          }
          setIsLoading(false)
        } else {
          // history.push("/login");
          setIsLoading(false)
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false)
        if (err.response && err.response.status >= 400)
          toast.error(err.response.data);
      }
    })();
  }, [dispatch]);

  return (
    <div className="App">
    {!isLoading ? (
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
          <Route exact path="/cloudinary" component={Cloudinary} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/admin" component={Admin} />
          <Route path="/logout" component={LogOut} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/products" component={Products} />
          <PrivateRoute exact path="/products/new" component={NewProduct} />
          <Route exact path="/product/:productId" component={ViewProduct} />
          <PrivateRoute exact path="/dashboard/buyer" component={DashboardBuyer} />
          <PrivateRoute exact path="/dashboard/seller" component={DashboardSeller} />
          <Route exact path="/stripe/callback" component={StripeCallback} />
            <Route exact path="/stripe/success/:productId" component={StripeSuccess}/>
            <Route exact path="/stripe/failure" component={StripeFailure} />
            <Redirect from="/" to="/products" exact />
        </Switch>
      </BrowserRouter>
      ) : (<p>im loading...</p>)}
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


//separate useEffect to a new function
// import { StatusCheck } from "./auth/StatusCheck"
// import Cloudinary from './components/Cloudinary';
// import Products from './Products/Products.component';
// (async () => {
//   try {
//     const status = await StatusCheck()
//     console.log('###', status);
//     setIsLoading(status)
//   } catch (err) {
//     console.log(err);
//     setIsLoading(false)
//     if (err.response && err.response.status >= 400)
//       toast.error(err.response.data);
//   }
// })()



// useEffect(() => {
//   (async () => {
//     try {
//       const sid = get_cookie();
//       console.log("App: cookie:", sid);
//       if (sid) {
//         let res = await apiAuth.getProfile();
//         console.log("App: profile response:", res.data);
//         if (res.data) {
//           console.log("App: reLoggedIn SUCCESSFULL ===> ");
//           // save log in state to redux
//           dispatch({
//             type: "LOGGED_IN_USER",
//             payload: { user: res.data },
//           });
//         } else {
//           console.log('App: err relogging - redirect to login')
//           toast.error("App: Error reLogging you in - Please relogin");
//         }
//         setIsLoading(false)
//       } else {
//         // history.push("/login");
//         setIsLoading(false)
//       }
//     } catch (err) {
//       console.log(err);
//       setIsLoading(false)
//       if (err.response && err.response.status >= 400)
//         toast.error(err.response.data);
//     }
//   })();
// }, [dispatch]);