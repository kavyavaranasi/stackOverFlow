import React from 'react'
import '../../../App.css';
import LeftSideBar from '../../LeftSideBar/LeftSideBar.jsx';
import RightSideBar from '../../RightSideBar/RightSideBar';
import HomeMainBar from '../../HomeMainBar/HomeMainBar.jsx';

const Home = () => {
  return (
    <div className='home-container-1' style={{marginTop:"3%"}}>
      <LeftSideBar/>
      <div className='home-container-2'>
        <HomeMainBar/>
        <RightSideBar/>
      </div>
    </div>
  )
}

export default Home;
