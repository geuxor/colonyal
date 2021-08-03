import moment from "moment";
import "./Card.component.scss";
import apiStripe from "../../ApiService/stripe";
import React from "react";
import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
//cloudinary
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/base/assets/CloudinaryImage";
import URLConfig from "@cloudinary/base/config/URLConfig";
import CloudConfig from "@cloudinary/base/config/CloudConfig";
import { thumbnail } from "@cloudinary/base/actions/resize";
import { focusOn } from "@cloudinary/base/qualifiers/gravity";
import { face } from "@cloudinary/base/qualifiers/focusOn";
import { byRadius } from "@cloudinary/base/actions/roundCorners";

const { Meta } = Card;

function DesignCard({ p }) {
  let cloudConfig = new CloudConfig({ cloudName: "geuxor" });
  let urlConfig = new URLConfig({ secure: true });
  let myImage = new CloudinaryImage(p.image, cloudConfig, urlConfig);

  return (
    <>
      <div className="col-sm-4 p-1">
        <div className="card text-white card-has-bg click-col">
          <div className="card-img-overlay d-flex flex-column p-0">
            <AdvancedImage
              style={{
                maxWidth: 216,
                maxHeight: 100,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                zIndex: 1,
              }}
              cldImg={myImage}
            />
            <div className="card-body">
              <h5 className="card-title text-white pt-1">{p.title}</h5>
              <small className="card-meta p-1">{p.description}</small>
            </div>

            <div className="card-footer">
              <div className="media d-flex flex-row align-items-end justify-content-end">
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
            <button className="btn-small btn-color px-1">Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DesignCard;
