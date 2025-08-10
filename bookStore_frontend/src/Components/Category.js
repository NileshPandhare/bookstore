import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Category.css";

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("jwtToken")}`, // Add token if required
        "Content-Type": "application/json", // Adjust content type if needed
      },
    };
  
    axios
      .get("http://localhost:5050/admin/getAllCategories", config)
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("No categories");
        setLoading(false);
      });
  }, []);
  

  const handleCategoryClick = (categoryId) => {
    console.log("Navigating to category:", categoryId);
    navigate(`/products/${categoryId}`);
  };
  

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="category-container">
      {categories.length > 0 ? (
        categories.map((category) => (
          <div
            className="category-card"
            key={category.categoryId}
            onClick={() => handleCategoryClick(category.categoryId)}
          >
            {/* Display the Base64 image */}
            <img
              src={`data:image/png;base64,${category.image}`}
              alt={category.name}
              className="category-img"
            />
            <p className="category-name">{category.name}</p>
          </div>
        ))
      ) : (
        <p>No categories found</p>
      )}
    </div>
  );
}

export default Category;
