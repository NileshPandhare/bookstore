import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddCategory.css";
import { useNavigate } from "react-router-dom";
import Admin from "./Admin";
import "./AddCategory.css";

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
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

  const handleImageChange = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !categoryImage) {
      setError("Both fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", categoryImage);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "multipart/form-data", // Combine headers into one object
        },
      };
    
      const response = await axios.post("http://localhost:5050/admin/addCategory", formData, config);
    
      if (response.status === 201) {
        alert("Category added successfully!");
        setCategoryName("");
        setCategoryImage(null);
        setError("");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to add category. Please try again.");
    }
  }

  return (
    <Admin>
      <div className="add-category-container">
        <h3>Add New Category</h3>
        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-group">
            <label htmlFor="categoryName">Category Name</label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={handleNameChange}
              placeholder="Enter category name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoryImage">Category Image</label>
            <input
              type="file"
              id="categoryImage"
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

export default AddCategory;
