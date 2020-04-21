import React from 'react';
import logo from '../assets/logo.svg';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

function Navbar() {
    return (
            <div className="Navbar">
                <Link to={'/'}>
                    <img className="logo" src={logo}/>
                </Link>
            </div>
    );
}

export default Navbar;
