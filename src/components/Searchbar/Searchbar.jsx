import React, { Component } from 'react';
import {
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
  SearchbarHeader,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearch = ({ target: { value } }) => {
    this.setState({ searchQuery: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { searchQuery } = this.state;
    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit" disabled={!searchQuery}>
            <FaSearch />
          </SearchFormBtn>
          <SearchFormInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={this.handleSearch}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

export default Searchbar;
