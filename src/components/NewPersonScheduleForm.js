import React, {useEffect, useState} from 'react';

import TaskOption from './TaskOption';

const NewPersonScheduleForm = () => {
    const [taskOptions, setTaskOptions] = useState();

    const getTaskOptions = async () => {
        const response = await fetch('/task');
        const data = await response.json();
        setTaskOptions(data.map(task => <TaskOption />));
    }

    useEffect(() => {
        getTaskOptions();
    }, [])

    return(
        <form>
            <label for='tasks'>Task: </label>
            <select name='tasks' id='tasks'>
                {taskOptions}
            </select>
            <label for='person'>Assigned To: </label>
            <select name='person' id='person'>
                <option value='personA'>Person A</option>
                <option value='personB'>Person B</option>
            </select>
            <button type='submit'>Assign Person to Task</button>
        </form>
    )
}

export default NewPersonScheduleForm;