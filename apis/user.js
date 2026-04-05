import { fetch } from './uni-fetch'

/**
 * @param {Object} data 用户账号和用户密码
 */

export const loginAPI = (data) => {
  return fetch({
    url: '/driver/login/account',
    method: 'POST',
    data,
  })
}

/**
 * 获取用户列表
 * @returns {Promise} 返回一个 Promise 对象，包含用户列表数据
 */
export const usersAPI = () => {
  return fetch({
    url: '/driver/users',
    method: 'GET',
  })
}

/**
 * 任务数据
 * @param {string} year - 任务数据的年份
 * @param {string} month - 任务数据的月份
 */

export const taskDataAPI = (year, month) => {
  return fetch({
    url: '/driver/users/taskReport',
    method: 'GET',
    data: { year, month },
  })
}

/**
 * 车辆信息
 */

export const truckAPI = () => {
  return fetch({
    url: '/driver/users/truck',
    method: 'GET',
  })
}
