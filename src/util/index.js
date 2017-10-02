import api from 'config/api'

export function fetch (child) {
  const cache = api.cachedItems
  if (cache && cache.has(child)) {
    return Promise.resolve(cache.get(child))
  } else {
    return new Promise((resolve, reject) => {
      api.child(child).once('value', snapshot => {
        const val = snapshot.val()
        // mark the timestamp when this item is cached
        if (val) val.__lastUpdated = Date.now()
        cache && cache.set(child, val)
        resolve(val)
      }, reject)
    })
  }
}

export function formatTimesToAgo (time) {
  const disTime = Date.now() / 1000 - Number(time)

  if (disTime < 3600) return formatReturnTime(disTime / 60, 'minute')
  else if (disTime < 86400) return formatReturnTime(disTime / 3600, 'hour')
  else return formatReturnTime(disTime / 86400, 'day')
}

function formatReturnTime (time, label) {
  const newTime = Math.floor(time)
  return newTime > 1 ? `${newTime} ${label}s` : `${newTime} ${label}`
}

export function formatHost (url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function getElViewPos (el) {
  const pos = { left: 0, top: 0 }
  let newEl = el

  while (newEl) {
    pos.left += newEl.offsetLeft
    pos.top += newEl.offsetTop
    newEl = newEl.offsetParent
  }

  return pos
}

export function isViewVisible (el) {
  const viewHeight = document.documentElement.clientHeight
  const scrollTop = window.pageYOffset
  const { top } = getElViewPos(el)
  const realDis = scrollTop + viewHeight

  if (top > realDis) return false
  else return true
}

export function isMobile () {
  const device = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)
  return !!(device && device.length > 0)
}
