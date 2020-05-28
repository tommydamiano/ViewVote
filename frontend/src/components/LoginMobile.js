import React, { useState } from 'react';
import SignupMobile from '../components/SignupMobile'
import FadeIn from 'react-fade-in';
import '../component_styles/LoginMobile.css';

function LoginMobile({ setIsLoggedIn, showSmallSignup, setShowSmallSignup }) {

  const [mobileEmailInput, setMobileEmailInput] = useState('')
  const [mobilePasswordInput, setMobilePasswordInput] = useState('')
  const [mobileLoginMessage, setMobileLoginMessage] = useState('')

  const sendMobileLoginInfo = async () => {
    sessionStorage.setItem('isLoggedIn', false)
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: mobileEmailInput,
        password: mobilePasswordInput
      })
    })
    const data = await response.json();
    if (data.message === 'Sorry, no info associated with that account. Please try again!') {
      setMobileLoginMessage(data.message)
    } else {
      setIsLoggedIn(true)
      setMobileLoginMessage(data.message)
      sessionStorage.setItem('currentUser', data.user)
      window.location.replace('http://localhost:3000/home')
    }
  }
  
  return (
    <div className='mobile-account-page'>
      {showSmallSignup ? <SignupMobile setIsLoggedIn={setIsLoggedIn} setShowSmallSignup={setShowSmallSignup}/> : (
        <FadeIn delay={150} transitionDuration={700}>
          <div className='LoginMobile'>
            <div className='login-mobile-container'>
              <h1>Sign In</h1>
              <input type='text' placeholder='Username or Email' onChange={e => setMobileEmailInput(e.target.value)}></input>
              <input type='password' placeholder='Password' onChange={e => setMobilePasswordInput(e.target.value)}></input>
              <button onClick={() => sendMobileLoginInfo()}>Sign in</button>
              <p>{mobileLoginMessage}</p>
              <button onClick={() => setShowSmallSignup(true)}>No Account? Sign up here!</button>
            </div>
          </div>
        </FadeIn>)}
    </div>
  );
}

export default LoginMobile;
