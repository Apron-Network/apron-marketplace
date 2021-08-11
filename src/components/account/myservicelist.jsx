import React, {useEffect, useState} from 'react';
import Marketlist from "../home/marketlist";
import {useSubstrate} from "../../api/contracts";
import apiInterface from "../../api";
import Loading from "../loading/Loading";
import titleFront from "../../images/Dec.svg";

export default function MyServiceList(props) {
    const {state,dispatch} = useSubstrate();
    const {maincontract,allAccounts,api,basecontract} = state;
    const [list, setlist] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if(maincontract==null){
            dispatch({type: 'LOAD_MARKET'});
        }
        if(basecontract==null){
            dispatch({type: 'LOAD_STATS'});
        }

        const account = sessionStorage.getItem('account');
        if(account && JSON.parse(account)){
            dispatch({type: 'SET_ALLACCOUNTS',payload:JSON.parse(account)});
        }
    }, []);
     useEffect(() => {
         if (maincontract == null ) return;
         const queryList = async () => {
             setLoading(true);
             await apiInterface.main.listServicesProvider(maincontract).then(data => {
                 if (data) {
                     setlist(data)
                     sessionStorage.setItem("myserviceList",JSON.stringify(data))
                 }
                 setLoading(false);
             });
         };
         queryList();

    }, [allAccounts,maincontract]);

    return (<div>
        <Loading showLoading={loading} tips='Initialize home page'/>
            <div className="row home">
                <div className="col-12">
                    <div  className="middle15">
                        <div className="topic"><img src={titleFront} alt="" />MY SERVICES</div>
                        <div className="rain">
                            <Marketlist list={list} type="myservice" history={props.history}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}


