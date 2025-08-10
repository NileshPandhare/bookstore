import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";
import Admin from "./Admin";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

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

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Configuration for the request (e.g., headers)
        const config = {
          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("jwtToken")}`, // Add token if required
            "Content-Type": "application/json", // Set content type if needed
          },
        };
  
        // Make the request with the configuration
        const response = await axios.get("http://localhost:5050/admin/getAllCategories", config);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategories();
  }, []);
  

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productName || !productPrice || !productQuantity || !categoryId || !productImage) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", productPrice);
    formData.append("quantity", productQuantity);
    formData.append("categoryId", categoryId);
    formData.append("productImage", productImage);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "multipart/form-data", // Ensuring proper content type for form data
        },
      };
    
      const response = await axios.post("http://localhost:5050/admin/addProduct", formData, config);
    
      if (response.status === 200) {
        alert("Product added successfully!");
        setProductName("");
        setProductPrice("");
        setProductQuantity("");
        setCategoryId("");
        setProductImage(null);
        setError("");
        window.location.reload();
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
    
  };

  return (
    <Admin>
      <div className="add-product-container">
        <h3>Add New Product</h3>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="productPrice">Price</label>
            <input
              type="number"
              id="productPrice"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Enter product price"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="productQuantity">Quantity</label>
            <input
              type="number"
              id="productQuantity"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              placeholder="Enter product quantity"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoryId">Category</label>
            <select
              id="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="productImage">Product Image</label>
            <input
              type="file"
              id="productImage"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn" style={{backgroundColor:"#aa6450"}}>
            Submit
          </button>
        </form>
      </div>
    </Admin>
  );
}

export default AddProduct;
