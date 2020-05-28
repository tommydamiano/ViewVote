import React, {useState, useEffect} from 'react';
import FadeIn from 'react-fade-in';
import CountUp from 'react-countup';
import Modal from './Modal';
import Bounce from 'react-reveal/Bounce';
import Loading from '../components/Loading'
import '../component_styles/Game.css';

function Game() {

  // Score States
  let [score, setScore] = useState(0)
  let [userHighScore, setUserHighScore] = useState(0)
  const [showHighScore, setShowHighScore] = useState(true)

  // Video States
  const [leftPicUrl, setLeftPicUrl] = useState('')
  const [rightPicUrl, setRightPicUrl] = useState('')
  const [leftVideoUrl, setLeftVideoUrl] = useState('')
  const [rightVideoUrl, setRightVideoUrl] = useState('')
  const [leftTitle, setLeftTitle] = useState('')
  const [rightTitle, setRightTitle] = useState('')
  const [leftViews, setLeftViews] = useState('')
  const [leftViewCount, setLeftViewCount] = useState(0)
  const [rightViewCount, setRightViewCount] = useState(0)
  const [showViews, setShowViews] = useState(true)
  const [videoList, setVideoList] = useState([])

  // Cosmetic States
  const [blur, setBlur] = useState('')
  const [showVS, setShowVS] = useState(true)
  const [showCheckmark, setShowCheckmark] = useState(false)
  const [showX, setShowX] = useState(false)
  const [showPopUp, setShowPopUp] = useState(false)
  const [popUpMessage, setPopUpMessage] = useState("And you didn't even get a high score? Do better next time, ya dingus!!!")
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    setShowLoader(true)
    const getStartingVideos = async () => {
      const response = await fetch('http://localhost:5000/api/get_starting_videos')
      const { videos } = await response.json()
      console.log(videos)
      setLeftPicUrl(videos[0][3])
      setRightPicUrl(videos[1][3])
      setLeftTitle(videos[0][0])
      setRightTitle(videos[1][0])
      setLeftViews(insertCommas(videos[0][1]))
      setLeftViewCount(videos[0][1])
      setRightViewCount(videos[1][1])
      setLeftVideoUrl(videos[0][4])
      setRightVideoUrl(videos[1][4])
      setVideoList([videos[0][5], videos[1][5]])
    }
    getStartingVideos()
    getHighScore()
    setTimeout(() => {
      setShowLoader(false)
    }, 2000)
  }, [])

  useEffect(() => {
    if (score > userHighScore) {
      setShowHighScore(false)
      setPopUpMessage('But you got a new high score! Congrats! Are you on the leaderboard yet?? 👀')
    }
  }, [score, userHighScore])

  const getHighScore = async () => {
    const currentUser = sessionStorage.getItem('currentUser')
    const response = await fetch('http://localhost:5000/api/get_high_score', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: currentUser
      })
    })
    const { highScore } = await response.json();
    setUserHighScore(highScore[0])
  }

  const insertCommas = (num) => {
    const str = num.toString()
    let result = ''
    let i = str.length - 1
    let count = 0
    while (i >= 0) {
      count++
      if (count % 3 === 0 && i === 0) { result += str[i]}
      else if (count % 3 === 0) { result += `${str[i]},` }
      else { result += str[i] }
      i--
    }
    return result.split('').reverse().join('');
  }

  const pointScored = async () => {
    setShowCheckmark(true)
    setTimeout(async() => {
      setShowCheckmark(false)
      setScore(score + 1)
      const response = await fetch('http://localhost:5000/api/get_new_video', {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          videoList: videoList
        })
      })
      const { newVideo } = await response.json()
      console.log(newVideo)
      setLeftPicUrl(rightPicUrl)
      setRightPicUrl(newVideo[3])
      setLeftTitle(rightTitle)
      setRightTitle(newVideo[0])
      setLeftViews(insertCommas(rightViewCount))
      setLeftViewCount(rightViewCount)
      setRightViewCount(newVideo[1])
      setLeftVideoUrl(rightVideoUrl)
      setRightVideoUrl(newVideo[4])
      setVideoList([...videoList, newVideo[5]])
    }, 1000)
  }

  const gameOver = async () => {
    setVideoList([])
    setTimeout(() => {
      setScore(0)
      setShowX(false)
      setShowPopUp(true)
    }, 1000)
    const currentUser = sessionStorage.getItem('currentUser')
    const response = await fetch('http://localhost:5000/api/update_high_score', {
    method: 'POST',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username: currentUser,
      high_score: score
    })
  })
    const { highScore } = await response.json();
    setUserHighScore(highScore[0])
    setShowHighScore(true)
  }

  const compareViews = async (e) => {
    setShowVS(false)
    setBlur('')
    if (e === 'more-button') {
      if (rightViewCount >= leftViewCount) {
        pointScored()
      } else {
        setShowX(true)
        gameOver()
      }
    } else {
      if (rightViewCount <= leftViewCount) {
        pointScored()
      } else {
        setShowX(true)
        gameOver()
      }
    }
    setTimeout(() => {
      setShowViews(true)
      setShowVS(true)
    }, 1001)
  }
  
  return (
    <div className='forTernary'>
      {showLoader ? <Loading/> :
        (<div className='Game'>
          <Modal showPopUp={showPopUp} popUpMessage={popUpMessage}/>
          <div className='main-game-container'>
            <Bounce left>
              <div className='left-video-container'>
                <div className='left-video-content'>
                  <h1>{leftTitle}</h1>
                  <h3>has</h3>
                  <h2>{leftViews} views</h2>
                  <iframe className='iframe-video' width="330" height="200" src={`https://www.youtube.com/embed/${leftVideoUrl}`} title='leftVideoUrl' 
                  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </div>
            </Bounce>
            <div className='centered-icon'>
              {showVS ? <FadeIn delay={150} transitionDuration={500}><div className='vs-icon'>VS</div></FadeIn> : null}
              {showCheckmark ? <FadeIn delay={150} transitionDuration={500}><div className='checkmark-icon'>✓</div></FadeIn> : null}
              {showX ? <FadeIn delay={150} transitionDuration={500}><div className='x-wrong-icon'>X</div></FadeIn> : null}
            </div>
            <Bounce right>
              <div className='right-video-container'>
                <div className='right-video-content'>
                  <h1>{rightTitle}</h1>
                  <h3>has</h3>
                  <div className='right-video-button-container'>
                    {showViews ? (
                      <div>
                        <button className={`more-button${blur}`} onClick={e => {e.persist(); setTimeout(() => compareViews(e.target.className), 2500); setShowViews(false)}}>More</button>
                        <button className='less-button' onClick={e => {e.persist(); setTimeout(() => compareViews(e.target.className), 2500); setShowViews(false)}} 
                        onMouseEnter={() => setBlur('-blur')} onMouseLeave={() => setBlur('')}>Less</button>
                      </div>) : <h2><CountUp start={0} end={rightViewCount} duration={2} separator=','/> views</h2>}
                  </div>
                  {showViews ? <h2>views</h2> : null}
                  <iframe className='iframe-video' width="330" height="200" src={`https://www.youtube.com/embed/${rightVideoUrl}`} title='rightVideoUrl' 
                  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              </div>
            </Bounce>
          </div>
          <style dangerouslySetInnerHTML={{__html: `.left-video-container 
          { background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url("${leftPicUrl}") center no-repeat; 
          background-size: cover; -o-background-size: cover; -moz-background-size: cover; -webkit-background-size: cover; }`}} />
          <style dangerouslySetInnerHTML={{__html: `.right-video-container 
          { background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url("${rightPicUrl}") center no-repeat; 
          background-size: cover; -o-background-size: cover; -moz-background-size: cover; -webkit-background-size: cover; }`}} />
          <div className='game-score-container'>
            <FadeIn><h1 className='current-score'>Current Score: {score}</h1></FadeIn>
            {showHighScore ? <FadeIn><h1 className='high-score'>High Score: {userHighScore}</h1></FadeIn> : null}
          </div>
        </div>)}
    </div>
  );
}

export default Game;
