import React, { useState } from 'react';
import './AskQuestion.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { askQuestion } from '../../../actions/question';

const AskQuestion = () => {
    const [questionTitle, setTitle] = useState('');
    const [questionBody, setBody] = useState('');
    const [questionTags, setTags] = useState([]);

    const User = useSelector((state) => state.currentUserReducer);
    //console.log(User.user._id)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(title,body,tags)
        dispatch(askQuestion({ questionTitle,questionBody,questionTags, userPosted: User.name ,userId:User?._id}, navigate));
        setTitle("")
        setBody("")
        setTags([])
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            setBody(questionBody + '\n');
        }
    };

    return (
        <div className='ask-question'>
            <div className="ask-ques-container">
                <h1>Ask a Public Question</h1>
                <form onSubmit={handleSubmit}>
                    <div className="ask-form-container">
                        <label htmlFor="ask-ques-title">
                            <h4>Title</h4>
                            <p>Be specific and imagine you are asking a question to another person</p>
                            <input type="text" name="questionTitle" id="ask-ques-title" placeholder='eg: Is there any function to find index in String?' onChange={(e) => setTitle(e.target.value)} />
                        </label>
                        <label htmlFor="ask-ques-body">
                            <h4>Body</h4>
                            <p>Include all the information someone needs to answer your question</p>
                            <textarea name="questionTitle" id="ask-ques-title" rows="5" cols="10" onChange={(e) => setBody(e.target.value)} onKeyDown={handleEnter}></textarea>
                        </label>
                        <label htmlFor="ask-ques-title">
                            <h4>Tags</h4>
                            <p>Add up to 5 tags to describe what your question is about</p>
                            <input type="text" name="questionTitle" id="ask-ques-title" placeholder='eg: (xml typescript wordpress)' onChange={(e) => setTags(e.target.value.split(' '))} />
                        </label>
                    </div>
                    <input type="submit" value="Review your Question" className='review-btn' />
                </form>
            </div>
        </div>
    );
}

export default AskQuestion;
