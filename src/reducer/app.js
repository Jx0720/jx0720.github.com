import {
  UPDATE_ACTIVE_ITEM
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
    default:
      return state
  }
}

export default app
