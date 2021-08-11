import React, {useReducer, useContext} from 'react';
import reducer from './reducer';
import INIT_STATE from './initState';
import mainConnect from './mainContract'
import InitBase from './base'

import {ApiPromise, WsProvider} from '@polkadot/api';

const  {configuration} = window;

const ws_server = `ws://${configuration.basepath}:9944`;

const SubstrateContext = React.createContext();


const connect = async (state, dispatch) => {
    const {apiState} = state;

    if (apiState) return;

    dispatch({type: 'CONNECT_INIT'});


    const wsProvider = new WsProvider(ws_server);
    const api = await ApiPromise.create({
        provider: wsProvider,  types: {
            Address: "MultiAddress",
            LookupSource: "MultiAddress"
        }
    });

    if (api.isConnected) {
        dispatch({type: 'CONNECT', payload: api});
    }
    await api.isReady.then((api) => dispatch({type: 'CONNECT_SUCCESS'}));

};

const initState = {...INIT_STATE};

const SubstrateContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initState);
    console.log("=====state=====",state);
    const {api,marketcontract,statscontract} = state;

    if(api == null ) {
        connect(state, dispatch);
    }
    if(marketcontract == null) {
        mainConnect(state, dispatch)
    }
    if(statscontract == null) {
        InitBase.InitBase(state, dispatch)
    }


    return <SubstrateContext.Provider value={{state,dispatch}}>
        {props.children}
    </SubstrateContext.Provider>;
};

const useSubstrate = () => ({...useContext(SubstrateContext)});

export {SubstrateContextProvider, useSubstrate};
