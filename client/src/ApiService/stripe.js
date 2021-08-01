import axios from "axios";

const apiStripe = {};
const options = {
  // headers: { 'X-Custom-Header': 'value' },
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
  withCredentials: true
  // xsrfCookieName: 'XSRF-TOKEN',
  // xsrfHeaderName: 'X-XSRF-TOKEN',
};

//do we need async await here?
apiStripe.stripeConnectAccount = async (user) => {
  return await axios.post(`${process.env.REACT_APP_API}/stripe/connect-account`, user)
}

//func => axios.post does a return - but if no {} no return
//func => { return axios.post } - return needed
apiStripe.getAccountStatus = async (token) => {
  //we need return here!
  return axios.post(
    `${process.env.REACT_APP_API}/get-account-status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
}


// no {} and return used - and it works anyway
apiStripe.getAccountBalance = async (store) =>
  axios.post(
    `${process.env.REACT_APP_API}/stripe/account-balance`, store, options)

apiStripe.currencyFormatter = (data) => {
  console.log(data);

  return (data.amount / 100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};

// no {} and return used - and it works anyway
apiStripe.payoutSetting = async (token) =>
  await axios.post(
    `${process.env.REACT_APP_API}/payout-setting`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export default apiStripe