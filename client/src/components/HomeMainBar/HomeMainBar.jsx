import React from 'react'
import './HomeMainBar.css';
import {useLocation,useNavigate} from "react-router-dom";
import QuestionsList from './QuestionsList';
import {useSelector} from 'react-redux';
const HomeMainBar = () => {
  //const [location,setLocation]=useState("/");
  const location=useLocation();
  const user=123;
  const navigate=useNavigate()
    //const history=useHistory()
    const questionsList=useSelector(state=>state.questionsReducer)
    //console.log(questionsList.data)
    const checkAuth=()=>{
      if (user===null){
          alert("Login or Signup to Ask Question")
          navigate('/Auth')
      }
      else{
        navigate('/AskQuestion')
      }

    }
  
  
  return (
    
    <div className='main-bar'>
      <div className="main-bar-header">
        {
          location.pathname === '/' ? <h1>Top Questions</h1> :<h1>All Questions</h1>
        }
        <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
      </div>
      <div >
        {
          questionsList.data===null?
          <h1>Loading...</h1>:
          <>
              <p>{questionsList.data.length} Questions</p>
              <QuestionsList questionsList={questionsList.data}/>
          </>
        }
      </div>
    </div>
  )
}

export default HomeMainBar