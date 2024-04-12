import React from 'react'
import '../../../App.css';
import LeftSideBar from '../../LeftSideBar/LeftSideBar';
import RightSideBar from '../../RightSideBar/RightSideBar';
import QuestionDetails from './QuestionDetails';
const DisplayQuestion = () => {
  return (
    <div className='home-container-1' style={{marginTop:"3%"}}>
      <LeftSideBar/>
      <div className='home-container-2'>
        <QuestionDetails/>
        <RightSideBar/>
      </div>
    </div>
  )
}

export default DisplayQuestion