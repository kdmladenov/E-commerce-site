import React, { useState } from 'react';
import { categories } from '../constants/for-developing/categoriesMega';
import { categoryIcons } from '../constants/for-developing/mainCategoryIcons';
import { alphabeticalSort } from '../constants/utility-functions';
import './styles/MegaMenu.css';

const menuLevels = ['top', 'mid', 'sub'];

const MegaMenu = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeMenu, setActiveMenu] = useState(menuLevels[0]);
  const [parentCategories, setParentCategories] = useState([]);

  const handleNextLinkClick = (category) => {
    setParentCategories([...parentCategories, category]);
    setActiveMenu(menuLevels[menuLevels.indexOf(activeMenu) + 1]);
  };

  const handlePreviousLinkClick = () => {
    setParentCategories(parentCategories.slice(0, parentCategories.length - 1));
    setActiveMenu(menuLevels[menuLevels.indexOf(activeMenu) - 1]);
  };

  const mainCategoriesListToRender = alphabeticalSort(Object.keys(categories)).map(
    (mainCategory) => (
      <li key={mainCategory} onClick={() => handleNextLinkClick(mainCategory)}>
        <i className={`${categoryIcons[mainCategory]} main`}></i>
        <span>{`${mainCategory} (${Object.keys(categories[mainCategory]).length})`}</span>
        <i className="fas fa-angle-right chevron"></i>
      </li>
    )
  );

  const midCategoryListToRender =
    parentCategories.length &&
    alphabeticalSort(Object.keys(categories[parentCategories[0]])).map((midCategory) => (
      <li key={midCategory} onClick={() => handleNextLinkClick(midCategory)}>
        <i className={`${categoryIcons['categories']} main`}></i>
        <span>{`${midCategory} (${
          Object.keys(categories[parentCategories[0]][midCategory]).length
        })`}</span>
        <i className="fas fa-angle-right chevron"></i>
      </li>
    ));

  const subCategoryListToRender =
    parentCategories.length > 1 &&
    alphabeticalSort(Object.keys(categories[parentCategories[0]][parentCategories[1]])).map(
      (subCategory) => (
        <li key={subCategory} onClick={() => handleNextLinkClick(subCategory)}>
          <i className="fa fa-align-justify"></i>
          <span>{subCategory}</span>
        </li>
      )
    );

  return (
    <main>
      <button className="button_nav" onClick={() => setShowDropdown(!showDropdown)}>
        {!showDropdown ? <i className="fa fa-align-justify"></i> : <i className="fa fa-times"></i>}
      </button>
      {showDropdown && (
        <section className="menu_container">
          <div className={`menu_main ${activeMenu !== 'top' && 'hidden'}`}>
            <h2>Categories</h2>
            <ul>{mainCategoriesListToRender}</ul>
          </div>
          <div className={`menu_secondary ${activeMenu !== 'mid' && 'hidden'}`}>
            <div className="menu_header">
              <i className="fas fa-arrow-left" onClick={handlePreviousLinkClick}></i>
              <span>{`${parentCategories[parentCategories.length - 1]}`}</span>
            </div>
            <ul>{midCategoryListToRender}</ul>
          </div>
          <div className={`menu_sub ${activeMenu !== 'sub' && 'hidden'}`}>
            <div className="menu_header">
              <i className="fas fa-arrow-left" onClick={handlePreviousLinkClick}></i>
              <span>{`${parentCategories[parentCategories.length - 1]}`}</span>
            </div>
            <ul>{subCategoryListToRender}</ul>
          </div>
        </section>
      )}
    </main>
  );
};

export default MegaMenu;
