import React, { useState } from "react";
// import Axios from "axios"
import apiProduct from "../ApiService/products";
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/base/assets/CloudinaryImage";
import URLConfig from "@cloudinary/base/config/URLConfig";
import CloudConfig from "@cloudinary/base/config/CloudConfig";
import { thumbnail } from "@cloudinary/base/actions/resize";
import { focusOn } from "@cloudinary/base/qualifiers/gravity";
import { face } from "@cloudinary/base/qualifiers/focusOn";
import { byRadius } from "@cloudinary/base/actions/roundCorners";
import { toast } from "react-toastify";

function Cloudinary(props) {
  const [image, setImage] = useState("");
  const [cimage, setCimage] = useState("");
  let cloudConfig = new CloudConfig({ cloudName: "geuxor" });
  let urlConfig = new URLConfig({ secure: true });
  
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mzgc3fjp");

    try {
      const res = await apiProduct.uploadImage(formData);
      console.log(res);
      console.log(res.data.url);
      setCimage(res.data.public_id);
      console.log("--------", res.data.public_id);

      const dbres = await apiProduct.saveImage({
        title: "Palmtree",
        description: "Niece",
        price: 22,
        image: res.data.public_id,
      });
      console.log("dbres", dbres.statusText);
      toast.success(dbres.statusText);
    } catch (err) {
      console.log(err);
    }
  };
  let myImage = new CloudinaryImage(cimage, cloudConfig, urlConfig);
  // myImage.resize(
  //   thumbnail().width(150).height(150)
  // );
  // myAvatar.resize(
  //   thumbnail().width(150).height(150).gravity(focusOn(face()))
  // );
  return (
    <div>
      <div>
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        {image ? <button onClick={uploadImage}> Upload </button> : ""}
      </div>
      <AdvancedImage style={{ width: 150 }} cldImg={myImage} />
    </div>
  );
}

export default Cloudinary;
