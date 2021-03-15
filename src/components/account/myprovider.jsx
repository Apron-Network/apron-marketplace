import React, {useEffect, useState} from 'react';
import Info from "./info";
import Mylist from "./Mylist";
import {useSubstrate} from "../../api/contracts";
import api from "../../api";

// import Loading from "./components/loading/Loading";

export default function Home(props) {
    const {state,dispatch} = useSubstrate();
    const {maincontract,allAccounts} = state;
    const [list, setlist] = useState([]);

    // const [loading,setLoading]= useState(false);
     useEffect(() => {
         if (maincontract == null ) return;
         const queryList = async () => {
             await api.main.listServicesProvider(maincontract).then(data => {
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
                    <Info />
                </div>
                <div className="col-8">
                    <Mylist list={list}  history={props.history}/>
                </div>
            </div>
        </div>);
}


