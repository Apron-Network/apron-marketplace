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
    const {marketcontract, apiState,allAccounts,statscontract} = state;


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
        if(marketcontract == null && apiState === 'READY'){
            dispatch({type: 'LOAD_MARKET'});
        }
        if(statscontract==null){
            dispatch({type: 'LOAD_STATS'});
        }
        const queryList = async () => {
            setLoading(true);

            let list = JSON.parse(sessionStorage.getItem("myserviceList"));
            setLoading(false);
            if(list){
                let data = list.filter(item => item.uuid === props.match.params.id)[0];
                let domainname = props.match.params.id.replace(/_/g, '.');
                data.entrypoint = `${data.schema}://${domainname}/v1/${allAccounts[0].address}`;
                setInfo(data);
                // setInfo(data[0])
            }else{
                props.history.push("/");
            }

        };
        queryList();
    }, [marketcontract,apiState]);

    const consolidate = (arr) => {
        let listByDate = arr.map(item => { return {id:item.id, usage:parseInt(item.usage), cost:parseInt(item.cost), date:publicJs.toDate(item.start_time)} });
        
        let m = {};
        listByDate.forEach( elem => {
            if (elem.date in m) {
                m[elem.date].usage += elem.usage;
                m[elem.date].cost += elem.cost;
            } else {
                m[elem.date] = {
                    id: elem.id,
                    usage: elem.usage,
                    cost: elem.cost
                }
            }
        })
        
        let list = [];
        for (const [key, value] of Object.entries(m)) {
            console.log(`${key}: ${value}`);
            list.push({
                id: value.id,
                date: key,
                usage: value.usage,
                cost: value.cost
            })
          }

        console.log(list);

        return list;
    }

    useEffect( () => {
        if(marketcontract == null && apiState === 'READY') return;

        const queryRevenue = async () => {
            setLoading(true);
            await apiInterface.stats.queryStatsByUuid(statscontract,props.match.params.id).then(data => {
                if (data) {
                    // setRevenue(data);
                    let processedData = consolidate(data);
                    setRevenue(processedData);
                }
                setLoading(false);
            });
        };
        queryRevenue();

    }, [marketcontract,apiState,allAccounts,statscontract]);

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
                                    // !!revenue.length && revenue.map((item)=>(
                                    //     <tr key={item.id}>
                                    //         <td>{publicJs.dateType(item.end_time)}</td>
                                    //         <td>{item.usage}</td>
                                    //         <td>{item.cost}</td>
                                    //     </tr>
                                    // ))
                                    !!revenue.length && revenue.map((item)=>(
                                        <tr key={item.id}>
                                            <td>{item.date}</td>
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
