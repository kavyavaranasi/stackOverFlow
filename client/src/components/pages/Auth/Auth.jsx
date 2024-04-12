import React, { useState } from 'react';
import './Auth.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import icon from '../../../assets/icon.png';
import Aboutauth from './AboutAuth';
import { signup, login } from '../../../actions/auth';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = (e) => {
    //console.log(email,password)
    e.preventDefault();
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    if (isSignUp) {
        if (!name){
            alert("Enter name to continue")
            return;
        }
       
        dispatch(signup({ name, email, password },navigate) );
    }
    else{
        dispatch(login({ email, password},navigate));
    }
  };

  return (
    <section className='auth-section'>
      {isSignUp && <Aboutauth />}
      <div className='auth-container'>
        {!isSignUp && <img src={icon} alt='stackoverflow' className='login-logo' />}
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <label htmlFor='name'>
              <h4 style={{ textAlign: "left" }}>Display Name</h4>
              <input type="text" id="name" onChange={(e) => { setName(e.target.value) }} />
            </label>
          )}
          <label htmlFor='email'>
            <h4 style={{ textAlign: "left" }}>Email</h4>
            <input type="email" name="email" id="email" onChange={(e) => (setEmail(e.target.value))} />
          </label>
          <label htmlFor='password'>
            <div style={{ display: "flex", justifyContent: "space-between", }}>
              <h4>Password</h4>
              {!isSignUp && <h4 style={{ fontSize: "13px", color: "#007ac6" }}>forgot password?</h4>}
            </div>
            <input type="password" name="password" id="password" onChange={(e) => (setPassword(e.target.value))} />
            {isSignUp && <p style={{ color: "#666767", fontSize: "13px", textAlign: "left" }}>Passwords must contain at least eight <br />characters ,including at least 1 <br />letter and 1 number.</p>}
          </label>
          {isSignUp && (
            <label htmlFor='check'>
              <input type="checkbox" id='check' />
              <p style={{ fontSize: "13px", marginTop: "12%", textAlign: "left" }}>Opt-in to receive occasional,<br />
                product updates,user research invitations,<br />
                company announcements,and digesta.</p>
            </label>
          )}
          <button type="submit" className='auth-btn'>{isSignUp ? "sign Up" : "Login"}</button>
          {isSignUp && (
            <p style={{ color: "#666767", fontSize: "13px" }}>By clicking "Sign up",you agree to our
              <span style={{ color: "#007ac6" }} >terms of <br />service</span>,
              <span style={{ color: "#007ac6" }}>privacy policy</span>and
              <span style={{ color: "#007ac6" }}>cookie policy</span>
            </p>
          )}
        </form>
        <p>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button type="button" className='handle-switch-btn' onClick={handleSwitch}>{isSignUp ? "Login" : "Sign up"}</button>
        </p>
      </div>
    </section>
  )
}

export default Auth;
