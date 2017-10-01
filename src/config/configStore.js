import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import { hashHistory } from 'react-router'
import rootReducer from '../reducer'

const enhancer = compose(
  applyMiddleware(thunkMiddleware, routerMiddleware(hashHistory))
)

export default createStore(
  rootReducer,
  window.devToolsExtension && window.devToolsExtension(),
  enhancer
)
