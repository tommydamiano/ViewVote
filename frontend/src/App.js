import React, { useState, useEffect } from 'react';
import LoginHeader from './components/LoginHeader';
import Homepage from './components/Homepage';
import Game from  './components/Game';
import Leaderboard from  './components/Leaderboard';
import MenuHeader from  './components/MenuHeader';
import Login from  './components/Login';
import LoginMobile from  './components/LoginMobile';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = usePersistedState('isLoggedIn', false)
  const [profilePicture, setProfilePicture] = useState(null)
  const [smallLogin, setSmallLogin] = useState(window.innerWidth < 800)
  const [showSmallSignup, setShowSmallSignup] = useState(false)

  function usePersistedState(key, defaultValue) {
    const [state, setState] = useState(
      () => JSON.parse(sessionStorage.getItem(key)) || defaultValue);
    useEffect(() => {
      sessionStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
  }

  const updateMedia = () => {
    setSmallLogin(window.innerWidth < 800)
  }

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia)
  })

  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/'> 
            <Redirect to='/home' />
          </Route>
          <Route exact path='/home'>
            <LoginHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} profilePicture={profilePicture} setProfilePicture={setProfilePicture}/>
            <Homepage isLoggedIn = {isLoggedIn}/>
          </Route>
          <Route exact path='/game'>
            <MenuHeader isLoggedIn={isLoggedIn} profilePicture={profilePicture} setProfilePicture={setProfilePicture}/>
            <Game />
          </Route>
          <Route exact path='/leaderboard'>
            <MenuHeader isLoggedIn={isLoggedIn} profilePicture={profilePicture} setProfilePicture={setProfilePicture}/>
            <Leaderboard />
          </Route>
          <Route exact path='/login'>
            <MenuHeader isLoggedIn={isLoggedIn} profilePicture={profilePicture} setProfilePicture={setProfilePicture}/>
            {smallLogin ? <LoginMobile setIsLoggedIn={setIsLoggedIn} showSmallSignup={showSmallSignup} setShowSmallSignup={setShowSmallSignup}/> : <Login setIsLoggedIn={setIsLoggedIn}/>}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
