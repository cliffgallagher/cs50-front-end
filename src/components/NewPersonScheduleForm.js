import React, {useEffect, useState} from 'react';

import TaskOption from './TaskOption';
import PersonOption from './PersonOption';

const NewPersonScheduleForm = () => {
    const [taskOptions, setTaskOptions] = useState();
    const [personOptions, setPersonOptions] = useState();

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

    useEffect(() => {
        getTaskOptions();
        getPersonOptions();
    }, [])

    return(
        <form>
            <label for='tasks'>Task: </label>
            <select name='tasks' id='tasks'>
                {taskOptions}
            </select>
            <label for='person'>Assigned To: </label>
            <select name='person' id='person'>
                {personOptions}
            </select>
            <button type='submit'>Assign Person to Task</button>
        </form>
    )
}

export default NewPersonScheduleForm;