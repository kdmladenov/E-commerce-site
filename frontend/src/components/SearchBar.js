import React, { useState } from 'react';
import { useHistory } from 'react-router';

import './styles/SearchBar.css';
import useOutsideClick from '../hooks/useOutsideClick';
import { PREVIOUS_SEARCHES_ARRAY_MAX_LENGTH } from '../constants/constants';

import Tooltip from './Tooltip';
import Button from './Button';

const SearchBar = () => {
  const history = useHistory();

  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [previousSearches, setPreviousSearches] = useState(
    JSON.parse(localStorage.getItem('previousSearches')) || []
  );

  const resetInputButtonHandler = () => {
    setSearchTerm('');
    setShowDropdown(false);
  };

  const keywordInputHandler = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    setShowDropdown(false);
  };

  const enterKeyPressHandler = (e) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      if (searchTerm) {
        const updatedPreviousSearches = [
          searchTerm.trim(),
          ...previousSearches.filter((term) => term !== searchTerm.trim())
        ];
        localStorage.setItem('previousSearches', JSON.stringify(updatedPreviousSearches));
        setPreviousSearches(updatedPreviousSearches);

        history.push(`/search/${searchTerm.trim()}`);
      } else {
        history.push(`/productlist`);
      }
    }
    setShowDropdown(false);
  };

  const searchButtonHandler = (e) => {
    e.preventDefault();
    if (searchTerm) {
      const updatedPreviousSearches = [
        searchTerm.trim(),
        ...previousSearches.filter((term) => term !== searchTerm.trim())
      ];
      localStorage.setItem('previousSearches', JSON.stringify(updatedPreviousSearches));
      setPreviousSearches(updatedPreviousSearches);

      history.push(`/search/${searchTerm.trim()}`);
    } else {
      history.push(`/productlist`);
    }
    setShowDropdown(false);
  };

  const previousSearchButtonHandler = (previousSearchTerm) => {
    history.push(`/search/${previousSearchTerm}`);
    setSearchTerm(previousSearchTerm);
    setShowDropdown(false);
  };

  const removePreviousSearchButtonHandler = (previousSearchTerm) => {
    previousSearches.length === 1 && setShowDropdown(false);
    localStorage.setItem(
      'previousSearches',
      JSON.stringify(previousSearches.filter((term) => term !== previousSearchTerm))
    );
    setPreviousSearches(previousSearches.filter((term) => term !== previousSearchTerm));
  };

  const inputClickHandler = () => {
    previousSearches.length > 0 && setShowDropdown(true);
  };

  let nodeRef = useOutsideClick(() => setShowDropdown(false));

  return (
    <main className={`search_bar ${!showDropdown ? 'closed_dropdown' : ''}`} ref={nodeRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={keywordInputHandler}
        onKeyUp={(e) => enterKeyPressHandler(e)}
        onClick={inputClickHandler}
        placeholder="Search in products..."
      />
      <ul className="dropdown flex">
        {previousSearches.length > 0 &&
          previousSearches
            ?.map((previousSearch, index) => (
              <li key={`${previousSearch}_${index}`}>
                <div
                  className="previous_search_btn"
                  onClick={() => previousSearchButtonHandler(previousSearch)}
                >
                  <i className="fa fa-search" />
                  {previousSearch}
                </div>
                <Button
                  classes="icon remove_previous_search_btn"
                  onClick={() => removePreviousSearchButtonHandler(previousSearch)}
                >
                  <i className="fa fa-times" />
                </Button>
              </li>
            ))
            .slice(0, PREVIOUS_SEARCHES_ARRAY_MAX_LENGTH)}
      </ul>
      <div className="search_button_group">
        {searchTerm && (
          <button
            type="button"
            className="reset_search_term_button"
            onClick={resetInputButtonHandler}
          >
            <Tooltip direction="top" text="Clear">
              <i className="fa fa-times" aria-hidden="true" />
            </Tooltip>
          </button>
        )}
        <button type="submit" className="search_button" onClick={(e) => searchButtonHandler(e)}>
          <Tooltip direction="top" text="Search">
            <i className="fa fa-search" />
          </Tooltip>
        </button>
      </div>
    </main>
  );
};

export default SearchBar;
