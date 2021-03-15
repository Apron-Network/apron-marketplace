import Accounts from "./Account";
import publicJs from "../utils/publicJs";

const value = 0;
const gasLimit = -1;

const listServices = async (maincontract) => {
    const AccountId = await Accounts.accountAddress();
    if (maincontract === null || !maincontract || !maincontract.query || !AccountId) return;

    let data = await maincontract.query.listServices(AccountId, {value, gasLimit});
    data = publicJs.formatResult(data);

    return data?data:[];

};

const queryServiceByUuid = async (maincontract,id) => {
    const AccountId = await Accounts.accountAddress();
    if (maincontract === null || !maincontract || !maincontract.query || !AccountId) return;

    let data = await maincontract.query.queryServiceByUuid(AccountId, {value, gasLimit},id);
    data = publicJs.formatResult(data);
    return data;

};

const listServicesProvider = async (maincontract,id) => {
    const AccountId = await Accounts.accountAddress();
    if (maincontract === null || !maincontract || !maincontract.query || !AccountId) return;

    let data = await maincontract.query.listServicesProvider(AccountId, {value, gasLimit},AccountId);
    data = publicJs.formatResult(data);
    return data;
};

//
// const listDaoInstancesByOwner = async (maincontract) => {
//
//     const AccountId = await Accounts.accountAddress();
//     if (maincontract === null || !maincontract || !maincontract.query || !AccountId) return;
//
//     let data = await maincontract.query.listDaoInstancesByOwner(AccountId, {value, gasLimit},AccountId);
//     console.log("====listDaoInstancesByOwner",data)
//     data = publicJs.formatResult(data);
//
//     return data;
//
// };
//
// const instanceByTemplate = async (maincontract,id,cb) => {
//
//     const AccountId = await Accounts.accountAddress();
//     const injector = await Accounts.accountInjector();
//
//     if (maincontract === null || !maincontract || !maincontract.query || !AccountId) return;
//
//
//     let data =  await maincontract.tx.instanceByTemplate({value, gasLimit:280000n * 1000000n}, id, AccountId)
//         .signAndSend(AccountId, { signer: injector.signer }, (result) => {
//             if (result.status.isFinalized) {
//                 console.log('main.instanceByTemplate finalized', result);
//                 cb(true)
//             }
//         });
//
//     return data;
//
// };



export default {
    listServices,
    queryServiceByUuid,
    listServicesProvider,

}

