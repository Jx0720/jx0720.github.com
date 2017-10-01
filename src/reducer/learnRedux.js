import {
  CHANGE_DESC_VAL
} from 'action/learnRedux.js'

const initialState = {
  descVal: ' 😘 😝  Hello,Cahtay. ✋🏻 🐶 🌟 ',
  errmsg: ''
}

function learnReduxPage (state = initialState, action) {
  switch (action.type) {
    case CHANGE_DESC_VAL:
      return {
        ...state,
        descVal: action.newVal
      }
    default:
      return state
  }
}

export default learnReduxPage
