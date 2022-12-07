import React, {useEffect, useState} from 'react';
import PersonSchedule from './PersonSchedule';
import './PersonSchedules.css';

const PersonSchedules = (props) => {
    const [personSchedules, setPersonSchedules] = useState();

    return(
        <div className="person-schedules">
            {props.personSchedules}
        </div>
    )
}

export default PersonSchedules;