import React from 'react'
import { connect } from 'react-redux'

import './index.sass'
import Desc from './Desc'
import logo from './imgs/logo.png'

const LearnRedux = props => {
  const { learnRedux: { descVal }, dispatch } = props

  return <div className='home-wrapper'>
    <div className='logo-wrap'>
      <img src={logo} width='300px' />
    </div>
    <div className='home-wrapper-space'>sdfjg</div>
    <Desc desc={descVal} dispatch={dispatch} />
  </div>
}

const mapStateToProps = state => {
  const { learnRedux } = state
  return {
    learnRedux
  }
}

export default connect(mapStateToProps)(LearnRedux)
