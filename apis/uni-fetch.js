// 导入安装好的 uni-app-fetch 模块
import { createUniFetch } from 'uni-app-fetch'
import { useUserStore } from '../stores/user'

// 配置符合自身业务的请求对象
export const fetch = createUniFetch({
  loading: { title: '正在加载...' },
  baseURL: 'https://slwl-api.itheima.net',
  intercept: {
    // 请求拦截器
    request(options) {
      const userState = useUserStore()
      // 设置默认请求头，包含 token，后续用户传入的请求头会覆盖默认请求头
      const defaultHeaders = {
        Authorization: userState.token,
      }
      // 将默认请求头和用户传入的请求头合并，用户传入的请求头会覆盖默认请求头
      options.header = Object.assign({}, defaultHeaders, options.header)
      return options
    },
    // 响应拦截器
    response({ statusCode, data }) {
      if (statusCode === 401) {
        // 401 状态码表示未授权，可能是 token 无效或过期
        // 跳转登录页
        uni.redirectTo({ url: '/pages/login/index' })
      }
      return data
    },
  },
})
