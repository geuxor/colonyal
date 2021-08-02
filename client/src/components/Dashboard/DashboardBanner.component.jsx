import { useState } from "react";
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
  const [, setLoading] = useState(false);
  const [, setBalance] = useState({});
  const dispatch = useDispatch();
  
    const handleStripeBalance = async () => {
    console.log("checking account balance for", store);
    if (store.loggedIn & (store.email !== "")) {
      let res = await apiStripe.getAccountBalance(store);
      console.log("*****fetching account balance", res); //updatedStripeBalance
      dispatch({
        type: "LOGGED_IN_USER",
        // payload: { balance: { ...res.data } },
        payload: { stripe: { ...res.data } },
      });
      setBalance({
        balance_pending_amount: res.data.balance_pending_amount,
        balance_pending_curr: res.data.balance_pending_curr,
      });
      console.log("*****", {
        balance_pending_amount: res.data.balance_pending_amount,
        balance_pending_curr: res.data.balance_pending_curr,
      });
      // balance.pending.map((bp, i) => (
      //   console.log(apiStripe.currencyFormatter(bp))
      // ))
    }
  };

  const handlePayoutSettings = async () => {
    setLoading(true);
    try {
      const res = await apiStripe.payoutSetting();
      console.log("res = one time stripe payout settings link ", res);
      window.location.href = res.data.url;
      setLoading(false);
      // dispatch({
      //   type: "LOGGED_IN_USER",
      //   payload: { email: res.data },
      // });
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
              {store.stripe.balance_pending_curr && store.stripe
                .balance_pending_amount !== null ? (
                <>
                  {apiStripe.currencyFormatter({
                    amount: store.stripe.balance_pending_amount,
                    currency: store.stripe.balance_pending_curr,
                  })}
                </>
              ) : (
                "unavailable"
              )}
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
                  onClick={() => handleStripeBalance()}
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

              // {
              //   store.balance &&
              //     store.balance.pending &&
              //     store.balance.pending.map((bp, i) => (
              //       <span key={i} className="lead">
              //         {apiStripe.currencyFormatter(bp)}
              //       </span>
              //     ));
              // }