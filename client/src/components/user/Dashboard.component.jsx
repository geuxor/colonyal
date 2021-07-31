import DashboardNav from "../Navigation/DashboardNav.component";
import ConnectNav from "../Navigation/ConnectNav.component"
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="container-fluid bg-warning p-3">
        <ConnectNav />
      </div>

      <div className="container-fluid pb-4">
        <DashboardNav />
      </div>

      <div className="container-fluid">
        <p>Show all orders and a button to browse products</p>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-10">
              <h2>My Orders</h2>
            </div>
            <div className="col-md-2">
              <Link to="/" className="btn btn-primary">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
