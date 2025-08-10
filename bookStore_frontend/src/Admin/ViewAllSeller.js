import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import "./ViewAllSellers.css"; // Your custom styles
import { useNavigate } from "react-router-dom";
import Admin from "./Admin"; // Assuming Admin component is used for layout

function ViewAllSeller() {
  const [sellers, setSellers] = useState([]);

  const navigate = useNavigate();

      useEffect(() => {
        if (!sessionStorage.getItem("userName")) {
          navigate("/");
        } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
          navigate("/customer");
        } else if (sessionStorage.getItem("userRole") === "ADMIN") {
          navigate("/admin");
        }else if (sessionStorage.getItem("userRole") === "SELLER") {
          navigate("/seller");
        }
      }, [navigate]);

  // Fetch payments from the API on component mount
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
  
        const response = await axios.get("http://localhost:5050/admin/getAllSellers", config); // Use axios.get with config
        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
  
    fetchSellers();
  }, []);
  
  return (
    <Admin>
      <div className="view-sellers-container">
        <h2>View Sellers</h2>
        <table className="sellers-table">
          <thead>
            <tr>
              <th>Seller name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Pincode</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {sellers.length > 0 ? (
              sellers.map((seller) => (
                <tr key={seller.id}>
                  <td>{seller.userName}</td>
                  <td>{seller.email}</td>
                  <td>{seller.contact}</td>
                  <td>{seller.pincode}</td>
                  <td>{seller.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No sellers available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewAllSeller;
