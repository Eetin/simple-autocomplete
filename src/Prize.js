import React from 'react'
import PropTypes from 'prop-types'

const Prize = ({
    year,
    category,
    motivation,
}) => (
    <div className="prize">
        <p>Year: {year}</p>
        <p>Category: {category}</p>
        <p>Motivation: {motivation}</p>
    </div>
)

Prize.defaultProps = {
    year: 'unknown',
    category: 'unknown',
    motivation: 'unknown',
}

Prize.propTypes = {
    year: PropTypes.string,
    category: PropTypes.string,
    motivation: PropTypes.string,
}

export default Prize
