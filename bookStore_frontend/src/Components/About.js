import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";

function About() {
  return (
    <div>
      <Navbar />
      <div style={{ position: "relative" }}>
        <img
          src="./assests/img2.png"
          alt="About us"
          className="img-fluid"
          style={{ height: "90vh", objectFit: "cover", width: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            top: "35%",
            left: "40%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold",color:"#aeff00",marginTop:"1.2rem" }}>About Us</h1>
          <p style={{ fontSize: "1.5rem", marginTop: "25px", color:"#BCCCDC",fontWeight: "bold" }}>
          Welcome to Grocefy, your trusted destination for fresh groceries, pantry staples, and everyday 
          essentials. We are dedicated to providing top-quality products with same-day delivery and a seamless
           shopping experience. At Grocefy, we prioritize customer satisfaction, offering zero-touch delivery
            and a hassle-free return policy to ensure your peace of mind. Our commitment to freshness
             guarantees that every product meets the highest standards. Whether you're stocking up 
             your kitchen or looking for last-minute essentials, Grocefy has you covered with unbeatable
              convenience and quality. Shop smarter, live better with Grocefy — where your grocery needs
               come first!.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
