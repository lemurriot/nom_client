import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./LoginForm.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class LoginForm extends Component {
    handleFormSubmit = e => {
        e.preventDefault()
        console.log('form submitted')
    }
    render() {
        return (
            <main className="login-form-main-page">
            <section className="login-modal">
                <div className="brand">
                    <span className="logo"><FontAwesomeIcon icon="hamburger" color="purple"/></span>
                    <h1 className="brand-title">NomsPDX</h1>
                </div>
                <form onSubmit={e => this.handleFormSubmit(e)}>
                        <div className="container">
                          <h4>Login to your account</h4>
                     
                      
                          <label htmlFor="email">Email or Username</label>
                          <input type="text" placeholder="Enter Email" name="email" required />
                      
                          <label htmlFor="psw">Password</label>
                          <input type="password" placeholder="Enter Password" name="psw" required />
                      
                 
                          <button type="submit" className="login-btn">Login</button>
                        </div>
                    
                      </form>     
                      <Link to="/">Cancel</Link>        
            </section>
        </main>
        )
    }
}
