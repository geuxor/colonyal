import { Carousel } from "antd";

import React from 'react';

function DesignCarousel({carousel}) {

  const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "60px",
  textAlign: "center",
  background: "#364d79",
};

return (
  <>
    <div>
      <Carousel style={contentStyle} autoplay>
        {carousel.map((t) => (
          <div>
            <h3>{t.title}</h3>
            <h6>{t.subtitle}</h6>
            <small>{t.description}</small>
          </div>
        ))}
      </Carousel>
    </div>
  </>
);}

export default DesignCarousel;
