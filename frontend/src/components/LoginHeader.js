import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LightSpeed from 'react-reveal/LightSpeed';
import '../component_styles/LoginHeader.css';

function LoginHeader({ isLoggedIn, setIsLoggedIn, profilePicture, setProfilePicture }) {

  const user = sessionStorage.getItem('currentUser')
  
  const logOut = () => {
    sessionStorage.setItem('profilePic', '')
    sessionStorage.setItem('currentUser', '')
    setIsLoggedIn(false)
    window.location.replace('http://localhost:3000/')
  }

  const getProfilePicture = async () => {
    const response = await fetch('http://localhost:5000/api/profile_picture', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: user
      })
    })
    const { pic } = await response.json();
    sessionStorage.setItem('profilePic', pic)
    setProfilePicture(pic)
  }

  useEffect(() => {
    getProfilePicture()
    const picture = sessionStorage.getItem('profilePic')
    setProfilePicture(picture)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
      <div className='LoginHeader'>
        {isLoggedIn ? (<div className='logOutContainer'>
                        <LightSpeed left>
                          <div className='logOutContainer-left'>
                            <p className='spanLog'>Sup, {user}!</p>
                            <img src={profilePicture} alt='Avi'></img>
                            <p>Ready to play?</p>
                          </div>
                        </LightSpeed>
                        <span className='buttonContainer'><button className='logOutButton' onClick={() => logOut()}>Log out!</button></span>
                       </div>) : 
                       <div className='loginContainer'>
                         <Link to='/login' className='login'>
                           <button className='loginbutton'>Login / Sign Up!</button>
                         </Link>
                       </div>}
      </div>
  );
}

export default LoginHeader;
