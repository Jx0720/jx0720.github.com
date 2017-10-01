import 'react-hot-loader/patch'
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.js'

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )

render(App)

if (module.hot) module.hot.accept('./app.js', () => render(App))
