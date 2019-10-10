import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export default function Header() {
    return (
        <header className="header">
            <div>
            <Link to="/" style={{ textDecoration: 'none', height: '0'}}>
                <div className="brand">
                    <span className="logo"><FontAwesomeIcon icon="hamburger" color="#bc47ca"/></span>
                    <h1>NomsPDX</h1>
                </div>
            </Link>
            </div>
            {/* <Link to="/"><FontAwesomeIcon icon="home" size="lg"/></Link> */}
            <nav>
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Login</Link>
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Register</Link>
            </nav>
        </header>
    )
}
