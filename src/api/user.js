import request from './request';
import Accounts from "./Account";

const postUserkey = async () => {
    const AccountId = await Accounts.accountAddress();
    let obj={
        account_id:AccountId
    }
    const data = await request.post('/service/test_httpbin_service/keys/',obj);

    return data;
};

const getUserkey = async () => {
    const AccountId = await Accounts.accountAddress();
    const data = await request.get(`/users/keys?account_id=${AccountId}`);
    return data;
};
export default {
    getUserkey,
    postUserkey,
};
