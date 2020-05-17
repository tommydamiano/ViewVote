import React, { useState } from 'react';
import FadeIn from 'react-fade-in';
import '../component_styles/SignupMobile.css';

function SignupMobile({ setIsLoggedIn, setShowSmallSignup }) {

  const [createMessageMobile, setCreateMessageMobile] = useState('')
  const [mobileUsernameInput, setMobileUsernameInput] = useState('')
  const [mobilePasswordInput, setMobilePasswordInput] = useState('')
  const [mobileConfirmInput, setMobileConfirmInput] = useState('')
  const [mobileEmailInput, setMobileEmailInput] = useState('')

  const createAccountMobile = async () => {
    if (mobilePasswordInput !== mobileConfirmInput) {
      setCreateMessageMobile('Passwords do not match ya dingus! Please try again')
      return null;
    }
    const response = await fetch('http://localhost:5000/api/create', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: mobileUsernameInput,
        password: mobilePasswordInput,
        email: mobileEmailInput,
        profile_pic: 'https://firebasestorage.googleapis.com/v0/b/viewvote-6f094.appspot.com/o/images%2Fblank-profile-picture-973460_640.png?alt=media&token=61cf5713-8cbe-4ec1-be83-c8f003e42703'
      })
    })
    const data = await response.json();
    setCreateMessageMobile(data.message)
    if (data.message === 'Account Created! Sign in to start playing!') {
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
      sessionStorage.setItem('currentUser', data.user)
      setIsLoggedIn(true)
      window.location.replace('http://localhost:3000/home')
    }
  }
  
  return (
    <FadeIn delay={150} transitionDuration={700}>
        <div className='SignupMobile'>
            <div className='signup-mobile-container'>
                <h1>Create an Account</h1>
                <input type='text' placeholder='Choose a username' onChange={e => setMobileUsernameInput(e.target.value)}></input>
                <input type='email' placeholder='Enter your email' onChange={e => setMobileEmailInput(e.target.value)}></input>
                <input type='password' placeholder='Enter your password' onChange={e => setMobilePasswordInput(e.target.value)}></input>
                <input type='password' placeholder='Confirm your password' onChange={e => setMobileConfirmInput(e.target.value)}></input>
                <button onClick={() => createAccountMobile()}>Sign Up / Login!</button>
                <p>{createMessageMobile}</p>
                <button onClick={() => setShowSmallSignup(false)}>Back to Sign In</button>
            </div>
        </div>
    </FadeIn>
  );
}

export default SignupMobile;
