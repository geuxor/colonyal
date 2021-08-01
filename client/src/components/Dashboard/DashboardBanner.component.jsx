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
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  // const store = useSelector((state) => state);
  console.log("DashboardBanner store", store);
  // const { user } = state;
  const [, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    console.log("checking account balance for", store);
    if (store.loggedIn & (store.email !== "")) {
      async function stripeBalance() {
        let res = await apiStripe.getAccountBalance(store);
        console.log("fetching account balance", res.data);
        setBalance(res.data);
        console.log("*****", balance);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: { balance: {...balance } },
        });
      }
      stripeBalance();
    }
  }, []);

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
      <Card>
        <div className="d-flex">
          <Meta
            avatar={<Avatar>{store.user.firstname[0]}</Avatar>}
            title={`${store.user.firstname}'s Dashboard`}
            description={`Joined ${moment(
              store.user.createdAt
            ).fromNow()}`}
          />
        </div>
      </Card>
      {store.user.email &&
        store.stripe &&
        store.stripe.charges_enabled && (
          <>
            <Ribbon text="Avaliable" color="grey">
              <Card className="bg-light pt-1">
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
              <Card onClick={handlePayoutSettings} className="bg-light pointer">
                <SettingOutlined className="h5 pt-2" />
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
