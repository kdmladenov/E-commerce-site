import React, { useState } from 'react';
import { categories } from '../constants/for-developing/categoriesMega';
import { categoryIcons } from '../constants/for-developing/mainCategoryIcons';
import { images } from '../constants/for-developing/sliderImages';
import Slider from './Slider/Slider';
import './styles/CategoriesMegaMenu.css';

const CategoriesMegaMenu = () => {
  const [midCategories, setMidCategories] = useState([]);
  const mainCategoriesListToRender = categories.map((mainCategory) => (
    <li
      key={Object.keys(mainCategory)}
      onMouseEnter={() => setMidCategories(mainCategory[Object.keys(mainCategory)])}
    >
      <div>
        <i className={categoryIcons[Object.keys(mainCategory)]}></i>
        <span>{Object.keys(mainCategory)}</span>
      </div>
    </li>
  ));

  const midMidCategoryListToRender = midCategories.map(
    (midCategory) =>
      midCategory &&
      Object.values(midCategory).map((midCategoryGroup) => (
        <div>
          <h4>{Object.keys(midCategory)}</h4>
          {midCategoryGroup.map((subCategory) => (
            <li key={subCategory}>{subCategory}</li>
          ))}
        </div>
      ))
  );

  return (
    <main className="categories_container">
      <button className="button_nav">
        <i className="fa fa-align-justify"></i>
        Categories
      </button>
      <div className="category_lists" onMouseLeave={() => setMidCategories([])}>
        <div className="category_lists_left">
          <ul>{mainCategoriesListToRender}</ul>
        </div>
        <div className={`category_lists_right ${midCategories.lenth && 'active'}`}>
          {midCategories.length ? midMidCategoryListToRender : <Slider images={images} />}
        </div>
      </div>
    </main>
  );
};

export default CategoriesMegaMenu;
