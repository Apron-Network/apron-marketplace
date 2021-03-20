import React, {useState, useEffect} from 'react';
import apiInterface from "../../api";
import {useSubstrate} from "../../api/contracts";
export default function AccountTable(props) {

    const {state,dispatch} = useSubstrate();
    const {maincontract} = state;

    const [mylist, setmylist] = useState([]);

    const formatData = (val)=>{
        if(!val) return ;
      let str =  val.replace(/,/g,'');
      return new Date(parseInt(str)*1000).toLocaleString();

    }
    const handleToservice=(id)=>{
        props.history.push(`/service/${id}`)
    }

    useEffect(() => {

        const queryList = async () => {
            let arr= props.list ;
            for(let item of arr ){
                await apiInterface.main.queryServiceByUuid(maincontract,item.service_uuid).then(data=>{
                    item.service_name = data.name
                });
            }
            setmylist(arr);
        };
        queryList();

    }, [maincontract]);


    // const {list} = props;
    return (
        <div className="borderBR">
            <div className="contenttable">
                <table cellPadding="0" cellSpacing="0">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>service name</th>
                        {/*<th>service uuid</th>*/}
                        <th>start time</th>
                        <th>end time</th>
                        <th>usage</th>
                        <th>price plan</th>
                        <th>cost</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        mylist.map(item=>(
                            <tr key={`accountTable_${item.id}`}>
                                <td>{item.id}</td>
                                <td className='hashref' onClick={()=>{handleToservice(item.service_uuid)}}>{item.service_name}</td>
                                {/*<td>{item.service_uuid}</td>*/}
                                <td>{formatData(item.start_time)}</td>
                                <td>{formatData(item.end_time)}</td>
                                <td>{item.sum}</td>
                                {/*<td>{item.price_plan}</td>*/}
                                <td>post-paid</td>
                                <td>{item.cost}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
