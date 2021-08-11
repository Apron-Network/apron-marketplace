import Accounts from "./Account";
import publicJs from "../utils/publicJs";
import request from './request';

const value = 0;
const gasLimit = -1;

const listServices = async (marketcontract) => {
    const AccountId = await Accounts.accountAddress();
    if (marketcontract === null || !marketcontract || !marketcontract.query || !AccountId) return;

    let data = await marketcontract.query.listServices(AccountId, {value, gasLimit});
    data = publicJs.formatResult(data);

    return data?data:[];

};

const queryServiceByUuid = async (marketcontract,id) => {
    const AccountId = await Accounts.accountAddress();
    if (marketcontract === null || !marketcontract || !marketcontract.query || !AccountId) return;

    let data = await marketcontract.query.queryServiceByUuid(AccountId, {value, gasLimit},id);
    data = publicJs.formatResult(data);
    return data;

};
const listServicesProvider = async (marketcontract) => {
    const AccountId = await Accounts.accountAddress();
    if (marketcontract === null || !marketcontract || !marketcontract.query || !AccountId) return;

    let data = await marketcontract.query.listServicesProvider(AccountId, {value, gasLimit},AccountId);
    data = publicJs.formatResult(data);
    return data;
};

const setAddService = async (marketcontract,obj,cb) => {

    const AccountId = await Accounts.accountAddress();
    const injector = await Accounts.accountInjector();

    if (marketcontract === null || !marketcontract || !marketcontract.tx || !AccountId) return;

    const{uuid,name,description,logo,providerName,providerOwner,usage,declaimer,pricePlan,createTime}=obj;

    const data = await marketcontract.tx.addService({value, gasLimit:-1}, uuid,name,description,logo,createTime,providerName,providerOwner,usage,pricePlan,declaimer).signAndSend(AccountId, { signer: injector.signer }, (result) => {
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

