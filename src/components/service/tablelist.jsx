import React, {useState, useEffect} from 'react';

export default function Tablelist(props) {
    const {info} = props;
    const list = JSON.parse(info.price_plan);
    return(<div className="borderBR">
        <div className="contenttable">
            <table cellPadding="0" cellSpacing="0">
                <thead>
                <tr>
                    <th>TIER</th>
                    <th>DESCRIPTION</th>
                    <th>TYPE</th>
                    <th>PRICE</th>
                </tr>
                </thead>
                <tbody>
                {
                    list.map((item,index)=>(
                        <tr key={`service_${index}`}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.type}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))
                }

                </tbody>

            </table>
        </div>
    </div>)
}
