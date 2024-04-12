import React, { useEffect } from 'react';
import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // corrected import statement

import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import search from '../../assets/search-solid.svg';
import Avatar from "../../components/Avatar/Avatar";
import { setCurrentUser } from '../../actions/currentUser';

const Navbar = () => {
    const dispatch = useDispatch();
    const User = useSelector((state) => state.currentUserReducer);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate('/');
        dispatch(setCurrentUser(null));
    };

    useEffect(() => {
        const token = User?.token;
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 100 < new Date().getTime()) {
                handleLogout();
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    }, [dispatch, User, navigate]); // include User and navigate as dependencies

    return (
        <nav>
            <div className='navbar'>
                <Link to='/' className='nav-item nav-logo'>
                    <img src={logo} alt="logo" />
                </Link>
                <Link to='/' className='nav-item nav-btn'>About</Link>
                <Link to='/' className='nav-item nav-btn'>Products</Link>
                <Link to='/' className='nav-item nav-btn'>For Teams</Link>
                <form>
                    <input type="text" placeholder='Search...' />
                    <img src={search} alt="search" width="18" className='search-icon' />
                </form>
                {User === null ?
                    <Link to='/Auth' className='nav-item nav-links'>Login</Link> :
                    <>
                        <Avatar backgroundColor='#009dff' px="10px" py="7px" borderRadius="50%" color="white">
                            <Link to={`/Users/${User?._id}`} style={{ textDecoration: 'none', color: 'white' }}>{User?.name?.charAt(0).toUpperCase()}</Link>
                        </Avatar>
                        <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar;
