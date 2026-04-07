import { fetch } from './uni-fetch'

/**
 * 消息列表
 * @property {string} contentType - 消息类型
 * @property {string} page - 消息数据对应的页码
 * @property {string} pageSize - 每页包含消息数据的条数
 */

export const messageListAPI = (contentType, page, pageSize) => {
  return fetch({
    url: `/driver/messages/page?contentType=${contentType}&page=${page}&pageSize=${pageSize}`,
    method: 'GET',
  })
}
