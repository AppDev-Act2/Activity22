import React from "react";
import "./HomeInfo.css";
import { Link } from "react-router-dom";

function HomeInfo() {
  return (
    <article className="home-info">
      <div className="info-txt">
        <h2>
          BuynaBai: Your one-stop-shop for ultimate comfort
        </h2>
        <p>
          Welcome to our premier destination, where comfort reigns supreme and convenience is paramount.
          Dive into a world of plush cushions, soft fabrics, and ergonomic designs, meticulously curated
          to elevate every aspect of your life. From cozy home essentials to activewear and outdoor gear,
          we offer a diverse range of products tailored to meet your comfort needs. Experience the
          difference at our one-stop shop, where comfort isn't just a luxury—it's a way of life
        </p>
      </div>
      <button className="explore-clothing_btn">
        <Link to="/login">Login</Link>
      </button>
    </article>
  );
}

export default HomeInfo;




// import React from "react";
// import "./HomeInfo.css";
// import { Link } from "react-router-dom";

// function HomeInfo() {
//   return (
//     <article className="home-info">
//       <div className="info-txt">
//         <h2>
//           BuynaBai.
//         </h2>
//         <p>
//           Your One-Stop-Shop for ultimate comfort.
//         </p>
//       </div>
//       <button className="explore-clothing_btn">
//         <Link to="register">Become a seller!</Link>
//       </button>
//       <p style={{ fontSize: 20 }}>or</p>
//       <button className="explore-clothing_btn">
//         <Link to="login">Login</Link>
//       </button>
//     </article>
//   );
// }

// export default HomeInfo;
