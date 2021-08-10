import React, {useEffect, useState} from 'react';
import Marketlist from "./components/home/marketlist";
import {useSubstrate} from "./api/contracts";
import apiInterface from "./api";
import Loading from "./components/loading/Loading";
import titleFront from "./images/Dec.svg";

export default function Home(props) {
    const {state,dispatch} = useSubstrate();
    const {maincontract,allAccounts,api} = state;
    const [list, setlist] = useState([]);

    const [loading, setLoading] = useState(false);

    const account = JSON.parse(sessionStorage.getItem('account'));

    useEffect(() => {
        if(maincontract==null){
            dispatch({type: 'LOAD_MAINCONTRACT'});
        }
        if(!allAccounts && account){
            dispatch({type: 'SET_ALLACCOUNTS',payload:account});
        }

    }, []);

     useEffect(() => {

         if (maincontract == null ) return;


         const queryList = async () => {
             setLoading(true);
             await apiInterface.main.listServices(maincontract).then(data => {
                 if (data) {
                     setlist(data)
                     sessionStorage.setItem("serviceList",JSON.stringify(data))
                 }
                 setLoading(false);
             });
         };
         queryList();

         dispatch({type: 'LOAD_BASE'});

    }, [allAccounts,maincontract]);

    return (<div>
        <Loading showLoading={loading} tips='Initialize home page'/>
            <div className="row home">
                <div className="col-12">
                    <div  className="middle15">
                        <div className="topic"><img src={titleFront} alt="" />SERVICES</div>
                        <div className="rain">
                            <Marketlist list={list} type="home" history={props.history}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}


