import React, { Component } from 'react'
import { connect } from 'react-redux'

import { syncTypeItems } from 'action/app'
import Header from 'common/header'
import Loading from 'common/loading'
import List from './List'
import './index.sass'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      types: [
        'Top',
        'New',
        'Show',
        'Ask',
        'Job'
      ]
    }
  }

  componentDidMount () {
    this.pageInitList()
  }

  async pageInitList () {
    const { dispatch, app: { pageSize, activeItem } } = this.props
    await dispatch(syncTypeItems(activeItem, pageSize))
  }

  render () {
    const { types } = this.state
    const { app: { list, pageSize, activeItem, curpage, items }, dispatch } = this.props
    return (
      <div className='home'>
        <Loading />
        <Header menu={types} />
        <div className='home-list'>
          <List
            data={list}
            items={items}
            pageSize={pageSize}
            activeItem={activeItem}
            curpage={curpage}
            dispatch={dispatch}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { app } = state
  return {
    app
  }
}

export default connect(mapStateToProps)(Home)
