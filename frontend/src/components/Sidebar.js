import React from 'react';
import Accordion from './Accordion';
import './styles/Sidebar.css';

const Sidebar = ({ endpoint, setEndpoint, inputMap }) => {
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

  // const clearAllFiltersHandler = () => {
  //   history.push(`/productlist`);
  // }

  return (
    <div className="product_sidebar">
      {/* <Button classes='text' onClick={clearAllFiltersHandler}>clear all</Button> */}
      {Object.keys(inputMap).map((inputGroup) => (
        <Accordion>
          <Accordion.Item open={inputMap[inputGroup][0].accordionOpen || false}>
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
