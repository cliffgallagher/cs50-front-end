import React from "react";
import "./Popup.css";

const Popup = (props) => {
  return (
    <div className="popup-container">
     <div className="popup-body">
      <h1>{props.text}</h1>
      <button onClick={props.closePopup}>Close</button>
     </div>
    </div>
  );
}

export default Popup;