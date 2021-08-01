import { currencyFormatter } from "../../actions/stripe";
import { diffDays } from "../../actions/products"
import { useHistory, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SmallCard = ({
  p,
  handleProductDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {
  const history = useHistory();
  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            {p.image && p.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/product/image/${p._id}`}
                alt="default product image"
                className="card-image img img-fluid"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
                alt="default product image"
                className="card-image img img-fluid"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {p.title}{" "}
                <span className="float-right text-primary">
                  {currencyFormatter({
                    amount: p.price,
                    currency: "dkk",
                  })}
                </span>{" "}
              </h3>
              <p className="alert alert-info">{p.location}</p>
              <p className="card-text">{`${p.description.substring(1, 200)}...`}</p>
              <p className="card-text">
                <span className="float-right text-primary">
                  for {diffDays(p.from, p.to)}{" "}
                  {diffDays(p.from, p.to) <= 1 ? " day" : " days"}
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
                {owner && (
                  <>
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
