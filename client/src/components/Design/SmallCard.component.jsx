import apiStripe from "../../ApiService/stripe";
import apiProduct from "../../ApiService/products";
import { useHistory, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
//cloudinary
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/base/assets/CloudinaryImage";
import URLConfig from "@cloudinary/base/config/URLConfig";
import CloudConfig from "@cloudinary/base/config/CloudConfig";

const SmallCard = ({
  p,
  handleProductDelete = (f) => f,
  showViewMoreButton = true,
}) => {
  const history = useHistory();
  let cloudConfig = new CloudConfig({ cloudName: "geuxor" });
  let urlConfig = new URLConfig({ secure: true });
  let myImage = new CloudinaryImage(p.image, cloudConfig, urlConfig);

  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            {p.image ? (
              <AdvancedImage style={{ width: 150 }} cldImg={myImage} />
            ) : (
              <img
                src="https://source.unsplash.com/user/erondu/200x200"
                className="card-image img img-fluid"
                alt=""
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {p.title}{" "}
                <span className="float-right text-primary">
                  {apiStripe.currencyFormatter({
                    amount: p.price * 100,
                    currency: "dkk",
                  })}
                </span>{" "}
              </h3>
              <p className="alert alert-info">{p.location}</p>
              <p className="card-text">{`${p.description.substring(
                1,
                200
              )}...`}</p>
              <p className="card-text">
                <span className="float-right text-primary">
                  for {apiProduct.diffDays(p.from, p.to)}{" "}
                  {apiProduct.diffDays(p.from, p.to) <= 1 ? " day" : " days"}
                </span>
              </p>
              <p className="card-text">{p.quantity}quantity</p>
              <p className="card-text">
                Available from {new Date(p.from).toLocaleDateString()}
              </p>

              <div className="d-flex justify-content-between h4">
                {showViewMoreButton && (
                  <button
                    onClick={() => history.push(`/product/${p._id}`)}
                    className="btn btn-primary"
                  >
                    Show more
                  </button>
                )}
                {p.User.firstname && (
                  <>
                    <p className="btn-sm btn btn-light text-truncate text-capitalize p-1">
                      sold by: {p.User.firstname}
                    </p>
                    <Link to={`/product/edit/${p._id}`}>
                      <EditOutlined className="text-warning" />
                    </Link>
                    <DeleteOutlined
                      onClick={() => handleProductDelete(p._id)}
                      className="text-danger"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallCard;
