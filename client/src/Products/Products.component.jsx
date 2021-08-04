import React, { useState, useEffect } from "react";
import DesignCard from "../components/Design/Card.component";
import DesignCarousel from "../components/Design/Carousel.component";
import apiProduct from "../ApiService/products";

function Products(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadAllproducts();
  }, []);

  const loadAllproducts = async () => {
    console.log('ready to fetch all prods');
    let res = await apiProduct.allProducts();
    setProducts(res.data);
    console.log("-------", products);
  };

  return (
    <div>
      <div className="m-0 col-12 p-0">
        <DesignCarousel carousel={products.slice(0, 3)} />
      </div>
      <div className="d-flex row p-5">
        <div className="container col-10 d-flex flex-wrap justify-content-start p-2">
          <br />

          {products.map((p) => (
            <DesignCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
