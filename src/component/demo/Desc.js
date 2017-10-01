import React, { Component } from 'react'

import { changeDescVal } from 'action/learnRedux.js'

class Desc extends Component {
  constructor (props) {
    super(props)
    this.onChangeInput = this.onChangeInput.bind(this)
  }

  onChangeInput (ev) {
    const { dispatch } = this.props
    const tarVal = ev.target.value
    dispatch(changeDescVal(tarVal))
  }

  render () {
    const { desc } = this.props
    return (<div style={{ display: 'inline-block', marginTop: 20, width: 180 }}>
      <input
        placeholder='Basic usage'
        defaultValue={desc}
        onChange={this.onChangeInput}
      /> <br />
      <span
        style={{
          display: 'inline-block',
          marginTop: 10,
          textAlign: 'left',
          width: 180,
          paddingLeft: 13
        }}
      >
        {desc}
      </span>
    </div>)
  }
}

export default Desc
