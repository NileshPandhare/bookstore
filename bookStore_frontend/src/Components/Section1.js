import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Section1() {
  return (
    <div className="d-flex justify-content-around align-items-center py-4 bg-light">
      <div className="text-center">
        <img src="./assests/fastest.jpeg" alt="Same Day Delivery" className="img-fluid" style={{ width: '200px' }} />
        <p>Same Day Delivery</p>
      </div>
      <div className="text-center">
        <img src="./assests/free-shipping.jpeg" alt="Fastest Delivery" className="img-fluid" style={{ width: '200px' }} />
        <p>Fastest Delivery</p>
      </div>
      <div className="text-center">
        <img src="./assests/freshness.jpeg" alt="Zero Touch Delivery" className="img-fluid" style={{ width: '200px' }} />
        <p>Zero Touch Delivery</p>
      </div>
      <div className="text-center">
        <img src="./assests/no-question.jpeg" alt="Quality You Can Trust" className="img-fluid" style={{ width: '200px' }} />
        <p>Quality You Can Trust</p>
      </div>
      <div className="text-center">
        <img src="./assests/quality.jpeg" alt="Freshness Guaranteed" className="img-fluid" style={{ width: '200px' }} />
        <p>Freshness Guaranteed</p>
      </div>
    </div>
  );
}

export default Section1;
