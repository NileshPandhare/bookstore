import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Slides.css";

function Slides() {
  return (
       <div className="position-relative">
      <ToastContainer />
      
      {/* Background Image */}
      <img
        src="../assests/home2.jpg"
        className="img-fluid w-100"
        style={{
          height: "100vh",
          objectFit: "cover",
        }}
        alt="Homepage Background"
      />

      {/* Overlay Box with Green/White Text */}
      <div className="position-absolute top-50 start-50 translate-middle text-center p-4 rounded slide-overlay text-white">
        <h1 className="display-5 fw-bold mb-3">
          Welcome to BookHub 
        </h1>
        <p className="lead fs-4 fw-medium">
          <br /> Affordable Reads, Endless Stories <br/>
           Buy, Sell Your Favorites in Minutes!
        </p>
      </div>
    </div>
  )
}

export default Slides
