import { useState } from "react";
import { toast } from "react-toastify";
import apiProduct from "../ApiService/products";
import { useSelector } from "react-redux";
import { ProductCreateForm } from "../Forms/NewProduct.Form";

const NewProduct = () => {
  const store = useSelector((state) => ({ ...state }));

  // state
  const [location, setLocation] = useState("Aarhus");
  const [image, setImage] = useState("");
  const [upload, setUpload] = useState("");
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  const [values, setValues] = useState({
    title: "new Product",
    description: "greates product ever",
    price: "234",
    from: "2021-07-25T17:21:18.759+0000",
    to: "",
    quantity: 10,
  });

  const { title, description, price, from, to, quantity } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //upload to cloudinary
      console.log("values.image", image);
      const uploadData = new FormData();
      uploadData.append("file", image);
      uploadData.append("upload_preset", "mzgc3fjp");
      const res = await apiProduct.uploadImage(uploadData);
      console.log(res.data.public_id);
      const productData = {
        title,
        description,
        price,
        image: res.data.public_id,
      };
      console.log(productData);

      let dbres = await apiProduct.createProduct(productData);
      console.log("dbres", dbres.statusText);

      toast.success(dbres.statusText);

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
      setUpload("");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const handleImageCloud = async (files) => {
    console.log("myImage ------------", image, files);
    setImage(files);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mzgc3fjp");
    formData.append("cloud_name", "geuxor");
    console.log(formData);
    try {
      let res = await apiProduct.uploadImage(formData);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (files) => {
    console.log(files[0]);
    setImage(files[0]);
    setPreview(URL.createObjectURL(files[0]));
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
              handleImageCloud={handleImageCloud}
            />
          </div>
          <div className="col-md-2">
            <div></div>

            <img
              style={{ width: 150 }}
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
