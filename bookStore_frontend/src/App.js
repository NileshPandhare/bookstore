import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";

// Import Components
import Home from "./Components/Home";
import Login from "./Components/Login";
import About from "./Components/About";
import Register from "./Components/Register";
import ProductList from "./Components/ProductList";
import CustomerNavbar from "./Components/CustomerNavbar";
import Cart from "./Components/Cart";
import Payment from "./Components/Payment";
import Orders from "./Components/Orders";
import EditProfile from "./Components/EditProfile";

// Admin Components
import Admin from "./Admin/Admin";
import AddCategory from "./Admin/AddCategory";
import AddSeller from "./Admin/AddSeller";
import ViewAllSeller from "./Admin/ViewAllSeller";
import ViewProducts from "./Admin/ViewProducts";
import ViewOrders from "./Admin/ViewOrders";
import ViewPayments from "./Admin/ViewPayments";


// Seller Components
import Seller from "./Seller/Seller";
import AddProduct from "./Seller/AddProduct";
import ViewProductsS from "./Seller/ViewProducts";
import ViewPaymentsS from "./Seller/ViewPayments";
import ViewOrdersS from "./Seller/ViewOrders";
import EditProductS from "./Seller/EditProduct";


// Layout wrapper to conditionally render navbar
const AppLayout = ({ children, cartCount }) => {
  const location = useLocation();
  const isAdminOrSellerRoute =
    location.pathname.startsWith("/admin") || location.pathname.startsWith("/seller");

  return (
    <>
      {!isAdminOrSellerRoute && <CustomerNavbar cartCount={cartCount} />}
      {children}
    </>
  );
};

function App() {
  const [cartCount, setCartCount] = useState(0);
  const userId = sessionStorage.getItem("userId");

  // Fetch cart count on mount
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `http://localhost:5050/customer/getCartByUserId/${userId}`
          );
          setCartCount(response.data.length || 0);
        }
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    fetchCartCount();
  }, [userId]);

  return (
    <div className="App">
      <Router>
        <AppLayout cartCount={cartCount}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Product List */}
            <Route
              path="/products/:id"
              element={<ProductList setCartCount={setCartCount} />}
            />

            {/* Cart, Payment & Orders */}
            <Route
              path="/viewcart/:userId"
              element={<Cart setCartCount={setCartCount} />}
            />
            <Route
              path="/customer/cart"
              element={<Cart setCartCount={setCartCount} />}
            />
            <Route path="/payment" element={<Payment />} />
            <Route path="/orders/:userId" element={<Orders />} />
            <Route path="/editprofile/:id" element={<EditProfile />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/addcategory" element={<AddCategory />} />
           
            <Route path="/admin/addSeller" element={<AddSeller />} />
            <Route path="/admin/viewsellers" element={<ViewAllSeller />}/>
            <Route path="/admin/viewproducts" element={<ViewProducts />} />
            <Route path="/admin/vieworders" element={<ViewOrders />} />
            <Route path="/admin/viewPayments" element={<ViewPayments />} />
            

            {/* Seller Routes*/}
            <Route path="/seller" element={<Seller />}/>
            <Route path="/seller/addproducts" element={<AddProduct />} />
            <Route path="/seller/viewproducts" element={<ViewProductsS />}/>
            <Route path="/seller/vieworders" element={<ViewOrdersS />}/>
            <Route path="/seller/viewpayments" element={<ViewPaymentsS />}/>
            <Route path="/seller/editproduct/:id" element={<EditProductS />} />

          </Routes>
        </AppLayout>
      </Router>
    </div>
  );
}

export default App;
