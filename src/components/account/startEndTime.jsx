import React, {useEffect, useRef, useState} from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import iconDate from "../../images/Icon_time.svg";

export default function StartEndTime(props) {

    const [startTime, setstartTime] = useState('');
    const [endTime, setendTime] = useState('');

    const yesterday = moment().subtract( 1, 'day' );
    const validstart = function( current ){
        return current.isAfter( yesterday );
    };

    const validend = function( current ){
        return current.isAfter( startTime );
    };

   const handleChangeStartTime = (event) => {
       setstartTime( event._d)
    }
    const handleChangeEndTime = (event) => {
        setendTime(event._d)
    }
    return (<div className="flextime">

        <div>
            <Datetime
                onChange={handleChangeStartTime}
                value={startTime}
                isValidDate={ validstart }
                timeFormat={false}
                inputProps={{ placeholder: "Start Date" }}
            />
            <img src={iconDate} alt=""/>
        </div>
        ~
         <div>
             <Datetime
                 onChange={handleChangeEndTime}
                 value={endTime}
                 timeFormat={false}
                 isValidDate={ validend }
                 inputProps={{ placeholder: "end Date" }}
             />
             <img src={iconDate} alt=""/>
         </div>

    </div>);
}


