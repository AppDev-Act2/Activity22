import React from "react";
import HomePhotoShoot from "./HomePhotoShoot";
import HomeInfo from "./HomeInfo";
import "./HomeMain.css";

function HomeMain() {
  return (
    <main className="home-main container">
      <HomeInfo />
      <HomePhotoShoot />

      <iframe
        src="https://www.chatbase.co/chatbot-iframe/oAkJh5wPQrCpTcBb43Jhb"
        title="Chatbot"
        width="100%"
        style={{ height: '80vh', minHeight: '700px' }}
        frameBorder="0"
      ></iframe>
    </main>
  );
}

export default HomeMain;
