import ConnectContract from './connectContract';
import publicJs from "../utils/publicJs";
import Accounts from "./Account";
let loadMain = false;
const {mainAddress }= window;
let basecontract;
const InitBase = async (state,dispatch) => {

    const {apiState, api,basecontractState} = state;

    let account = await Accounts.accountAddress();
    if (apiState !== 'READY' || !account ) return;
    const asyncLoadMain = async () => {
        try {
            basecontract = await ConnectContract(api, 'base', mainAddress.statistics);
            dispatch({ type: 'SET_BASE', payload: basecontract });

        } catch (e) {
            console.error(e);
            dispatch({type: 'BASE_ERROR'});
        }
    };
    if (basecontractState !== 'LOAD_BASE') return;
    if (loadMain) return dispatch({type: 'SET_BASE', payload: basecontract});
    loadMain = true;
    asyncLoadMain();
    // return basecontract;

};

const value = 0;
const gasLimit = -1;


// const getList= async (basecontract,userkey) => {
//     const AccountId = await Accounts.accountAddress();
//     if (basecontract === null || !basecontract || !basecontract.query || !AccountId) return;
//
//     let nameResult = await basecontract.query.queryByUserKey(AccountId, {value, gasLimit},userkey);
//     nameResult = publicJs.formatResult(nameResult);
//     return nameResult;
//
// };
//
const queryServiceByUuid= async (basecontract,uuid) => {
    const AccountId = await Accounts.accountAddress();
    if (basecontract === null || !basecontract || !basecontract.query || !AccountId) return;

    let nameResult = await basecontract.query.queryByServiceUuid(AccountId, {value, gasLimit},uuid);
    nameResult = publicJs.formatResult(nameResult);
    return nameResult;

};

export default {
    InitBase,
    queryServiceByUuid
}
