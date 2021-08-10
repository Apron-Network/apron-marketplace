import React, {useEffect} from "react";
import docNor from "../images/Icon_Docs_Nor.svg";
import docW from "../images/Icon_Docs_SelW.svg";
import logout from "../images/Icon_Exit_Nor.svg";
import logoutW from "../images/Icon_ExitW.svg";
import {useSubstrate} from "../api/contracts";

import * as history from 'history';
const createHashHistory = history.createHashHistory();

const FootBtm = ()=>{
    const {state,dispatch} = useSubstrate();
    const {allAccounts} = state;
    useEffect(() => {
        if(allAccounts == null ) return
    }, [allAccounts]);

    const exitAccount = ()=> {
        sessionStorage.removeItem('account');
        dispatch({type: 'LOAD_ALLACCOUNTS'});
        sessionStorage.removeItem('type');
        createHashHistory.push('/')
        window.location.reload()

    }
    return  <footer>
        <div>Making the Web 3.0 world accessible</div>
        <div className="btmRht">
            <div>© 2021 Apron Network</div>
            <ul>
                <li >
                    <a href="http://apron.network/blog/" target="_blank">
                        <img src={docNor} alt="" className="noSel" />
                        <img src={docW} alt="" className="sel" />
                    </a>
                </li>
                {
                    allAccounts && !!allAccounts.length && <li  onClick={exitAccount}>
                        <img src={logout} alt="" className="noSel" />
                        <img src={logoutW} alt="" className="sel" />
                    </li>
                }

            </ul>
        </div>
    </footer>;
};
export default  FootBtm;
