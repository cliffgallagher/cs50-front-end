import React, {useEffect, useState} from 'react';

import TaskOption from './TaskOption';
import PersonOption from './PersonOption';

const NewPersonScheduleForm = () => {
    const [taskOptions, setTaskOptions] = useState();
    const [personOptions, setPersonOptions] = useState();
    const [personInputValue, setPersonInputValue] = useState();

    const getTaskOptions = async () => {
        const response = await fetch('/task/unassigned');
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
        console.log("personInputValue in submit handler: " + personInputValue);
        const body = {
            personId: personInputValue,
            taskId: 1,
            startTime: "2022-12-15T06:00:00",
            endTime: "2022-12-15T07:00:00"
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
        //console.log(event.target.value);
        setPersonInputValue(event.target.value);
    }

    useEffect(() => {
        getTaskOptions();
        getPersonOptions();
    }, [])

    return(
        <form onSubmit={newPersonScheduleFormSubmitHandler}>
            <label for='tasks'>Task: </label>
            <select name='tasks' id='tasks'>
                {taskOptions}
            </select>
            <label for='person'>Assigned To: </label>
            <select name='person' id='person' onChange={personInputChangeHandler} value={personInputValue}>
                {personOptions}
            </select>
            <button type='submit'>Assign Person to Task</button>
        </form>
    )
}

export default NewPersonScheduleForm;