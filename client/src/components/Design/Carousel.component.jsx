import React from "react";
import { Carousel } from "antd";
import "./Carousel.component.scss";
//cloudinary
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/base/assets/CloudinaryImage";
import URLConfig from "@cloudinary/base/config/URLConfig";
import CloudConfig from "@cloudinary/base/config/CloudConfig";
// import { thumbnail } from "@cloudinary/base/actions/resize";
// import { focusOn } from "@cloudinary/base/qualifiers/gravity";
// import { face } from "@cloudinary/base/qualifiers/focusOn";
// import { byRadius } from "@cloudinary/base/actions/roundCorners";

function DesignCarousel({ carousel }) {
  let cloudConfig = new CloudConfig({ cloudName: "geuxor" });
  let urlConfig = new URLConfig({ secure: true });

  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "100px",
    textAlign: "center",
    background: "#234f6d",
  };

  return (
    <>
      <div>
        <Carousel className="banner" style={contentStyle} autoplay>
          {carousel.map((t) => (
            <div className="d-flex flex-row justify-content-center py-2">
              <div className="d-flex flex-column align-items-end">
                <h4 className="text-white">{t.title}</h4>
                <p className="text-white">{t.description}</p>
              </div>
              <div className="align-self-center px-4">
                <AdvancedImage
                  className="cloudimg"
                  cldImg={new CloudinaryImage(t.image, cloudConfig, urlConfig)}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default DesignCarousel;
