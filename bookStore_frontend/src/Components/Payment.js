// import React, { useState, useEffect } from "react";
// import {
//   MDBBtn,
//   MDBCard,
//   MDBCardBody,
//   MDBCol,
//   MDBContainer,
//   MDBIcon,
//   MDBInput,
//   MDBRow,
// } from "mdb-react-ui-kit";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function PaymentForm() {
//   const [cardNumber, setCardNumber] = useState("");
//   const [cardHolderName, setCardHolderName] = useState("");
//   const [expiration, setExpiration] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { totalPrice, products } = location.state || {
//     totalPrice: 0,
//     products: [],
//   };

//   const validateCardNumber = (number) => /^[0-9]{16}$/.test(number);

//   const validateExpirationDate = (date) => {
//     const [month, year] = date.split("/").map(Number);
//     if (!month || !year || month < 1 || month > 12 || year < new Date().getFullYear()) {
//       return false;
//     }
//     const expirationDate = new Date(year, month - 1);
//     const today = new Date();
//     return expirationDate >= new Date(today.getFullYear(), today.getMonth());
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!cardNumber || !cardHolderName || !expiration || !cvv) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     if (!validateCardNumber(cardNumber)) {
//       setError("Card number must be 16 digits.");
//       return;
//     }

//     if (!validateExpirationDate(expiration)) {
//       setError("Expiration date is invalid or in the past.");
//       return;
//     }

//     setError("");
//     setIsSubmitting(true);

//     const userId = sessionStorage.getItem("userId");
//     if (!userId) {
//       setError("User is not logged in.");
//       setIsSubmitting(false);
//       return;
//     }

//     const orderPayload = {
//       id: userId,
//       items: products.map((product) => ({
//         productId: product.productId,
//         quantity: product.quantity,
//       })),
//     };

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
//           "Content-Type": "application/json",
//         },
//       };

//       const orderResponse = await axios.post(
//         `${Book_SERVICE_API_BASE_URL}/customer/createOrder`,
//         orderPayload,
//         config
//       );

//       const orderId = orderResponse.data.orderId;

//       if (!orderId) throw new Error("Order ID not received");

//       const paymentPayload = {
//         orderId,
//         amount: totalPrice,
//       };

//       const paymentResponse = await axios.post(
//         `${Book_SERVICE_API_BASE_URL}/customer/processPayment`,
//         paymentPayload,
//         config
//       );

//       if (paymentResponse.data.status === "PAID") {
//         toast.success("Payment successful!", {
//           position: "top-right",
//           autoClose: 1000,
//         });

//         setTimeout(() => navigate(`/viewcart/${userId}`), 1500);
//       } else {
//         throw new Error("Payment status is not PAID");
//       }
//     } catch (error) {
//       setError("Failed to complete the transaction. Please try again.");
//       toast.error("Payment failed. Please try again.", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <MDBContainer fluid className="py-5 gradient-custom" style={{ backgroundColor: "#f5f7fa" }}>
//       <MDBRow className="d-flex justify-content-center">
//         <MDBCol md="6" lg="5">
//           <MDBCard style={{ borderRadius: "20px", padding: "20px" }} className="shadow">
//             <MDBCardBody>
//               {/* Top Logo */}
//               <div className="text-center mb-4">
//                 <img
//                   src="../assests/paymentGateway.jpeg"
//                   alt="Payment Gateway"
//                   style={{ width: "30%", height: "20%" }}
//                 />
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <MDBRow className="gy-3">
//                   <MDBCol size="12">
//                     <MDBInput
//                       label="Card Number"
//                       type="text"
//                       value={cardNumber}
//                       onChange={(e) => setCardNumber(e.target.value)}
//                       placeholder="1234 5678 9012 3456"
//                       required
//                     />
//                   </MDBCol>

//                   <MDBCol size="12">
//                     <MDBInput
//                       label="Cardholder's Name"
//                       type="text"
//                       value={cardHolderName}
//                       onChange={(e) => setCardHolderName(e.target.value)}
//                       placeholder="John Doe"
//                       required
//                     />
//                   </MDBCol>

//                   <MDBCol size="6">
//                     <MDBInput
//                       label="Expiration (MM/YYYY)"
//                       type="text"
//                       value={expiration}
//                       onChange={(e) => setExpiration(e.target.value)}
//                       placeholder="08/2026"
//                       required
//                     />
//                   </MDBCol>

//                   <MDBCol size="6">
//                     <MDBInput
//                       label="CVV"
//                       type="text"
//                       value={cvv}
//                       onChange={(e) => setCvv(e.target.value)}
//                       placeholder="123"
//                       required
//                     />
//                   </MDBCol>

//                   {error && (
//                     <MDBCol size="12" className="text-danger text-center">
//                       {error}
//                     </MDBCol>
//                   )}

//                   <MDBCol size="12" className="text-center mt-3">
//                     <h5>Total Amount: ₹{totalPrice.toFixed(2)}</h5>
//                   </MDBCol>

//                   <MDBCol size="12" className="text-center">
//                     <MDBBtn
//                       color="info"
//                       rounded
//                       size="lg"
//                       type="submit"
//                       disabled={isSubmitting}
//                       style={{ minWidth: "120px" }} // fixed width to prevent size change
//                     >
//                       {isSubmitting ? (
//                         <span style={{ visibility: "visible" }}>Processing...</span>
//                       ) : (
//                         <span style={{ visibility: "visible" }}>
//                           <MDBIcon fas icon="arrow-right" />
//                         </span>
//                       )}
//                     </MDBBtn>

//                   </MDBCol>
//                 </MDBRow>
//               </form>

//               {/* Bottom Icons */}
//               <div className="text-center mt-4">
//                 <img
//                   src="../assests/payment1.png"
//                   alt="Payment Options"
//                   style={{ width: "50%"}}
//                 />
//               </div>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//       <ToastContainer />
//     </MDBContainer>
//   );
// }



//////new code->

// import React, { useState, useEffect } from "react";
// import {
//   MDBBtn,
//   MDBCard,
//   MDBCardBody,
//   MDBCol,
//   MDBContainer,
//   MDBIcon,
//   MDBInput,
//   MDBRow,
// } from "mdb-react-ui-kit";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function PaymentForm() {
//   const [cardNumber, setCardNumber] = useState("");
//   const [cardHolderName, setCardHolderName] = useState("");
//   const [expiration, setExpiration] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { totalPrice, products } = location.state || {
//     totalPrice: 0,
//     products: [],
//   };

//   const validateCardNumber = (number) => /^[0-9]{16}$/.test(number);

//   const validateExpirationDate = (date) => {
//     const [month, year] = date.split("/").map(Number);
//     if (!month || !year || month < 1 || month > 12 || year < new Date().getFullYear()) {
//       return false;
//     }
//     const expirationDate = new Date(year, month - 1);
//     const today = new Date();
//     return expirationDate >= new Date(today.getFullYear(), today.getMonth());
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!cardNumber || !cardHolderName || !expiration || !cvv) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     if (!validateCardNumber(cardNumber)) {
//       setError("Card number must be 16 digits.");
//       return;
//     }

//     if (!validateExpirationDate(expiration)) {
//       setError("Expiration date is invalid or in the past.");
//       return;
//     }

//     setError("");
//     setIsSubmitting(true);

//     const userId = sessionStorage.getItem("userId");
//     if (!userId) {
//       setError("User is not logged in.");
//       setIsSubmitting(false);
//       return;
//     }

//     const orderPayload = {
//       id: userId,
//       items: products.map((product) => ({
//         productId: product.productId,
//         quantity: product.quantity,
//       })),
//     };

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
//           "Content-Type": "application/json",
//         },
//       };

//       const orderResponse = await axios.post(
//         `${Book_SERVICE_API_BASE_URL}/customer/createOrder`,
//         orderPayload,
//         config
//       );

//       const orderId = orderResponse.data.orderId;

//       if (!orderId) throw new Error("Order ID not received");

//       const paymentPayload = {
//         orderId,
//         amount: totalPrice,
//       };

//       const paymentResponse = await axios.post(
//         `${Book_SERVICE_API_BASE_URL}/customer/processPayment`,
//         paymentPayload,
//         config
//       );

//       if (paymentResponse.data.status === "PAID") {
//         toast.success("Payment successful!", {
//           position: "top-right",
//           autoClose: 1000,
//         });

//         setTimeout(() => navigate(`/viewcart/${userId}`), 1500);
//       } else {
//         throw new Error("Payment status is not PAID");
//       }
//     } catch (error) {
//       setError("Failed to complete the transaction. Please try again.");
//       toast.error("Payment failed. Please try again.", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <MDBContainer fluid className="py-5 gradient-custom" style={{ backgroundColor: "#f5f7fa" }}>
//       <MDBRow className="d-flex justify-content-center">
//         <MDBCol md="6" lg="5">
//           <MDBCard style={{ borderRadius: "20px", padding: "20px" }} className="shadow">
//             <MDBCardBody>
//               {/* Top Logo */}
//               <div className="text-center mb-4">
//                 <img
//                   src="../assests/paymentGateway.jpeg"
//                   alt="Payment Gateway"
//                   style={{ width: "30%", height: "20%" }}
//                 />
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <MDBRow className="gy-3">
//                   <MDBCol size="12">
//                     <MDBInput
//                       label="Card Number"
//                       type="text"
//                       value={cardNumber}
//                       onChange={(e) => setCardNumber(e.target.value)}
//                       placeholder="1234 5678 9012 3456"
//                       required
//                     />
//                   </MDBCol>

//                   <MDBCol size="12">
//                     <MDBInput
//                       label="Cardholder's Name"
//                       type="text"
//                       value={cardHolderName}
//                       onChange={(e) => setCardHolderName(e.target.value)}
//                       placeholder="John Doe"
//                       required
//                     />
//                   </MDBCol>

//                   <MDBCol size="6">
//                     <MDBInput
//                       label="Expiration (MM/YYYY)"
//                       type="text"
//                       value={expiration}
//                       onChange={(e) => setExpiration(e.target.value)}
//                       placeholder="08/2026"
//                       required
//                     />
//                   </MDBCol>

//                   <MDBCol size="6">
//                     <MDBInput
//                       label="CVV"
//                       type="text"
//                       value={cvv}
//                       onChange={(e) => setCvv(e.target.value)}
//                       placeholder="123"
//                       required
//                     />
//                   </MDBCol>

//                   {error && (
//                     <MDBCol size="12" className="text-danger text-center">
//                       {error}
//                     </MDBCol>
//                   )}

//                   <MDBCol size="12" className="text-center mt-3">
//                     <h5>Total Amount: ₹{totalPrice.toFixed(2)}</h5>
//                   </MDBCol>

//                   <MDBCol size="12" className="text-center">
//                     <MDBBtn
//                       color="info"
//                       rounded
//                       size="lg"
//                       type="submit"
//                       disabled={isSubmitting}
//                       style={{ minWidth: "120px" }} // fixed width to prevent size change
//                     >
//                       {isSubmitting ? (
//                         <span style={{ visibility: "visible" }}>Processing...</span>
//                       ) : (
//                         <span style={{ visibility: "visible" }}>
//                           <MDBIcon fas icon="arrow-right" />
//                         </span>
//                       )}
//                     </MDBBtn>

//                   </MDBCol>
//                 </MDBRow>
//               </form>

//               {/* Bottom Icons */}
//               <div className="text-center mt-4">
//                 <img
//                   src="../assests/payment1.png"
//                   alt="Payment Options"
//                   style={{ width: "50%"}}
//                 />
//               </div>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//       <ToastContainer />
//     </MDBContainer>
//   );
// }


//code2 refer this

// import React, { useState } from "react";
// import {
//   MDBBtn,
//   MDBCard,
//   MDBCardBody,
//   MDBCol,
//   MDBContainer,
//   MDBIcon,
//   MDBInput,
//   MDBRow,
// } from "mdb-react-ui-kit";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function PaymentForm() {
//   const [cardNumber, setCardNumber] = useState("");
//   const [cardHolderName, setCardHolderName] = useState("");
//   const [expiration, setExpiration] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { totalPrice, products } = location.state || {
//     totalPrice: 0,
//     products: [],
//   };

//   const validateCardNumber = (number) => /^[0-9]{16}$/.test(number);

//   const validateExpirationDate = (date) => {
//     const [month, year] = date.split("/").map(Number);
//     if (
//       !month ||
//       !year ||
//       month < 1 ||
//       month > 12 ||
//       year < new Date().getFullYear()
//     ) {
//       return false;
//     }
//     const expirationDate = new Date(year, month - 1);
//     const today = new Date();
//     return expirationDate >= new Date(today.getFullYear(), today.getMonth());
//   };

//   const validateCvv = (cvv) => /^[0-9]{3}$/.test(cvv);

//   // New card holder name validation: only letters and spaces, min 2 characters
//   const validateCardHolderName = (name) =>
//     /^[A-Za-z ]{2,}$/.test(name.trim());

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!cardNumber || !cardHolderName || !expiration || !cvv) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     if (!validateCardNumber(cardNumber)) {
//       setError("Card number must be 16 digits.");
//       return;
//     }

//     if (!validateCardHolderName(cardHolderName)) {
//       setError(
//         "Cardholder's name must contain only letters and spaces, minimum 2 characters."
//       );
//       return;
//     }

//     if (!validateExpirationDate(expiration)) {
//       setError("Expiration date is invalid or in the past.");
//       return;
//     }

//     if (!validateCvv(cvv)) {
//       setError("CVV must be a 3-digit number.");
//       return;
//     }

//     setError("");
//     setIsSubmitting(true);

//     const userId = sessionStorage.getItem("userId");
//     if (!userId) {
//       setError("User is not logged in.");
//       setIsSubmitting(false);
//       return;
//     }

//     const orderPayload = {
//       id: userId,
//       items: products.map((product) => ({
//         productId: product.productId,
//         quantity: product.quantity,
//       })),
//     };

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
//           "Content-Type": "application/json",
//         },
//       };

//       const orderResponse = await axios.post(
//         `${Book_SERVICE_API_BASE_URL}/customer/createOrder`,
//         orderPayload,
//         config
//       );

//       const orderId = orderResponse.data.orderId;

//       if (!orderId) throw new Error("Order ID not received");

//       const paymentPayload = {
//         orderId,
//         amount: totalPrice,
//       };

//       const paymentResponse = await axios.post(
//         `${Book_SERVICE_API_BASE_URL}/customer/processPayment`,
//         paymentPayload,
//         config
//       );

//       if (paymentResponse.data.status === "PAID") {
//         toast.success("Payment successful!", {
//           position: "top-right",
//           autoClose: 1000,
//         });

//         setTimeout(() => navigate(`/viewcart/${userId}`), 1500);
//       } else {
//         throw new Error("Payment status is not PAID");
//       }
//     } catch (error) {
//       setError("Failed to complete the transaction. Please try again.");
//       toast.error("Payment failed. Please try again.", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <MDBContainer
//       fluid
//       className="py-5 gradient-custom"
//       style={{ backgroundColor: "#f5f7fa" }}
//     >
//       <MDBRow className="d-flex justify-content-center">
//         <MDBCol md="6" lg="5">
//           <MDBCard style={{ borderRadius: "20px", padding: "20px" }} className="shadow">
//             <MDBCardBody>
//               {/* Top Logo */}
//               <div className="text-center mb-4">
//                 <img
//                   src="../assests/paymentGateway.jpeg"
//                   alt="Payment Gateway"
//                   style={{ width: "30%", height: "20%" }}
//                 />
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <MDBRow className="gy-3">
//                   <MDBCol size="12">
//                     <MDBInput
//                       label="Card Number"
//                       type="text"
//                       value={cardNumber}
//                       onChange={(e) =>
//                         setCardNumber(e.target.value.replace(/\D/g, ""))
//                       }
//                       placeholder="1234 5678 9012 3456"
//                       maxLength={16}
//                       required
//                     />
//                   </MDBCol>

//                   <MDBCol size="12">
//                     <MDBInput
//                       label="Cardholder's Name"
//                       type="text"
//                       value={cardHolderName}
//                       onChange={(e) => setCardHolderName(e.target.value)}
//                       placeholder="John Doe"
//                       required
//                     />
//                   </MDBCol>

//                   <MDBCol size="6">
//                     <MDBInput
//                       label="Expiration (MM/YYYY)"
//                       type="text"
//                       value={expiration}
//                       onChange={(e) => setExpiration(e.target.value)}
//                       placeholder="08/2026"
//                       maxLength={7}
//                       required
//                     />
//                   </MDBCol>

//                   <MDBCol size="6">
//                     <MDBInput
//                       label="CVV"
//                       type="text"
//                       value={cvv}
//                       onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
//                       placeholder="123"
//                       maxLength={3}
//                       required
//                     />
//                   </MDBCol>

//                   {error && (
//                     <MDBCol size="12" className="text-danger text-center">
//                       {error}
//                     </MDBCol>
//                   )}

//                   <MDBCol size="12" className="text-center mt-3">
//                     <h5>Total Amount: ₹{totalPrice.toFixed(2)}</h5>
//                   </MDBCol>

//                   <MDBCol size="12" className="text-center">
//                     <MDBBtn
//                       color="info"
//                       rounded
//                       size="lg"
//                       type="submit"
//                       disabled={isSubmitting}
//                       style={{ minWidth: "120px" }}
//                     >
//                       {isSubmitting ? (
//                         <span style={{ visibility: "visible" }}>Processing...</span>
//                       ) : (
//                         <span style={{ visibility: "visible" }}>
//                           <MDBIcon fas icon="arrow-right" />
//                         </span>
//                       )}
//                     </MDBBtn>
//                   </MDBCol>
//                 </MDBRow>
//               </form>

//               {/* Bottom Icons */}
//               <div className="text-center mt-4">
//                 <img
//                   src="../assests/payment1.png"
//                   alt="Payment Options"
//                   style={{ width: "50%" }}
//                 />
//               </div>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//       <ToastContainer />
//     </MDBContainer>
//   );
// }



// code3  automatic pdf generayion
// import React, { useState } from "react";
// import {
//   MDBBtn,
//   MDBCard,
//   MDBCardBody,
//   MDBCol,
//   MDBContainer,
//   MDBIcon,
//   MDBInput,
//   MDBRow,
// } from "mdb-react-ui-kit";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import jsPDF from "jspdf";

// export default function PaymentForm() {
//   const [cardNumber, setCardNumber] = useState("");
//   const [cardHolderName, setCardHolderName] = useState("");
//   const [expiration, setExpiration] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { totalPrice, products } = location.state || {
//     totalPrice: 0,
//     products: [],
//   };

//   const validateCardNumber = (number) => /^[0-9]{16}$/.test(number);

//   const validateExpirationDate = (date) => {
//     const [month, year] = date.split("/").map(Number);
//     if (
//       !month ||
//       !year ||
//       month < 1 ||
//       month > 12 ||
//       year < new Date().getFullYear()
//     ) {
//       return false;
//     }
//     const expirationDate = new Date(year, month - 1);
//     const today = new Date();
//     return expirationDate >= new Date(today.getFullYear(), today.getMonth());
//   };

//   const validateCvv = (cvv) => /^[0-9]{3}$/.test(cvv);

//   const validateCardHolderName = (name) => /^[a-zA-Z\s]+$/.test(name);

//   const generatePdfReceipt = (orderId, totalPrice, products) => {
//     const doc = new jsPDF();

//     doc.setFontSize(18);
//     doc.text("Payment Receipt", 14, 22);

//     doc.setFontSize(12);
//     doc.text(`Order ID: ${orderId}`, 14, 32);
//     doc.text(`Total Paid: ₹${totalPrice.toFixed(2)}`, 14, 40);
//     doc.text(`Date: ${new Date().toLocaleString()}`, 14, 48);

//     doc.text("Items Purchased:", 14, 58);

//     let y = 66;
//     products.forEach((product, idx) => {
//       doc.text(
//         `${idx + 1}. ${product.productName || product.productId} - Qty: ${
//           product.quantity
//         }`,
//         14,
//         y
//       );
//       y += 8;
//     });

//     doc.save(`receipt_${orderId}.pdf`);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!cardNumber || !cardHolderName || !expiration || !cvv) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     if (!validateCardNumber(cardNumber)) {
//       setError("Card number must be 16 digits.");
//       return;
//     }

//     if (!validateCardHolderName(cardHolderName)) {
//       setError("Cardholder's name must contain only letters and spaces.");
//       return;
//     }

//     if (!validateExpirationDate(expiration)) {
//       setError("Expiration date is invalid or in the past.");
//       return;
//     }

//     if (!validateCvv(cvv)) {
//       setError("CVV must be exactly 3 digits.");
//       return;
//     }

//     setError("");
//     setIsSubmitting(true);

//     const userId = sessionStorage.getItem("userId");
//     if (!userId) {
//       setError("User is not logged in.");
//       setIsSubmitting(false);
//       return;
//     }

//     const orderPayload = {
//       id: userId,
//       items: products.map((product) => ({
//         productId: product.productId,
//         quantity: product.quantity,
//       })),
//     };

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
//           "Content-Type": "application/json",
//         },
//       };

//       const orderResponse = await axios.post(
//         `${Book_SERVICE_API_BASE_URL}/customer/createOrder`,
//         orderPayload,
//         config
//       );

//       const orderId = orderResponse.data.orderId;

//       if (!orderId) throw new Error("Order ID not received");

//       const paymentPayload = {
//         orderId,
//         amount: totalPrice,
//       };

//       const paymentResponse = await axios.post(
//         `${Book_SERVICE_API_BASE_URL}/customer/processPayment`,
//         paymentPayload,
//         config
//       );

//       if (paymentResponse.data.status === "PAID") {
//         toast.success("Payment successful!", {
//           position: "top-right",
//           autoClose: 1000,
//         });

//         // Generate and download PDF receipt here
//         generatePdfReceipt(orderId, totalPrice, products);

//         setTimeout(() => navigate(`/viewcart/${userId}`), 1500);
//       } else {
//         throw new Error("Payment status is not PAID");
//       }
//     } catch (error) {
//       setError("Failed to complete the transaction. Please try again.");
//       toast.error("Payment failed. Please try again.", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <MDBContainer
//       fluid
//       className="py-5 gradient-custom"
//       style={{ backgroundColor: "#f5f7fa" }}
//     >
//       <MDBRow className="d-flex justify-content-center">
//         <MDBCol md="6" lg="5">
//           <MDBCard style={{ borderRadius: "20px", padding: "20px" }} className="shadow">
//             <MDBCardBody>
//               {/* Top Logo */}
//               <div className="text-center mb-4">
//                 <img
//                   src="../assests/paymentGateway.jpeg"
//                   alt="Payment Gateway"
//                   style={{ width: "30%", height: "20%" }}
//                 />
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <MDBRow className="gy-3">
//                   <MDBCol size="12">
//                     <MDBInput
//                       label="Card Number"
//                       type="text"
//                       value={cardNumber}
//                       onChange={(e) => setCardNumber(e.target.value)}
//                       placeholder="1234 5678 9012 3456"
//                       required
//                     />
//                   </MDBCol>

//                   <MDBCol size="12">
//                     <MDBInput
//                       label="Cardholder's Name"
//                       type="text"
//                       value={cardHolderName}
//                       onChange={(e) => setCardHolderName(e.target.value)}
//                       placeholder="John Doe"
//                       required
//                     />
//                   </MDBCol>

//                   <MDBCol size="6">
//                     <MDBInput
//                       label="Expiration (MM/YYYY)"
//                       type="text"
//                       value={expiration}
//                       onChange={(e) => setExpiration(e.target.value)}
//                       placeholder="08/2026"
//                       required
//                     />
//                   </MDBCol>

//                   <MDBCol size="6">
//                     <MDBInput
//                       label="CVV"
//                       type="text"
//                       value={cvv}
//                       onChange={(e) => setCvv(e.target.value)}
//                       placeholder="123"
//                       required
//                     />
//                   </MDBCol>

//                   {error && (
//                     <MDBCol size="12" className="text-danger text-center">
//                       {error}
//                     </MDBCol>
//                   )}

//                   <MDBCol size="12" className="text-center mt-3">
//                     <h5>Total Amount: ₹{totalPrice.toFixed(2)}</h5>
//                   </MDBCol>

//                   <MDBCol size="12" className="text-center">
//                     <MDBBtn
//                       color="info"
//                       rounded
//                       size="lg"
//                       type="submit"
//                       disabled={isSubmitting}
//                       style={{ minWidth: "120px" }}
//                     >
//                       {isSubmitting ? (
//                         <span style={{ visibility: "visible" }}>Processing...</span>
//                       ) : (
//                         <span style={{ visibility: "visible" }}>
//                           <MDBIcon fas icon="arrow-right" />
//                         </span>
//                       )}
//                     </MDBBtn>
//                   </MDBCol>
//                 </MDBRow>
//               </form>

//               {/* Bottom Icons */}
//               <div className="text-center mt-4">
//                 <img
//                   src="../assests/payment1.png"
//                   alt="Payment Options"
//                   style={{ width: "50%" }}
//                 />
//               </div>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//       <ToastContainer />
//     </MDBContainer>
//   );
// }

//code-4  download and kip button

// import React, { useState } from "react";
// import {
//   MDBBtn,
//   MDBCard,
//   MDBCardBody,
//   MDBCol,
//   MDBContainer,
//   MDBIcon,
//   MDBInput,
//   MDBRow,
// } from "mdb-react-ui-kit";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { jsPDF } from "jspdf";

// export default function PaymentForm() {
//   const [cardNumber, setCardNumber] = useState("");
//   const [cardHolderName, setCardHolderName] = useState("");
//   const [expiration, setExpiration] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [orderId, setOrderId] = useState(null);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const { totalPrice, products } = location.state || {
//     totalPrice: 0,
//     products: [],
//   };

//   const validateCardNumber = (number) => /^[0-9]{16}$/.test(number);

//   const validateExpirationDate = (date) => {
//     const [month, year] = date.split("/").map(Number);
//     if (!month || !year || month < 1 || month > 12 || year < new Date().getFullYear()) {
//       return false;
//     }
//     const expirationDate = new Date(year, month - 1);
//     const today = new Date();
//     return expirationDate >= new Date(today.getFullYear(), today.getMonth());
//   };

//   const validateCvv = (value) => /^[0-9]{3}$/.test(value);

//   const validateCardHolderName = (name) => /^[a-zA-Z\s]+$/.test(name.trim());

//   const generatePdfReceipt = (orderId, totalPrice, products) => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text("Receipt", 20, 20);
//     doc.setFontSize(12);
//     doc.text(`Order ID: ${orderId}`, 20, 30);
//     doc.text(`Total Price: ₹${totalPrice.toFixed(2)}`, 20, 40);

//     let y = 50;
//     products.forEach((product, index) => {
//       doc.text(
//         `${index + 1}. Product ID: ${product.productId}, Quantity: ${product.quantity}`,
//         20,
//         y
//       );
//       y += 10;
//     });

//     doc.save(`receipt_${orderId}.pdf`);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!cardNumber || !cardHolderName || !expiration || !cvv) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     if (!validateCardNumber(cardNumber)) {
//       setError("Card number must be 16 digits.");
//       return;
//     }

//     if (!validateCardHolderName(cardHolderName)) {
//       setError("Cardholder's name must contain only letters and spaces.");
//       return;
//     }

//     if (!validateExpirationDate(expiration)) {
//       setError("Expiration date is invalid or in the past.");
//       return;
//     }

//     if (!validateCvv(cvv)) {
//       setError("CVV must be a 3-digit number.");
//       return;
//     }

//     setError("");
//     setIsSubmitting(true);

//     const userId = sessionStorage.getItem("userId");
//     if (!userId) {
//       setError("User is not logged in.");
//       setIsSubmitting(false);
//       return;
//     }

//     const orderPayload = {
//       id: userId,
//       items: products.map((product) => ({
//         productId: product.productId,
//         quantity: product.quantity,
//       })),
//     };

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
//           "Content-Type": "application/json",
//         },
//       };

//       const orderResponse = await axios.post(
//         `${Book_SERVICE_API_BASE_URL}/customer/createOrder`,
//         orderPayload,
//         config
//       );

//       const newOrderId = orderResponse.data.orderId;

//       if (!newOrderId) throw new Error("Order ID not received");

//       const paymentPayload = {
//         orderId: newOrderId,
//         amount: totalPrice,
//       };

//       const paymentResponse = await axios.post(
//         `${Book_SERVICE_API_BASE_URL}/customer/processPayment`,
//         paymentPayload,
//         config
//       );

//       if (paymentResponse.data.status === "PAID") {
//         toast.success("Payment successful!", {
//           position: "top-right",
//           autoClose: 1000,
//         });
//         setOrderId(newOrderId);
//         setPaymentSuccess(true); // show download/skip buttons
//       } else {
//         throw new Error("Payment status is not PAID");
//       }
//     } catch (error) {
//       setError("Failed to complete the transaction. Please try again.");
//       toast.error("Payment failed. Please try again.", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <MDBContainer fluid className="py-5 gradient-custom" style={{ backgroundColor: "#f5f7fa" }}>
//       <MDBRow className="d-flex justify-content-center">
//         <MDBCol md="6" lg="5">
//           <MDBCard style={{ borderRadius: "20px", padding: "20px" }} className="shadow">
//             <MDBCardBody>
//               {/* Top Logo */}
//               <div className="text-center mb-4">
//                 <img
//                   src="../assests/paymentGateway.jpeg"
//                   alt="Payment Gateway"
//                   style={{ width: "30%", height: "20%" }}
//                 />
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <MDBRow className="gy-3">
//                   <MDBCol size="12">
//                     <MDBInput
//                       label="Card Number"
//                       type="text"
//                       value={cardNumber}
//                       onChange={(e) => setCardNumber(e.target.value)}
//                       placeholder="1234 5678 9012 3456"
//                       required
//                       maxLength={16}
//                     />
//                   </MDBCol>

//                   <MDBCol size="12">
//                     <MDBInput
//                       label="Cardholder's Name"
//                       type="text"
//                       value={cardHolderName}
//                       onChange={(e) => setCardHolderName(e.target.value)}
//                       placeholder="John Doe"
//                       required
//                     />
//                   </MDBCol>

//                   <MDBCol size="6">
//                     <MDBInput
//                       label="Expiration (MM/YYYY)"
//                       type="text"
//                       value={expiration}
//                       onChange={(e) => setExpiration(e.target.value)}
//                       placeholder="08/2026"
//                       required
//                       maxLength={7}
//                     />
//                   </MDBCol>

//                   <MDBCol size="6">
//                     <MDBInput
//                       label="CVV"
//                       type="text"
//                       value={cvv}
//                       onChange={(e) => setCvv(e.target.value)}
//                       placeholder="123"
//                       required
//                       maxLength={3}
//                     />
//                   </MDBCol>

//                   {error && (
//                     <MDBCol size="12" className="text-danger text-center">
//                       {error}
//                     </MDBCol>
//                   )}

//                   <MDBCol size="12" className="text-center mt-3">
//                     <h5>Total Amount: ₹{totalPrice.toFixed(2)}</h5>
//                   </MDBCol>

//                   {!paymentSuccess ? (
//                     <MDBCol size="12" className="text-center">
//                       <MDBBtn
//                         color="info"
//                         rounded
//                         size="lg"
//                         type="submit"
//                         disabled={isSubmitting}
//                         style={{ minWidth: "120px" }}
//                       >
//                         {isSubmitting ? (
//                           <span style={{ visibility: "visible" }}>Processing...</span>
//                         ) : (
//                           <span style={{ visibility: "visible" }}>
//                             <MDBIcon fas icon="arrow-right" />
//                           </span>
//                         )}
//                       </MDBBtn>
//                     </MDBCol>
//                   ) : (
//                     <MDBRow className="mt-3">
//                       <MDBCol size="6" className="text-center">
//                         <MDBBtn
//                           color="success"
//                           onClick={() => {
//                             generatePdfReceipt(orderId, totalPrice, products);
//                             setTimeout(() => {
//                               const userId = sessionStorage.getItem("userId");
//                               navigate(`/viewcart/${userId}`);
//                             }, 1500);
//                           }}
//                         >
//                           Download Receipt
//                         </MDBBtn>
//                       </MDBCol>

//                       <MDBCol size="6" className="text-center">
//                         <MDBBtn
//                           color="secondary"
//                           onClick={() => {
//                             const userId = sessionStorage.getItem("userId");
//                             navigate(`/viewcart/${userId}`);
//                           }}
//                         >
//                           Skip
//                         </MDBBtn>
//                       </MDBCol>
//                     </MDBRow>
//                   )}
//                 </MDBRow>
//               </form>

//               {/* Bottom Icons */}
//               <div className="text-center mt-4">
//                 <img
//                   src="../assests/payment1.png"
//                   alt="Payment Options"
//                   style={{ width: "50%" }}
//                 />
//               </div>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//       <ToastContainer />
//     </MDBContainer>
//   );
// }


//code-5
import React, { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export default function PaymentForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // States for after payment success
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [transactionId, setTransactionId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { totalPrice, products } = location.state || {
    totalPrice: 0,
    products: [],
  };

  const validateCardNumber = (number) => /^[0-9]{16}$/.test(number);

  const validateExpirationDate = (date) => {
    const [month, year] = date.split("/").map(Number);
    if (
      !month ||
      !year ||
      month < 1 ||
      month > 12 ||
      year < new Date().getFullYear()
    ) {
      return false;
    }
    const expirationDate = new Date(year, month - 1);
    const today = new Date();
    return expirationDate >= new Date(today.getFullYear(), today.getMonth());
  };

  const validateCvv = (cvv) => /^[0-9]{3}$/.test(cvv);

  const validateCardHolderName = (name) => /^[a-zA-Z ]+$/.test(name.trim());

  const generateTransactionId = () => {
    return "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  // const generatePdfReceipt = (orderId, totalPrice, products, transactionId) => {
  //   const doc = new jsPDF();
  //   doc.setFontSize(18);
  //   doc.text("Receipt", 20, 20);
  //   doc.setFontSize(12);
  //   doc.text(`Order ID: ${orderId}`, 20, 30);
  //   doc.text(`Transaction ID: ${transactionId}`, 20, 40);
  //   doc.text(`Total Price: ₹${totalPrice.toFixed(2)}`, 20, 50);

  //   let y = 60;
  //   products.forEach((product, index) => {
  //     doc.text(
  //       `${index + 1}. Product ID: ${product.productId}, Quantity: ${product.quantity}`,
  //       20,
  //       y
  //     );
  //     y += 10;
  //   });

  //   doc.save(`receipt_${orderId}.pdf`);
  // };
//code-2
 
// const generatePdfReceipt = (orderId, totalPrice, products, transactionId) => {
//   const doc = new jsPDF();
//   doc.setFontSize(18);
//   doc.text("Receipt", 20, 20);
//   doc.setFontSize(12);
//   doc.text(`Order ID: ${orderId}`, 20, 30);
//   doc.text(`Transaction ID: ${transactionId}`, 20, 40);

//   const total = Number(totalPrice);
//   doc.text(`Total Price: ₹${isNaN(total) ? "0.00" : total.toFixed(2)}`, 20, 50);

//   let y = 60;
//   products.forEach((product, index) => {
//     doc.text(
//       `${index + 1}. Product ID: ${product.productId}, Quantity: ${product.quantity}`,
//       20,
//       y
//     );
//     y += 10;
//   });

//   doc.save(`receipt_${orderId}.pdf`);
// };

const generatePdfReceipt = (orderId, totalPrice, products, transactionId) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Receipt", 20, 20);

  // Get current date and time
  const now = new Date();
  const dateStr = now.toLocaleDateString();   // e.g. 8/10/2025
  const timeStr = now.toLocaleTimeString();   // e.g. 3:45:30 PM

  doc.setFontSize(12);
  doc.text(`Order ID: ${orderId}`, 20, 30);
  doc.text(`Transaction ID: ${transactionId}`, 20, 40);

  // Add date and time
  doc.text(`Date: ${dateStr}`, 150, 30);  // position near top-right
  doc.text(`Time: ${timeStr}`, 150, 40);

  const total = Number(totalPrice);
  doc.text(`Total Price: ₹${isNaN(total) ? "0.00" : total.toFixed(2)}`, 20, 50);

  let y = 60;
  products.forEach((product, index) => {
    doc.text(
      `${index + 1}. Product ID: ${product.productId}, Quantity: ${product.quantity}`,
      20,
      y
    );
    y += 10;
  });

  doc.save(`receipt_${orderId}.pdf`);
};





//////////////////////
////////check it
// const generatePdfReceipt = (orderId, totalPrice, products, transactionId, customerName) => {
//   const doc = new jsPDF();

//   const date = new Date();
//   const formattedDate = date.toLocaleDateString();
//   const formattedTime = date.toLocaleTimeString();

//   // Header
//   doc.setFontSize(20);
//   doc.text("Payment Receipt", 105, 15, { align: "center" });

//   doc.setFontSize(12);
//   doc.text(`Order ID: ${orderId}`, 20, 30);
//   doc.text(`Transaction ID: ${transactionId}`, 20, 40);
//   doc.text(`Customer Name: ${customerName}`, 20, 50);
//   doc.text(`Date: ${formattedDate}`, 150, 30);
//   doc.text(`Time: ${formattedTime}`, 150, 40);

//   // Table for Products
//   const tableData = products.map((p, index) => [
//     index + 1,
//     p.bookName || "Unknown Book",
//     p.productId || "N/A",
//     p.quantity || 1,
//     `₹${Number(p.price || 0).toFixed(2)}`,
//   ]);

//   doc.autoTable({
//     head: [["#", "Book Name", "Product ID", "Quantity", "Price"]],
//     body: tableData,
//     startY: 60,
//     styles: { halign: "center", valign: "middle" },
//     headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] },
//     theme: "grid",
//   });

//   // Total price at the bottom
//   const total = Number(totalPrice);
//   doc.setFontSize(14);
//   doc.text(
//     `Total Price: ₹${isNaN(total) ? "0.00" : total.toFixed(2)}`,
//     150,
//     doc.lastAutoTable.finalY + 10
//   );

//   // Save PDF
//   doc.save(`receipt_${orderId}.pdf`);
// };

// export default generatePdfReceipt;







  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cardNumber || !cardHolderName || !expiration || !cvv) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateCardNumber(cardNumber)) {
      setError("Card number must be 16 digits.");
      return;
    }

    if (!validateCardHolderName(cardHolderName)) {
      setError("Cardholder's name must contain only letters and spaces.");
      return;
    }

    if (!validateExpirationDate(expiration)) {
      setError("Expiration date is invalid or in the past.");
      return;
    }

    if (!validateCvv(cvv)) {
      setError("CVV must be exactly 3 digits.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      setError("User is not logged in.");
      setIsSubmitting(false);
      return;
    }

    const transactionIdGenerated = generateTransactionId();

    const orderPayload = {
      id: userId,
      items: products.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
      })),
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      };

      const orderResponse = await axios.post(
        `${Book_SERVICE_API_BASE_URL}/customer/createOrder`,
        orderPayload,
        config
      );

      const newOrderId = orderResponse.data.orderId;

      if (!newOrderId) throw new Error("Order ID not received");

      const paymentPayload = {
        orderId: newOrderId,
        amount: totalPrice,
        transactionId: transactionIdGenerated,
      };

      const paymentResponse = await axios.post(
        `${Book_SERVICE_API_BASE_URL}/customer/processPayment`,
        paymentPayload,
        config
      );

      if (paymentResponse.data.status === "PAID") {
        toast.success(
          `Payment successful! Transaction ID: ${transactionIdGenerated}`,
          {
            position: "top-right",
            autoClose: 2000,
          }
        );

        setOrderId(newOrderId);
        setTransactionId(transactionIdGenerated);
        setPaymentSuccess(true);
      } else {
        throw new Error("Payment status is not PAID");
      }
    } catch (error) {
      setError("Failed to complete the transaction. Please try again.");
      toast.error("Payment failed. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }

    setIsSubmitting(false);
  };

  const handleDownloadReceipt = () => {
    generatePdfReceipt(orderId, totalPrice, products, transactionId);
    navigate(`/viewcart/${sessionStorage.getItem("userId")}`);
  };

  const handleSkipReceipt = () => {
    navigate(`/viewcart/${sessionStorage.getItem("userId")}`);
  };

  return (
    <MDBContainer
      fluid
      className="py-5 gradient-custom"
      style={{ backgroundColor: "#f5f7fa" }}
    >
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="6" lg="5">
          <MDBCard style={{ borderRadius: "20px", padding: "20px" }} className="shadow">
            <MDBCardBody>
              {/* Top Logo */}
              <div className="text-center mb-4">
                <img
                  src="../assests/paymentGateway.jpeg"
                  alt="Payment Gateway"
                  style={{ width: "30%", height: "20%" }}
                />
              </div>

              {!paymentSuccess ? (
                <form onSubmit={handleSubmit}>
                  <MDBRow className="gy-3">
                    <MDBCol size="12">
                      <MDBInput
                        label="Card Number"
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </MDBCol>

                    <MDBCol size="12">
                      <MDBInput
                        label="Cardholder's Name"
                        type="text"
                        value={cardHolderName}
                        onChange={(e) => setCardHolderName(e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </MDBCol>

                    <MDBCol size="6">
                      <MDBInput
                        label="Expiration (MM/YYYY)"
                        type="text"
                        value={expiration}
                        onChange={(e) => setExpiration(e.target.value)}
                        placeholder="08/2026"
                        required
                      />
                    </MDBCol>

                    <MDBCol size="6">
                      <MDBInput
                        label="CVV"
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123"
                        required
                      />
                    </MDBCol>

                    {error && (
                      <MDBCol size="12" className="text-danger text-center">
                        {error}
                      </MDBCol>
                    )}

                    <MDBCol size="12" className="text-center mt-3">
                      <h5>Total Amount: ₹{totalPrice.toFixed(2)}</h5>
                    </MDBCol>

                    <MDBCol size="12" className="text-center">
                      <MDBBtn
                        color="info"
                        rounded
                        size="lg"
                        type="submit"
                        disabled={isSubmitting}
                        style={{ minWidth: "120px" }}
                      >
                        {isSubmitting ? (
                          <span style={{ visibility: "visible" }}>Processing...</span>
                        ) : (
                          <span style={{ visibility: "visible" }}>
                            <MDBIcon fas icon="arrow-right" />
                          </span>
                        )}
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </form>
              ) : (
                // Show Download or Skip buttons after successful payment
                <div className="text-center">
                  <h4>Payment Successful!</h4>
                  <p>Your Transaction ID: <strong>{transactionId}</strong></p>
                  <MDBBtn
                    color="success"
                    rounded
                    size="lg"
                    onClick={handleDownloadReceipt}
                    className="m-2"
                  >
                    Download Receipt
                  </MDBBtn>
                  <MDBBtn
                    color="secondary"
                    rounded
                    size="lg"
                    onClick={handleSkipReceipt}
                    className="m-2"
                  >
                    Skip
                  </MDBBtn>
                </div>
              )}

              {/* Bottom Icons */}
              <div className="text-center mt-4">
                <img
                  src="../assests/payment1.png"
                  alt="Payment Options"
                  style={{ width: "50%" }}
                />
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  );
}
