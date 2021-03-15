import ConnectContract from './connectContract';
import publicJs from "../utils/publicJs";
import Accounts from "./Account";

const statistics = window.statistics;
let basecontract;
const InitBase = async (state,dispatch) => {

    const {apiState, api} = state;

    let account = await Accounts.accountAddress();
    if (apiState !== 'READY' || !account ) return;

    try {
        basecontract = await ConnectContract(api, 'base', statistics);
        dispatch({ type: 'SET_BASE', payload: basecontract });

    } catch (e) {
        console.error(e);
    }

    return basecontract;

};

const value = 0;
const gasLimit = -1;


const getList= async (basecontract,userkey) => {
    const AccountId = await Accounts.accountAddress();
    if (basecontract === null || !basecontract || !basecontract.query || !AccountId) return;

    let nameResult = await basecontract.query.queryByUserKey(AccountId, {value, gasLimit},userkey);
    nameResult = publicJs.formatResult(nameResult);
    return nameResult;

};

export default {
    InitBase,
    getList
}
