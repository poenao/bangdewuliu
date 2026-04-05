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
      // 1. 获取 Pinia 中的用户 store
      const userState = useUserStore()

      // 2. 定义默认请求头，携带 token
      const defaultHeaders = {
        Authorization: userState.token,
      }

      // 3. 合并请求头
      options.header = Object.assign({}, defaultHeaders, options.header)

      // 4. 返回修改后的配置
      return options
    },
    // 响应拦截器
    response({ data }) {
      // 后续补充实际逻辑
      // 过滤多余数据，直接返回接口需要的数据

      return data
    },
  },
})
