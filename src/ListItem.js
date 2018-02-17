import React from 'react'
import PropTypes from 'prop-types'

class ListItem extends React.Component {
    handleClick = () => {
        console.log('click tap')
        const { index, onClick } = this.props
        onClick(index)
    }
    handleTouchStart = () => {
        this.touchStarted = true
    }
    handleTouchEnd = () => {
        if (this.touchStarted) {
            this.handleClick()
            this.touchStarted = false
        }
    }
    render() {
        const { item, active } = this.props
        const classNames = ['suggestion-item']
        if (active) {
            classNames.push('active')
        }
        return (
            <li
                className={classNames.join(' ')}
                onClick={this.handleClick}
                // onTouchStart={this.handleTouchStart}
                // onTouchEnd={this.handleTouchEnd}
            >
                {`${item.firstname} ${item.surname}`}
            </li>
        )
    }
}

ListItem.defaultProps = {
    active: false,
    onClick: () => {},
}

ListItem.propTypes = {
    active: PropTypes.bool,
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func,
}

export default ListItem
