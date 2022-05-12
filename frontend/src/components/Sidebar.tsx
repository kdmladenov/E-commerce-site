import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import './styles/Sidebar.css';

import Accordion from './Accordion';
import Button from './Button';
import SidebarProps from '../models/components/SidebarProps';
import getSidebarInput from '../helpers/getSidebarInput';
import SidebarInputMap from '../models/SidebarInputMap';

const Sidebar: React.FC<SidebarProps> = ({
  endpoint,
  setEndpoint,
  resourceName,
  defaultEndpoint
}) => {
  const location = useLocation();
  const history = useHistory();

  const localStorageKey =
    resourceName === 'wish list'
      ? 'allMyWishList'
      : resourceName === 'browsing history'
      ? 'allMyHistory'
      : 'allProductsList';

  const inputMap: SidebarInputMap = getSidebarInput(
    JSON.parse(localStorage.getItem(localStorageKey)!)
  );

  const filterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndpoint({
      ...endpoint,
      filter: e.target.checked
        ? [...(endpoint[`filter`] || []), e.target.value]
        : [...(endpoint[`filter`] || []).filter((query) => query !== e.target.value)]
    });
  };

  const clearAllFiltersHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEndpoint(defaultEndpoint);
    (document.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>).forEach(
      (el) => (el.checked = false)
    );

    if (location.pathname.startsWith('/search')) {
      history.push('/productlist');
    }
  };

  return (
    <div className="product_sidebar">
      <Button onClick={clearAllFiltersHandler} classes="text">
        Clear filters
      </Button>
      {Object.keys(inputMap).map((inputGroup) => (
        <Accordion key={inputGroup}>
          <Accordion.Item isOpen={inputMap[inputGroup][0]?.accordionOpen || false}>
            <Accordion.Header>
              <Accordion.Title>{inputGroup}</Accordion.Title>
              <Accordion.ButtonGroup></Accordion.ButtonGroup>
            </Accordion.Header>
            <Accordion.Body>
              {inputMap[inputGroup].map((inputItem) => (
                <div className="product_sidebar_checkbox_item" key={inputItem.label}>
                  <input
                    id={inputItem.label}
                    type={inputItem.type}
                    value={inputItem.value}
                    onChange={(e) => filterHandler(e)}
                  />
                  <label htmlFor={inputItem.label}>{inputItem.label}</label>
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </div>
  );
};

export default Sidebar;
