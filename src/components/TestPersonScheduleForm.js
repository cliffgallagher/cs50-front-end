import React, {useEffect, useState} from 'react';

import TaskOption from './TaskOption';
import PersonOption from './PersonOption';

const TestPersonScheduleForm = () => {

    const testFormSubmitHandler = async (event) => {
        event.preventDefault();
        const body = {
            personId: 1,
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

    return(
        <form onSubmit={testFormSubmitHandler}>
            <button type="submit">Submit</button>
        </form>
    )
}

export default TestPersonScheduleForm;