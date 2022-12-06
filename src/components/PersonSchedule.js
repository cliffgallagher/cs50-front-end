import React, {useEffect, useState} from 'react';
import './PersonSchedule.css';

const PersonSchedule = (props) => {
    return(
        <div className="person-schedule">
            <p>Person: {props.personName}</p>
            <p>Task: {props.taskDescription}</p>
            <p>Start: {props.startTime}</p>
            <p>End: {props.endTime}</p>
        </div>
    )
}

export default PersonSchedule;