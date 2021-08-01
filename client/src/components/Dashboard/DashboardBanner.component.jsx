import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar, Badge } from "antd";
import moment from "moment";
import {
  getAccountBalance,
  currencyFormatter,
  payoutSetting,
} from "../../ApiService/stripe";
import { SettingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
const { Meta } = Card;
const { Ribbon } = Badge;

const DashboardBanner = () => {
  // const user = useSelector((state) => ({ ...state }));
    const store = useSelector((state) => state);
  console.log('xxxx-xxxxx', store.user);
  // const { user } = state;
  const [, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getAccountBalance(store.user).then((res) => {
      // console.log(res);
      setBalance(res.data);
    });
  }, []);

  const handlePayoutSettings = async () => {
    setLoading(true);
    try {
      const res = await payoutSetting(store.user);
      console.log("res = one time stripe payout settings link ", res);
      window.location.href = res.data.url;
      setLoading(false);
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
            avatar={<Avatar>{store.user[0]}</Avatar>}
            title={`${store.user}'s Dashboard`}
            description={`Joined ${moment(store.user.createdAt).fromNow()}`}
          />
        </div>
      </Card>
      {store.user &&
        store.user.stripe_seller &&
        store.user.stripe_seller.charges_enabled && (
          <>
            <Ribbon text="Avaliable" color="grey">
              <Card className="bg-light pt-1">
                {balance &&
                  balance.pending &&
                  balance.pending.map((bp, i) => (
                    <span key={i} className="lead">
                      {currencyFormatter(bp)}
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
