import React, {useReducer, useContext} from 'react';
import reducer from './reducer';
import INIT_STATE from './initState';
import mainConnect from './mainContract'

import {ApiPromise, WsProvider} from '@polkadot/api';

const  {mainAddress} = window;

const ws_server = `ws://${mainAddress.basepath}:9944`;
const gateway_server = `ws://${mainAddress.basepath}:8082/detailed_logs`;

const SubstrateContext = React.createContext();


const connect = async (state, dispatch) => {
    const {apiState} = state;

    if (apiState) return;

    dispatch({type: 'CONNECT_INIT'});


    const wsProvider = new WsProvider(ws_server);
    const api = await ApiPromise.create({
        provider: wsProvider, types: {
            Address: 'AccountId',
            LookupSource: 'AccountId'
        }
    });

    if (api.isConnected) {
        dispatch({type: 'CONNECT', payload: api});
    }
    await api.isReady.then((api) => dispatch({type: 'CONNECT_SUCCESS'}));

};

const connectGateway = async (state, dispatch) => {
    const socket = new WebSocket(gateway_server);

    socket.onopen = function (event) {
        // socket.send('Websocket connect');
        console.log('Websocket connect');
    };
    socket.onmessage= function (event) {

        const {message}  = state;
        // let obj ={ts:1615989354512,service_name:"test_httpbin_service",user_key:"70bf85ef-e2f9-4d30-8655-b2e69b7480b1",request_ip:"111.33.215.83",request_path:"anything/foobar"};
        let obj = event.data;
        let list = message!= null ? message:[];
        let arr = list.find(function(item, index, arr) {
            return item.ts === obj.ts;
        });
        if ( !arr){
            list.push(obj);
            dispatch({type: 'SET_MSG', payload:list})
        }
        console.log("Received Message:================= " + event.data);
    };

};

const initState = {...INIT_STATE};

const SubstrateContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initState);
    console.log("=====state=====",state);

    connect(state, dispatch);
    connectGateway(state, dispatch);
    mainConnect(state, dispatch);


    return <SubstrateContext.Provider value={{state,dispatch}}>
        {props.children}
    </SubstrateContext.Provider>;
};

const useSubstrate = () => ({...useContext(SubstrateContext)});

export {SubstrateContextProvider, useSubstrate};
