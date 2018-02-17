import React from 'react'
import PropTypes from 'prop-types'
import Prize from './Prize'

const Laureate = ({
    name,
    firstname,
    surname,
    born,
    died,
    bornCountry,
    bornCountryCode,
    bornCity,
    diedCountry,
    diedCountryCode,
    diedCity,
    gender,
    prizes,
}) => (
    <div className="laureate">
        <p>First name: {firstname}</p>
        <p>Last name: {surname}</p>
        {born && <p>Born: {new Date(born).toDateString()}</p>}
        {died && <p>Died: {new Date(died).toDateString()}</p>}
        {bornCountry && <p>Born country: {bornCountry}</p>}
        {bornCountryCode && <p>Born country code: {bornCountryCode}</p>}
        {bornCity && <p>Born city: {bornCity}</p>}
        {diedCountry && <p>Died country: {diedCountry}</p>}
        {diedCountryCode && <p>Died country code: {diedCountryCode}</p>}
        {diedCity && <p>Died city: {diedCity}</p>}
        {gender && <p>Gender: {gender}</p>}
        <p>Prizes:</p>
        {prizes.length > 0 && prizes.map(prize => (
            <Prize
                key={`laureate-${name}-prize-${prize}-${prize.year}-${prize.category}-${prize.motivation}`}
                category={prize.category}
                motivation={prize.motivation}
                year={prize.year}
            />
        ))}
    </div>
)

Laureate.defaultProps = {
    born: '',
    died: '',
    bornCountry: '',
    bornCountryCode: '',
    bornCity: '',
    diedCountry: '',
    diedCountryCode: '',
    diedCity: '',
    gender: '',
    prizes: [],
}

Laureate.propTypes = {
    name: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    born: PropTypes.string,
    died: PropTypes.string,
    bornCountry: PropTypes.string,
    bornCountryCode: PropTypes.string,
    bornCity: PropTypes.string,
    diedCountry: PropTypes.string,
    diedCountryCode: PropTypes.string,
    diedCity: PropTypes.string,
    gender: PropTypes.string,
    prizes: PropTypes.array,
}

export default Laureate
