import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import NewPersonScheduleForm from './components/NewPersonScheduleForm';

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
      <header className="App-header">
        <NewPersonScheduleForm/>
      </header>
    </div>
  );
}

export default App;
