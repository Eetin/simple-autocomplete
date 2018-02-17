import React from 'react'
import Autocomplete from './Autocomplete'
import Laureate from './Laureate'

class App extends React.Component {
    state = {}
    handleSearchResults = (results) => {
        console.log('Search results', results)
        this.setState({
            results,
        })
    }
    render() {
        const { results } = this.state
        return (
            <div>
                <Autocomplete onSearch={this.handleSearchResults} />
                <div className="results">
                    {results && results.length > 0
                        ? results.map(result => (
                            <Laureate
                                key={`result-laureate-${result.name}`}
                                {...result}
                            />
                        ))
                        : <p>Nothing to show</p>}
                </div>
            </div>
        )
    }
}

export default App
