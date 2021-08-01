import axios from "axios";
//do we need async await here?
export const stripeConnectAccount = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/stripe-connect-account`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

//func => axios.post does a return - but if no {} no return
//func => { return axios.post } - return needed
export const getAccountStatus = async (token) => {
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
export const getAccountBalance = async (token) =>
  axios.post(
    `${process.env.REACT_APP_API}/get-account-balance`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const currencyFormatter = (data) => {
  console.log(data);
  
  return (data.amount / 100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};

// no {} and return used - and it works anyway
export const payoutSetting = async (token) =>
  await axios.post(
    `${process.env.REACT_APP_API}/payout-setting`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
