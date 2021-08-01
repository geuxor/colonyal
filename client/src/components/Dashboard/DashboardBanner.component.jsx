import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar, Badge } from "antd";
import moment from "moment";
import apiStripe from "../../ApiService/stripe";
import { SettingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
const { Meta } = Card;
const { Ribbon } = Badge;

const DashboardBanner = () => {
  const store = useSelector((state) => state);
  // const store = useSelector((state) => state);
  console.log("DashboardBanner store", store);
  // const { user } = state;
  const [, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const dispatch = useDispatch();
  
  // useEffect(() => {
    const stripeBalance = async () => {
    console.log("checking account balance for", store);
    if (store.loggedIn & (store.email !== "")) {
      let res = await apiStripe.getAccountBalance(store);
      console.log("fetching account balance", res.data);
      setBalance(res.data);
      console.log("*****", balance);
      dispatch({
        type: "LOGGED_IN_USER",
        payload: { balance: { ...balance } },
      });
    }
  };
  // }, []);

  const handlePayoutSettings = async () => {
    setLoading(true);
    try {
      const res = await apiStripe.payoutSetting();
      console.log("res = one time stripe payout settings link ", res);
      window.location.href = res.data.url;
      setLoading(false);
      dispatch({
        type: "LOGGED_IN_USER",
        payload: { email: res.data },
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast("Unable to access settings. Try again");
    }
  };

  return (
    <div>
      <Card className="p-0">
        <div className="d-flex">
          <Meta
            avatar={<Avatar>{store.user.email[0]}</Avatar>}
            title={`${store.user.firstname}'s Dashboard`}
            description={`Joined ${moment(store.user.createdAt).fromNow()}`}
          />
        </div>
      </Card>
      {store.user.email && store.stripe && store.stripe.charges_enabled && (
        <>
          <Ribbon text="Avaliable" color="grey">
            <Card className="bg-light p-0">
              {store.balance &&
                store.balance.pending &&
                store.balance.pending.map((bp, i) => (
                  <span key={i} className="lead">
                    {apiStripe.currencyFormatter(bp)}
                  </span>
                ))}
            </Card>
          </Ribbon>
          <Ribbon text="Payouts" color="silver">
            <Card className="bg-light pointer">
              <div>
                <SettingOutlined
                  onClick={handlePayoutSettings}
                  className="h5 pt-2"
                />
              </div>
              <div>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => stripeBalance()}
                >
                  Update Balance
                </button>
              </div>
            </Card>
          </Ribbon>
        </>
      )}
    </div>
  );
};

export default DashboardBanner;

// balance.pending.map((bp, i) => (
//   <span key={i} className="lead">
//     {currencyFormatter(bp)}
//   </span>
