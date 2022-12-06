import React, {useEffect, useState} from 'react';

const PersonOption = (props) => {
    return(
        <option value={props.externalId}>{props.name}</option>
    )
}

export default PersonOption;