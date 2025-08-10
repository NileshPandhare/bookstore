import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewProducts.css";
import Seller from "./Seller";

function ViewProducts() {
  const userId = sessionStorage.getItem("userId");
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
  
        const response = await axios.get(`http://localhost:5050/seller/getProductsBySellerId/${userId}`, config); // Use axios.get with config
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, []);
  


  const handleEdit = (id) => {
    if (id) {
      console.log(`edit book routing ${id}`);
      navigate(`/seller/editproduct/${id}`);
    } else {
      console.error("Product ID is undefined");
    }
  };
  

  return (
    <Seller>
      <div className="view-products-container">
        <h3>View Products</h3>
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
             
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productName}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                 
                  <td>
                    <button
                      onClick={() => handleEdit(product.productId)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                  </td>
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
    </Seller>
  );
}

export default ViewProducts;
