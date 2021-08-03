import React, { useState, useEffect } from "react";
import { useStore } from "react-redux";
import apiProduct from "../ApiService/products"
import apiStripe from "../ApiService/stripe"
import moment from "moment";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

const ViewProduct = ({ match, history }) => {
  const [product, setProduct] = useState({});
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const storeProduct = useSelector((state) => (state.product));

  useEffect(() => {
    loadSellerProduct();
  }, []);


  const loadSellerProduct = async () => {
    // get session from stripe and to show a btn > checkout with
    console.log("you click to buy", storeProduct);
    const res = await apiStripe.getSessionId(storeProduct);
    console.log('Stripe Session ID received: -', res.data);
    setSessionId(res.data)
    // setImage(res.data.product.image);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('ready handle booking - sending prod to stripe');
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_SECRET_KEY);
    stripe
      .redirectToCheckout({
        sessionId: sessionId,
      })
      .then((result) => console.log('i think i got it!', result));
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>{product.title}</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <br />
            <img
              src={image}
              alt={product.title}
              className="img img-fluid m-2"
            />
          </div>

          <div className="col-md-6">
            <br />
            <b>{product.content}</b>
            <p className="alert alert-info mt-3">${product.price}</p>
            <p className="card-text">
              <span className="float-right text-primary">
                for {apiProduct.diffDays(product.from, product.to)}{" "}
                {apiProduct.diffDays(product.from, product.to) <= 1
                  ? " day"
                  : " days"}
              </span>
            </p>
            <p>
              From <br />{" "}
              {moment(new Date(product.from)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <p>
              To <br />{" "}
              {moment(new Date(product.to)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <i>Posted by {product.postedBy && product.postedBy.name}</i>
            <br />
            <button
              onClick={handleClick}
              className="btn btn-block btn-lg btn-primary mt-3"
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : "Book Now" }
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
