import React from 'react'
import { Router, Route } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import configStore from 'config/configStore.js'
import history from 'config/history'
import './app.sass'

//  组件
import Home from 'component/home'

const historyType = syncHistoryWithStore(history, configStore)

const Routers = () =>
  <Router history={historyType}>
    <Route path='/*' component={Home} />
  </Router>

const App = () => (
  <Provider store={configStore}>
    <Routers />
  </Provider>
)

export default App
