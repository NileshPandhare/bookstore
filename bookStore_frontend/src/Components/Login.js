import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "./Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        // Perform login API call
        const response = await axios.post("http://localhost:5050/login", values);
        toast.success("Login Successful!", {
          position: "top-center",
          autoClose: 1000,
        });

        const user = response.data;

        // Store user data and token in sessionStorage
        sessionStorage.setItem("userName", user.name);
        sessionStorage.setItem("userId", user.id);
        sessionStorage.setItem("userRole", user.role);
        sessionStorage.setItem("jwtToken", user.jwt);

        console.log(sessionStorage.getItem("jwtToken"));

        // Navigate based on role
        if (user.role === "ROLE_CUSTOMER") navigate("/");
        else if (user.role === "ROLE_ADMIN") navigate("/admin");
        else if (user.role === "ROLE_SELLER") navigate("/seller");
      } catch (error) {
        toast.error("Invalid email or password!", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    },
  });

  return (
    <div
      style={{ backgroundColor: "white", color: "white", minHeight: "100vh" }}
    >
      {/* <Navbar /> */}
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="shadow-lg p-4"
          style={{
            width: "30rem",
            backgroundColor: "white",
            border: "3px solid #aa6450",
            color: "black",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 className="text-center mb-4">Login to BookHub</h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Email Input */}
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                className="form-control"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label>Password:</label>
              <input
                type="password"
                {...formik.getFieldProps("password")}
                className="form-control"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>

            <div className="mb-3 w-100">
              <button
                type="submit"
                className="btn btn-light w-100 mt-3"
                style={{ backgroundColor: "#aa6450" }}
              >
                Login
              </button>
            </div>
          </form>

          {/* Link to Register Page */}
          <div className="mt-3 text-center">
            <p>Don't have an account?</p>
            <Link to="/register" style={{ textDecoration: "none", color: "#aa6450" }}>
              <strong>Register here</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
