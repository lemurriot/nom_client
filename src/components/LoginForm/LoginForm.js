import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./LoginForm.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class LoginForm extends Component {
    handleFormSubmit = e => {
        e.preventDefault()
        console.log('form submitted')
        this.props.onLogin(e)
        this.props.history.push('/')
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
                        <div className="fields-container">
                          <h4>Login to your account</h4>
                          <h5>(Actually, just click "Login", this form is not wired up to anything at the moment) </h5>
                     
                      
                          <label htmlFor="email">Email or Username</label>
                          <input type="text" placeholder="Enter Email" name="email" autoComplete="username" />
                      
                          <label htmlFor="psw">Password</label>
                          <input type="password" placeholder="Enter Password" name="psw" autoComplete="current-password" />
                      
                 
                          <button type="submit" className="login-btn">Login</button>
                        </div>
                    
                      </form>     
                      <Link to="/">Cancel</Link>        
            </section>
        </main>
        )
    }
}
