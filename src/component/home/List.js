import React, { Component } from 'react'

import { formatTimesToAgo, formatHost, isViewVisible, isMobile } from 'util'
import { updateMoreItems } from 'action/app'
import './list.sass'

class List extends Component {
  constructor (props) {
    super(props)
    this.hasLoad = false
    this.state = {}
  }

  componentDidMount () {
    this.scrollEvent()
  }

  scrollEvent = () => {
    window.addEventListener('scroll', async () => {
      if (!this.hasLoad) {
        const el = document.querySelector('.item-last')
        let bool = isViewVisible(el)
        if (bool) {
          this.hasLoad = true
          await this.dispatchLoadMore()
          setTimeout(() => { this.hasLoad = false }, 1000)
        }
      }
    })
  }

  dispatchLoadMore = () => {
    const { dispatch, activeItem, curpage, pageSize, items } = this.props
    dispatch(updateMoreItems(activeItem, curpage, pageSize, items))
  }

  onBackToTop = () => {
    window.requestAnimationFrame(() => {
      window.scrollTo(0, 0)
    })
  }

  renderItems = (items) => {
    const len = items.length - 3
    return items.map(({ title, by, score, time, url }, index) => {
      const className = len === index ? 'item item-last' : 'item'
      return (
        <div
          key={index}
          className={className}
          onClick={() => { if (url) window.open(url, '_blank') }}
        >
          <span className='item-score'>{ score }</span>
          <span className='item-title'>{ title }</span>
          {
            url ? <span className='item-host'> ({ formatHost(url) })</span> : ''
          } <br />
            by
          <span className='item-by'> { by }</span>
          <span className='item-time'> { formatTimesToAgo(time) } ago</span>
        </div>)
    })
  }

  render () {
    const { data } = this.props

    return (
      <div className='list'>
        { this.renderItems(data) }
        {
          isMobile()
            ? <div
              className='list-back-top'
              onClick={this.onBackToTop}
            >up</div>
            : ''
        }
      </div>
    )
  }
}

export default List
