import Accounts from "./Account";
import publicJs from "../utils/publicJs";
import request from './request';

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
const setAddService = async (maincontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    const injector = await Accounts.accountInjector();

    if (maincontract === null || !maincontract || !maincontract.tx || !AccountId) return;

    const{uuid,name,description,logo,providerName,providerOwner,usage,declaimer,pricePlan,createTime}=obj;

    const data = await maincontract.tx.addService({value, gasLimit:-1}, uuid,name,description,logo,createTime,providerName,providerOwner,usage,pricePlan,declaimer).signAndSend(AccountId, { signer: injector.signer }, (result) => {
        if (result.status.isFinalized) {
            console.log(result)
            cb(true)
        }
    });
    return data;
};


const addService = async (obj) => {
    const{uuid,name,description,logo,providerName,providerOwner,usage,declaimer,pricePlan,createTime,base_url,schema}=obj;
    let paramsObj={
        id: uuid,
        name: name,
        base_url,
        schema,
        desc: description,
        logo: logo,
        create_time: createTime,
        service_provider_name: providerName,
        service_provider_account: providerOwner,
        service_usage: usage,
        service_price_plan: pricePlan,
        service_declaimer: declaimer,
    };
    const data = await request.post('service/',paramsObj);
    return data;
};


export default {
    listServices,
    queryServiceByUuid,
    listServicesProvider,
    setAddService,
    addService,

}

