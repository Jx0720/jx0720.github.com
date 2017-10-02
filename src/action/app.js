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
  const el = document.querySelector('#loading')
  el.style.display = 'block'
  return async (dispatch) => {
    const ids = await fetchIdsByType(type)
    const list = await fetchItems(ids.slice(0, pageSize))
    dispatch(updateActiveItem(type, ids, list))
    el.style.display = 'none'
  }
}

//  加载更多
export const LOAD_MORE_ITEMS = 'LOAD_MORE_ITEMS'

export function loadMoreItems (newItems) {
  return {
    type: LOAD_MORE_ITEMS,
    newItems
  }
}

export function updateMoreItems (activeItem, curpage, pageSize, items) {
  return async (dispatch) => {
    const index = (curpage - 1) * pageSize
    const ids = items[activeItem].slice(index, index + pageSize)
    const newItems = await fetchItems(ids)
    dispatch(loadMoreItems(newItems))
  }
}
