import React, {useEffect, useState} from 'react';
import Blocks from "./components/home/blocks";
import Logs from "./components/home/logs";
import Marketlist from "./components/home/marketlist";
import {useSubstrate} from "./api/contracts";
import apiInterface from "./api";
// import Loading from "./components/loading/Loading";

export default function Home(props) {
    const {state,dispatch} = useSubstrate();
    const {maincontract,allAccounts,api} = state;
    const [list, setlist] = useState([]);

    // const [loading,setLoading]= useState(false);

    const account = JSON.parse(sessionStorage.getItem('account'));

    useEffect(() => {
        dispatch({type: 'LOAD_MAINCONTRACT'});

        if(!allAccounts && account){
            dispatch({type: 'SET_ALLACCOUNTS',payload:account});
        }
    }, []);

     useEffect(() => {
         if (maincontract == null ) return;
         const queryList = async () => {
             await apiInterface.main.listServices(maincontract).then(data => {
                 if (data) {
                     setlist(data)
                 }
             });
         };
         queryList();

    }, [allAccounts,maincontract]);

    return (<div>
            <div className="row">
                <div className="col-4">
                    <Blocks/>
                    <Logs />
                </div>
                <div className="col-8">
                    <Marketlist list={list}  history={props.history}/>
                </div>
            </div>
        </div>);
}


