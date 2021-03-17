import request from './request';

const getUserkey = async () => {
    const data = await request.post('/service/test_httpbin_service/keys/');
    return data;
};
export default {
    getUserkey,
};
