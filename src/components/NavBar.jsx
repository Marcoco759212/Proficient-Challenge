import React, {useState} from 'react';
import { ReactComponent as Logo } from './../assets/Logo.svg';

const NavBar = () => {

    const [btnStyle, setBtnStyle] = useState(false);

    const changeBtnMenu = () => {
        setBtnStyle(!btnStyle)
    }

    return (
        <>
            <aside className='nav-content' >
                <div className='nav-logo'>
                    <span>
                        <Logo></Logo>
                    </span>
                </div>
                <ul className='nav-items'>
                    <li>
                        <a href=' '>How We Work</a>
                    </li>
                    <li>
                        <a href=' '>Services</a>
                    </li>
                    <li>
                        <a href=' '>Free Quote</a>
                    </li>
                    <li>
                        <a href=' '>Contact</a>
                    </li>
                </ul>
            </aside>

            <aside className='smallnav-content'>
                <div className='smallnav-section'>
                    <div className='smallnav-logo'>
                        <span>
                            <Logo></Logo>
                        </span>
                    </div>
                    <div className='smallnav-button' onClick={changeBtnMenu}>
                        <div>
                            {/* <input type="checkbox" /> */}
                            <span className={!btnStyle ? 'btn-active' : 'btn-disable'}></span>
                        </div>
                    </div>
                </div>
                <ul className='smallnav-items' style={ !btnStyle ? {transform: 'translateX(150%)'} : {transform: 'translateX(0)'}}>
                    <li>
                        <a href=' '>How We Work</a>
                    </li>
                    <li>
                        <a href=' '>Services</a>
                    </li>
                    <li>
                        <a href=' '>Free Quote</a>
                    </li>
                    <li>
                        <a href=' '>Contact</a>
                    </li>
                </ul>
            </aside>
        </>
    );
}

export default NavBar;
