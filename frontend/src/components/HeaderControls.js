import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import Button from './Button';
import DropdownSelect from './DropdownSelect';
import SearchBox from './SearchBox';
import './styles/HeaderControls.css';

const HeaderControls = ({
  updateQuery,
  query,
  resource,
  pageSizeOptionsMap,
  sortOptionsMap,
  ratingFilterOptionsMap,
  isGrayBackground,
  breadcrumbsPaths,
  horizontalCards,
  setHorizontalCards
}) => {
  return (
    <nav className={`header_controls ${isGrayBackground ? 'gray' : ''}`}>
      {breadcrumbsPaths?.length && (
        <div className="breadcrumbs_container">
          <Breadcrumbs paths={breadcrumbsPaths} />
        </div>
      )}
      <SearchBox updateQuery={updateQuery} resource={resource} />
      <div className="dropdown_group_container">
        {pageSizeOptionsMap && (
          <DropdownSelect
            name="pageSize"
            updateQuery={updateQuery}
            query={query}
            labelStart="Page size"
            optionsMap={pageSizeOptionsMap}
          />
        )}
        {ratingFilterOptionsMap && (
          <DropdownSelect
            name="rating"
            updateQuery={updateQuery}
            query={query}
            labelStart="Rating: "
            optionsMap={ratingFilterOptionsMap}
          />
        )}
        {sortOptionsMap && (
          <DropdownSelect
            name="sort"
            updateQuery={updateQuery}
            query={query}
            labelStart="Sort by"
            optionsMap={sortOptionsMap}
          />
        )}
        {setHorizontalCards && (
          <Button classes="icon" onClick={() => setHorizontalCards(!horizontalCards)}>
            {horizontalCards ? (
              <i className="fa fa-th-large"></i>
            ) : (
              <i className="fa fa-align-justify"></i>
            )}
          </Button>
        )}
      </div>
    </nav>
  );
};

export default HeaderControls;
