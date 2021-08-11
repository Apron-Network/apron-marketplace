import ConnectContract from './connectContract';
import publicJs from "../utils/publicJs";
import Accounts from "./Account";
let loadMain = false;
const { configuration } = window;
let statscontract;
const InitBase = async (state, dispatch) => {

    const { apiState, api, statscontractState } = state;

    let account = await Accounts.accountAddress();
    if (apiState !== 'READY' || !account) return;
    const asyncLoadMain = async () => {
        try {
            statscontract = await ConnectContract(api, 'stats', configuration.statistics);
            dispatch({ type: 'SET_STATS', payload: statscontract });

        } catch (e) {
            console.error(e);
            dispatch({ type: 'BASE_ERROR' });
        }
    };
    if (statscontractState !== 'LOAD_STATS') return;
    if (loadMain) return dispatch({ type: 'SET_STATS', payload: statscontract });
    loadMain = true;
    asyncLoadMain();
    // return statscontract;

};

const value = 0;
const gasLimit = -1;


// const getList= async (statscontract,userkey) => {
//     const AccountId = await Accounts.accountAddress();
//     if (statscontract === null || !statscontract || !statscontract.query || !AccountId) return;
//
//     let nameResult = await statscontract.query.queryByUserKey(AccountId, {value, gasLimit},userkey);
//     nameResult = publicJs.formatResult(nameResult);
//     return nameResult;
//
// };
//
const queryServiceByUuid = async (statscontract, uuid) => {
    const AccountId = await Accounts.accountAddress();
    if (statscontract === null || !statscontract || !statscontract.query || !AccountId) return;

    let nameResult = await statscontract.query.queryByServiceUuid(AccountId, { value, gasLimit }, uuid);
    nameResult = publicJs.formatResult(nameResult);
    return nameResult;

};

export default {
    InitBase,
    queryServiceByUuid
}
