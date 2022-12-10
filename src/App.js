import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import NewPersonScheduleForm from './components/NewPersonScheduleForm';
import PersonSchedules from './components/PersonSchedules';
import TestPersonScheduleForm from './components/TestPersonScheduleForm';
import PersonSchedule from './components/PersonSchedule';
import Popup from './components/Popup';

function App() {
  const [data, setData] = useState();
  const [personSchedules, setPersonSchedules] = useState();
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupText, setPopupText] = useState();
  const [displayConfirmButton, setDisplayConfirmButton] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [endTimeInputValue, setEndTimeInputValue] = useState("12:00:00");
  const [endDateInputValue, setEndDateInputValue] = useState("2022-12-31");
  const [startTimeInputValue, setStartTimeInputValue] = useState("12:00:00");
  const [startDateInputValue, setStartDateInputValue] = useState("2022-12-01");
  const [personInputValid, setPersonInputValid] = useState(false);
  const [personInputValue, setPersonInputValue] = useState();
  const [taskInputValid, setTaskInputValid] = useState(false);
  const [taskInputValue, setTaskInputValue] = useState();
  const [bodyValue, setBodyValue] = useState();

  const newPersonScheduleFormSubmitHandler = async (event) => {
        event.preventDefault();

        //format startDate and startTime so that back-end accepts it
        const unformattedYear = `${startDateInputValue}`;
        const dateElements = unformattedYear.split('-');
        const month = dateElements[1];
        const day = dateElements[2];
        const year = dateElements[0];
        const formattedYear = month.concat('-', day, '-', year);
        const unformattedStartTime = `${startTimeInputValue}`;
        const formattedStartTime = formatTime(unformattedStartTime);

        //format endDate and endTime
        const unformattedYearEnd = `${endDateInputValue}`;
        const dateElementsEnd = unformattedYearEnd.split('-');
        const monthEnd = dateElementsEnd[1];
        const dayEnd = dateElementsEnd[2];
        const yearEnd = dateElementsEnd[0];
        const formattedYearEnd = monthEnd.concat('-', dayEnd, '-', yearEnd);
        const unformattedEndTime = `${endTimeInputValue}`;
        const formattedEndTime = formatTime(unformattedEndTime);

        const body = {
            personId: personInputValue,
            taskId: taskInputValue,
            startTime: `${formattedYear} ${formattedStartTime}`,
            endTime: `${formattedYearEnd} ${formattedEndTime}`
        }

        setBodyValue(body);

        const response = await fetch('/personschedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        //reset everything
        getPersonSchedules();
        setTaskInputValue('');
        setTaskInputValid(false);
        setPersonInputValue('');
        setPersonInputValid(false);
        setStartDateInputValue('2022-12-01');
        setStartTimeInputValue('12:00:00');
        setEndDateInputValue('2022-12-31');
        setEndTimeInputValue('12:00:00');
        setSubmitDisabled(true);

        //check for response status
        if (response.status == 409) {
            setPopupText("The person you are scheduling has a conflict at that time.")
            setDisplayConfirmButton(true);
            setPopupOpen(true);
        }

        if (response.status == 400) {
            setPopupText("Start time must be before end time.")
            setPopupOpen(true);
        }

        return response.json();
    }

    const getPersonSchedules = async () => {
        const response = await fetch('/personschedule');
        const data = await response.json();
        setPersonSchedules(data.map(schedule => <PersonSchedule externalId={schedule.externalId} personId={schedule.personId} personName={schedule.personName} taskId={schedule.taskId} taskDescription={schedule.taskDescription} startTime={schedule.startTime} endTime={schedule.endTime} key={schedule.externalId} getPersonSchedules={getPersonSchedules}/>));
    }

   const formatTime = (unformattedTime) => {

        let unformattedHours = unformattedTime.substring(0, 2);
        let remainingTimeString = unformattedTime.substring(2);
        let amOrPM = 'AM';

        switch(unformattedHours) {
            case '12':
                amOrPM = 'PM';
                break;
            case '13':
                unformattedHours = '01';
                amOrPM = 'PM';
                break;
            case '14':
                unformattedHours = '02';
                amOrPM = 'PM';
                break;
            case '15':
                unformattedHours = '03';
                amOrPM = 'PM';
                break;
            case '16':
                unformattedHours = '04';
                amOrPM = 'PM';
                break;
            case '17':
                unformattedHours = '05';
                amOrPM = 'PM';
                break;
            case '18':
                unformattedHours = '06';
                amOrPM = 'PM';
                break;
            case '19':
                unformattedHours = '07';
                amOrPM = 'PM';
                break;
            case '20':
                unformattedHours = '08';
                amOrPM = 'PM';
                break;
            case '21':
                unformattedHours = '09';
                amOrPM = 'PM';
                break;
            case '22':
                unformattedHours = '10';
                amOrPM = 'PM';
                break;
            case '23':
                unformattedHours = '11';
                amOrPM = 'PM';
                break;
        }

        return `${unformattedHours}${remainingTimeString} ${amOrPM}`;

    }

    useEffect(() => {
        getPersonSchedules();
    }, [])

  return (
    <div className="App">
        <NewPersonScheduleForm getPersonSchedules={getPersonSchedules} setPopupOpen={setPopupOpen} setPopupText={setPopupText} setDisplayConfirmButton={setDisplayConfirmButton} newPersonScheduleFormSubmitHandler={newPersonScheduleFormSubmitHandler} submitDisabled={submitDisabled} setSubmitDisabled={setSubmitDisabled} endTimeInputValue={endTimeInputValue} setEndTimeInputValue={setEndTimeInputValue} endDateInputValue={endDateInputValue} setEndDateInputValue={setEndDateInputValue} startTimeInputValue={startTimeInputValue} setStartTimeInputValue={setStartTimeInputValue} startDateInputValue={startDateInputValue} setStartDateInputValue={setStartDateInputValue} personInputValid={personInputValid} setPersonInputValid={setPersonInputValid} personInputValue={personInputValue} setPersonInputValue={setPersonInputValue} taskInputValid={taskInputValid} setTaskInputValid={setTaskInputValid} taskInputValue={taskInputValue} setTaskInputValue={setTaskInputValue}/>
        <PersonSchedules personSchedules={personSchedules} />
        {popupOpen ? <Popup text={popupText} closePopup={() => {setPopupOpen(false); setDisplayConfirmButton(false)}} displayConfirmButton={displayConfirmButton} newPersonScheduleFormSubmitHandler={newPersonScheduleFormSubmitHandler}  submitDisabled={submitDisabled} setSubmitDisabled={setSubmitDisabled} endTimeInputValue={endTimeInputValue} setEndTimeInputValue={setEndTimeInputValue} endDateInputValue={endDateInputValue} setEndDateInputValue={setEndDateInputValue} startTimeInputValue={startTimeInputValue} setStartTimeInputValue={setStartTimeInputValue} startDateInputValue={startDateInputValue} setStartDateInputValue={setStartDateInputValue} personInputValid={personInputValid} setPersonInputValid={setPersonInputValid} personInputValue={personInputValue} setPersonInputValue={setPersonInputValue} taskInputValid={taskInputValid} setTaskInputValid={setTaskInputValid} taskInputValue={taskInputValue} setTaskInputValue={setTaskInputValue} popupOpen={popupOpen} setPopupOpen={setPopupOpen} popupText={popupText} setPopupText={setPopupText} setDisplayConfirmButton={setDisplayConfirmButton} bodyValue={bodyValue} formatTime={formatTime} getPersonSchedules={getPersonSchedules}/> : null}
    </div>
  );
}

export default App;
