import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import '../component_styles/MenuHeader.css';

function MenuHeader({ profilePicture, setProfilePicture, isLoggedIn}) {

  useEffect(() => {
    const picture = sessionStorage.getItem('profilePic')
    setProfilePicture(picture)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
      <div className='menu-overall-container'>
        {isLoggedIn ? (
        <div className='menu-header-container'>
          <Fade left><img src={profilePicture} alt='avi'></img></Fade>
          <div className='MenuHeader'> 
            <Link to='/home'>
              <button className='menuButton'>Return to Main Menu</button>
            </Link>
          </div>
        </div>) : <div className='MenuHeader2'> 
                    <Link to='/home'>
                      <button className='menuButton'>Return to Main Menu</button>
                    </Link>
                  </div>}
      </div>
  );
}

export default MenuHeader;
