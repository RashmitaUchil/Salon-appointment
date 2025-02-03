import "../Styles/Footer.css";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                
                <p className="copyright" style={{
                        color: '#B76E79',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 'bold',
                        fontSize: '1.8rem'
                    }}> &copy; SALON</p> <p>All rights reserved.
                </p>
                <div className="social-icons">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;