import React, { useState } from 'react';
import './styles/SearchBar.css';
import { suggestions } from '../constants/for-developing/suggestions';
import { trending } from '../constants/for-developing/trending';
import {
  alphabeticalSort,
  isKeywordInString,
  keywordInString
} from '../constants/utility-functions';
import { categories } from '../constants/for-developing/categoriesMega';
import { categoryIcons } from '../constants/for-developing/mainCategoryIcons';
import { useHistory } from 'react-router';
import Tooltip from './Tooltip';

const AUTOCOMPLETE_SUGGESTIONS_COUNT = 5;
const TRENDING_SEARCHES_COUNT = 5;
const PREVIOUS_SEARCHES_ARRAY_MAX_LENGTH = 10;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTrendingSearches, setShowTrendingSearches] = useState(false);
  // const [productCategory, setProductCategory] = useState('');

  const previousSearchesFromLocalStorage = localStorage.getItem('previousSearches')
    ? JSON.parse(localStorage.getItem('previousSearches'))
    : [];
  const [previousSearches, setPreviousSearches] = useState(previousSearchesFromLocalStorage);

  const previousSearchesToRender = previousSearches
    ?.map((previousSearch, index) => (
      <li key={`${previousSearch}_${index}`}>
        <div>
          <i className="fa fa-search"></i>
          {previousSearch}
        </div>
      </li>
    ))
    .slice(0, AUTOCOMPLETE_SUGGESTIONS_COUNT);

  const trendingSearchesToRender = trending
    .map((suggestion, index) => (
      <li key={`${suggestion}_${index}`} onClick={() => setSearchTerm(suggestion)}>
        <div>
          <i className="fa fa-search"></i>
          {suggestion}
        </div>
      </li>
    ))
    .slice(0, TRENDING_SEARCHES_COUNT);

  // const categoriesDropdownToRender = alphabeticalSort(
  //   productCategory.length > 0
  //     ? [...Object.keys(categories).filter((category) => productCategory !== category), 'All']
  //     : Object.keys(categories)
  // ).map((category) => (
  //   <li key={category} onClick={() => categorySelectionHandler(category)}>
  //     <div>
  //       <i className={`${categoryIcons[category]} main`}></i>
  //       {category}
  //     </div>
  //   </li>
  // ));

  const history = useHistory();
  // const endpoint = history.location.search.slice(1).split('&');
  // const page = endpoint.find((i) => i.startsWith('page='))
  //   ? `${endpoint.find((i) => i.startsWith('page='))}&`
  //   : '';
  // const pageSize = endpoint.find((i) => i.startsWith('pageSize='))
  //   ? `${endpoint.find((i) => i.startsWith('pageSize='))}&`
  //   : '';
  // const sort = endpoint.find((i) => i.startsWith('sort='))
  //   ? `${endpoint.find((i) => i.startsWith('sort='))}&`
  //   : '';
  // const order = endpoint.find((i) => i.startsWith('order='))
  //   ? `${endpoint.find((i) => i.startsWith('order='))}&`
  //   : '';

  const dropdownButtonHandler = () => {
    setShowDropdown(!showDropdown);
  };

  // const categorySelectionHandler = (category) => {
  //   setProductCategory(category === 'All' ? '' : category);
  //   setShowDropdown(false);
  // };

  const resetInputButtonHandler = () => {
    setSearchTerm('');
    setShowDropdown(false);
    // setProductCategory('');
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
        history.push(`/search/${searchTerm}`);
      } else {
        history.push(`/productlist`);
      }
    }
    // setPreviousSearches(
    //   previousSearches?.length >= PREVIOUS_SEARCHES_ARRAY_MAX_LENGTH
    //     ? previousSearches?.shift()?.push(searchTerm.trim())
    //     : previousSearches?.push(searchTerm.trim())
    // );
    // localStorage.setItem('previousSearches', JSON.stringify(previousSearches));
  };

  const searchButtonHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      history.push(`/search/${searchTerm}`);
    } else {
      history.push(`/productlist`);
    }
    // setPreviousSearches(
    //   previousSearches?.length >= PREVIOUS_SEARCHES_ARRAY_MAX_LENGTH
    //     ? previousSearches?.shift()?.push(searchTerm.trim())
    //     : previousSearches?.push(searchTerm.trim())
    // );
    // localStorage.setItem('previousSearches', JSON.stringify(previousSearches));
  };

  const inputClickHandler = () => {
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
          {/* <button type="button" onClick={dropdownButtonHandler}>
            {productCategory ? `${productCategory}` : 'All'}
          </button> */}
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
        <ul>
          {
            searchTerm && !showDropdown ? (
              <>
                <h2>
                  {previousSearchesToRender.every((item) => item === false) && 'No'}
                  {/* Suggested
                Searches {productCategory ? `in ${productCategory}` : 'in All Categories'} */}
                </h2>
                {previousSearchesToRender}
              </>
            ) : (
              !searchTerm &&
              !showDropdown &&
              showTrendingSearches && (
                <>
                  <h2>Trending Searches</h2>
                  {trendingSearchesToRender}
                </>
              )
            )
            // : (
            //   showDropdown && (
            //     <>
            //       <h2>Product Categories</h2>
            //       {categoriesDropdownToRender}
            //     </>
            //   )
            // )
          }
        </ul>
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
