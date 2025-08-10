import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaBoxes, FaMoneyCheckAlt, FaClipboardList } from "react-icons/fa";
import { MdCategory, MdOutlinePayment } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BsShop } from "react-icons/bs";
import SellerNavbar from "./SellerNavbar";
import "./Styles.css";

function Seller({ children }) {
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

  return (
    <div>
      <SellerNavbar />
      <div className="layout-container">
        <div
          className="sidebar"
          style={{ border: "2px solid white", display: "flex", backgroundColor: "#aa6450" }}
        >
          <div className="sidebar-header">
            <h3>Seller</h3>
          </div>
          <nav className="sidebar-nav">

            <NavLink
              to="/seller/addproducts"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaBoxes className="icon" /> Add Products
            </NavLink>

            <NavLink
              to="/seller/viewproducts"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <AiOutlineEye className="icon" /> View Products
            </NavLink>

            <NavLink
              to="/seller/vieworders"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <HiOutlineClipboardDocumentList className="icon" /> View Orders
            </NavLink>

            <NavLink
              to="/seller/viewPayments"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <MdOutlinePayment className="icon" /> View Payments
            </NavLink>
          </nav>
        </div>

        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Seller;
