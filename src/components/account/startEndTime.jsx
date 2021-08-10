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
    const submitDate = () =>{
        var startTimestamp = Date.parse(new Date(startTime))
        var endTimestamp = Date.parse(new Date(endTime))
       props.setTime(startTimestamp,endTimestamp)
    }
    return (<div className="flextime">

        <div>
            <Datetime
                onChange={handleChangeStartTime}
                value={startTime}
                isValidDate={ validstart }
                timeFormat={true}
                inputProps={{ placeholder: "Start Time" }}
            />
            <img src={iconDate} alt=""/>
        </div>
        ~
         <div>
             <Datetime
                 onChange={handleChangeEndTime}
                 value={endTime}
                 timeFormat={true}
                 isValidDate={ validend }
                 inputProps={{ placeholder: "end Time" }}
             />
             <img src={iconDate} alt=""/>
         </div>
        <button className="createNew" onClick={submitDate}>submit</button>
    </div>);
}


