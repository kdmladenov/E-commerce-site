import React, { useState } from 'react';
import productCategoriesEnum from '../constants/product-categories.enum';
// import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import DropDown from './Dropdown';
import './styles/Header.css';

const Header = () => {
  const [searchColumn, setSearchColumn] = useState("All categories");

  return (
    <div className="header">
      <img
        src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
        alt="Amazon logo"
        className="header_logo"
      />
      <div className="header_search">
        <DropDown
          id="search-dropdown"
          className="header_searchDropdown"
          classNameMenu="header_searchDropdownMenu"
          selected={searchColumn}
          onSelectedChange={setSearchColumn}
          options={Object.values(productCategoriesEnum)}
          dropDownToggleId="dropdown-basic-search-options"
        />
        <input
          type="text"
          className="header_searchInput"
          placeholder={`Search in ${searchColumn}`}
        />
        <span className="header_searchButton">
          <i class="fa fa-search"></i>
        </span>
      </div>
      <div className="header_nav">
        <div className="header_option">
          <div className="header_optionTop">
            <i class="fa fa-user"></i>
          </div>
          <div className="header_optionBottom">Log In</div>
        </div>
        <div className="header_option">
          <div className="header_optionTop">
            <i class="fa fa-shopping-cart"></i>
          </div>
          <div className="header_optionBottom">0</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
