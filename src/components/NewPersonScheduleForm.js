import React, {useEffect, useState} from 'react';

import TaskOption from './TaskOption';
import PersonOption from './PersonOption';
import './NewPersonScheduleForm.css';

const NewPersonScheduleForm = (props) => {
    const [personOptions, setPersonOptions] = useState();

    const [taskOptions, setTaskOptions] = useState();

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

    const personInputChangeHandler = (event) => {
        props.setPersonInputValid(event.target.value ? true : false);
        props.setSubmitDisabled(!props.personInputValid && !props.taskInputValid);
        //console.log(event.target.value);
        props.setPersonInputValue(event.target.value);
    }

    const taskInputChangeHandler = (event) => {
        props.setTaskInputValid(event.target.value ? true : false);
        props.setSubmitDisabled(!props.personInputValid && !props.taskInputValid);
        //console.log(event.target.value);
        props.setTaskInputValue(event.target.value);
    }

    const startDateInputChangeHandler = (event) => {
        //console.log(event.target.value);
        props.setStartDateInputValue(event.target.value);
    }

    const startTimeInputChangeHandler = (event) => {
        //console.log(event.target.value);
        props.setStartTimeInputValue(event.target.value);
    }

    const endDateInputChangeHandler = (event) => {
        //console.log(event.target.value);
        props.setEndDateInputValue(event.target.value);
    }

    const endTimeInputChangeHandler = (event) => {
        //console.log(event.target.value);
        props.setEndTimeInputValue(event.target.value);
    }

    useEffect(() => {
        getTaskOptions();
        getPersonOptions();
    }, [])

    return(
        <form onSubmit={props.newPersonScheduleFormSubmitHandler} className='form'>
            <label for='tasks'>Task: </label>
            <select name='tasks' id='tasks' onChange={taskInputChangeHandler} value={props.taskInputValue}>
                <option value="">Please choose an option</option>
                {taskOptions}
            </select>
            <label for='person'>Assigned To: </label>
            <select name='person' id='person' onChange={personInputChangeHandler} value={props.personInputValue}>
                <option value="">Please choose an option</option>
                {personOptions}
            </select>
            <label for='startDate'>Start Date/Time: </label>
            <input type="date" id="startDate" name="startDate" onChange={startDateInputChangeHandler} value={props.startDateInputValue}/>
            <input type="time" id="startTime" name="startTime" step="1" onChange={startTimeInputChangeHandler} value={props.startTimeInputValue}/>
            <label for='endDate'>End Date/Time: </label>
            <input type="date" id="endDate" name="endDate" onChange={endDateInputChangeHandler} value={props.endDateInputValue}/>
            <input type="time" id="endTime" name="endTime" step="1" onChange={endTimeInputChangeHandler} value={props.endTimeInputValue}/>
            <button type='submit' disabled={props.submitDisabled}>Assign Person to Task</button>
        </form>
    )
}

export default NewPersonScheduleForm;