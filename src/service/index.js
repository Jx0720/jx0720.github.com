import { fetch } from 'util'

export function fetchIdsByType (type) {
  return fetch(`${type}stories`)
}

function fetchItem (id) {
  return fetch(`item/${id}`)
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}
