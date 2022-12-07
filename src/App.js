import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import NewPersonScheduleForm from './components/NewPersonScheduleForm';
import PersonSchedules from './components/PersonSchedules';
import TestPersonScheduleForm from './components/TestPersonScheduleForm';

function App() {
  const [data, setData] = useState();

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

  return (
    <div className="App">
        <NewPersonScheduleForm />
        <PersonSchedules />
    </div>
  );
}

export default App;
