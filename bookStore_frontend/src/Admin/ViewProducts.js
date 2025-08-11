import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewProducts.css";
import Admin from "./Admin";
import { Book_SERVICE_API_BASE_URL } from '../BaseURLs/BaseURLs';

function ViewProducts() {
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
  
        // const response = await axios.get("${Book_SERVICE_API_BASE_URL}/admin/getAllProducts", config); // Use axios.get with config
        const response = await axios.get(
  `${BUS_SERVICE_API_BASE_URL}/admin/getAllProducts`,
  config
);

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, []);
  


  const handleEdit = (id) => {
    if (id) {
      navigate(`/seller/editproduct/${id}`);
    } else {
      console.error("Product ID is undefined");
    }
  };
  

  return (
    <Admin>
      <div className="view-products-container">
        <h3>View Products</h3>
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              
              
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.productName}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                 
                 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewProducts;
