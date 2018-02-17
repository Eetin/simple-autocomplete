import React from 'react'
import PropTypes from 'prop-types'
import FuzzySearch from 'fuzzy-search'
import ListItem from './ListItem'
import { laureates } from './data.json'
import './Autocomplete.scss'
import { delayed, CancellationToken } from './utils'

const RECENT_SUGGESTIONS_LIMIT = 25
const MAX_SUGGESTIONS = 10

const searchData = laureates
    .filter(laureate => laureate.firstname && laureate.surname)
    .map(laureate => ({
        ...laureate,
        name: `${laureate.firstname} ${laureate.surname}`,
    }))

const searcher = new FuzzySearch(searchData, ['name'], { sort: true })

class Autocomplete extends React.Component {
    state = {
        value: '',
        activeItem: null,
        items: [],
        recentSuggestions: [],
        suggestionsOpen: false,
    }
    getSuggestions = async () => {
        const { value, recentSuggestions } = this.state
        if (!value) {
            this.setState({
                items: [],
            })
            return
        }
        let newSuggestions
        const recentSuggestionsArr = recentSuggestions
            .filter(suggestion => suggestion.search.toLowerCase() === value.toLowerCase())
        if (recentSuggestionsArr.length > 0) {
            console.log('Found in recent suggestions')
            newSuggestions = recentSuggestionsArr[0].suggestions
        } else {
            console.log('Requesting suggestions from dataset')
            if (this.currentRequestToken) {
                this.currentRequestToken.cancel()
            }
            this.currentRequestToken = new CancellationToken()
            newSuggestions = await delayed(searcher.search.bind(searcher), value, this.currentRequestToken)
            if (newSuggestions && newSuggestions.length > 0) {
                newSuggestions.splice(MAX_SUGGESTIONS)
                this.setState(prevState => ({
                    recentSuggestions: [
                        {
                            search: value,
                            suggestions: newSuggestions,
                        },
                        ...prevState.recentSuggestions.slice(0, RECENT_SUGGESTIONS_LIMIT - 1),
                    ],
                }))
            }
        }
        if (newSuggestions) {
            console.log(newSuggestions)
            this.setState({
                items: newSuggestions,
            })
        }
    }
    getListItems = (items) => {
        const { activeItem } = this.state
        return items.map((item, index) => (
            <ListItem
                key={item.id}
                item={item}
                index={index}
                active={index === activeItem}
                onClick={this.handleItemClick}
            />))
    }
    selectItem = (index) => {
        this.setState({
            activeItem: index,
        })
    }
    openSuggestions = () => {
        if (!this.state.suggestionsOpen) {
            this.setState({
                suggestionsOpen: true,
            })
        }
    }
    closeSuggestions = () => {
        if (this.state.suggestionsOpen) {
            this.setState({
                suggestionsOpen: false,
            })
        }
    }
    handleItemClick = (index) => {
        const { items } = this.state
        const { onSearch } = this.props
        const item = items[index]
        this.selectItem(index)
        this.setState({
            value: `${item.firstname} ${item.surname}`,
        }, async () => {
            this.closeSuggestions()
            await this.getSuggestions()
            onSearch(this.state.items)
        })
        console.log(`Item with index ${index} clicked!`)
    }
    handleKeyDown = async (event) => {
        const { items, suggestionsOpen } = this.state
        const { onSearch } = this.props
        switch (event.key) {
            case 'Enter':
                await this.getSuggestions()
                if (suggestionsOpen) {
                    this.closeSuggestions()
                    onSearch(this.state.items)
                } else {
                    this.openSuggestions()
                }
                break
            case 'Escape':
                if (suggestionsOpen) {
                    this.closeSuggestions()
                }
                break
            case 'ArrowDown':
                if (items && items.length > 0) {
                    if (!suggestionsOpen) {
                        this.openSuggestions()
                    }
                    this.setState((prevState) => {
                        let activeItem = prevState.activeItem === null
                            ? 0
                            : (prevState.activeItem + 1) % items.length
                        if (activeItem >= items.length) {
                            activeItem = 0
                        }
                        const item = items[activeItem]
                        const value = `${item.firstname} ${item.surname}`
                        return {
                            activeItem,
                            value,
                        }
                    })
                }
                break
            case 'ArrowUp':
                if (items && items.length > 0) {
                    if (!suggestionsOpen) {
                        this.openSuggestions()
                    }
                    this.setState((prevState) => {
                        let activeItem = prevState.activeItem === null
                            ? items.length - 1
                            : (prevState.activeItem - 1) % items.length
                        if (activeItem < 0) {
                            activeItem = items.length - 1
                        }
                        const item = items[activeItem]
                        const value = `${item.firstname} ${item.surname}`
                        return {
                            activeItem,
                            value,
                        }
                    })
                }
                break
            default:
        }
    }
    handleInputChange = (e) => {
        this.setState({
            value: e.target.value,
        }, async () => {
            await this.getSuggestions()
            this.openSuggestions()
        })
    }
    handleInputClick = () => {
        console.log('click')
        this.setState(prevState => ({
            suggestionsOpen: !prevState.suggestionsOpen,
        }))
    }
    handleInputBlur = () => {
        setTimeout(this.closeSuggestions, 250)
    }
    render() {
        const { autoFocus } = this.props
        const { items, value, suggestionsOpen } = this.state
        const inputClassNames = ['input']
        const listClassNames = ['suggestions-list']
        if (suggestionsOpen) {
            inputClassNames.push('suggestions-open')
            listClassNames.push('open')
        }
        const listItems = this.getListItems(items)
        return (
            <div className="autocomplete">
                <input
                    className={inputClassNames.join(' ')}
                    type="text"
                    value={value}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
                    onKeyDown={this.handleKeyDown}
                    onClick={this.handleInputClick}
                />
                {listItems && listItems.length > 0 &&
                    <ul
                        className={listClassNames.join(' ')}
                        role="listbox"
                    >
                        {listItems}
                    </ul>}
            </div>
        )
    }
}

Autocomplete.defaultProps = {
    autoFocus: false,
    onSearch: () => {},
}

Autocomplete.propTypes = {
    autoFocus: PropTypes.bool,
    onSearch: PropTypes.func,
}

export default Autocomplete
