import React, { useEffect, useState } from 'react';
import './styles/SearchBar.css';
import { suggestions } from '../constants/for-developing/suggestions';
import { trending } from '../constants/for-developing/trending';
import {
  alphabeticalSort,
  isKeywordInString,
  keywordInString
} from '../constants/utility-functions';
import { useHistory } from 'react-router';
import Tooltip from './Tooltip';
import useOutsideClick from '../hooks/useOutsideClick';

const PREVIOUS_SEARCHES_ARRAY_MAX_LENGTH = 5;

const SearchBar = () => {
  const history = useHistory();

  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const [previousSearches, setPreviousSearches] = useState([]);
  console.log(Array.isArray(previousSearches), 'array');
  console.log(previousSearches.length, 'length');

  const previousSearchesToRender =
    previousSearches.length &&
    previousSearches
      ?.map((previousSearch, index) => (
        <li key={`${previousSearch}_${index}`}>
          <div>
            <i className="fa fa-search"></i>
            {previousSearch}
          </div>
        </li>
      ))
      .slice(0, PREVIOUS_SEARCHES_ARRAY_MAX_LENGTH);

  const resetInputButtonHandler = () => {
    setSearchTerm('');
    setShowDropdown(false);
  };

  const keywordInputHandler = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    setShowDropdown(false);
  };

  const keyPressHandler = (e) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      if (searchTerm.trim()) {
        localStorage.setItem(
          'previousSearches',
          JSON.stringify(
            previousSearches?.length >= PREVIOUS_SEARCHES_ARRAY_MAX_LENGTH
              ? [
                  ...previousSearches.slice(0, PREVIOUS_SEARCHES_ARRAY_MAX_LENGTH - 1),
                  searchTerm.trim()
                ]
              : [...previousSearches, searchTerm.trim()]
          )
        );
        history.push(`/search/${searchTerm}`);
      } else {
        history.push(`/productlist`);
      }
    }
  };

  const searchButtonHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      localStorage.setItem(
        'previousSearches',
        JSON.stringify(
          previousSearches?.length >= PREVIOUS_SEARCHES_ARRAY_MAX_LENGTH
            ? [
                ...previousSearches.slice(0, PREVIOUS_SEARCHES_ARRAY_MAX_LENGTH - 1),
                searchTerm.trim()
              ]
            : [...previousSearches, searchTerm.trim()]
        )
      );
      history.push(`/search/${searchTerm}`);
    } else {
      history.push(`/productlist`);
    }
  };

  const inputClickHandler = () => {
    setShowDropdown(true);
    // if (!searchTerm) {
    //   setShowDropdown(false);
    // }
  };

  let nodeRef = useOutsideClick(() => setShowDropdown(false));
  console.log(showDropdown, 'showDropdown');

  useEffect(() => {
    setPreviousSearches(
      localStorage.getItem('previousSearches')
        ? JSON.parse(localStorage.getItem('previousSearches'))
        : []
    );
  }, []);

  return (
    <main className="search_container" ref={nodeRef}>
      <div className={`search_bar ${(searchTerm || showDropdown) && 'active'}`}>
        <div className="search_inputs">
          <input
            className="search_term_input"
            type="text"
            value={searchTerm}
            onChange={keywordInputHandler}
            onKeyUp={(e) => keyPressHandler(e)}
            onClick={inputClickHandler}
            // placeholder={productCategory ? `Search in ${productCategory}` : 'Search ...'}
          />
        </div>
        {showDropdown && <ul>{previousSearchesToRender}</ul>}
        <div className="search_button_group">
          {searchTerm && (
            <button
              type="button"
              className="reset_search_term_button"
              onClick={resetInputButtonHandler}
            >
              <Tooltip text="Clear">
                <i className="fa fa-times" aria-hidden="true"></i>
              </Tooltip>
            </button>
          )}

          <button type="submit" className="search_button" onClick={(e) => searchButtonHandler(e)}>
            <Tooltip text="Search">
              <i className="fa fa-search"></i>
            </Tooltip>
          </button>
        </div>
      </div>
    </main>
  );
};

export default SearchBar;
