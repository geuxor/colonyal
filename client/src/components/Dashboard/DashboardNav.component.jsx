import { Link } from "react-router-dom";

const DashboardNav = () => {
  const active = window.location.pathname;
    // console.log(active);
  return (
    <div className="">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            className={`nav-link ${active === "/dashboard/buyer" && "active"}`}
            to="/dashboard/buyer"
          >
            Your Orders
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${active === "/dashboard/seller" && "active"}`}
            to="/dashboard/seller"
          >
            Your Products
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardNav;
