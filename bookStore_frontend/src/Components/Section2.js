import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Section2.css'; // Import custom CSS

function Section2() {
  return (
    <div className="section2-container py-4">
      <div className="position-relative section2-banner">
        {/* Banner Image */}
        <img
          src="../assests/baner2.jpg"
          alt="Banner"
          className="img-fluid w-100 banner-img"
        />

        {/* Black Overlay */}
        <div className="overlay"></div>

        {/* Text on Banner */}
        <div className="banner-text text-white text-center px-3">
          <h2 className="banner-title mb-3">Why Choose BookHub?</h2>
          <p className="banner-description lead">
            BookHub is India’s most trusted platform for buying and selling used books, connecting over 1M+ verified readers in a safe and vibrant community. With a huge collection of 50,000+ titles spanning fiction, non-fiction, and academic textbooks, you’ll always find something worth reading. Enjoy secure payments with buyer protection — making reading more affordable and accessible for everyone.
          </p>

        </div>
      </div>
    </div>
  );
}

export default Section2;
