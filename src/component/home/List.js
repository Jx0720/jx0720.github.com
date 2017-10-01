import React from 'react'

import { formatTimesToAgo, formatHost } from 'util'
import './list.sass'

const List = ({ items }) => (
  <div className='list'>
    { renderItems(items) }
  </div>
)

function renderItems (items) {
  const len = items.length - 1
  return items.map(({ id, title, by, score, time, url }, index) => {
    const className = len === index ? 'item item-last' : 'item'
    return (
      <div
        key={id}
        className={className}
      >
        <span className='item-score'>{ score }</span>
        <span className='item-title'>{ title }</span>
        {
          url ? <span className='item-host'>{ formatHost(url) }</span> : ''
        } <br />
          by
        <span className='title-by'> { by }</span>
        <span className='title-time'> { formatTimesToAgo(time) } ago</span>
      </div>)
  }
  )
}

export default List
