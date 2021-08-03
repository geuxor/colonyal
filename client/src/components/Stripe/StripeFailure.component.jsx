import React from "react";

const StripeCancel = ({ history }) => {
  setTimeout(() => {
    history.push('/products')
  }, 3000);
  return (
    <div className="container">
      <div className="col">
        <h2 className="text-center p-5">Payment failed. Try again.</h2>

      </div>
    </div>
  );
};

export default StripeCancel;
