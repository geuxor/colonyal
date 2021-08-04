import moment from "moment";
import "./Card.component.scss";
import React from "react";
import { Card, Avatar } from "antd";
import { useHistory } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/base/assets/CloudinaryImage";
import URLConfig from "@cloudinary/base/config/URLConfig";
import CloudConfig from "@cloudinary/base/config/CloudConfig";
import { useDispatch } from "react-redux";

const { Meta } = Card;

function DesignCard({ p }) {
  let cloudConfig = new CloudConfig({ cloudName: "geuxor" });
  let urlConfig = new URLConfig({ secure: true });
  let myImage = new CloudinaryImage(p.image, cloudConfig, urlConfig);
  const history = useHistory();
  const dispatch = useDispatch();
  
  const handleBook = async (e) => {
    console.log('dispatching product', p.id);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: { product: { ...p } },
        });
    history.push(`/product/${p.id}`);
    //if user is loggedin
    // //get session from stripe and to show a btn > checkout with
    // console.log('you click to buy', p)
    // const res = await apiStripe.getSessionId(p);
    // console.log('Stripe Session ID received: -', res.data);
  };

  return (
    <>
      <div className="col-4 p-3">
        <div className="card text-white card-has-bg click-col">
          <div className="card-img-overlay d-flex flex-column p-0">
            <AdvancedImage
              style={{
                maxHeight: 100,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                zIndex: 1,
              }}
              cldImg={myImage}
            />
            <div className="card-body">
              <h5 className="card-title text-white pt-2">{p.title}</h5>
              <p className="card-meta p-1">{p.description}</p>
            </div>

            <div className="d-flex flex-row justify-content-between card-footer">
              <div className="align-self-start">
                <b>Kr. {p.price}.00</b>
              </div>
              <div className="media d-flex flex-row align-self-center">
                <img
                  className="mr-1 rounded-circle"
                  src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/male-512.png"
                  alt={p.User.firstname}
                  style={{ maxWidth: 24, maxHeight: 24, margin: 0 }}
                />
                <div className="media-body px-1">
                  <small>
                    <i className="far fa-clock px-1"></i>
                    {moment(p.createdAt).fromNow()}
                  </small>
                </div>
              </div>
            </div>
            <button onClick={handleBook} className="btn-small btn-color px-1">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DesignCard;
