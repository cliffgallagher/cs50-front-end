import React, {useEffect, useState} from 'react';

const PersonSchedule = (props) => {
    return(
        <div>
            <p>Person: {props.personName}</p>
            <p>Task: {props.taskDescription}</p>
            <p>Start: {props.startTime}</p>
            <p>End: {props.endTime}</p>
        </div>
    )
}

export default PersonSchedule;