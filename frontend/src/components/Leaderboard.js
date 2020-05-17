import React, { useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';
import '../component_styles/Leaderboard.css';

function Leaderboard() {

  const [entries, setEntries] = useState([])
  const [fade, setFade] = useState('fade')

  useEffect(() => {
    const getLeaderboard = async () => {
      const response = await fetch('http://localhost:5000/api/leaderboard')
      const { entrants } = await response.json()
      console.log(entrants)
      setFade('')
      setEntries(entrants)
    }
    getLeaderboard()
  }, [])

  return (
    <FadeIn>
      <div className={`leaderboard-container${fade}`}>
        <div className='leaderboard-contents'>
          <div className='leaderboard-columns'>
            <p className='username-column'>Username</p>
            <p className='highscore-column'>High Score</p>
          </div>
          {entries.map((entry, i) => <FadeIn delay={100} transitionDuration={600}>
                                      <div key={i} className='useless-container-leaderboard'>
                                        <div className={`leaderboard-entries${i}`}>
                                          <div className='user-container'>
                                            <p className='entry-1'>{i + 1}. {entry[0]}</p>
                                            <img src={entry[1]} alt='firebase-profilepic'></img>
                                          </div>
                                          <p className='entry-2'>{entry[2]}</p>
                                        </div>
                                        <div className='entry-border'></div>
                                      </div>
                                    </FadeIn>)}
        </div>
      </div>
    </FadeIn>
  );
}

export default Leaderboard;
