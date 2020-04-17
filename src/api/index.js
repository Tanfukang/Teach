import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: '/api/OAuth/authenticate',
        method: 'get',
        params: query
    });
};
