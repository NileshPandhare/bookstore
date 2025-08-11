// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Cart.css";

// function Cart({ setCartCount }) {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const userId = sessionStorage.getItem("userId");
//   const navigate = useNavigate();

//   // Fetch cart items when component mounts
//   useEffect(() => {
//     fetchCartData();
//   }, []);

//   // Function to fetch cart data from backend
//   const fetchCartData = async () => {
//     try {
//       const config = {
//         headers: {
//           "Authorization": `Bearer ${sessionStorage.getItem("jwtToken")}`, // Add the token if required
//           "Content-Type": "application/json", // Adjust content type if needed
//         },
//       };
  
//       const response = await axios.get(
//         `${Book_SERVICE_API_BASE_URL}/customer/getCartByUserId/${userId}`,
//         config
//       );
  
//       // Ensure cartItems is always an array
//       const data = response.data || [];
//       setCartItems(Array.isArray(data) ? data : []);
//       setCartCount(Array.isArray(data) ? data.length : 0);
  
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//       setCartItems([]); // Set an empty array if error occurs
//       setCartCount(0);
//     }
//   };
  

//   // Calculate total price whenever cart items change
//   useEffect(() => {
//     if (Array.isArray(cartItems) && cartItems.length > 0) {
//       const total = cartItems.reduce(
//         (sum, item) => sum + (item.product?.price || 0) * item.quantity,
//         0
//       );
//       setTotalPrice(total);
//     } else {
//       setTotalPrice(0);
//     }
//   }, [cartItems]);

//   // Function to remove a product from the cart
//   const handleDeleteProduct = async (productId) => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`, // Include the JWT token for authentication
//           "Content-Type": "application/json",
//         },
//         params: {
//           userId,
//           productId, // Pass userId and productId as query parameters
//         },
//       };
  
//       const response = await axios.delete(
//         `${Book_SERVICE_API_BASE_URL}/customer/removeProductFromCart`,
//         config // Correctly pass the config with headers and params
//       );
  
//       if (response.status === 200) {
//         const updatedCart = cartItems.filter(
//           (item) => item.product.productId !== productId
//         );
//         setCartItems(updatedCart);
//         setCartCount(updatedCart.length); // Update cart count
//         console.log("Product removed from cart successfully");
//       } else {
//         console.error("Failed to remove product from cart");
//       }
//     } catch (error) {
//       console.error("Error removing product from cart:", error);
//     }
//   };
  

//   // Navigate to Payment page with cart details
//   const handleProceedToPayment = () => {
//     const products = cartItems.map((item) => ({
//       productId: item.product.productId,
//       quantity: item.quantity,
//     }));

//     navigate("/payment", {
//       state: { products, totalPrice, userId },
//     });
//   };

//   return (
//     <div>
//       <div className="cart-container">
//         {cartItems.length > 0 ? (
//           <>
//             {cartItems.map((item) => (
//               <div key={item.product.productId} className="cart-item">
//                 <img
//                   src={
//                     item.product.productImage
//                       ? `data:image/png;base64,${item.product.productImage}`
//                       : process.env.PUBLIC_URL + "/images/product.png"
//                   }
//                   alt={item.product.productName}
//                   className="cart-item-image"
//                 />

//                 <div className="cart-item-details">
//                   <h4 className="product-name">{item.product.productName}</h4>
//                   <p className="seller">Seller: Grocefy</p>

//                   <div className="price-section">
//                     <span className="original-price">
//                       ₹{item.product.originalPrice}
//                     </span>
//                     <span className="discounted-price">
//                       ₹{item.product.price}
//                     </span>
//                   </div>

//                   {/* Display Quantity */}
//                   <div className="quantity-display">
//                     <span>Quantity: {item.quantity}</span>
//                   </div>

//                   <div className="action-buttons">
//                     <button
//                       className="remove"
//                       onClick={() => handleDeleteProduct(item.product.productId)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* TOTAL PRICE SECTION */}
//             <div className="cart-total">
//               <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
//               <button className="payment-button" onClick={handleProceedToPayment}>
//                 Proceed to Payment
//               </button>
//             </div>
//           </>
//         ) : (
//           <p className="empty-cart-message">Your cart is empty.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Cart;


/////////////////new code

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { Book_SERVICE_API_BASE_URL } from '../BaseURLs/BaseURLs';

function Cart({ setCartCount }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.get(
        `${Book_SERVICE_API_BASE_URL}/customer/getCartByUserId/${userId}`,
        config
      );

      const data = response.data || [];
      setCartItems(Array.isArray(data) ? data : []);
      setCartCount(Array.isArray(data) ? data.length : 0);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setCartItems([]);
      setCartCount(0);
    }
  };

  useEffect(() => {
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      const total = cartItems.reduce(
        (sum, item) => sum + (item.product?.price || 0) * item.quantity,
        0
      );
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [cartItems]);

  const handleDeleteProduct = async (productId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
        params: {
          userId,
          productId,
        },
      };

      const response = await axios.delete(
        `${Book_SERVICE_API_BASE_URL}/customer/removeProductFromCart`,
        config
      );

      if (response.status === 200) {
        await fetchCartData();
      } else {
        console.error("Failed to remove product from cart");
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  // *** UPDATED HERE: pass bookName to payment page ***
  const handleProceedToPayment = () => {
    const products = cartItems.map((item) => ({
      productId: item.product.productId,
      quantity: item.quantity,
      bookName: item.product.productName,  // added bookName here
    }));

    navigate("/payment", {
      state: { products, totalPrice, userId },
    });
  };

  return (
    <div>
      <div className="cart-container">
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div key={item.product.productId} className="cart-item">
                <img
                  src={
                    item.product.productImage
                      ? `data:image/png;base64,${item.product.productImage}`
                      : process.env.PUBLIC_URL + "/images/product.png"
                  }
                  alt={item.product.productName}
                  className="cart-item-image"
                />

                <div className="cart-item-details">
                  <h4 className="product-name">{item.product.productName}</h4>
                  <p className="seller">Seller: Grocefy</p>

                  <div className="price-section">
                    <span className="original-price">
                      ₹{item.product.originalPrice}
                    </span>
                    <span className="discounted-price">
                      ₹{item.product.price}
                    </span>
                  </div>

                  <div className="quantity-display">
                    <span>Quantity: {item.quantity}</span>
                  </div>

                  <div className="action-buttons">
                    <button
                      className="remove"
                      onClick={() => handleDeleteProduct(item.product.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="cart-total">
              <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
              <button className="payment-button" onClick={handleProceedToPayment}>
                Proceed to Payment
              </button>
            </div>
          </>
        ) : (
          <p className="empty-cart-message">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}

export default Cart;
