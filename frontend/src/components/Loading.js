import React from 'react';
import youtubeLogo from '../pictures/you.png'
import Pulse from 'react-reveal/Pulse';
import '../component_styles/Loading.css';

function Loading() {
  return (
      <div className='Loading'>
        <div className='loading-container'>
            <h1>Loading a new game...</h1>
            <Pulse>
                <div>
                    <img src={youtubeLogo} alt='logo'></img>
                </div>
            </Pulse>
        </div>
      </div>
  );
}

export default Loading;
