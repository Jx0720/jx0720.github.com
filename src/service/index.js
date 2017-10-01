import { fetch } from 'util'

export function fetchIdsByType (type) {
  return fetch(`${type}stories`)
}

export function fetchItem (id) {
  return fetch(`item/${id}`)
}
