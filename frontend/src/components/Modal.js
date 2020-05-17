import React from "react";
import Popup from "reactjs-popup";
import FadeIn from "react-fade-in";
import { Link } from 'react-router-dom';
import '../component_styles/Modal.css';

export default ({ showPopUp, popUpMessage }) => (
    <Popup modal={true} open={showPopUp} lockScroll={true} closeOnDocumentClick={false} closeOnEscape={false}>
        <FadeIn>
            <div className="modal">
                <div className="header"> 
                    You Lost :( 
                </div>
                <div className="content">
                    {popUpMessage}
                </div>
                <div className="actions">
                    <button className="modal-button" onClick={() => window.location.reload()}> New Game</button>
                    <Link to='/home'><button className="modal-button">Back to Main Menu</button></Link>
                </div>
            </div>
        </FadeIn>
    </Popup>
  );

