import './styles/CategoriesMegaMenu.css';

import React, { useState } from 'react';
import { categories } from '../constants/for-developing/categoriesMega';

const CategoriesMegaMenu = () => {
  const [midCategory, setMidCategory] = useState([]);
  console.log(midCategory[0]);
  const mainCategoriesListToRender = categories.map((mainCategory) => (
    <li
      key={Object.keys(mainCategory)}
      onMouseEnter={() => setMidCategory(mainCategory[Object.keys(mainCategory)])}
      onMouseOut={() => setMidCategory([])}
    >
      {Object.keys(mainCategory)}
    </li>
  ));

  const midLeftCategoryListToRender =
    midCategory[0] &&
    Object.values(midCategory[0]).map((mid) => (
      <>
        <h4>{Object.keys(midCategory[0])}</h4>
        {mid.map((sub, index) => (
          <li key={index}>{sub}</li>
        ))}
      </>
    ));

  const midMidCategoryListToRender =
    midCategory[1] &&
    Object.values(midCategory[1]).map((mid) => (
      <>
        <h4>{Object.keys(midCategory[1])}</h4>
        {mid.map((sub, index) => (
          <li key={index}>{sub}</li>
        ))}
      </>
    ));

  const midRightCategoryListToRender =
    midCategory[2] &&
    Object.values(midCategory[2]).map((mid) => (
      <>
        <h4>{Object.keys(midCategory[2])}</h4>
        {mid.map((sub, index) => (
          <li key={index}>{sub}</li>
        ))}
      </>
    ));

  return (
    <main className="categories_container">
      {/* <div className="categories"> </div> */}
      <button className="button_nav">
        <i className="fa fa-align-justify"></i>
        Categories
      </button>
      <div className="category_lists">
        <div className="category_lists_left">
          <ul>{mainCategoriesListToRender}</ul>
        </div>
        <div className={`category_lists_right ${midCategory.lenth && 'active'}`}>
          <div className="category_lists_right_first">
            <ul>{midLeftCategoryListToRender}</ul>
          </div>
          <div className="category_lists_right_second">{midMidCategoryListToRender}</div>
          <div className="category_lists_right_third">{midRightCategoryListToRender}</div>
          <div className="category_lists_right_forth">{midRightCategoryListToRender}</div>
        </div>
      </div>
      {/* <ul>
        <li>
          <i class="fa fa-television"></i>
          <p>Phones, Tablets & Laptops</p>
        </li>
        <ul>
          <li>Phones</li>
          <li>Tablets</li>
          <li>Laptops</li>
        </ul> */}

      {/* <ul>
          <i class="fa fa-television"></i>
          <p>Phones, Tablets & Laptops</p>
          <li></li>
        </ul> */}
      {/* </ul> */}
    </main>
  );
};

export default CategoriesMegaMenu;

// return (
//     <main className="categories_container">
//       <div
//         className={`categories_bar ${(categoriesTerm || showDropdown || showTrendingCategorieses) && 'active'}`}
//       >
//         <div className="categories_inputs">
//           <button className="dropdown_category" type="button" onClick={handleDropdownButton}>
//             {productCategory ? `${productCategory}` : 'All Categories'}
//           </button>
//           <input
//             className="categories_term_input"
//             type="text"
//             value={categoriesTerm}
//             onChange={handleCategoriesTermInput}
//             onClick={handleCategoriesTermClick}
//             placeholder={productCategory ? `Categories in ${productCategory}` : 'Categories ...'}
//           />
//         </div>
//         <ul>
//           {categoriesTerm && !showDropdown ? (
//             <>
//               <h2>
//                 {autocompleteSuggestionsToRender.every((item) => item === false) && 'No'} Suggested
//                 Categories {productCategory ? `in ${productCategory}` : 'in All Categories'}
//               </h2>
//               {autocompleteSuggestionsToRender}
//             </>
//           ) : !categoriesTerm && !showDropdown && showTrendingCategories ? (
//             <>
//               <h2>Trending Categories</h2>
//               {trendingCategoriesesToRender}
//             </>
//           ) : (
//             showDropdown && (
//               <>
//                 <h2>Product Categories</h2>
//                 {categoriesDropdownToRender}
//               </>
//             )
//           )}
//         </ul>
//         <div className="categories_button_group">
//           {categoriesTerm && (
//             <button
//               type="button"
//               className="reset_categories_term_button"
//               onClick={handleResetInputButton}
//             >
//               <i className="fa fa-times" aria-hidden="true"></i>
//             </button>
//           )}

//           <button type="submit" className="categories_button">
//             <i className="fa fa-categories"></i>
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default NavCategoriesBar;
