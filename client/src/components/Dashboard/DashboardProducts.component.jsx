import React, { useState, useEffect } from "react";
import SmallCard from "../../components/Design/SmallCard.component";
import apiProduct from "../../ApiService/products"

function MyProducts(props) {
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
