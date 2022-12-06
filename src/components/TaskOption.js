import React, {useEffect, useState} from 'react';

const TaskOption = (props) => {
    return(
        <option value={props.externalId}>{props.description}</option>
    )
}

export default TaskOption;