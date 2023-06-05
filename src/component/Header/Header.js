import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './Header.css'
import {Link, useNavigate} from 'react-router-dom'
import { userContext } from '../../App';
const Header = () => {
    const [logInUser, setLogInUser ] = useContext(userContext)
    const navigate = useNavigate();
    const signOut = () => {
        setLogInUser({});
        navigate('/');
    }
    
    return (
        <div className='header'>
            <img src={logo} alt="" />
            <nav>
            <Link to="/shop">Shop</Link>
            <Link to="/review">Order Review</Link>
            {logInUser.email ?
                <Link to={`/manage`} >Manage Inventory</Link>:
                <Link to="/login">Manage Inventory</Link>
            }
            {
            logInUser.email?
                <button onClick={signOut}>Sign Out</button>:
                <button onClick={() => navigate('/login')}>Sign In</button>
            }
            </nav>
        </div>
        
        
    )
};

export default Header;