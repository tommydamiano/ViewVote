import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pulse from 'react-reveal/Pulse';
import FadeIn from 'react-fade-in';
import youtubeLogo from '../pictures/you.png'
import '../component_styles/Homepage.css';

function Homepage({ isLoggedIn }) {

  const [cantStart, setCantStart] = useState(false)
  
  return (
      <div className='Homepage'>
        <div className='home-page-section'>
          <h1><span className='View'>View</span><img className='logo' src={youtubeLogo} alt='youtube'></img><span className='Vote'>Vote</span></h1>
          <div className='mainButtons'>
            <Pulse>
              {isLoggedIn ? <Link to='/game'><button className='start'>Start Game</button></Link> : <Link to='/home'><button className='start' onClick={() => setCantStart(true)}>Start Game</button></Link>}
              <Link to='leaderboard'>
                <button className='leaderboard'>Leaderboard</button>
              </Link>
            </Pulse>
          </div>
          {cantStart && <FadeIn><p>Can't start a game if you're not logged in, ya dingus!</p></FadeIn>}
        </div>
       </div>
  );
}

export default Homepage;
