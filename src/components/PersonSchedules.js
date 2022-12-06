import React, {useEffect, useState} from 'react';
import PersonSchedule from './PersonSchedule';
import './PersonSchedules.css';

const PersonSchedules = () => {
    const [personSchedules, setPersonSchedules] = useState();

    const getPersonSchedules = async () => {
        const response = await fetch('/personschedule');
        const data = await response.json();
        setPersonSchedules(data.map(schedule => <PersonSchedule externalId={schedule.externalId} personId={schedule.personId} personName={schedule.personName} taskId={schedule.taskId} taskDescription={schedule.taskDescription} startTime={schedule.startTime} endTime={schedule.endTime} key={schedule.externalId}/>));
    }

    useEffect(() => {
        getPersonSchedules();
    }, [])

    return(
        <div className="person-schedules">
            {personSchedules}
        </div>
    )
}

export default PersonSchedules;