import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiStripe from "../../ApiService/stripe"
import { LoadingOutlined } from "@ant-design/icons";

const StripeCancel = ({ match, history }) => {
  // const store = useSelector((state) => (state));

  useEffect(() => {
    // console.log(
    //   "send this productid to backend to create order",
    //   match.params.productId
    // );
    console.log(match.params.productId);
    console.log('Success: getting ready to stripeSuccessReques!');
    const okres = true;
    // apiStripe
      // .stripeSuccessRequest({productId: match.params.productId})
      // .then((res) => {

        if (okres) {
          // console.log("res.data.success : stripe success response", res.data);
          toast.success("Your purchase has been successfull!");
          setTimeout(() => {
            history.push("/dashboard/seller");
          }, 2000);
        } else {
          // console.log("stripe payment failure", res.data);
          toast.error("Your purchase was declined - Please retry!");
          setTimeout(() => {
            history.push("/products");
            // history.push("/stripe/failure");
          }, 3000);
        }
      // });
  }, [match.params.productId]);

  return (
    <div className="container">
      <div className="d-flex justify-content-center p-5">
        <LoadingOutlined className="display-1 text-danger p-5" />
      </div>
    </div>
  );
};

export default StripeCancel;
