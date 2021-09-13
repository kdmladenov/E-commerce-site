import React, { useState } from 'react';
import './styles/NavSearchBar.css';
import { suggestions } from './suggestions';
import productCategoriesEnum from '../constants/product-categories.enum';

const NavSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [productCategory, setProductCategory] = useState('');
  const autocompleteSuggestionsToRender = suggestions
    .map(
      (suggestion) =>
        suggestion.toLowerCase().startsWith(searchTerm) && <li key={suggestion}>{suggestion}</li>
    )
    .slice(0, 5);

  const categoriesDropdownToRender = Object.values(productCategoriesEnum).map((category) => (
    <li key={category} onClick={() => handleCategorySelection(category)}>
      {category}
    </li>
  ));

  const handleDropdownButton = () => {
    setShowDropdown(!showDropdown);
  };

   const handleCategorySelection = (category) => {
     setProductCategory(category);
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
  return (
    <main className="search_container">
      <div className="search_bar">
        <div className="search_inputs">
          <button className="dropdown_category" type="button" onClick={handleDropdownButton}>
            {productCategory ? `${productCategory}` : 'All Categories'}
          </button>
          <input
            className="search_term_input"
            type="text"
            value={searchTerm}
            onChange={handleSearchTermInput}
            placeholder={productCategory ? `Search in ${productCategory}` : 'Search ...'}
          />
        </div>
        <ul>
          {searchTerm && autocompleteSuggestionsToRender}
          {showDropdown && !searchTerm && categoriesDropdownToRender}
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

export default NavSearchBar;
