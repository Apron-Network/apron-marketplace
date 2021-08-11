import React, {useEffect, useState} from 'react';
import {useSubstrate} from "../../api/contracts";
import apiInterface from "../../api";

import Loading from "../loading/Loading";
import StartEndTime from "./startEndTime";
import titleFront from "../../images/Dec.svg";
import Arrow from "../../images/Icon_Arrow_Nor.svg";
import ArrowAct from "../../images/Icon_Arrow_Sel.svg";

import publicJs from "../../utils/publicJs";

export default function Usage(props) {
    const {state,dispatch} = useSubstrate();
    const {marketcontract,allAccounts,statscontract} = state;
    const [list, setlist] = useState([]);
    const [info, setInfo] = useState([]);
    const [uuid, setUuid] = useState('');
    const [sum, setSum] = useState(0);

    const [loading,setLoading]= useState(false);
     useEffect(() => {
         if(marketcontract==null){
             dispatch({type: 'LOAD_MARKET'});
         }
         if(statscontract==null){
             dispatch({type: 'LOAD_STATS'});
         }
         const account = sessionStorage.getItem('account');
         if(account && JSON.parse(account)){
             dispatch({type: 'SET_ALLACCOUNTS',payload:JSON.parse(account)});
         }
         const queryList = async () => {
             setLoading(true);
             let listStorage = JSON.parse(sessionStorage.getItem("serviceList"));
             setLoading(false);
             if(listStorage.length){
                 setlist(listStorage)
                 setUuid(listStorage[0].uuid)

             }else{
                 sessionStorage.removeItem('type');
                 props.history.push("/");
                 window.location.reload()
             }
             setLoading(false);
         };
         queryList();
    }, []);
    useEffect(() => {
        if(marketcontract==null || allAccounts==null ||statscontract==null)return;
        queryUserData(uuid)
    },[uuid,marketcontract,allAccounts,statscontract]);
     const queryUserData = async (thisuuid) =>{
         setLoading(true);
         let arr = [];
         await apiInterface.stats.queryStatsByUuid(statscontract,thisuuid).then(data => {
             if (data) {
                arr = data;
                 let byUserKey = arr.filter(item=>item.user_key === allAccounts[0].address)
                 setInfo(byUserKey)
                 let total = 0;
                    byUserKey.map(i=>{
                     total+=parseInt(i.cost)
                 })
                 setSum(total)
             }
             setLoading(false);
         });

     }
     const selectService = async (thisuuid) =>{
         setUuid(thisuuid)
     }
     const timeToTimestamp = (time)=>{
         let stime= parseInt(time.replace(/,/g,''));
         return new Date( stime * 1000);
     }

     const setTime = (startTime,endTime) =>{
        let arr = info;
        let afterSelect = arr.filter(item=> (timeToTimestamp(item.start_time) > startTime && timeToTimestamp(item.start_time) <endTime) || (timeToTimestamp(item.end_time) > startTime && timeToTimestamp(item.end_time)< endTime))
         setInfo(afterSelect)
     }

    return (<div className="myprovider">
        <Loading showLoading={loading} tips='Initialize usage page'/>
            <div className="row">
                <div className="col-4">
                    <div className="topic"><img src={titleFront} alt="" />LIST</div>
                    <div className="rain">
                        <div className="contentbg">
                            <ul className="lftList">
                                {
                                    !!list.length && list.map(item=>(
                                        <li key={`list_${item.uuid}`} onClick={()=>selectService(item.uuid)} className={uuid ===item.uuid?'active':''}>
                                            <span>{item.name}</span>
                                            <img src={uuid ===item.uuid?ArrowAct:Arrow} alt=""/>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="topic"><img src={titleFront} alt="" />DETAILS</div>
                    <div className="rain">
                        <div className="contentbg">
                            <div>
                                <StartEndTime setTime={setTime}/>
                            </div>
                            <div className="totalcost">Total Cost <span>{sum} APN</span></div>
                            <table cellPadding="0" cellSpacing="0">
                                <thead>
                                <tr>
                                    <th>DATE</th>
                                    <th>CALLS</th>
                                    <th>FEE</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    !!info.length && info.map((item)=>(
                                        <tr key={`info_${item.uuid}`}>
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
                </div>
            </div>
        </div>);
}


