import {
  UPDATE_ACTIVE_ITEM, LOAD_MORE_ITEMS
} from 'action/app'

const initialState = {
  activeItem: 'top',
  curpage: 1,
  pageSize: 20,
  list: [],
  items: {
    top: [],
    new: [],
    show: [],
    ask: [],
    job: []
  }
}

function app (state = initialState, action) {
  switch (action.type) {
    case UPDATE_ACTIVE_ITEM:
      const { activeItem, ids, list } = action
      return {
        ...state,
        activeItem,
        curpage: 1,
        list,
        items: {
          ...state.items,
          [activeItem]: ids
        }
      }
    case LOAD_MORE_ITEMS:
      const { newItems } = action
      return {
        ...state,
        curpage: ++state.curpage,
        list: [
          ...state.list,
          ...newItems
        ]
      }
    default:
      return state
  }
}

export default app
