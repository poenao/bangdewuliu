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

export const usersAPI = () => {
  return fetch({
    url: '/driver/users',
    method: 'GET',
  })
}
