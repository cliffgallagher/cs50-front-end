import React from "react";
import "./Popup.css";

const Popup = (props) => {
  return (
    <form className="popup-container">
     <div className="popup-body">
      <h1>{props.text}</h1>
      {props.displayConfirmButton &&
        <button id="confirm-button">Confirm</button>
      }
      <button onClick={props.closePopup} id="close-button">Close</button>
     </div>
    </form>
  );
}

export default Popup;