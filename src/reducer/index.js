import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import learnRedux from './learnRedux'

const rootReducer = combineReducers({
  routing: routerReducer,
  learnRedux
})

export default rootReducer
