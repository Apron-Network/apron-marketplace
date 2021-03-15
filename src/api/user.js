import request from './request';

const getUserkey = async (params) => {
    const data = await request.post('/service/test_httpbin_service/keys/', params);
    return data;
};
export default {
    getUserkey,
};
