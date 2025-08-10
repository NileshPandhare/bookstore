import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "./Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom"; 
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();

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
      // Prepare the user data
      const userData = {
        userName: values.name,
        contact: values.contact,
        email: values.email,
        password: values.password,
        pincode: values.pincode,
        address: values.address,
      };

      // Make the API call to save the data
      axios
        .post("http://localhost:5050/customer/registerUser", userData) // Your backend URL
        .then((response) => {
          toast.success("Registration successful!");
          navigate("/login"); // Redirect to the login page after successful registration
        })
        .catch((error) => {
          toast.error("Error registering user. Please try again.");
        });
    },
  });

  return (
    <div style={{ backgroundColor: "white", color: "black", minHeight: "90vh" }}>
      {/* <Navbar /> */}
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center vh-50 mt-2">
        <div
          className="shadow-lg p-4"
          style={{
            width: "35rem",
            backgroundColor: "white",
            color: "black",
            display: "flex",
            flexDirection: "column",
            border: "3px solid #aa6450",
          }}
        >
          <h2 className="text-center mb-2">Connect With BookHub</h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Name Input */}
            <div className="mb-3">
              <label>Name:</label>
              <input
                type="text"
                {...formik.getFieldProps("name")}
                className="form-control"
                style={{ height: "4vh" }}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger">{formik.errors.name}</div>
              )}
            </div>

            {/* Mobile Input */}
            <div className="mb-3">
              <label>Mobile:</label>
              <input
                type="text"
                {...formik.getFieldProps("contact")}
                className="form-control"
                style={{ height: "4vh" }}
              />
              {formik.touched.contact && formik.errors.contact && (
                <div className="text-danger">{formik.errors.contact}</div>
              )}
            </div>

            {/* Email Input */}
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                className="form-control"
                style={{ height: "4vh" }}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </div>

            {/* Pincode Input */}
            <div className="mb-3">
              <label>Pincode:</label>
              <input
                type="text"
                {...formik.getFieldProps("pincode")}
                className="form-control"
                style={{ height: "4vh" }}
              />
              {formik.touched.pincode && formik.errors.pincode && (
                <div className="text-danger">{formik.errors.pincode}</div>
              )}
            </div>

            {/* Address Input */}
            <div className="mb-3">
              <label>Address:</label>
              <textarea
                {...formik.getFieldProps("address")}
                className="form-control"
                rows="1"
              ></textarea>
              {formik.touched.address && formik.errors.address && (
                <div className="text-danger">{formik.errors.address}</div>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label>Password:</label>
              <input
                type="password"
                {...formik.getFieldProps("password")}
                className="form-control"
                style={{ height: "4vh" }}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>

            <div className="mb-2 w-100">
              <button
                type="submit"
                className="btn btn-light w-100"
                style={{ backgroundColor: "#aa6450" }}
              >
                Register
              </button>
            </div>
          </form>

          {/* Link to Login Page */}
          <div className="mt-2 text-center">
            <p>Already have an account?</p>
            <Link to="/login" style={{ textDecoration: "none", color: "#aa6450" }}>
              <strong>Login here</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
