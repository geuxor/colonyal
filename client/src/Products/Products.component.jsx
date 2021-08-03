import React, { useState, useEffect } from "react";
import SmallCard from "../components/Design/SmallCard.component"
import DesignCard from "../components/Design/Card.component";
import DesignCarousel from "../components/Design/Carousel.component";
import apiProduct from "../ApiService/products";
// import { useSelector } from "react-redux";

function Products(props) {
  // const { auth } = useSelector((state) => ({...state}))
  //  JSON.stringify(auth.user._id);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadAllproducts();
  }, []);

  const loadAllproducts = async () => {
    console.log('ready to fetch all prods');
    let res = await apiProduct.allProducts();
    setProducts(res.data);
    console.log('-------', res.data);
  };

 

  return (
    <div>
      <div className="m-0 col-12 p-0">
        <DesignCarousel carousel={products.slice(0, 3)} />
      </div>
      <div className="d-flex row p-4">
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
//        <SmallCard key={p.id} p={p} />
///* <pre>{JSON.stringify(hotels, null, 4)}</pre> */
// https://res.cloudinary.com/geuxor/image/upload/v1627985094/colonyal/fh5gkejpsivdubdnqbtq.png
// https://res.cloudinary.com/geuxor/image/upload/v1619727653/colonyal/zzep4nf8eqxelx5j7owkrrbnefdw.jpg