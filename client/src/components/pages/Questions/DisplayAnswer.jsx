import React from 'react'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment';
import "./Questions.css";
import Avatar from '../../Avatar/Avatar'
import { useDispatch ,useSelector} from 'react-redux';
import { deleteAnswer } from '../../../actions/question'
const DisplayAnswer = ({question,handleShare}) => {
  const User=useSelector((state)=>state.currentUserReducer)
  const {id}=useParams();
  const dispatch=useDispatch()
  const handleDelete=(answerId,noOfAnswers)=>{
    dispatch(deleteAnswer(id,answerId,noOfAnswers-1))
  }
  return (
    <div>
      {
        question.answer.map((ans)=>(
            <div className="display-ans" key={ans.id}>
                <p>{ans.answerBody}</p>
                <div className="question-actions-user">
                    <div>
                        <button type="button" onClick={handleShare}>Share</button>
                        {
                          User?.user?._id=== ans?.userId && (
                            <button type="button" onClick={()=>handleDelete(ans.userId,question.noOfANswers)}>Delete</button>
                          )
                        }
                        
                    </div>
                    <div>
                        <p >answered : {moment(ans.answeredOn).fromNow()}</p>
                        <Link to={`/Users/${ans.userId}`} className="avatar">
                            <Avatar backgroundColor="green" px="8px" py="5px" >{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                            <div className='avatar-user'>
                                {
                                    ans.userAnswered
                                }
                            </div>

                        </Link>
                    </div>
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default DisplayAnswer
