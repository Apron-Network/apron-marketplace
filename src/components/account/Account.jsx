import React, {useState, useEffect} from 'react';
import Info from "./info";
import InfoEcharts from "./infoEcharts";
import AccountTable from "./accountTable";
import apiInterface from "../../api";
import {useSubstrate} from "../../api/contracts";

import Loading from "../loading/Loading";
import Accounts from "../../api/Account";


export default function Account(props) {
    const {state,dispatch} = useSubstrate();
    const {basecontract,maincontract} = state;

    const [loading, setLoading] = useState(false);
    // const [userkey, setUserkey] = useState('');
    const [list, setlist] = useState([]);
    useEffect(() => {

        // const queryKey = async () => {
        //     setLoading(true);
        //     await apiInterface.user.getUserkey().then(data => {
        //         if (data) {
        //             console.log("======userkey====",data)
        //             setUserkey(data);
        //         }
        //     });
        // };
        // queryKey();

        const setInitBase = async () => {
            setLoading(true);
            await apiInterface.base.InitBase(state, dispatch);
        };
        setInitBase();
    }, []);
    useEffect(() => {
        // if(basecontract==null || !userkey) return;
        if(basecontract==null ) return;
        const queryList = async () => {
            let arr=[];
            // for(let item of userkey){
            //     await apiInterface.base.getList(basecontract,item).then(data => {
            const AccountId = await Accounts.accountAddress();
            console.log()
                await apiInterface.base.getList(basecontract,AccountId).then(data => {
                    if (data && data.length) {
                        data.map(i=> arr.push(i))
                    }

                });
            // }

            let myobj=[];
            arr.map((item,index)=>{
                if(index===0){
                    myobj.push(item);
                }else{
                    let temp = myobj.find(itemObj=>itemObj.service_uuid === item.service_uuid);
                    if(!temp){
                        myobj.push(item);
                    }
                }
            });

            for(let i = 0;i <myobj.length;i++){
                let sum=0;
                for(let j=0;j<arr.length;j++){
                    if(myobj[i].service_uuid === arr[j].service_uuid){
                        sum+= parseInt(arr[j].usage);
                    }
                    myobj[i].sum = sum;
                }
            }


            setlist(myobj);

        };
        queryList();

    // }, [userkey,basecontract]);
    }, [basecontract]);

    useEffect(() => {
        // if(basecontract==null || !userkey || !list.length) return;
        if(basecontract==null  || !list.length) return;
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
