
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaBoxes, FaMoneyCheckAlt, FaClipboardList } from "react-icons/fa";
import { MdCategory, MdOutlinePayment } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BsShop } from "react-icons/bs";
import AdminNavbar from "./AdminNavbar";
import "./Styles.css";

function Admin({ children }) {
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
      <AdminNavbar />
      <div className="layout-container">
        <div
          className="sidebar"
          style={{ border: "2px solid white", display: "flex", backgroundColor: "#aa6450" }}
        >
          <div className="sidebar-header">
            <h3>Admin</h3>
          </div>
          <nav className="sidebar-nav">
            <NavLink
              to="/admin/addseller"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaUserPlus className="icon" /> Add Seller
            </NavLink>

            <NavLink
              to="/admin/addcategory"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <MdCategory className="icon" /> Add Category
            </NavLink>

            <NavLink
              to="/admin/viewsellers"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <BsShop className="icon" /> View Sellers
            </NavLink>

            <NavLink
              to="/admin/viewproducts"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <AiOutlineEye className="icon" /> View Products
            </NavLink>

            <NavLink
              to="/admin/vieworders"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <HiOutlineClipboardDocumentList className="icon" /> View Orders
            </NavLink>

            <NavLink
              to="/admin/viewPayments"
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

export default Admin;
