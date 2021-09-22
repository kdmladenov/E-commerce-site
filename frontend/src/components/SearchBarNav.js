import React, { useState } from 'react';
import './styles/SearchBarNav.css';
import { suggestions } from '../constants/for-developing/suggestions';
import { trending } from '../constants/for-developing/trending';
import {
  alphabeticalSort,
  isSearchTermInString,
  searchTermInString
} from '../constants/utility-functions.js/utility-functions';
import { categories } from '../constants/for-developing/categoriesMega';
import { categoryIcons } from '../constants/for-developing/mainCategoryIcons';

const AUTOCOMPLETE_SUGGESTIONS_COUNT = 5;
const TRENDING_SEARCHES_COUNT = 5;

const SearchBarNav = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTrendingSearches, setShowTrendingSearches] = useState(false);
  const [productCategory, setProductCategory] = useState('');

  const autocompleteSuggestionsToRender = suggestions
    .map(
      (suggestion) =>
        isSearchTermInString(searchTerm, suggestion) && (
          <li key={suggestion}>
            <div>
              <i className="fa fa-search"></i>
              {`${searchTermInString(searchTerm, suggestion)[0]}`}
              <strong>{`${searchTermInString(searchTerm, suggestion)[1]}`}</strong>
              {`${searchTermInString(searchTerm, suggestion)[2]}`}
            </div>
          </li>
        )
    )
    .slice(0, AUTOCOMPLETE_SUGGESTIONS_COUNT);

  const trendingSearchesToRender = trending
    .map((suggestion) => (
      <li key={suggestion}>
        <div>
          <i className="fa fa-search"></i> {suggestion}
        </div>
      </li>
    ))
    .slice(0, TRENDING_SEARCHES_COUNT);

  const categoriesDropdownToRender = alphabeticalSort(
    productCategory.length > 0
      ? [...Object.keys(categories).filter((category) => productCategory !== category), 'All']
      : Object.keys(categories)
  ).map((category) => (
    <li key={category} onClick={() => handleCategorySelection(category)}>
      <div>
        <i className={`${categoryIcons[category]} main`}></i>
        {category}
      </div>
    </li>
  ));

  const handleDropdownButton = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCategorySelection = (category) => {
    setProductCategory(category === 'All' ? '' : category);
    setShowDropdown(false);
  };

  const handleResetInputButton = () => {
    setSearchTerm('');
    setShowDropdown(false);
    setProductCategory('');
  };

  const handleSearchTermInput = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    setShowDropdown(false);
  };

  const handleSearchTermClick = () => {
    if (!searchTerm) {
      setShowTrendingSearches(!showTrendingSearches);
      setShowDropdown(false);
    }
  };

  return (
    <main className="search_container">
      <div
        className={`search_bar ${(searchTerm || showDropdown || showTrendingSearches) && 'active'}`}
      >
        <div className="search_inputs">
          <button type="button" onClick={handleDropdownButton}>
            {productCategory ? `${productCategory}` : 'All'}
          </button>
          <input
            className="search_term_input"
            type="text"
            value={searchTerm}
            onChange={handleSearchTermInput}
            onClick={handleSearchTermClick}
            // placeholder={productCategory ? `Search in ${productCategory}` : 'Search ...'}
          />
        </div>
        <ul>
          {searchTerm && !showDropdown ? (
            <>
              <h2>
                {autocompleteSuggestionsToRender.every((item) => item === false) && 'No'} Suggested
                Searches {productCategory ? `in ${productCategory}` : 'in All Categories'}
              </h2>
              {autocompleteSuggestionsToRender}
            </>
          ) : !searchTerm && !showDropdown && showTrendingSearches ? (
            <>
              <h2>Trending Searches</h2>
              {trendingSearchesToRender}
            </>
          ) : (
            showDropdown && (
              <>
                <h2>Product Categories</h2>
                {categoriesDropdownToRender}
              </>
            )
          )}
        </ul>
        <div className="search_button_group">
          {searchTerm && (
            <button
              type="button"
              className="reset_search_term_button"
              onClick={handleResetInputButton}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          )}

          <button type="submit" className="search_button">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    </main>
  );
};

export default SearchBarNav;
