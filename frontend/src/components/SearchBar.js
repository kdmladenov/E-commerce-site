import React, { useState } from 'react';
import './styles/SearchBar.css';
import { suggestions } from '../constants/for-developing/suggestions';
import { trending } from '../constants/for-developing/trending';
import {
  alphabeticalSort,
  isKeywordInString,
  keywordInString
} from '../constants/utility-functions.js/utility-functions';
import { categories } from '../constants/for-developing/categoriesMega';
import { categoryIcons } from '../constants/for-developing/mainCategoryIcons';
import { useHistory } from 'react-router';

const AUTOCOMPLETE_SUGGESTIONS_COUNT = 5;
const TRENDING_SEARCHES_COUNT = 5;

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTrendingSearches, setShowTrendingSearches] = useState(false);
  const [productCategory, setProductCategory] = useState('');
  
  const autocompleteSuggestionsToRender = suggestions
  .map(
    (suggestion) =>
    isKeywordInString(keyword, suggestion) && (
      <li key={suggestion}>
            <div>
              <i className="fa fa-search"></i>
              {`${keywordInString(keyword, suggestion)[0]}`}
              <strong>{`${keywordInString(keyword, suggestion)[1]}`}</strong>
              {`${keywordInString(keyword, suggestion)[2]}`}
            </div>
          </li>
        )
        )
        .slice(0, AUTOCOMPLETE_SUGGESTIONS_COUNT);
        
        const trendingSearchesToRender = trending
        .map((suggestion) => (
          <li key={suggestion} onClick={() => setKeyword(suggestion)}>
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
  
  const history = useHistory();
  const endpoint = history.location.search.slice(1).split('&');
  const page = endpoint.find((i) => i.startsWith('page='))
  ? `${endpoint.find((i) => i.startsWith('page='))}&`
  : '';
  const pageSize = endpoint.find((i) => i.startsWith('pageSize='))
  ? `${endpoint.find((i) => i.startsWith('pageSize='))}&`
  : '';
  const sort = endpoint.find((i) => i.startsWith('sort='))
  ? `${endpoint.find((i) => i.startsWith('sort='))}&`
    : '';
  const order = endpoint.find((i) => i.startsWith('order='))
    ? `${endpoint.find((i) => i.startsWith('order='))}&`
    : '';

  const handleSearchButton = () => {
    if (keyword.trim()) {
      history.push(
        `/productlist?${sort}${order}${page}${pageSize}${keyword && `search=${keyword}&`}${productCategory && `searchBy=${productCategory}&`}`
      );
    }
  };

  const handleDropdownButton = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCategorySelection = (category) => {
    setProductCategory(category === 'All' ? '' : category);
    setShowDropdown(false);
  };

  const handleResetInputButton = () => {
    setKeyword('');
    setShowDropdown(false);
    setProductCategory('');
  };

  const handleKeywordInput = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
    setShowDropdown(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      history.push(
        `/productlist?${sort}${order}${page}${pageSize}${keyword && `search=${keyword}&`}${
          productCategory && `searchBy=${productCategory}&`
        }`
      );
    }
  };

  const handleKeywordClick = () => {
    if (!keyword) {
      setShowTrendingSearches(!showTrendingSearches);
      setShowDropdown(false);
    }
  };

  return (
    <main className="search_container">
      <div
        className={`search_bar ${(keyword || showDropdown || showTrendingSearches) && 'active'}`}
      >
        <div className="search_inputs">
          <button type="button" onClick={handleDropdownButton}>
            {productCategory ? `${productCategory}` : 'All'}
          </button>
          <input
            className="search_term_input"
            type="text"
            value={keyword}
            onChange={handleKeywordInput}
            onKeyUp={(e) => handleKeyPress(e)}
            onClick={handleKeywordClick}
            // placeholder={productCategory ? `Search in ${productCategory}` : 'Search ...'}
          />
        </div>
        <ul>
          {keyword && !showDropdown ? (
            <>
              <h2>
                {autocompleteSuggestionsToRender.every((item) => item === false) && 'No'} Suggested
                Searches {productCategory ? `in ${productCategory}` : 'in All Categories'}
              </h2>
              {autocompleteSuggestionsToRender}
            </>
          ) : !keyword && !showDropdown && showTrendingSearches ? (
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
          {keyword && (
            <button
              type="button"
              className="reset_search_term_button"
              onClick={handleResetInputButton}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          )}

          <button type="submit" className="search_button" onClick={handleSearchButton}>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    </main>
  );
};

export default SearchBar;
