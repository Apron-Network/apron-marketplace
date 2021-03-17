import React, {useState, useEffect} from 'react';
export default function AccountTable(props) {
    const formatData = (val)=>{
        if(!val) return ;
      let str =  val.replace(/,/g,'');
      return new Date(parseInt(str)).toLocaleString();

    }
    const {list} = props;
    return (
        <div className="borderBR">
            <div className="contenttable">
                <table cellPadding="0" cellSpacing="0">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>service_uuid</th>
                        <th>start_time</th>
                        <th>end_time</th>
                        <th>usage</th>
                        <th>price_plan</th>
                        <th>cost</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        list.map(item=>(
                            <tr key={`accountTable_${item.id}`}>
                                <td>{item.id}</td>
                                <td>{item.service_uuid}</td>
                                <td>{formatData(item.start_time)}</td>
                                <td>{formatData(item.end_time)}</td>
                                <td>{item.usage}</td>
                                <td>{item.price_plan}</td>
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
