import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormControl, ListGroup, ListGroupItem } from 'react-bootstrap';
import Mousetrap from 'mousetrap';
import './AutoComplete.css';

class AutoComplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array),
    updateInput: PropTypes.func,
    value: PropTypes.string
  }

  static defaultProps = {
    suggestions: []
  }

  state = { 
    value: '',
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
  };

  componentDidMount = () => {
    let increment = (num) => {
      let { activeSuggestion, filteredSuggestions } = this.state;
      return (activeSuggestion + num) % filteredSuggestions.length;
    }

    Mousetrap.bind('tab', () => {
      console.log(increment(1));
      this.setState({ activeSuggestion: increment(1) });
      return false;
    });
    Mousetrap.bind('up', () => {
      console.log(increment(-1));
      this.setState({ activeSuggestion: increment(-1) });
      return false;
    });
    Mousetrap.bind('down', () => {
      console.log(increment(1));
      this.setState({ activeSuggestion: increment(1) });
      return false;
    });
  }

  componentWillUnmount = () => {
    Mousetrap.unbind('tab');
    Mousetrap.unbind('up');
    Mousetrap.unbind('down');
  }

  onChange = (e) => {
    const { suggestions } = this.props;
    const userInput = e.target.value;

    // Checks if the userInput is a substring in any of the suggestions
    const filteredSuggestions = suggestions.filter(
      suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    )
    this.props.updateInput(e);
    this.setState({
      activeSuggestion: 0,
      showSuggestions: true,
      filteredSuggestions,
    });
  }

  onClick = (suggestion) => {
    this.props.updateInput({target: {value: suggestion}}); // Creates a fake event object
    this.setState({
      activeSuggestion: 0,
      showSuggestions: false,
    });
  }

  render() {
    let { showSuggestions, filteredSuggestions, activeSuggestion } = this.state;

    let suggestionsListComponent = null;
    if (showSuggestions && this.props.value) {
      if (filteredSuggestions.length !== 0) {
        suggestionsListComponent =  (
          <ListGroup className="suggestion">
            {filteredSuggestions.map((suggestion, index) => {
              let className = index === activeSuggestion ? true : false;
              return (
                <ListGroupItem
                  active={className} 
                  className="suggestion-item"
                  key={index}
                  onClick={this.onClick.bind(this, suggestion)}>
                  {suggestion}
                </ListGroupItem>
              )
            })}
          </ListGroup>)
      }
    }

    return (
      <Fragment>
        <FormControl
          type="text"
          componentClass="input"
          value={this.props.value}
          onChange={this.onChange} />
        { suggestionsListComponent }
      </Fragment>
    );
  }
}

export default AutoComplete