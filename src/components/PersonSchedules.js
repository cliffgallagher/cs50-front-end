import React, {useEffect, useState} from 'react';
import PersonSchedule from './PersonSchedule';

const PersonSchedules = () => {
    const [personSchedules, setPersonSchedules] = useState();

    const getPersonSchedules = async () => {
        const response = await fetch('/personschedule');
        const data = await response.json();
        console.log(data);
        setPersonSchedules(data.map(schedule => <PersonSchedule externalId={schedule.externalId} personId={schedule.personId} personName={schedule.personName} taskId={schedule.taskId} taskDescription={schedule.taskDescription} startTime={schedule.startTime} endTime={schedule.endTime} key={schedule.externalId}/>));
    }

    useEffect(() => {
        getPersonSchedules();
    }, [])

    return(
        <div>
            {personSchedules}
        </div>
    )
}

export default PersonSchedules;