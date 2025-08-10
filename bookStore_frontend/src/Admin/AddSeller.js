
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";
import "./AddSeller.css"; // Reuse this for consistent styling

function AddSeller() {
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

  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      email: "",
      password: "",
      pincode: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .matches(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces")
        .required("Name is required"),

      contact: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Mobile number must start with 6-9 and be 10 digits")
        .required("Mobile number is required"),

      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/[a-z]/, "Must contain at least one lowercase letter")
        .matches(/[0-9]/, "Must contain at least one number")
        .matches(/[@$!%*?&#]/, "Must contain at least one special character")
        .required("Password is required"),

      pincode: Yup.string()
        .matches(/^[1-9][0-9]{5}$/, "Pincode must be exactly 6 digits and not start with 0")
        .required("Pincode is required"),

      address: Yup.string()
        .min(10, "Address should be at least 10 characters long")
        .max(100, "Address should not exceed 100 characters")
        .required("Address is required"),
    }),
    onSubmit: (values) => {
      const userData = {
        userName: values.name,
        contact: values.contact,
        email: values.email,
        password: values.password,
        pincode: values.pincode,
        address: values.address,
      };

       const config = {
          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("jwtToken")}`, // Add token if required
            "Content-Type": "application/json", // Set content type if needed
          },
        };

      axios
  .post("http://localhost:5050/admin/registerSeller", userData, config)
  .then((response) => {
    toast.success("Registration successful!");

    // Add a 2-second delay before refreshing the page
    setTimeout(() => {
      window.location.reload();
    }, 2000); // 2000 milliseconds = 2 seconds
  })
  .catch((error) => {
    toast.error("Error registering user. Please try again.");
  });

    },
  });

  return (
    <Admin>
      <div className="add-category-container">
        <h3>Add New Seller</h3>
        <ToastContainer />

        <form onSubmit={formik.handleSubmit} className="category-form">

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              {...formik.getFieldProps("name")}
              placeholder="Enter seller name"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="error-message">{formik.errors.name}</p>
            )}
          </div>

          {/* Contact */}
          <div className="form-group">
            <label htmlFor="contact">Mobile</label>
            <input
              id="contact"
              type="text"
              {...formik.getFieldProps("contact")}
              placeholder="Enter mobile number"
            />
            {formik.touched.contact && formik.errors.contact && (
              <p className="error-message">{formik.errors.contact}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
              placeholder="Enter email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="error-message">{formik.errors.email}</p>
            )}
          </div>

          {/* Pincode */}
          <div className="form-group">
            <label htmlFor="pincode">Pincode</label>
            <input
              id="pincode"
              type="text"
              {...formik.getFieldProps("pincode")}
              placeholder="Enter pincode"
            />
            {formik.touched.pincode && formik.errors.pincode && (
              <p className="error-message">{formik.errors.pincode}</p>
            )}
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              rows="2"
              {...formik.getFieldProps("address")}
              placeholder="Enter full address"
            ></textarea>
            {formik.touched.address && formik.errors.address && (
              <p className="error-message">{formik.errors.address}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
              placeholder="Create a strong password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="error-message">{formik.errors.password}</p>
            )}
          </div>

          <button type="submit" className="submit-btn" style={{ backgroundColor: "#aa6450" }}>
            Add Seller
          </button>
        </form>
      </div>
    </Admin>
  );
}

export default AddSeller;
