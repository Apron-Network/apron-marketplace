import React, {useState, useEffect} from 'react';
import Tablelist from "./tablelist";
import Advantage from "./advantage";
import {useSubstrate} from "../../api/contracts";
import api from "../../api";
import Loading from "../loading/Loading";
import {Alert} from "react-bootstrap";
import titleFront from "../../images/Dec.svg";

const  {mainAddress} = window;


export default function Marketlist(props) {
    const {state, dispatch} = useSubstrate();
    const {maincontract, apiState,allAccounts} = state;


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
        if(maincontract == null && apiState === 'READY'){
            dispatch({type: 'LOAD_MAINCONTRACT'});
        }
        const queryList = async () => {
            setLoading(true);
            await api.main.queryServiceByUuid(maincontract,props.match.params.id).then(data => {
                console.log("===",data)
                if (data) {
                    setInfo(data)
                }
                setLoading(false);
            });
        };
        queryList();
    }, [maincontract,apiState]);

    return(
        <div className="container">
            <Loading showLoading={loading} tips='Initialize service page'/>
            <div className="topic"><img src={titleFront} alt="" />DETAIL</div>
            <div className="rain mb30">
                <div className="contentbg list nobtm">
                    <ul>
                        <li>
                            <div className="listlidetail">
                                <div className="listLft">
                                    <img
                                        src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg"
                                        alt="" />
                                </div>
                                <div className="listRht EntryPointBrdr">
                                    <div className="title titleName">INFRASTRUCTURE SERVICE NETWORK</div>
                                    <div>SP Name: networktest</div>
                                    <div>SP Account: 5CtUz67MBtme5SF7caHaWJ75wKP6hnx122MTy863CxTMuu2J</div>
                                    <div className="rhtcontent">A decentralized platform that provides infrastructure
                                        services for DApp developers,DApp users,and operators.A decentralized platform that
                                        provides infrastructure services for DApp developers,DApp users,and operators.
                                    </div>
                                    <div>Your Entry Point:
                                        <span className='copied' title={`ws://localhost:8080/v1/1234/5CtUz67MBtme5SF7caHaWJ75wKP6hnx122MTy863CxTMuu2J`} onClick={()=>copyId(`ws://localhost:8080/v1/1234/5CtUz67MBtme5SF7caHaWJ75wKP6hnx122MTy863CxTMuu2J`)}>{`ws://localhost:8080/v1/$1234/5CtUz67MBtme5SF7caHaWJ75wKP6hnx122MTy863CxTMuu2J`}</span>
                                        <span className='EntryPoint' onClick={()=>copyId(`ws://localhost:8080/v1/1234/5CtUz67MBtme5SF7caHaWJ75wKP6hnx122MTy863CxTMuu2J`)} ><i className='fa fa-copy'/>copied to clipboard!</span>
                                    </div>
                                    <Alert show={show} variant="primary" onClose={() => setShow(false)} dismissible>copied to clipboard!
                                    </Alert>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="borderBR brdr mb30">
                <div className="contentbg">
                    <dl>
                        <dt className="titleName">SERVICE USAGE</dt>
                        <dd>A decentralized platform that provides infrastructure
                            services for DApp developers,DApp users,and operators.A decentralized platform that
                            provides infrastructure services for DApp developers,DApp users,and operators.</dd>
                    </dl>
                </div>

            </div>
            <div className="borderBR">
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
                            <tr >
                                <td>SERVICE DELAIMER</td>
                                <td>free</td>
                                <td>post-paid</td>
                                <td>0</td>
                            </tr><tr >
                                <td>SERVICE DELAIMER</td>
                                <td>free</td>
                                <td>post-paid</td>
                                <td>0</td>
                            </tr><tr >
                                <td>SERVICE DELAIMER</td>
                                <td>free</td>
                                <td>post-paid</td>
                                <td>0</td>
                            </tr><tr >
                                <td>SERVICE DELAIMER</td>
                                <td>free</td>
                                <td>post-paid</td>
                                <td>0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/*{*/}
            {/*    info !=null &&   <div className="rain">*/}
            {/*        <div className="contentbg list">*/}
            {/*            <ul>*/}
            {/*                <li>*/}
            {/*                    <div className="listlidetail">*/}
            {/*                        <div className="listLft">*/}
            {/*                            <img*/}
            {/*                                src={info.logo}*/}
            {/*                                alt={info.name} />*/}
            {/*                        </div>*/}
            {/*                        <div className="listRht EntryPointBrdr">*/}
            {/*                            <div className="title">{info.name}</div>*/}
            {/*                            <div>SP Name: {info.provider_name} </div>*/}
            {/*                            <div>SP Account: {info.provider_owner}</div>*/}
            {/*                            <div>{info.desc}</div>*/}

            {/*                            <div>Your Entry Point: <span className='copied' title={`${info.schema}://${mainAddress.basepath}:8080/v1/${info.uuid}/${allAccounts[0].address}`} onClick={()=>copyId(`${info.schema}://${mainAddress.basepath}:8080/v1/${info.uuid}/${allAccounts[0].address}`)}>{`${info.schema}://${mainAddress.basepath}:8080/v1/${info.uuid}/${allAccounts[0].address}`}</span> <span className='EntryPoint' onClick={()=>copyId(`${info.schema}://${mainAddress.basepath}:8080/v1/${info.uuid}/${allAccounts[0].address}`)} ><i className='fa fa-copy'/>copied to clipboard!</span></div>*/}
            {/*                            <Alert show={show} variant="primary" onClose={() => setShow(false)} dismissible>copied to clipboard!*/}
            {/*                            </Alert>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </li>*/}
            {/*            </ul>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*}*/}
            {/*{*/}
            {/*    info !=null && <Advantage info={info}/>*/}
            {/*}*/}
            {/*{*/}
            {/*    info !=null && <Tablelist info={info} />*/}
            {/*}*/}

        </div>

    )
}
