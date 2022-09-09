import React, { Component } from "react";

import "./search-panel.css"

export default class SearchPanel extends Component {

  state = {
    searchText: ""
  };

  onChange = (e) => {
    this.setState({
      searchText: e.target.value
    });

    this.props.onIncludes(e.target.value);
  };

  render() {

    return (
      <input type="text"
              className="form-control search-input"
              placeholder='type to search' 
              value={ this.state.searchText }
              onChange={ this.onChange }/>
      );
  };
  }


