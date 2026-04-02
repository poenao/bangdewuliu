// 封装 uni.request 的通用请求函数
const uniFetch = (url, options = {}) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: url, // 请求地址
            method: options.method || 'GET', // 请求方法，默认为 GET
            data: options.data || {}, // 请求数据
            header: options.header || {}, // 请求头
            timeout: options.timeout || 60000, // 超时时间，默认 60 秒
            success: (response) => {
                if (response.statusCode === 200) {
                    resolve(response.data);
                } else {
                    reject(new Error(`请求失败，状态码：${response.statusCode}`));
                }
            },
            fail: (error) => {
                reject(error);
            },
        });
    });
};

export default uniFetch;
