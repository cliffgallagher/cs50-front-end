import React, {useEffect, useState} from 'react';
import './PersonSchedule.css';

const PersonSchedule = (props) => {

    const personScheduleDeleteHandler = async (event) => {
        event.preventDefault();
        const body = {
            externalId: 60
        }
        const response = await fetch('/personschedule', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    return(
        <form className="person-schedule" onSubmit={personScheduleDeleteHandler}>
            <p>Person: {props.personName}</p>
            <p>Task: {props.taskDescription}</p>
            <p>Start: {props.startTime}</p>
            <p>End: {props.endTime}</p>
            <button type="submit">Delete</button>
        </form>
    )
}

export default PersonSchedule;