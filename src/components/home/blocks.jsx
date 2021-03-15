import React, {useState, useEffect} from 'react';
import {useSubstrate} from "../../api/contracts";
import  { Header } from '@polkadot/types/interfaces';

export default function Blocks() {
    const {state,dispatch} = useSubstrate();
    const {api} = state;

    const [list, setlist] = useState([]);

    let obj={};
    let arr=[];
    useEffect(async () => {
        if(api == null )return;

        api.rpc.chain.subscribeNewHeads((lastHead=Header)=> {

            let result = JSON.parse(JSON.stringify(lastHead));
            obj ={
                number: result.number,
                hash:lastHead.hash.toHex()
            };
            arr.unshift(obj);
            setlist([...arr]);

        });

    }, [api]);
    return(
        <div className="rain">
            <div className="contentbg blocks">
                <h4>BLOCKS</h4>
                <ul>
                    {
                        list.map(item=>
                            <li key={item.hash}>
                                <div className="row">
                                    <div className="col-2"><a href="#">{item.number}</a></div>
                                    <div className="col-10"><span>{item.hash}</span></div>
                                </div>
                            </li>
                    )
                    }

                </ul>
            </div>
        </div>
    )
}
