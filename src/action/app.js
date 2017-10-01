import { fetchIdsByType, fetchItems } from 'service'

export const UPDATE_ACTIVE_ITEM = 'UPDATE_ACTIVE_ITEM'

export function updateActiveItem (activeItem, ids, list) {
  return {
    type: UPDATE_ACTIVE_ITEM,
    activeItem,
    ids,
    list
  }
}

export function syncTypeItems (type, pageSize) {
  return async (dispatch) => {
    const ids = await fetchIdsByType(type)
    const list = await fetchItems(ids.splice(0, pageSize))
    dispatch(updateActiveItem(type, ids, list))
  }
}
