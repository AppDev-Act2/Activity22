import React from "react";
import "./HomeInfo.css";
import { Link } from "react-router-dom";

function HomeInfo() {
  return (
    <article className="home-info">
      <div className="info-txt">
        <h2>
          BuynaBai.
        </h2>
        <p>
          Your One-Stop-Shop for ultimate comfort.
        </p>
      </div>
      <button className="explore-clothing_btn">
        <Link to="register">Become a seller!</Link>
      </button>
      <p style={{ fontSize: 20 }}>or</p>
      <button className="explore-clothing_btn">
        <Link to="login">Login</Link>
      </button>
    </article>
  );
}

export default HomeInfo;
