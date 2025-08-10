import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";
import "./ViewOrders.css";
import Seller from "./Seller";

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const userId = sessionStorage.getItem("userId");

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

  // Fetch orders from the API on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
  
        const response = await axios.get(`http://localhost:5050/seller/getSoldProductsBySeller/${userId}`, config); // Use axios.get with config
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders();
  }, []);
  
  // Group orders by orderId
  const groupedOrders = orders.reduce((acc, order) => {
    // Check if the orderId already exists in the accumulator
    if (!acc[order.orderId]) {
      acc[order.orderId] = {
        orderId: order.orderId,
        orderDate: order.orderDate,
        userName: order.customerName,
        products: [],
      };
    }

    // Add product details to the corresponding orderId
    acc[order.orderId].products.push({
      productName: order.productName,
      quantity: order.orderQuantity,
    });

    return acc;
  }, {});

  // Convert the grouped object into an array
  const groupedOrdersArray = Object.values(groupedOrders);

  return (
    <Seller>
      <div className="view-orders-container">
        <h2>View Orders</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>User Name</th>
              <th>Product Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {groupedOrdersArray.length > 0 ? (
              groupedOrdersArray.map((order) => (
                <React.Fragment key={order.orderId}>
                  {order.products.map((product, index) => (
                    <tr key={index}>
                      {index === 0 && (
                        <>
                          <td rowSpan={order.products.length}>{order.orderId}</td>
                          <td rowSpan={order.products.length}>{order.orderDate}</td>
                          <td rowSpan={order.products.length}>{order.userName}</td>
                        </>
                      )}
                      <td>{product.productName}</td>
                      <td>{product.quantity}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="5">No orders available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Seller>
  );
}

export default ViewOrders;
