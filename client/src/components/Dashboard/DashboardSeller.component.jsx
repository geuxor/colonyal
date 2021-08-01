import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiOutlined } from "@ant-design/icons";
import apiStripe from "../../ApiService/stripe";
import { toast } from "react-toastify";
import DashboardBanner from "./DashboardBanner.component";
import DashboardNav from "./DashboardNav.component";

const DashboardSeller = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => (state));
    // const store = useSelector((state) => state);
    console.log("store.....", store);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    //if user is logged in run accountStatus
    //  if (auth && auth.token) accountStatus();
    //read cookie
    //if cookie is there
    // send a login req

    (async () => {
      try {
        console.log("checking stripe conx for", store.user);
        let res = await apiStripe.stripeCheckAccount(store.user);
        console.log("res from stripconxacc", res);
        // let stripe = res.data
        dispatch({
          type: "LOGGED_IN_USER",
          payload: { stripe: { ...res.data } },
        });

      } catch (err) {
        if (err.response.data && err.response.data.length < 100) {
          console.log("errData", err.response.data);
          toast.error(err.response.data);
        } else {
          console.log("statusText", err.response.statusText);
          toast.error(
            `${err.response.statusText} Stripe check failed. Please Refresh your browser and relogin.`
          );
        }
        setLoading(false);
      }
    })();
  }, []);

  const handleClick = async () => {
    setLoading(true);
    try {
      // get stripe onboarding link
      console.log("gettin stripe onboarding link", store.user);

      let res = await apiStripe.stripeConnectAccount(store.user);
      //why is res undefined?
      console.log("res from stripconxacc", res.data);
      window.location.href = res.data;
    } catch (err) {
      if (err.response.data && err.response.data.length < 100) {
        console.log("errData", err.response.data);
        toast.error(err.response.data);
      } else {
        console.log("statusText", err.response.statusText);
        toast.error(
          `${err.response.statusText} Token- Stripe connect failed. Please Refresh your browser and Try again.`
        );
      }
      setLoading(false);
    }
  };

  const connected = () => (
    <div className="row">
      <div className="col-md-10">
        <h2>My Products</h2>
      </div>
      <div className="col-md-2">
        <Link to="/products/new" className="btn btn-primary">
          + Add New
        </Link>
      </div>
    </div>
  );

  const notConnected = () => (
    <div className="row">
      <div className="col-md-10 offset-md-1 text-left">
        <div className="p-1 pointer">
          <ApiOutlined className="h1" />
          <h4>Setup Payouts to create new Products</h4>
          <p className="lead">
            <b>Colonyal</b> partners with Stripe to transfer your earnings to
            your bank account You'll be redirected to Stripe's official platform
            to complete the process.
            <br />
            Once this has been completed you would be able to add new products
            and start selling!
          </p>
          <h5>
            Before you start the Danish Government requires the following
            information:
          </h5>
          <div className="text-muted">
            <ul>
              <li>Name</li>
              <li>Address</li>
              <li>Contact Details</li>
              <li>Proof of ID and Address</li>
              <li>Bank IBAN nr. in Denmark</li>
            </ul>
          </div>
          <button
            disabled={loading}
            onClick={handleClick}
            className="btn btn-primary mb-3"
          >
            {loading ? "Processing..." : "Setup Payouts Now"}
          </button>
          <br />
          <small>the whole process takes between 5-10 minutes</small>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="container-fluid bg-secondary p-3">
        <DashboardBanner />
      </div>

      <div className="container-fluid p-1">
        <DashboardNav />
      </div>

      <div className="container-fluid p-3">
        {store.stripe &&
        store.stripe.charges_enabled &&
        store.user.stripe_seller &&
        store.user.stripe_seller.charges_enabled
          ? connected()
          : notConnected()}
      </div>
    </>
  );
};

export default DashboardSeller;
