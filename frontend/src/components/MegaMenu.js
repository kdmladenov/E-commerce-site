import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { categories } from '../constants/for-developing/categoriesMega';
import { categoryIcons } from '../constants/for-developing/mainCategoryIcons';
import { alphabeticalSort } from '../constants/utility-functions';
import useOutsideClick from '../hooks/useOutsideClick';
import './styles/MegaMenu.css';

const MegaMenu = () => {
  const history = useHistory();const 
  
  menuLevels = ['main', 'mid', 'sub'];

  const [showDropdown, setShowDropdown] = useState(false);
  const [activeMenu, setActiveMenu] = useState(menuLevels[0]);
  const [parentCategories, setParentCategories] = useState([]);

  const handleCloseMenu = () => {
    setShowDropdown(false);
    setActiveMenu(menuLevels[0]);
    setParentCategories([]);
  };

  let nodeRef = useOutsideClick(() => {
    handleCloseMenu();
  });

  const getCurrentCategories = () =>
    alphabeticalSort(
      activeMenu === 'main'
        ? Object.keys(categories)
        : activeMenu === 'mid'
        ? Object.keys(categories[parentCategories[0]])
        : Object.keys(categories[parentCategories[0]][parentCategories[1]])
    );

  const getSubCategories = (selectedCategory) =>
    activeMenu === 'main'
      ? alphabeticalSort(Object.keys(categories[selectedCategory]))
      : activeMenu === 'mid'
      ? alphabeticalSort(Object.keys(categories[parentCategories[0]][selectedCategory]))
      : categories[parentCategories[0]][parentCategories[1]][selectedCategory];



  const handleNextLinkClick = (category) => {
    if (getSubCategories(category).length > 0) {
      setParentCategories([...parentCategories, category]);
      setActiveMenu(menuLevels[menuLevels.indexOf(activeMenu) + 1]);
    }
    if (activeMenu === 'sub') {
      history.push(getSubCategories(category));
      handleCloseMenu();
    }
  };

  const handlePreviousLinkClick = () => {
    setParentCategories(parentCategories.slice(0, -1));
    setActiveMenu(menuLevels[menuLevels.indexOf(activeMenu) - 1]);
  };

  const menuToRender = (level) => (
    <div className={`menu ${level} ${activeMenu !== level && 'hidden'}`}>
      {level === 'main' ? (
        <h2>Categories</h2>
      ) : (
        <div className="menu_header">
          <i className="fas fa-arrow-left" onClick={handlePreviousLinkClick}></i>
          <span>{`${parentCategories[parentCategories.length - 1]}`}</span>
        </div>
      )}
      <ul>
        {getCurrentCategories().map((category) => (
          <li
            key={category}
            onClick={() => handleNextLinkClick(category)}
            className={`${getSubCategories(category).length === 0 ? 'disabled' : ''}`}
          >
            <i
              className={`${
                level === 'main' ? categoryIcons[category] : 'fa fa-align-justify'
              } left`}
            ></i>
            <span>{`${category} ${
              level !== 'sub' ? `(${getSubCategories(category).length})` : ''
            }`}</span>
            {level !== 'sub' && <i className="fas fa-angle-right chevron"></i>}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <main ref={nodeRef}>
      <button className="button_nav" onClick={() => setShowDropdown(!showDropdown)}>
        <i className={`fa ${!showDropdown ? 'fa-align-justify' : 'fa-times'}`} />
      </button>
      {showDropdown && (
        <section className="menu_container">
          {menuLevels.map((level) => menuToRender(level))}
        </section>
      )}
    </main>
  );
};

export default MegaMenu;
