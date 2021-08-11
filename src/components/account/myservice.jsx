import React, {useState, useEffect} from 'react';
import Tablelist from "../service/tablelist";
import {useSubstrate} from "../../api/contracts";
import apiInterface from "../../api";
import Loading from "../loading/Loading";
import {Alert,Tab,Tabs} from "react-bootstrap";
import titleFront from "../../images/Dec.svg";

import publicJs from "../../utils/publicJs";

const  {configuration} = window;


export default function Marketlist(props) {
    const {state, dispatch} = useSubstrate();
    const {maincontract, apiState,allAccounts,basecontract} = state;


    const [loading,setLoading]= useState(false);
    const [show,setShow]= useState(false);

    const [info, setInfo] = useState(null);
    const [revenue, setRevenue] = useState([]);

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
        if(basecontract==null){
            dispatch({type: 'LOAD_BASE'});
        }
        const queryList = async () => {
            setLoading(true);

            let list = JSON.parse(sessionStorage.getItem("myserviceList"));
            setLoading(false);
            if(list){
                let data = list.filter(item => item.uuid === props.match.params.id);
                setInfo(data[0])
            }else{
                props.history.push("/");
            }

        };
        queryList();
    }, [maincontract,apiState]);
    useEffect( () => {
        if(maincontract == null && apiState === 'READY') return;

        const queryRevenue = async () => {
            setLoading(true);
            await apiInterface.base.queryServiceByUuid(basecontract,props.match.params.id).then(data => {
                if (data) {
                    setRevenue(data)
                }
                setLoading(false);
            });
        };
        queryRevenue();

    }, [maincontract,apiState,allAccounts,basecontract]);

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
                                        <div className="title">{info.name}</div>
                                        <div>SP Name: {info.provider_name} </div>
                                        <div>SP Account: {info.provider_owner}</div>
                                        <div>{info.desc}</div>

                                        <div>Your Entry Point: <span className='copied' title={`${info.schema}://${configuration.basepath}:8080/v1/${info.uuid}/${allAccounts[0].address}`} onClick={()=>copyId(`${info.schema}://${configuration.basepath}:8080/v1/${info.uuid}/${allAccounts[0].address}`)}>{`${info.schema}://${configuration.basepath}:8080/v1/${info.uuid}/${allAccounts[0].address}`}</span> <span className='EntryPoint' onClick={()=>copyId(`${info.schema}://${configuration.basepath}:8080/v1/${info.uuid}/${allAccounts[0].address}`)} ><i className='fa fa-copy'/>copied to clipboard!</span></div>
                                        <Alert show={show} variant="primary" onClose={() => setShow(false)} dismissible>copied to clipboard!
                                        </Alert>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            }
            <Tabs defaultActiveKey="Desc" id="uncontrolled-tab-example" className="tabstyle">
                <Tab eventKey="Desc" title="Desc">
                    <div className="borderBR">
                        {
                            info != null &&
                            <div className="contenttable">

                                <div className="desc">{info.usage}</div>
                                {
                                    info != null && <Tablelist info={info}/>
                                }
                            </div>
                        }
                    </div>
                </Tab>
                <Tab eventKey="Revenue" title="Revenue">
                    <div className="borderBR">
                        <div className="contenttable">
                            <table cellPadding="0" cellSpacing="0">
                                <thead>
                                <tr>
                                    <th>DATE</th>
                                    <th>CALLS</th>
                                    <th>INCOME</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    !!revenue.length && revenue.map((item)=>(
                                        <tr key={item.id}>
                                            <td>{publicJs.dateType(item.end_time)}</td>
                                            <td>{item.usage}</td>
                                            <td>{item.cost}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Tab>
            </Tabs>

        </div>

    )
}
