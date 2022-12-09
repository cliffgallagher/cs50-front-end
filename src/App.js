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

//  const getInfo = async () => {
//    const response = await fetch('/person');
//    const data = await response.json();
//    console.log(data);
//    return data;
//  }
//
//  useEffect(() => {
//    const data = getInfo();
//  }, [])

    const getPersonSchedules = async () => {
        const response = await fetch('/personschedule');
        const data = await response.json();
        setPersonSchedules(data.map(schedule => <PersonSchedule externalId={schedule.externalId} personId={schedule.personId} personName={schedule.personName} taskId={schedule.taskId} taskDescription={schedule.taskDescription} startTime={schedule.startTime} endTime={schedule.endTime} key={schedule.externalId} getPersonSchedules={getPersonSchedules}/>));
    }

    useEffect(() => {
        getPersonSchedules();
    }, [])

  return (
    <div className="App">
        <NewPersonScheduleForm getPersonSchedules={getPersonSchedules} setPopupOpen={setPopupOpen}/>
        <PersonSchedules personSchedules={personSchedules} />
        {popupOpen ? <Popup text="The person you are scheduling has a conflict at that time." closePopup={() => setPopupOpen(false)} /> : null}
    </div>
  );
}

export default App;
