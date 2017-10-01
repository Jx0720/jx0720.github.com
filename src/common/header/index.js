import React from 'react'
import { connect } from 'react-redux'

import { syncTypeItems } from 'action/app'
import './index.sass'

const Header = ({ menu, app: { activeItem, pageSize }, dispatch }) => {
  return (
    <div className='header'>
      <div className='header-items'>
        { renderMenuItems(menu, activeItem, pageSize, dispatch) }
      </div>
    </div>
  )
}

function renderMenuItems (menu, activeItem, pageSize, dispatch) {
  return menu.map((type, index) => {
    const className = type.toLowerCase() === activeItem
      ? 'header-items-item header-items-item-active'
      : 'header-items-item'

    return (
      <span
        key={index}
        className={className}
        onClick={() => { handleClickItem(type, pageSize, dispatch) }}
      >
        { type }
      </span>
    )
  })
}

async function handleClickItem (type, pageSize, dispatch) {
  const lowerType = type.toLowerCase()
  await dispatch(syncTypeItems(lowerType, pageSize))
  window.requestAnimationFrame(() => {
    window.scrollTo(0, 0)
  })
}

const mapStateToProps = state => {
  const { app } = state
  return {
    app
  }
}

export default connect(mapStateToProps)(Header)
