import React, { useState } from 'react';
import ImageCrop from './ImageCrop';
import { storage } from '../firebase';
import 'react-image-crop/dist/ReactCrop.css';
import FadeIn from 'react-fade-in';
import '../component_styles/Login.css';

function Login({ setIsLoggedIn }) {

  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirm, setInputConfirm] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [panel, setPanel] = useState('');
  const [createMessage, setCreateMessage] = useState('');
  const [red, setRed] = useState('');
  const [inputLoginEmai, setLoginEmail] = useState('');
  const [inputLoginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [loginRed, setLoginRed] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [pictureHasBeenUploaded, setPictureHasBeenUploaded] = useState('');

  const handlePicUpload = (myNewCroppedFile) => {
    setPictureHasBeenUploaded('')
    const picUpload = storage.ref(`images/${myNewCroppedFile.name}`).put(myNewCroppedFile)
    picUpload.on(
      'state_changed',
      () => {
        storage.ref('images').child(myNewCroppedFile.name).getDownloadURL().then(url => setProfilePicUrl(url))
      }
    )
    setRed('')
    setCreateMessage('Crop successful!')
  }

  const createAccount = async () => {
    setRed('')
    if (inputPassword !== inputConfirm) {
      setCreateMessage('Passwords do not match ya dingus! Please try again')
      setRed('red')
      return null;
    }
    if (!profilePic) {
      setCreateMessage('Add a profile picture ya dingus!')
      setRed('red')
      return null;
    }
    const response = await fetch('http://localhost:5000/api/create', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: inputUsername,
        password: inputPassword,
        email: inputEmail,
        profile_pic: profilePicUrl
      })
    })
    const data = await response.json();
    if (data.message === 'Username or Email is already taken, please try again!') {setRed('red')}
    if (data.message === 'Not a valid email address ya dingus! Please try again') {setRed('red')}
    setCreateMessage(data.message)
    if (data.message === 'Account Created! Sign in to start playing!') {
      sessionStorage.setItem('isLoggedIn', false)
      const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: inputEmail,
        password: inputPassword
      })
    })
      const data = await response.json();
      sessionStorage.setItem('currentUser', data.user)
      setIsLoggedIn(true)
      window.location.replace('http://localhost:3000/home')
    }
  }

  const login = async () => {
    sessionStorage.setItem('isLoggedIn', false)
    setLoginRed('')
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: inputLoginEmai,
        password: inputLoginPassword
      })
    })
    const data = await response.json();
    if (data.message === 'Sorry, no info associated with that account. Please try again!') {
      setLoginRed('red')
    } else {
      setIsLoggedIn(true)
      sessionStorage.setItem('currentUser', data.user)
      window.location.replace('http://localhost:3000/home')
    }
    setLoginMessage(data.message)
  }
      
  return (
    <div className='sliderLogin'>
      <ImageCrop profilePic={profilePic} handlePicUpload={handlePicUpload} pictureHasBeenUploaded={pictureHasBeenUploaded} setPictureHasBeenUploaded={setPictureHasBeenUploaded}/>
      <FadeIn delay={150} transitionDuration={700}>
        <div className={`hide-container-div${pictureHasBeenUploaded}`}>
          <div className={`container ${panel}`} id='container'>
            <div className='form-container sign-up-container'>
              <div className='Form'>
                <h1>Create Account</h1>
                <input type='text' placeholder='Username' onChange={e => setInputUsername(e.target.value)}></input>
                <input type='email' placeholder='Email' onChange={e => setInputEmail(e.target.value)}></input>
                <input type='password' placeholder='Password' onChange={e => setInputPassword(e.target.value)}></input>
                <input type='password' placeholder='Confirm password' onChange={e => setInputConfirm(e.target.value)}></input>
                <label>Upload a Profile Picture</label>
                <div className='smaller-pictures'>
                  <label>(smaller pictures work better!)</label>
                </div>
                <input type='file' accept="image/*" id='files' className='profilePicture-upload' onChange={e => {setProfilePic(e.target.files); setPictureHasBeenUploaded('true')}}></input>
                <button onClick={() => createAccount()}>Sign up / Sign In</button>
                <p className={`createMessage${red}`}>{createMessage}</p>
              </div>
            </div>
            <div className='form-container sign-in-container'>
              <div className='Form'>
                <h1>Sign in</h1>
                <input type='text' placeholder='Username or Email' onChange={e => setLoginEmail(e.target.value)}></input>
                <input type='password' placeholder='Password' onChange={e => setLoginPassword(e.target.value)}></input>
                <button onClick={() => login()}>Sign in</button>
                <p className={`loginMessage${loginRed}`}>{loginMessage}</p>
              </div>
            </div>
            <div className='overlay-container'>
              <div className='overlay'>
                <div className='overlay-panel overlay-left'>
                  <h1>Welcome Back!</h1>
                  <p>What are you doing here? Go back so you can sign in ya dingus!</p>
                  <button onClick={() => setPanel('')} className='ghost'>Back to Sign In</button>
                </div>
                <div className='overlay-panel overlay-right'>
                  <h1>Well well, hello there!</h1>
                  <p>Enter your ~personal details~ to start viewing and voting!</p>
                  <button className='ghost' onClick={() => setPanel('right-panel-active')}>Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div> 
  );
}

export default Login;
