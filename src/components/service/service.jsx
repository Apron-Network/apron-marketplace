import React, {useState, useEffect} from 'react';
import Tablelist from "./tablelist";
import Advantage from "./advantage";
import {useSubstrate} from "../../api/contracts";
import api from "../../api";
import Loading from "../loading/Loading";

const  {mainAddress} = window;


export default function Marketlist(props) {
    const {state, dispatch} = useSubstrate();
    const {maincontract, apiState,allAccounts} = state;


    const [loading,setLoading]= useState(false);

    const [info, setInfo] = useState(null);

    useEffect( () => {
        if(maincontract == null && apiState === 'READY'){
            dispatch({type: 'LOAD_MAINCONTRACT'});
        }
        const queryList = async () => {
            setLoading(true);
            await api.main.queryServiceByUuid(maincontract,props.match.params.id).then(data => {
                if (data) {
                    setInfo(data)
                    console.log(data)
                }
                setLoading(false);
            });
        };
        queryList();
    }, [maincontract,apiState]);

    return(
        <div>
            <Loading showLoading={loading} tips='Initialize service page'/>
            {
                info !=null &&   <div className="rain">
                    <div className="contentbg list">
                        <ul>
                            <li>
                                <div className="row">
                                    <div className="col-1">
                                        <img
                                            src={info.logo}
                                            alt={info.name} />
                                    </div>
                                    <div className="col-11">
                                        <div className="title">{info.name}</div>
                                        <div>Provider: {info.provider_name} ({info.provider_owner})</div>
                                        <div>{info.desc}</div>
                                        <div>Entry Point: {`${info.schema}://${mainAddress.basepath}:8080/v1/${info.uuid}/${allAccounts[0].address}`}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            }
            {
                info !=null && <Advantage info={info}/>
            }
            {
                info !=null && <Tablelist info={info} />
            }

        </div>

    )
}
