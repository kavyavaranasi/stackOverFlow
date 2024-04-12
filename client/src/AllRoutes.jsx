import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Auth from './components/pages/Auth/Auth';
import Questions from './components/pages/Questions/Questions';
import AskQuestion from './components/pages/AskQuestion/AskQuestion';
import DisplayQuestion from './components/pages/Questions/DisplayQuestion';
import QuestionDetails from './components/pages/Questions/QuestionDetails';
import Tags from './components/pages/Tags/Tags'
import Users from './components/pages/Users/Users'
import UserProfile from './components/pages/UserProfile/UserProfile'
const Routers=()=>{
    return(
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/Auth'  element={<Auth/>}/>
            <Route exact path='/AskQuestion' element={<AskQuestion/>}/>
            <Route exact path='/Questions' element={<Questions/>}/>
            <Route exact path='/Questions/:id' element={<DisplayQuestion/>}/>
            <Route exact path='/QuestionDetails' element={<QuestionDetails/>}/>
            <Route exact path='/Tags' element={<Tags/>}/>
            <Route exact path='/Users' element={<Users/>}/>
            <Route exact path='/Users/:id' element={<UserProfile/>}/>
        </Routes>
    )
}
export default Routers;