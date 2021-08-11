import Accounts from "./Account";
import publicJs from "../utils/publicJs";
import request from './request';

const value = 0;
const gasLimit = -1;

const queryStatsByUuid = async (statscontract, uuid) => {
    const AccountId = await Accounts.accountAddress();
    if (statscontract === null || !statscontract || !statscontract.query || !AccountId) return;

    let nameResult = await statscontract.query.queryByServiceUuid(AccountId, { value, gasLimit }, uuid);
    nameResult = publicJs.formatResult(nameResult);
    return nameResult;

};

// const queryStatsByUserKey= async (statscontract,userkey) => {
//     const AccountId = await Accounts.accountAddress();
//     if (statscontract === null || !statscontract || !statscontract.query || !AccountId) return;
//
//     let nameResult = await statscontract.query.queryByUserKey(AccountId, {value, gasLimit},userkey);
//     nameResult = publicJs.formatResult(nameResult);
//     return nameResult;
//
// };
//

export default {
    queryStatsByUuid,
    // queryStatsByUserKey,
}
