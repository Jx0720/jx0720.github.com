import fetch from 'isomorphic-fetch'

import renderErrorWrapper from './errorWrapper'
import { isMobile } from 'util'

export default function (url, options = {}) {
  let { method = 'GET', body = {}, headers = {}, ...otherOps } = options
  // 处理参数
  method = method.toUpperCase()
  if (method === 'POST' && !headers['Content-Type']) {
    body = JSON.stringify(body)
    headers['Content-Type'] = 'application/json'
  }

  const ops = {
    method,
    credentials: 'include',
    headers,
    ...otherOps
  }
  if (method !== 'GET') ops.body = body

  return fetch(url, ops)
    .then(response => response.json())
    .catch(error => {
      const { statusText = '' } = error

      if (isMobile) {
        window.alert(JSON.stringify(error))
      } else {
        if (statusText) {
          renderErrorWrapper(statusText)
        } else {
          renderErrorWrapper(JSON.stringify(error))
        }
      }
    })
}
