import React, {useState, useEffect} from 'react';
import * as history from 'history';
import {Form,Dropdown} from "react-bootstrap";
import Accounts from '../api/Account';
import {useSubstrate} from "../api/contracts";
import logo from "../images/logoblue.png";

const createHashHistory = history.createHashHistory();

export default function Headertop(props) {
    const {dispatch} = useSubstrate();

    const [showHeader, setshowHeader] = useState(false);
    const [allList, setallList] = useState([]);
    const [selected, setselected] = useState([]);

    useEffect(() => {
        setshowHeader(createHashHistory.location.pathname !== '/');
        createHashHistory.listen((obj) => {
            setshowHeader(createHashHistory.location.pathname !== '/')
        });
    }, [setshowHeader]);


    useEffect(() => {
        let selectedStorage = JSON.parse(sessionStorage.getItem('account'));
        if (selectedStorage) {
            setselected(selectedStorage)
        }
    }, []);


    // const handleToAccount=()=>{
    //     createHashHistory.push("/account");
    // }

    const selectAccounts = async(e) => {
        let selected = allList.filter(i => i.address === e.target.value);
        setselected(selected);
        sessionStorage.setItem('account', JSON.stringify(selected));
        dispatch({type: 'SET_ALLACCOUNTS',payload:selected});
    }
    const connectWallet = async () => {
        const accoutlist = await Accounts.accountlist();
        setallList(accoutlist);
    }

    return (<div className='container header'>
        <div className="row">
            <div className='col-6 logo'>
                <a href="#"><img src={logo} alt=""/></a>
            </div>
            <div className='col-6 rightText'>
                <div className="header-button">
                    {
                        selected && !selected.length && !allList.length &&
                        <button className='button1 buttonHeader'  onClick={connectWallet}>Connect Wallet</button>
                    }
                    {!selected.length && !!allList.length &&
                    <Form.Control as="select" onChange={(event) => selectAccounts(event)}>
                        <option value=''>Select Option</option>
                        {
                            allList.map((opt) =>
                                <option value={opt.address} key={opt.address}>{opt.meta.name}</option>
                            )
                        }
                    </Form.Control>
                    }
                    {!!selected.length &&
                    <div className='topName'>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                {selected[0].meta.name}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/account">Purchase Record</Dropdown.Item>
                                <Dropdown.Item href="#/myprovider">My Service</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    }
                </div>
            </div>

        </div>
    </div>);

}

