import React, {useEffect, useState} from 'react';

import TaskOption from './TaskOption';
import PersonOption from './PersonOption';
import './NewPersonScheduleForm.css';

const NewPersonScheduleForm = (props) => {
    const [personOptions, setPersonOptions] = useState();
    const [personInputValue, setPersonInputValue] = useState();
    const [personInputValid, setPersonInputValid] = useState(false);

    const [taskOptions, setTaskOptions] = useState();
    const [taskInputValue, setTaskInputValue] = useState();
    const [taskInputValid, setTaskInputValid] = useState(false);

    const [startDateInputValue, setStartDateInputValue] = useState("2022-12-01");
    const [startTimeInputValue, setStartTimeInputValue] = useState("12:00:00");

    const [endDateInputValue, setEndDateInputValue] = useState("2022-12-31");
    const [endTimeInputValue, setEndTimeInputValue] = useState("12:00:00");

    const [submitDisabled, setSubmitDisabled] = useState(true);

    const getTaskOptions = async () => {
        const response = await fetch('/task');
        const data = await response.json();
        setTaskOptions(data.map(task => <TaskOption externalId={task.externalId} description={task.description} key={task.externalId}/>));
    }

    const getPersonOptions = async () => {
        const response = await fetch('/person');
        const data = await response.json();
        setPersonOptions(data.map(person => <PersonOption externalId={person.externalId} name={person.name} key={person.externalId}/>));
    }

    const formatStartTime = (unformattedStartTime) => {


    }

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
        let unformattedHours = unformattedStartTime.substring(0, 2);
        const remainingTimeString = unformattedStartTime.substring(2);
        let amOrPM = 'AM';
        console.log('unformattedHours: ' + unformattedHours);
//        console.log(remainingTimeString);
//        console.log(unformattedStartTime);

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

        console.log('formmated hours: ' + unformattedHours + ' ' + amOrPM);

        const body = {
            personId: personInputValue,
            taskId: taskInputValue,
            startTime: `${startDateInputValue}T${startTimeInputValue}`,
            endTime: `${endDateInputValue}T${endTimeInputValue}`
        }
        console.log('stringified: ' + JSON.stringify(body));
        const response = await fetch('/personschedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        //reset everything
        props.getPersonSchedules();
        setTaskInputValue('');
        setTaskInputValid(false);
        setPersonInputValue('');
        setPersonInputValid(false);
        setStartDateInputValue('2022-12-01');
        setStartTimeInputValue('12:00:00');
        setEndDateInputValue('2022-12-31');
        setEndTimeInputValue('12:00:00');
        setSubmitDisabled(true);

        return response.json();
    }

    const personInputChangeHandler = (event) => {
        setPersonInputValid(event.target.value ? true : false);
        setSubmitDisabled(!personInputValid && !taskInputValid);
        //console.log(event.target.value);
        setPersonInputValue(event.target.value);
    }

    const taskInputChangeHandler = (event) => {
        setTaskInputValid(event.target.value ? true : false);
        setSubmitDisabled(!personInputValid && !taskInputValid);
        //console.log(event.target.value);
        setTaskInputValue(event.target.value);
    }

    const startDateInputChangeHandler = (event) => {
        //console.log(event.target.value);
        setStartDateInputValue(event.target.value);
    }

    const startTimeInputChangeHandler = (event) => {
        //console.log(event.target.value);
        setStartTimeInputValue(event.target.value);
    }

    const endDateInputChangeHandler = (event) => {
        //console.log(event.target.value);
        setEndDateInputValue(event.target.value);
    }

    const endTimeInputChangeHandler = (event) => {
        //console.log(event.target.value);
        setEndTimeInputValue(event.target.value);
    }

    useEffect(() => {
        getTaskOptions();
        getPersonOptions();
    }, [])

    return(
        <form onSubmit={newPersonScheduleFormSubmitHandler} className='form'>
            <label for='tasks'>Task: </label>
            <select name='tasks' id='tasks' onChange={taskInputChangeHandler} value={taskInputValue}>
                <option value="">Please choose an option</option>
                {taskOptions}
            </select>
            <label for='person'>Assigned To: </label>
            <select name='person' id='person' onChange={personInputChangeHandler} value={personInputValue}>
                <option value="">Please choose an option</option>
                {personOptions}
            </select>
            <label for='startDate'>Start Date/Time: </label>
            <input type="date" id="startDate" name="startDate" onChange={startDateInputChangeHandler} value={startDateInputValue}/>
            <input type="time" id="startTime" name="startTime" step="1" onChange={startTimeInputChangeHandler} value={startTimeInputValue}/>
            <label for='endDate'>End Date/Time: </label>
            <input type="date" id="endDate" name="endDate" onChange={endDateInputChangeHandler} value={endDateInputValue}/>
            <input type="time" id="endTime" name="endTime" step="1" onChange={endTimeInputChangeHandler} value={endTimeInputValue}/>
            <button type='submit' disabled={submitDisabled}>Assign Person to Task</button>
        </form>
    )
}

export default NewPersonScheduleForm;