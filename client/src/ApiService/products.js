import axios from "axios";

const apiProduct = {};
const options = {
  // headers: { 'X-Custom-Header': 'value' },
  headers: { 'Content-Type': 'application/json' },
  method: 'post',
  withCredentials: true
  // xsrfCookieName: 'XSRF-TOKEN',
  // xsrfHeaderName: 'X-XSRF-TOKEN',
};

apiProduct.createProduct = async (data) =>
  await axios.post(`${process.env.REACT_APP_API}/products/new`, data, options)

apiProduct.uploadImage = async (data) =>
  await axios.post("https://api.cloudinary.com/v1_1/geuxor/image/upload", data)

apiProduct.createOnlyProduct = async (data) =>
  await axios.post(`${process.env.REACT_APP_API}/products/only`, data, options)

apiProduct.allProducts = async () =>
  await axios.post(`${process.env.REACT_APP_API}/products`, null, options)

apiProduct.mineProducts = async () =>
  await axios.post(`${process.env.REACT_APP_API}/products/mine`, null, options)

apiProduct.diffDays = (from, to) => {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date(from);
  const end = new Date(to);
  const difference = Math.round(Math.abs((start - end) / day));
  return difference;
};

apiProduct.sellerProducts = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/seller-products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

apiProduct.deleteProduct = async (token, productId) =>
  await axios.delete(`${process.env.REACT_APP_API}/delete-product/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


export default apiProduct;
