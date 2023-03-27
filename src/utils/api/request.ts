import axios from 'axios';

// 创建一个axios实例
const service = axios.create({
    timeout: process.env.NODE_ENV === 'development' ? 100000 : 20000, // request timeout
});
export default service;
