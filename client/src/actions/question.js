
import * as api from '../api';
export const askQuestion = (questionData,navigate) =>async(dispatch)=> {
  try{
    const {data}=await api.postQuestion(questionData)
    dispatch({type:"POST_QUESTION",payload:data})
    dispatch(fetchAllQUestions())
    navigate('/')
  }
  catch(err){
    console.log(err)
  }
}

export const fetchAllQUestions=()=>async(dispatch)=>{
  try{
    const{data}=await api.getAllQUestions()
    dispatch({type:"FETCH_ALL_QUESTIONS",payload:data})
  }
  catch(err){
    console.log(err)
  }
}

export const postAnswer=(answerData)=>async(dispatch)=>{
  try{
    const {id,noOfAnswers,answerBody,userAnswered,userId}=answerData
    const{data}=await api.postAnswer(id,noOfAnswers,answerBody,userAnswered,userId);
    dispatch({type:"POST_ANSWER",payload:data})
    dispatch(fetchAllQUestions())
  }
  catch(err){
    console.log(err)
  }
}

export const deleteQuestion=(id,navigate)=>async(dispatch)=>{
  try{
    const {data}=api.deleteQuestion(id)
    dispatch(fetchAllQUestions())
    navigate('/')
  }
  catch(err){
    console.log(err.message)
  }
}

export const deleteAnswer=(id,answerId,noOfAnswers)=>async(dispatch)=>{
  try{
    const {data}=await api.deleteAnswer(id,answerId,noOfAnswers)
    dispatch(fetchAllQUestions())
  }
  catch(err){
    console.log(err)
  }
}

export const voteQuestion=(id,value,userId)=>async(dispatch)=>{
  try{
    const {data}=await api.voteQuestion(id,value,userId)
    console.log(data)
    dispatch(fetchAllQUestions())
  }
  catch(err){
    console.log(err)
  }
}