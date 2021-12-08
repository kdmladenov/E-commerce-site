import React, { useState } from 'react';
import './styles/SearchBar.css';
import Tooltip from './Tooltip';

const SearchBox = ({updateQuery}) => {
  const [searchTerm, setSearchTerm] = useState('');
console.log(searchTerm, 'searchTerm');
  const resetInputButtonHandler = () => {
    setSearchTerm('');
  };

  const keywordInputHandler = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      if (searchTerm.trim()) {
        updateQuery('search', `search=${searchTerm}&`);
      } 
    }
  };

  return (
    <main className="search_container">
      <div className={`search_bar ${searchTerm && 'active'}`}>
        <div className="search_inputs">
          <input
            className="search_term_input"
            type="text"
            value={searchTerm}
            onChange={keywordInputHandler}
            onKeyUp={(e) => searchHandler(e)}
            placeholder={'Search ...'}
          />
        </div>
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
          <button type="submit" className="search_button" onClick={(e) => searchHandler(e)}>
            <Tooltip text="Search">
              <i className="fa fa-search"></i>
            </Tooltip>
          </button>
        </div>
      </div>
    </main>
  );
};

export default SearchBox;
