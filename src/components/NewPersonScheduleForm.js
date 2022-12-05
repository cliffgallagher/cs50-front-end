import React, {useEffect, useState} from 'react';

import TaskOption from './TaskOption';

const NewPersonScheduleForm = () => {

    return(
        <form>
            <label for='tasks'>Task: </label>
            <select name='tasks' id='tasks'>
                <TaskOption />
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