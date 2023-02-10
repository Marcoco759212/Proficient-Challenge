import React from 'react';
import { ReactComponent as Logo } from './../assets/Logo.svg';
import { ReactComponent as Twittwer } from './../assets/twitter.svg';
import { ReactComponent as Facebook } from './../assets/facebook.svg';
import { ReactComponent as Instagram } from './../assets/instagram.svg';

const Footer = () => {
    return (
        <div className='footer-contetnt'>
            <div className='footer-column'>
                <div className='footer-logo'>
                    <span>
                        <Logo></Logo>
                    </span>
                </div>
                <div className='footer-desc'>
                    <p>It is a long established fact that a reader 
                    will be distracted by the readable content of a 
                    page whenters.</p>
                </div>
                <div className='footer-social'>
                    <span><Twittwer></Twittwer></span>
                    <span><Facebook></Facebook></span>
                    <span><Instagram></Instagram></span>
                </div>
            </div>
            <div className='footer-column'>
                <h5>About Us</h5>
                <span>About</span>
                <span>Privacy & Policy</span>
                <span>Terms & Conditions</span>
                <span>Faq</span>
            </div>
            <div className='footer-column'>
                <h5>Navigate</h5>
                <span>How We Work</span>
                <span>Services</span>
                <span>Faq</span>
                <span>Contact</span>
                <span>Free Quote</span>
            </div>
            <div className='footer-column'>
                <h5>Contact Us</h5>
                <span>Ricardo Margain 444</span>
                <span>Call: +52 81 1234 5678</span>
                <span>Email: info@challenge.com</span>
                <div className='footer-column-whatsapp'>

                </div>
            </div>
        </div>
    );
}

export default Footer;
