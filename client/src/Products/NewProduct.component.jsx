import { useState } from "react";
import { toast } from "react-toastify";
import { createProduct } from "../../actions/products";
import { useSelector } from "react-redux";
import { ProductCreateForm } from "../Forms/NewProduct.Form";

const NewProduct = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  // state
  const [location, setLocation] = useState("Aarhus");
  const [values, setValues] = useState({
    title: "new Product",
    description: "greates product ever",
    image: "peak-3.jpg",
    price: "234",
    from: "2021-07-25T17:21:18.759+0000",
    to: "",
    quantity: 10,
  });

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  // destructuring variables from state
  const { title, description, image, price, from, to, quantity } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    // console.log(location);

    //access to formData by the browser
    let productData = new FormData();
    productData.append("title", title);
    productData.append("description", description);
    productData.append("location", location);
    productData.append("price", price);
    image && productData.append("image", image);
    productData.append("from", from);
    productData.append("to", to);
    productData.append("quantity", quantity);

    console.log([...productData]);
    try {
      let res = await createProduct(token, productData);
      console.log("PRODUCT CREATE RES", res);
      toast("New product is posted");
      //clear the form
      setValues({
        title: "",
        description: "",
        image: "",
        price: "",
        from: "",
        to: "",
        quantity: 0,
      });
      setLocation(" ");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };


  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add Product</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <ProductCreateForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
              location={location}
              setLocation={setLocation}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
            {JSON.stringify(location)}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
