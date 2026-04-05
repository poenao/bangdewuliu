// apis/uni-fetch.js

// 导入安装好的 uni-app-fetch 模块
import { createUniFetch } from 'uni-app-fetch'

// 配置符合自身业务的请求对象
export const fetch = createUniFetch({
	loading: { title: '正在加载...' },
	baseURL: 'https://slwl-api.itheima.net',
	intercept: {
		// 请求拦截器
		request(options) {
			// 后续补充实际逻辑
      return options
		},
		// 响应拦截器
		response(result) {
			// 后续补充实际逻辑
      return result
		},
	},
})
