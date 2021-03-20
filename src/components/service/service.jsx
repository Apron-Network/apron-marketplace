import React, {useState, useEffect} from 'react';
import Tablelist from "./tablelist";
import Advantage from "./advantage";
import {useSubstrate} from "../../api/contracts";
import api from "../../api";
import Loading from "../loading/Loading";
import {Alert} from "react-bootstrap";

const  {mainAddress} = window;


export default function Marketlist(props) {
    const {state, dispatch} = useSubstrate();
    const {maincontract, apiState,allAccounts} = state;


    const [loading,setLoading]= useState(false);
    const [show,setShow]= useState(false);

    const [info, setInfo] = useState(null);

    const copyId = (url) => {
        const cInput = document.createElement('input');
        cInput.type = 'hidden';
        cInput.value = url;
        document.body.appendChild(cInput);
        cInput.select();
        document.execCommand('Copy');
        setShow(true);
        setTimeout(function () {
            setShow(false);
        },2000)
    }

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
                                    <div className="col-11 EntryPointBrdr">
                                        <div className="title">{info.name}</div>
                                        <div>SP Name: {info.provider_name} </div>
                                        <div>SP Account: {info.provider_owner}</div>
                                        <div>{info.desc}</div>

                                        <div>Your Entry Point: <span className='copied' title={`${info.schema}://${mainAddress.basepath}:8080/v1/${info.uuid}/${allAccounts[0].address}`} onClick={()=>copyId(`${info.schema}://${mainAddress.basepath}:8080/v1/${info.uuid}/${allAccounts[0].address}`)}>{`${info.schema}://${mainAddress.basepath}:8080/v1/${info.uuid}/${allAccounts[0].address}`}</span> <span className='EntryPoint' onClick={()=>copyId(`${info.schema}://${mainAddress.basepath}:8080/v1/${info.uuid}/${allAccounts[0].address}`)} ><i className='fa fa-copy'/>copied to clipboard!</span></div>
                                        <Alert show={show} variant="primary" onClose={() => setShow(false)} dismissible>copied to clipboard!
                                        </Alert>
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
