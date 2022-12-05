import React, {useEffect, useState} from 'react';

const NewPersonScheduleForm = () => {
    const [task, setTask] = useState();

    const fetchTasks = async () => {
        const promise = await fetch('/task');
        const data = await promise.json();
        setTask(data[0].description);
        return data;
    }

    useEffect(() => {
        const tasks = fetchTasks();
    }, [])

    return(
        <form>
            <label for='tasks'>Task: </label>
            <select name='tasks' id='tasks'>
                <option value='Task1'>{task}</option>
                <option value='Task2'>Task 2</option>
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