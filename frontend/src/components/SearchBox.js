import React, { useState } from 'react';
import Tooltip from './Tooltip';
import './styles/SearchBox.css';
import useThrottle from '../hooks/useThrottle';

const THROTTLE_DELAY = 1000;
const RESET_BTN_THRESHOLD = 3

const SearchBox = ({ updateQuery, resource }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchEnterKeyHandler = (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      updateQuery('search', `search=${searchTerm}&`);
    }
  };

  const resetInputButtonHandler = () => {
    setSearchTerm('');
    updateQuery('search', `search=`);
  };

  const keywordInputHandler = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  // Throttle (debounce) searches
  useThrottle(() => updateQuery('search', `search=${searchTerm}&`), THROTTLE_DELAY, [searchTerm]);

  return (
    <main className="search_box_container">
      <div className={`search_box ${searchTerm && 'active'}`}>
        <input
          type="text"
          value={searchTerm}
          onChange={keywordInputHandler}
          onKeyUp={(e) => searchEnterKeyHandler(e)}
          placeholder={`Search in ${resource}`}
        />
        {searchTerm.length >= RESET_BTN_THRESHOLD && (
          <button type="button" className="reset_btn" onClick={resetInputButtonHandler}>
            <Tooltip text="Clear">
              <i className="fa fa-times" aria-hidden="true"></i>
            </Tooltip>
          </button>
        )}
      </div>
    </main>
  );
};

export default SearchBox;
