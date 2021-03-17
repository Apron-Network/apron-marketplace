import React, {useEffect, useState} from 'react';
import {useSubstrate} from "../../api/contracts";

export default function Info() {
    const {state} = useSubstrate();
    const {allAccounts, api} = state;

    const [info, setinfo] = useState(null);
    const [balance, setbalance] = useState(null);

    useEffect(() => {
        if (allAccounts == null) return;
        setinfo(allAccounts[0])
    }, [allAccounts]);

    useEffect(() => {
        if (api == null || allAccounts == null) return;
        const queryBalance = async () => {
            const {address} = allAccounts[0];
            console.log(address)
            let balanceobj = await api.query.system.account(address);
            balanceobj = balanceobj.toHuman();
            console.log(balanceobj)
            setbalance(balanceobj.data.free)
        }
        queryBalance();

    }, [api]);

    return <div className="rain">
        <div className="contentbg info">
            <h4>ACCOUNT INFO</h4>
            {
                info != null && <ul>
                    <li>
                        <div className="row">
                            <div className="col-3 lft">Name</div>
                            <div className="col-9 rht">{info.meta.name}</div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div className="col-3 lft">AccountID</div>
                            <div className="col-9 rht">{info.address}</div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div className="col-3 lft">Balance</div>
                            <div className="col-9 rht">{balance}</div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div className="col-3 lft">Expiration</div>
                            <div className="col-9 rht">0</div>
                        </div>
                    </li>

                </ul>
            }

        </div>
    </div>
}
