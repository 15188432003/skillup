import axios from 'axios'
import {
    handleChangeRequestHeader,
    handleConfigureAuth,
    handleAuthError,
    handleGeneralError,
    handleNetworkError
} from './axiosStatic.js'


const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 30000,
});
//请求拦截
service.interceptors.request.use((config) => {
    config = handleChangeRequestHeader(config)
    config = handleConfigureAuth(config)
    return config
})

service.interceptors.response.use(
    (response) => {
        if (response.status !== 200) return Promise.reject(response.data)
        handleAuthError(response.data.errno)
        handleGeneralError(response.data.errno, response.data.errmsg)
        return response
    },
    (err) => {
        handleNetworkError(err.response.status)
        Promise.reject(err.response)
    }
)


export default service

