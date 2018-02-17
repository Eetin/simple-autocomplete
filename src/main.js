import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line import/no-extraneous-dependencies
// import injectTapEventPlugin from 'react-tap-event-plugin'
import App from './App'

// injectTapEventPlugin()

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('app')
    )
}

render(App)

if (module.hot) {
    module.hot.accept('./App', () => {
        render(App)
    })
}
