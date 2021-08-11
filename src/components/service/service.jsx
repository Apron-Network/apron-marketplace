import React, {useState, useEffect} from 'react';
import Tablelist from "./tablelist";
import Advantage from "./advantage";
import {useSubstrate} from "../../api/contracts";
import api from "../../api";
import Loading from "../loading/Loading";
import {Alert} from "react-bootstrap";
import titleFront from "../../images/Dec.svg";

const  {configuration} = window;


export default function Marketlist(props) {
    const {state, dispatch} = useSubstrate();
    const {marketcontract, apiState,allAccounts} = state;


    const [loading,setLoading]= useState(false);
    const [show,setShow]= useState(false);

    const [info, setInfo] = useState(null);

    const copyId = (url) => {
        const cInput = document.createElement('input');
        cInput.setAttribute('id', 'copyLayer');
        cInput.value = url;
        document.body.appendChild(cInput);
        cInput.select();
        document.execCommand('Copy');

        const thisNode = document.getElementById('copyLayer');
        thisNode.parentNode.removeChild(thisNode);

        setShow(true);
        setTimeout(function () {
            setShow(false);
        },2000)
    }

    useEffect( () => {
        if(marketcontract == null && apiState === 'READY'){
            dispatch({type: 'LOAD_MARKET'});
        }
        const queryList = async () => {
            setLoading(true);
            let list = JSON.parse(sessionStorage.getItem("serviceList"));
            if(list){
                let data = list.filter(item => item.uuid === props.match.params.id)[0];
                let domainname = props.match.params.id.replace(/_/g, '.');
                data.entrypoint = `${data.schema}://${domainname}/v1/${allAccounts[0].address}`;
                setInfo(data);
                // setInfo(data[0])
                // console.log(data[0].price_plan)
            }else{
                props.history.push("/");
            }
            setLoading(false);
        };
        queryList();
    }, [marketcontract,apiState]);

    return(
        <div className="container">
            <Loading showLoading={loading} tips='Initialize service page'/>
            <div className="topic"><img src={titleFront} alt="" />DETAIL</div>

            {
                info !=null &&   <div className="rain mb30">
                    <div className="contentbg list nobtm">
                        <ul>
                            <li>
                                <div className="listlidetail">
                                    <div className="listLft">
                                        <img
                                            src={info.logo}
                                            alt={info.name} />
                                    </div>
                                    <div className="listRht EntryPointBrdr">
                                        <div className="title titleName">{info.name}</div>
                                        <div>SP Name: {info.provider_name} </div>
                                        <div>SP Account: {info.provider_owner}</div>
                                        <div className="rhtcontent">{info.desc}</div>

                                        {/* <div>Your Entry Point: <span className='copied' title={`${info.schema}://${configuration.basepath}:8080/v1/${info.uuid}/${allAccounts[0].address}`} onClick={()=>copyId(`${info.schema}://${configuration.basepath}:8080/v1/${info.uuid}/${allAccounts[0].address}`)}>{`${info.schema}://${configuration.basepath}:8080/v1/${info.uuid}/${allAccounts[0].address}`}</span> <span className='EntryPoint' onClick={()=>copyId(`${info.schema}://${configuration.basepath}:8080/v1/${info.uuid}/${allAccounts[0].address}`)} ><i className='fa fa-copy'/>copied to clipboard!</span></div> */}
                                        
                                        <div>Your Entry Point: <span className='copied' title={`${info.entrypoint}`} onClick={()=>copyId(`${info.entrypoint}`)}>{`${info.entrypoint}`}</span> <span className='EntryPoint' onClick={()=>copyId(`${info.entrypoint}`)} ><i className='fa fa-copy'/>copied to clipboard!</span></div>

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
