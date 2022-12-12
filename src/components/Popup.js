import React from "react";
import "./Popup.css";

const Popup = (props) => {

  const confirmButtonSubmitHandler = async (event) => {
        event.preventDefault();

        //format startDate and startTime so that back-end accepts it
        const unformattedYear = `${props.startDateInputValue}`;
        const dateElements = unformattedYear.split('-');
        const month = dateElements[1];
        const day = dateElements[2];
        const year = dateElements[0];
        const formattedYear = month.concat('-', day, '-', year);
        const unformattedStartTime = `${props.startTimeInputValue}`;
        const formattedStartTime = props.formatTime(unformattedStartTime);

        //format endDate and endTime
        const unformattedYearEnd = `${props.endDateInputValue}`;
        const dateElementsEnd = unformattedYearEnd.split('-');
        const monthEnd = dateElementsEnd[1];
        const dayEnd = dateElementsEnd[2];
        const yearEnd = dateElementsEnd[0];
        const formattedYearEnd = monthEnd.concat('-', dayEnd, '-', yearEnd);
        const unformattedEndTime = `${props.endTimeInputValue}`;
        const formattedEndTime = props.formatTime(unformattedEndTime);

        const body = props.bodyValue;

        const response = await fetch('/personschedule/confirmed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        //reset everything
        props.setDisplayConfirmButton(false);
        props.setPopupOpen(false);
        props.getPersonSchedules();
        props.setTaskInputValue('');
        props.setTaskInputValid(false);
        props.setPersonInputValue('');
        props.setPersonInputValid(false);
        props.setStartDateInputValue('2022-12-01');
        props.setStartTimeInputValue('12:00:00');
        props.setEndDateInputValue('2022-12-31');
        props.setEndTimeInputValue('12:00:00');
        props.setSubmitDisabled(true);


        return response.json();
  }

  return (
    <form className="popup-container">
     <div className="popup-body">
      <h1>{props.text}</h1>
      {props.displayConfirmButton &&
        <button id="confirm-button" type="submit" onClick={confirmButtonSubmitHandler}>Confirm</button>
      }
      <button onClick={props.closePopup} id="close-button">Close</button>
     </div>
    </form>
  );
}

export default Popup;