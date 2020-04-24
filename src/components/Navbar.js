import React from 'react';
import logo from '../assets/logo.svg';
import {
    Link
} from "react-router-dom";

function Navbar() {
    return (
            <nav className="Navbar">
                <Link to={'/'}>
                    <img className="logo" src={logo}/>
                </Link>
            </nav>
    );
}

export default Navbar;
