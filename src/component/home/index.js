import React, { Component } from 'react'

import Header from 'common/header'
// import { fetchItem } from 'service'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <Header />
      </div>
    )
  }
}

export default Home
