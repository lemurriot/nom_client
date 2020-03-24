// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import config from "../../config";
// import "./LoginForm.css";

// // eslint-disable-next-line react/prefer-stateless-function
// export default class LoginForm extends Component {
//   render() {
//     return (
//       <main className="login-form-main-page">
//         <section className="login-modal">
//           <div className="brand">
//             <span className="logo">
//               <FontAwesomeIcon icon="hamburger" color="purple" />
//             </span>
//             <h1 className="brand-title">NomsPDX</h1>
//           </div>
//             <div className="fields-container">
//               {/* <h4>Login to your account</h4>
//                         <h5>(Actually, just click "Login", this form is not wired up to anything at the moment) </h5>

//                         <label htmlFor="email">Email or Username</label>
//                         <input type="text" placeholder="Enter Email" name="email" autoComplete="username" />

//                         <label htmlFor="psw">Password</label>
//                         <input type="password" placeholder="Enter Password" name="psw" autoComplete="current-password" /> */}
//               <h4>Login with your Google account</h4>

//               <a href={`${config.API_ENDPOINT}/auth/google-oauth`} className="login-btn google-oauth-btn">
//                   Login with Google
//               </a>
//             </div>
//           <Link to="/">Cancel</Link>
//           <br />
//           <a href={`${config.API_ENDPOINT}/auth/logout`}> Logout </a>
//         </section>
//       </main>
//     );
//   }
// }
