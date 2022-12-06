import React, {useEffect, useState} from 'react';

const TaskOption = (props) => {
    return(
        <option value={props.externalId}>{props.description} from {props.startTime} until {props.endTime}</option>
    )
}

export default TaskOption;