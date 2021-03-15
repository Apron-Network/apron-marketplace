import React, {useState, useEffect} from 'react';
import Info from "./info";
import InfoEcharts from "./infoEcharts";
import AccountTable from "./accountTable";
import apiInterface from "../../api";
import {useSubstrate} from "../../api/contracts";

export default function Account(props) {
    const {state,dispatch} = useSubstrate();
    const {basecontract} = state;

    const [userkey, setUserkey] = useState('');
    const [list, setlist] = useState([{value:235, name:'video'},
        {value:274, name:'advertise'},
        {value:310, name:'email'},
        {value:335, name:'direct'},
        {value:400, name:'seo'}]);
    useEffect(() => {
        const queryKey = async () => {
            await apiInterface.user.getUserkey().then(data => {
                if (data) {
                    setUserkey(data);
                }
            });
        };
        queryKey();

        const setInitBase = async () => {
            await apiInterface.base.InitBase(state, dispatch);
        };
        setInitBase();
    }, []);
    useEffect(() => {
        if(basecontract==null || !userkey) return;
        const queryList = async () => {
            await apiInterface.base.getList(basecontract,userkey).then(data => {
                if (data) {
                    console.log("==============---------======='",data)
                    // setUserkey(data)
                }
            });
        };
        queryList();

    }, [userkey,basecontract]);

    return(
        <div>
            <div className="row">
                <div className="col-4">
                    <Info />
                </div>
                <div className="col-8">
                    <InfoEcharts optionlist={list}/>
                </div>
            </div>
            <AccountTable />
        </div>
    )
}
