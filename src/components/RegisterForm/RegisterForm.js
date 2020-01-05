import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./RegisterForm.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class RegisterForm extends Component {
  handleFormSubmit = e => {
    e.preventDefault();
    console.log("form submitted");
  };
  render() {
    return (
      <main className="register-form-main-page">
        <section className="register-modal">
          <div className="brand">
            <span className="logo">
              <FontAwesomeIcon icon="hamburger" color="purple" />
            </span>
            <h1 className="brand-title">NomsPDX</h1>
          </div>
          <form onSubmit={e => this.handleFormSubmit(e)}>
            <div className="fields-container">
              <h4>Register for a new account</h4>

              <label htmlFor="email">Email (required)</label>
              <input
                type="text"
                placeholder="Enter Email"
                name="email"
                required
              />

              {/* <label htmlFor='first_name'>
								First Name
							</label>
							<input
								type='text'
								placeholder='Enter First Name'
								name='first_name'
							/>

							<label htmlFor='last_name'>Last Name</label>
							<input
								type='text'
								placeholder='Enter Last Name'
								name='last_name'
							/> */}

              <label htmlFor="username">Username (required)</label>
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                autoComplete="username"
              />

              <label htmlFor="psw">Password (required)</label>
              <input
                type="password"
                placeholder="Enter Password"
                name="psw"
                autoComplete="new-password"
                required
              />

              <label htmlFor="psw-repeat">Repeat Password (required)</label>
              <input
                type="password"
                placeholder="Repeat Password"
                name="psw-repeat"
                autoComplete="new-password"
                required
              />

              <button type="submit" className="register-btn">
                Register
              </button>
            </div>
          </form>
          <Link to="/">Cancel</Link>
        </section>
      </main>
    );
  }
}
