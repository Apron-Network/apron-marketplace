import React, {useState, useEffect} from 'react';
import Tablelist from "./tablelist";
import Advantage from "./advantage";
import {useSubstrate} from "../../api/contracts";
import api from "../../api";

export default function Marketlist(props) {
    const {state, dispatch} = useSubstrate();
    const {maincontract, apiState} = state;

    const [info, setInfo] = useState(null);

    useEffect( () => {
        if(maincontract == null && apiState === 'READY'){
            dispatch({type: 'LOAD_MAINCONTRACT'});
        }
        const queryList = async () => {
            await api.main.queryServiceByUuid(maincontract,props.match.params.id).then(data => {
                if (data) {
                    setInfo(data)
                }
            });
        };
        queryList();
    }, [maincontract,apiState]);

    return(
        <div>
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
