import React from 'react'
import "./LeftSideBar.css";
import {NavLink} from "react-router-dom";
import Globe from "../../assets/Globe.svg";
const LeftSideBar = () => {
  return (
    <div className='left-sidebar'>
        <div className='side-nav'>
            <NavLink to='/'  activeClassName="active"  className='side-nav-links'>
                <p >Home</p>
            </NavLink>
            <div className='side-nav-div'>
                <div><p style={{textAlign:"center"}}>PUBLIC</p></div>
                <NavLink to='/Questions' style={{display:"flex"}} className='side-nav-links'>
                    <img src={Globe} alt="globe"/>
                    <p style={{paddingLeft:"10px"}}>Questions</p>
                </NavLink>
                <NavLink to='/Tags' className='side-nav-links'>
                    <p style={{paddingLeft:"10px"}}>Tags</p>
                </NavLink>
                <NavLink to='/Users' className='side-nav-links'>
                    <p style={{paddingLeft:"10px"}}>Users</p>
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default LeftSideBar