import React, {useState, useEffect} from 'react';
import * as history from 'history';
import {Form,Modal} from "react-bootstrap";
import Accounts from '../api/Account';
import {useSubstrate} from "../api/contracts";
import logo from "../images/ApronLogo_Single_Vi.svg";
import logoWhite from "../images/ApronLogo_Single_White.svg";


const createHashHistory = history.createHashHistory();

export default function Headertop(props) {
    const {state,dispatch} = useSubstrate();
    const {marketcontract,allAccounts,api} = state;

    const [walletTips, setWalletTips] = useState(false);
    const [tips, setTips] = useState('');

    const [allList, setallList] = useState([]);
    const [selected, setselected] = useState([]);
    const [type, settype] = useState(0);
    const [balanceOf, setbalanceOf] = useState(0);

    useEffect(() => {

        createHashHistory.listen((obj) => {
            if(obj.pathname.indexOf('myservice')>-1){
                settype(1);
                sessionStorage.setItem('type',1);
            }else if(obj.pathname.indexOf('usage')>-1){
                settype(2);
                sessionStorage.setItem('type',2);
            }else{
                settype(0);
                sessionStorage.setItem('type',0);
            }
        });
    }, []);


    useEffect(() => {
        if(allAccounts == null ) return;
        queryBalance(allAccounts)
    }, [allAccounts,marketcontract,api]);
    useEffect(() => {
        let selectedStorage = JSON.parse(sessionStorage.getItem('account'));
        if (selectedStorage) {
            setselected(selectedStorage)
        }
        let typeInit = sessionStorage.getItem('type');
        if(typeInit!=null){
            settype(parseInt(typeInit))
        }
        dispatch({type: 'LOAD_MARKET'});

        if(!allAccounts && selectedStorage){
            dispatch({type: 'SET_ALLACCOUNTS',payload:selectedStorage});
        }
    }, []);


    const selectAccounts = async(e) => {
        let selected = allList.filter(i => i.address === e.target.value);
        setselected(selected);
        sessionStorage.setItem('account', JSON.stringify(selected));
        dispatch({type: 'SET_ALLACCOUNTS',payload:selected});
    }
    const connectWallet = async () => {
        const accoutlist = await Accounts.accountlist();

        if(typeof(accoutlist)==="string"){
            setWalletTips(true)
            setTips("Please install Polkadot wallet first")
        }
        setallList(accoutlist);
    }
    const closeTips = ()=>{

        setWalletTips(false);
        settype(0);
        sessionStorage.setItem('type',type);

        createHashHistory.push('/')
        window.location.reload()
    }
    const toLink = async (type,index) => {
        if(allAccounts ==null || !allAccounts.length){
            setWalletTips(true)
            setTips("Please connect wallet")
        }else{
            setWalletTips(false)
        }
        if(!type){
            createHashHistory.push(`/`)

        }else{
            createHashHistory.push(`/${type}`)
        }
        settype(index);
        sessionStorage.setItem('type',index);
    }
    const AddresstoShow = (address)=> {

        let frontStr = address.substring(0,4);

        let afterStr = address.substring(address.length-4,address.length);

        return `${frontStr}...${afterStr}`

    }
    const queryBalance = async (account) =>{
        if(api == null || account == null || !account.length || !account[0].address) return;
        await api.query.system.account(account[0].address,({ data: balance })=>{
            setbalanceOf(balance.toHuman().free)
        });
    }

    return (<div className='header'>
        <div className="row">
            <Modal
                show={walletTips}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                animation={false}
                onHide={()=>closeTips()}
                className='newVoteBrdr homebtm'
            >
                <Modal.Header closeButton />
                <Modal.Body>
                    <h4>{tips}</h4>
                </Modal.Body>
            </Modal>
            <div className='col-9 logoLft'>
                <div className="logo">
                    <a href="#">
                        {
                            type === 'welcome' && <div className='active'>
                                <img src={logo} alt=""/>
                            </div>
                        }
                        {
                            type !== 'welcome' &&<div className="noActive">
                                <img src={logoWhite} alt=""/>
                            </div>
                        }

                    </a>
                </div>
                <ul className="navBar">
                    <li className={type===0?'active':''} onClick={()=>toLink('',0)}>
                        <div><i className="fa fa-globe" /></div>
                        <div>market</div></li>
                    <li className={type===1?'active':''} onClick={()=>toLink('myservicelist',1)}>
                        <div><i className="fa fa-drivers-license-o" /></div>
                        <div> my service</div>
                       </li>
                    <li className={type===2?'active':''} onClick={()=>toLink('usage',2)}>
                        <div>
                            <i className="fa fa-book" />
                        </div>
                        <div><span>usage</span></div>

                    </li>
                </ul>
            </div>
            <div className='col-3 rightText'>
                <div className="header-button">
                    {
                        selected && !selected.length && !allList.length &&
                        <button className='button1'  onClick={connectWallet}>Connect Wallet</button>
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
                        <span>
                           {AddresstoShow(selected[0].address)}
                        </span>
                        {
                            allAccounts !=null && <span className='balanceRht'>{balanceOf}</span>
                        }

                        {/*<Dropdown>*/}
                        {/*    <Dropdown.Toggle id="dropdown-basic">*/}
                        {/*        {selected[0].meta.name}*/}
                        {/*    </Dropdown.Toggle>*/}
                        {/*    <Dropdown.Menu>*/}
                        {/*        <Dropdown.Item href="#/account">Purchase Record</Dropdown.Item>*/}
                        {/*        <Dropdown.Item href="#/myprovider">My Service</Dropdown.Item>*/}
                        {/*    </Dropdown.Menu>*/}
                        {/*</Dropdown>*/}
                    </div>

                    }
                </div>
            </div>

        </div>
    </div>);

}

