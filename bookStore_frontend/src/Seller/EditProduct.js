import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Seller from "./Seller";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the product ID from the URL
  
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

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const editUrl = `http://localhost:5050/seller/GetProductById/${id}`;
  const updateUrl = `http://localhost:5050/seller/updateProduct/${id}`;

  // Configuration for headers with JWT token
  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
  };

  useEffect(() => {
    axios
      .get(editUrl, config)
      .then((response) => {
        const { productName, price, quantity } = response.data;
        setProductName(productName); // Set the product name (read-only)
        setPrice(price);
        setQuantity(quantity);
      })
      .catch((error) => {
        console.error("Error occurred getting product details:", error);
        toast.error("Failed to fetch product details");
      });
  }, [editUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const productUpdateDTO = { price, quantity }; // Only send price and quantity for update

    axios
      .put(updateUrl, productUpdateDTO, config)
      .then(() => {
        toast.success("Product updated successfully!");
        setTimeout(() => {
          navigate("/seller/viewproducts"); // Redirect to View Products page
        }, 2000); // 2-second delay to show toast
      })
      .catch((error) => {
        console.error("Failed to update product:", error);
        toast.error("Failed to update product.");
      });
  };

  return (
    <Seller>
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="shadow-lg p-4"
          style={{
            width: "35rem",
            border: "1px solid black",
            color: "black",
            display: "flex",
            flexDirection: "column",
            border: "2px solid rgb(194, 239, 195)",
            backgroundColor: "#f4f4f9",
          }}
        >
          <h2 className="text-center mb-4">Edit Product</h2>
          <form onSubmit={handleSubmit}>
            {/* Product Name - Non-editable */}
            <div className="mb-3">
              <label>Product Name:</label>
              <input
                type="text"
                className="form-control"
                value={productName}
                readOnly
                style={{ height: "30px", backgroundColor: "#e9ecef" }}
              />
            </div>

            {/* Price */}
            <div className="mb-3">
              <label>Price:</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ height: "30px" }}
                required
              />
            </div>

            {/* Quantity */}
            <div className="mb-3">
              <label>Quantity:</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ height: "30px" }}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="mb-3 w-100">
              <button
                type="submit"
                className="btn btn-light w-100"
                style={{ backgroundColor: "#aeff00" }}
              >
                Edit Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Seller>
  );
}

export default EditProduct;
