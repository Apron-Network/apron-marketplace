import React from 'react';

export default function Marketlist(props) {
    const handleToservice=(id)=>{
        props.history.push(`/service/${id}`)
    }

    const { list } = props;
    return(
        <div className="rain">
            <div className="contentbg list">
                <h4>SERVICE MARKET</h4>
                <ul>
                    {
                        list && list.map(item=>(<li onClick={()=>handleToservice(item.uuid)} key={item.uuid}>
                            <div className="row">
                                <div className="col-1">
                                    <img
                                        src={item.logo}
                                        alt={item.name} />
                                </div>
                                <div className="col-11">
                                    <div className="title">{item.name}</div>
                                    <div className="rhtcontent">{item.desc}</div>
                                </div>
                            </div>
                        </li>))
                    }
                </ul>
            </div>
        </div>
    )
}
