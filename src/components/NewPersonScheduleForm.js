import React, {useEffect, useState} from 'react';

import TaskOption from './TaskOption';
import PersonOption from './PersonOption';

const NewPersonScheduleForm = () => {
    const [personOptions, setPersonOptions] = useState();
    const [personInputValue, setPersonInputValue] = useState();
    const [personInputValid, setPersonInputValid] = useState(false);

    const [taskOptions, setTaskOptions] = useState();
    const [taskInputValue, setTaskInputValue] = useState();
    const [taskInputValid, setTaskInputValid] = useState(false);

    const [startDateInputValue, setStartDateInputValue] = useState("2022-12-01");
    const [endDateInputValue, setEndDateInputValue] = useState("2022-12-31");

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

    const newPersonScheduleFormSubmitHandler = async (event) => {
        event.preventDefault();
//        console.log("taskInputValue in submit handler: " + taskInputValue);

//        console.log("startDateInputValue in submit handler: " + startDateInputValue);

        const body = {
            personId: personInputValue,
            taskId: taskInputValue,
            startDateAndTime: `${startDateInputValue}T06:00:00`,
            endTime: `${endDateInputValue}T07:00:00`
        }
        const response = await fetch('/personschedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
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

    const endDateInputChangeHandler = (event) => {
        //console.log(event.target.value);
        setEndDateInputValue(event.target.value);
    }

    useEffect(() => {
        getTaskOptions();
        getPersonOptions();
    }, [])

    return(
        <form onSubmit={newPersonScheduleFormSubmitHandler}>
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
            <label for='endDate'>End Date/Time: </label>
            <input type="date" id="endDate" name="endDate" onChange={endDateInputChangeHandler} value={endDateInputValue}/>
            <button type='submit' disabled={submitDisabled}>Assign Person to Task</button>
        </form>
    )
}

export default NewPersonScheduleForm;