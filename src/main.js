import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line import/no-extraneous-dependencies
import Autocomplete from './Autocomplete'

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('app')
    )
}

render(Autocomplete)

if (module.hot) {
    module.hot.accept('./Autocomplete', () => {
        render(Autocomplete)
    })
}
