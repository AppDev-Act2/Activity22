import React from "react";
import photo1 from "../../assets/images/barbieboysiu_1200x.webp";
import photo2 from "../..//assets/images/595b9a82c2508132a2e99e1a-large.webp";
import photo3 from "../../assets/images/uuupw2o9i7m81.jpg";

import "./HomePhotoShoot.css";

function HomePhotoShoot() {
  return (
    <div className="photoshoot-container">
      <span className="model-photo_wrapper boy">
        <img src={photo1} className="model-photo" alt="model photograph" />
      </span>
      <span className="model-photo_wrapper boy">
        <img src={photo2} className="model-photo" alt="model photograph" />
      </span>
      <span className="model-photo_wrapper female">
        <img src={photo3} className="model-photo" alt="model photograph" />
      </span>
    </div>
  );
}

export default HomePhotoShoot;
