import React, {useEffect, useState} from 'react';
import Info from "./info";
import Mylist from "./Mylist";
import {useSubstrate} from "../../api/contracts";
import api from "../../api";

import Loading from "../loading/Loading";
import titleFront from "../../images/Dec.svg";
import Arrow from "../../images/Icon_Arrow_Nor.svg";
import ArrowAct from "../../images/Icon_Arrow_Sel.svg";

export default function Home(props) {
    const {state,dispatch} = useSubstrate();
    const {maincontract,allAccounts} = state;
    const [list, setlist] = useState([]);

    const [loading,setLoading]= useState(false);
     useEffect(() => {
         if (maincontract == null ) return;
         const queryList = async () => {
             setLoading(true);
             await api.main.listServicesProvider(maincontract).then(data => {
                 if (data) {
                     setlist(data)
                 }
                 setLoading(false);
             });
         };
         queryList();

    }, [allAccounts,maincontract]);

    return (<div className="myprovider">
        <Loading showLoading={loading} tips='Initialize account page'/>
            <div className="row">
                <div className="col-4">
                    {/*<Info />*/}
                    <div className="topic"><img src={titleFront} alt="" />LIST</div>
                    <div className="rain">
                        <div className="contentbg">
                            <ul className="lftList">
                                <li>
                                    <span>polkadot node service</span>
                                    <img src={Arrow} alt=""/>
                                </li>
                                <li className="active">
                                    <span>polkadot node service</span>
                                    <img src={ArrowAct} alt=""/>
                                </li>
                                <li>
                                    <span>polkadot node service</span>
                                    <img src={Arrow} alt=""/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    {/*<Mylist list={list}  history={props.history}/>*/}
                    <div className="topic"><img src={titleFront} alt="" />DETAILS</div>
                    <div className="rain">
                        <div className="contentbg">
                            <table cellPadding="0" cellSpacing="0">
                                <thead>
                                <tr>
                                    <th>NAME</th>
                                    <th>DESCRIPTION</th>
                                    <th>TYPE</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr >
                                    <td>SERVICE DELAIMER</td>
                                    <td>free</td>
                                    <td>0</td>
                                </tr><tr >
                                    <td>SERVICE DELAIMER</td>
                                    <td>free</td>
                                    <td>0</td>
                                </tr><tr >
                                    <td>SERVICE DELAIMER</td>
                                    <td>free</td>
                                    <td>0</td>
                                </tr><tr >
                                    <td>SERVICE DELAIMER</td>
                                    <td>free</td>
                                    <td>0</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}


