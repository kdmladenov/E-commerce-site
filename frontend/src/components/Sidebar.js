import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Accordion from './Accordion';
import Button from './Button';
import './styles/Sidebar.css';

const Sidebar = ({ endpoint, setEndpoint, inputMap, defaultEndpoint }) => {
  const location = useLocation();
  const history = useHistory();
  console.log(location.pathname);

  const filterHandler = (e) => {
    if (e.target.checked) {
      setEndpoint({
        ...endpoint,
        filter: [...endpoint[`filter`], e.target.value]
      });
    } else if (!e.target.checked) {
      setEndpoint({
        ...endpoint,
        filter: [...endpoint[`filter`].filter((query) => query !== e.target.value)]
      });
    }
  };

  const clearAllFiltersHandler = (e) => {
    setEndpoint(defaultEndpoint);
    document.querySelectorAll('input[type="checkbox"]').forEach((el) => (el.checked = false));

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
        <Accordion>
          <Accordion.Item open={inputMap[inputGroup][0]?.accordionOpen || false}>
            <Accordion.Header>
              <Accordion.Title>{inputGroup}</Accordion.Title>
              <Accordion.ButtonGroup></Accordion.ButtonGroup>
            </Accordion.Header>
            <Accordion.Body>
              {inputMap[inputGroup].map((inputItem) => (
                <div className="product_sidebar_checkbox_item">
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
