import React, { useState, useEffect } from "react";
import SmallCard from "../../components/Design/SmallCard.component";
// import DesignCard from "../components/Design/Card.component";
// import DesignCarousel from "../components/Design/Carousel.component";
import apiProduct from "../../ApiService/products"
// import { useSelector } from "react-redux";

function MyProducts(props) {
  // const { auth } = useSelector((state) => ({...state}))
  //  JSON.stringify(auth.user._id);

  const [myproducts, setMyproducts] = useState([]);

  useEffect(() => {
    loadMineproducts();
  }, []);

  const loadMineproducts = async () => {
    console.log("ready to fetch my products");
    let res = await apiProduct.mineProducts();
    setMyproducts(res.data);
    console.log(myproducts);
  };

  return (
    <div className="container-fluid text-center">
      <div className="d-flex row p-1">
        <div className="container-fluid bg-secondary p-5 text-center">
          <h1>All My Products</h1>
        </div>
        <div className="container-fluid">
          <br />

          {myproducts.map((p) => (
            <SmallCard key={p._id} p={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyProducts;

///* <pre>{JSON.stringify(hotels, null, 4)}</pre> */
