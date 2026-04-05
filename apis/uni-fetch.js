// 导入安装好的 uni-app-fetch 模块
import { createUniFetch } from 'uni-app-fetch'
import { useUserStore } from '../stores/user'

// 将当前所有tabbar页面的路径放在一个数组中，方便后续判断
const tabbarPages = [
  'pages/task/index',
  'pages/message/index',
  'pages/my/index',
]
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
        // 获取页面栈
        const pageStack = getCurrentPages()
        // 获取上一页 取的页面栈数组最后一个元素
        const currentPage = pageStack[pageStack.length - 1]
        const redirectURL = currentPage.route // 获取当前页面的路由路径
        // 判断数组中是否包含当前页面的路由路径，如果包含则说明当前页面是 tabbar 页面，否则不是
        const routeType = tabbarPages.includes(redirectURL)
          ? 'switchTab'
          : 'redirectTo'
        // 跳转到登录页，并将当前页面的路由路径作为参数传递，登录成功后可以根据这个参数跳转回原页面
        uni.redirectTo({
          url: `/pages/login/index?redirectURL=${redirectURL}&routeType=${routeType}`,
        })
      }
      return data
    },
  },
})
