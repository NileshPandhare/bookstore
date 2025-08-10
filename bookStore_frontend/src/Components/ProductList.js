import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductList.css";

function ProductList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.get(
          `http://localhost:5050/admin/getProductsByCategory/${id}`,
          config
        );

        // Initialize quantity to 1 if it's available in stock
        const initializedProducts = response.data.map((product) => ({
          ...product,
          quantity: product.quantity > 0 ? 1 : 0,
        }));
        setProducts(initializedProducts);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  const handleQuantityChange = (productId, action) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId
          ? {
              ...product,
              quantity:
                action === "increase"
                  ? product.quantity + 1
                  : Math.max(1, product.quantity - 1),
            }
          : product
      )
    );
  };

  const handleAddToCart = async (product, quantity) => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      toast.warn("Please login to add items to the cart.", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:5050/customer/addToCart",
        {
          userId,
          productId: product.productId,
          quantity,
        },
        config
      );

      toast.success(`${product.productName} added to cart!`, {
        position: "top-right",
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate(`/viewcart/${userId}`);
      }, 1500);
    } catch (error) {
      console.error("Insufficient Stock:", error);
      toast.error("Insufficient Stock!");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <ToastContainer />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search product by name..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="product-list-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.productId}>
              {product.productImage && (
                <img
                  src={`data:image/png;base64,${product.productImage}`}
                  alt={product.productName}
                  className="product-image"
                />
              )}
              <h3 className="product-name">{product.productName}</h3>
              <p className="product-price">Rs. {product.price}</p>

              <div className="quantity-controls">
                <button
                  className="quantity-button"
                  onClick={() =>
                    handleQuantityChange(product.productId, "decrease")
                  }
                  disabled={product.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-display">{product.quantity}</span>
                <button
                  className="quantity-button"
                  onClick={() =>
                    handleQuantityChange(product.productId, "increase")
                  }
                  disabled={product.quantity === 0}
                >
                  +
                </button>
              </div>

              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(product, product.quantity)}
                disabled={product.quantity === 0}
                style={{
                  backgroundColor: product.quantity === 0 ? "red" : "#007bff",
                  color: "white",
                  cursor: product.quantity === 0 ? "not-allowed" : "pointer",
                }}
              >
                {product.quantity === 0 ? "Out Of Stock" : "Add to Cart"}
              </button>
            </div>
          ))
        ) : (
          <p>
            {searchTerm
              ? "No products match your search."
              : "No products found for this category."}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
