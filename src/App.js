import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState();

  const getInfo = async () => {
    const response = await fetch('/person');
    const data = await response.json();
    console.log(data);
    return data;
  }

  useEffect(() => {
    const data = getInfo();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <form>
            <label for='tasks'>Task: </label>
            <select name='tasks' id='tasks'>
                <option value='Task1'>Task 1</option>
                <option value='Task2'>Task 2</option>
            </select>
            <label for='person'>Assigned To: </label>
            <select name='person' id='person'>
                <option value='personA'>Person A</option>
                <option value='personB'>Person B</option>
            </select>
            <button type='submit'>Assign Person to Task</button>
        </form>
      </header>
    </div>
  );
}

export default App;
