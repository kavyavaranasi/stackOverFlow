import React from 'react'
import { useParams,Link,useNavigate,useLocation} from 'react-router-dom';
import { useState } from 'react';
import solidup from '../../../assets/sort-up.svg'
import soliddown from '../../../assets/sort-down.svg'
import copy from 'copy-to-clipboard';
import moment from 'moment';
import './Questions.css';
import Avatar from '../../Avatar/Avatar';
import DisplayAnswer from './DisplayAnswer';
import { useSelector,useDispatch } from 'react-redux';
import {postAnswer,deleteQuestion,voteQuestion} from '../../../actions/question'
const QuestionDetails = () => {
  const questionsList=useSelector(state=>state.questionsReducer)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const location=useLocation()
  const {id}=useParams();
  const user=useSelector((state)=>state.currentUserReducer);
  //console.log("currect",user.name)
  const [Answer,setAnswer]=useState('');
  const handlePosAns=(e,answerLength)=>{
    e.preventDefault()
    if(user==null){
        alert('Login or Signup to answer a question')
        navigate('/Auth')
    }
    else{
        if(Answer === ''){
            alert('Enter answer before submitting')
        }
        else{
            dispatch(postAnswer({id,noOfAnswers:answerLength+1,answerBody:Answer,userAnswered:user.name,userId:user?._id}))
        }
    }
  }
  const url='http://localhost:3000';
  const handleShare=()=>{
    copy(url+location.pathname)
    console.log(url+location.pathname)
    alert('Copied URL:'+url+location.pathname)
  }
  const handleDelete=(id,navigate)=>{
    dispatch(deleteQuestion(id,navigate))
  }
  const handleUpVotes=()=>{
    dispatch(voteQuestion(id,'upVote',user._id))
  }
  const handleDownVotes=()=>{
    dispatch(voteQuestion(id,'downVote',user._id))
  }
  

  return (
    <div className='question-details-page'>
        {
            user==null?<h1>Loading...</h1>:
            <>
         {
            questionsList.data.filter(question=> question._id == id).map(ques=>(
                <div key={ques._id}>
                    <section className='question-details'>
                        <h1>{ques.questionTitle}</h1>
                        <div className="question-details-container-2">
                            <div className="question-votes">
                                <img src={solidup} alt="upvote" width="18" className='votes-icon' onClick={handleUpVotes}/>
                                <p>{ques.upVote.length-ques.downVote.length}</p>
                                <img src={soliddown} alt="downvote" width="18" className='votes-icon' onClick={handleDownVotes}/>
                            </div>
                            <div  style={{width:"100%"}} className='question-details-container'>
                                <p className='question-body'>{ques.questionBody}</p>
                                <div className="question-details-tags">
                                    {
                                        ques.questionTags.map((tag)=>(
                                            <p key={tag}>{tag}</p>
                                        ))
                                    }
                                </div>
                                <div className="question-actions-user">
                                    <div>
                                        <button type="button" onClick={handleShare}>Share</button>
                                        {
                                        
                                            user?._id === ques?.userId && (
                                                <button type="button" onClick={handleDelete}>Delete</button>
                                            )
                                        }
                                        
                                    </div>
                                    <div>
                                        <p>asked: {moment(ques.askedOn).fromNow()}</p>
                                        <Link to={`/Users/${ques.userId}`} className='user-link' style={{color:"#0086d8"}}>
                                            <Avatar backgroundColor="orange" px="8px" py="5px">{ques.userPosted.charAt(0).toUpperCase()}</Avatar>
                                            <div>
                                                {ques.userPosted}
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {
                        ques.noOfAnswers!==0 &&
                        <section>
                            <h3>{ques.noOfAnswers} Answers</h3>
                            <DisplayAnswer key={ques._id} question={ques} handleShare={handleShare}/>
                        </section>
                    }
                    <section className='post-ans-container'>
                        <h3> Your Answer</h3>
                        <form onSubmit={(e)=>{handlePosAns(e,ques.answer.length)}}>
                            <textarea name="" cole="30" rows="10" onChange={(e)=>setAnswer(e.target.value)}></textarea>
                            <input type="submit" className='post-ans-btn' value="Post Your Answer"/>
                        </form>
                        <p>
                            Browse other Question tagged
                            {
                                ques.questionTags.map((tag)=>(
                                    <Link to='/Tags' key={tag} className='ans-tags'>{tag}</Link>
                                ))
                            } or  
                            <Link to='/AskQuestion' style={{textDecoration:"none",color:"#009dff"}}>ask your own question</Link>
                        </p>
                    </section>
                    
                </div>
            ))
         }
      </>
        }
      
    </div>
  )
}

export default QuestionDetails
