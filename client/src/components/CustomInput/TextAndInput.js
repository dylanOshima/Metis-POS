import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';

class TextAndInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  }

  state = {
    active: false,
  }

  handleClick = e => {
    this.setState({active: !this.state.active});
  }

  render = () => {
    let content = (<span>
        {this.props.value} <Glyphicon style={{'color':'#7a8288'}} glyph="pencil" />
      </span>);

    // When it is active then it is an input box, otherwise it just displays text
    if(this.state.active) {
      content = (<textarea
        type="text"
        value={this.props.value}
        onChange={this.props.onChange}
        ref={input => input && input.focus()}
        />);
    }

    return (
      <div 
      className="text-and-input"
      onClick={this.handleClick}>
        {content}
      </div>
    )
  }
}

export default TextAndInput;