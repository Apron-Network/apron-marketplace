import React, {useState, useEffect} from 'react';
import Info from "./info";
import InfoEcharts from "./infoEcharts";
import AccountTable from "./accountTable";
import apiInterface from "../../api";
import {useSubstrate} from "../../api/contracts";

import Loading from "../loading/Loading";


export default function Account(props) {
    const {state,dispatch} = useSubstrate();
    const {basecontract,maincontract} = state;

    const [loading, setLoading] = useState(false);
    const [userkey, setUserkey] = useState('');
    const [list, setlist] = useState([]);
    useEffect(() => {

        const queryKey = async () => {
            setLoading(true);
            await apiInterface.user.getUserkey().then(data => {
                if (data) {
                    console.log("======userkey====",data)
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
            let arr=[];
            for(let item of userkey){
                await apiInterface.base.getList(basecontract,item).then(data => {
                // await apiInterface.base.getList(basecontract,'4582fd9-ebb7-4647-a2d2-d01374782107').then(data => {
                    if (data && data.length) {
                        data.map(i=> arr.push(i))
                    }
                });
            }
            setlist(arr);

        };
        queryList();

    }, [userkey,basecontract]);

    useEffect(() => {
        if(basecontract==null || !userkey || !list.length) return;
        setLoading(false);
    }, [list]);

    return(
        <div>
            <Loading showLoading={loading} tips='Initialize account page'/>
            <div className="row">
                <div className="col-4">
                    <Info />
                </div>
                <div className="col-8">
                    {
                        !!list.length &&<InfoEcharts optionlist={list} maincontract={maincontract}/>
                    }

                </div>
            </div>
            {
                !!list.length &&<AccountTable list={list} history={props.history}/>
            }

        </div>
    )
}
