import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const id = sessionStorage.getItem("userId");


  useEffect(() => {
    fetchOrders();
  }, []);
  
  // Fetch order data from backend
  const fetchOrders = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`, // Add the JWT token in the header
        },
      };
  
      const response = await axios.get(
        `http://localhost:5050/customer/getOrdersByUserId/${id}`,
        config
      );
      setOrders(response.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  

  return (
    <div>
      <div className="orders-container">
        <h2 className="orders-heading">My Orders</h2>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.orderId} className="order-item">
              <div className="order-info">
                <h4>Order ID: {order.orderId}</h4>
                <p>Placed on: {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}</p>
              </div>
              <div className="order-products">
                {order.orderItems && order.orderItems.length > 0 ? (
                  order.orderItems.map((product) => (
                    <div key={product.productId} className="order-product">
                      <img
                        src={
                          product.productImage
                            ? `data:image/png;base64,${product.productImage}`
                            : "/images/product.png"
                        }
                        alt={product.productName || "Product"}
                        className="order-product-image"
                      />
                      <div className="order-product-details">
                        <h5>{product.productName || "Unnamed Product"}</h5>
                        <p>Quantity: {product.quantity || 0}</p>
                        <p>Price: ₹{product.productPrice ? product.productPrice.toFixed(2) : "0.00"}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="empty-order-products-message">No products in this order.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="empty-orders-message">You have no orders.</p>
        )}
      </div>
    </div>
  );
}

export default Orders;
