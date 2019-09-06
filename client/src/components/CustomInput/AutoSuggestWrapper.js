import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { ListGroupItem } from 'react-bootstrap';

import './AutoSuggestWrapper.css';

class AutoSuggestWrapper extends Component {

  static propTypes = {
    suggestions: PropTypes.instanceOf(Array),
    changeHandler: PropTypes.func,
    value: PropTypes.string,
  }

  state = {
    filteredSuggestions: []
  }

  onSuggestionsFetchRequested = ({value, reason}) => {
    const { suggestions, changeHandler } = this.props;

    // Checks if the userInput is a substring in any of the suggestions
    const filteredSuggestions = suggestions.filter(
      suggestion => suggestion.toLowerCase().indexOf(value.toLowerCase()) > -1
    )

    let artificialEvent = {target: {value}};
    changeHandler(artificialEvent,'category');
    this.setState({ filteredSuggestions });
  };

  onSuggestionsClearRequested = () => this.setState({ filteredSuggestions: [] });

  onSuggestionSelected = (e, { suggestion }) => {
    let artificialEvent = {target: {value: suggestion}};
    this.props.changeHandler(artificialEvent, 'category');
  }

  getSuggestionValue = suggestion => suggestion;

  renderSuggestion = suggestion => (
      <ListGroupItem className="suggestion-item">
        {suggestion}
      </ListGroupItem>
);


  render() {
    return (
      <Autosuggest
        suggestions={this.state.filteredSuggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={{
          type: 'input',
          placeholder: 'Enter a category',
          value: this.props.value,
          onChange: event => this.props.changeHandler(event,"category")
      }} />
    )
  }
}

export default AutoSuggestWrapper;
