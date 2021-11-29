import React from 'react';
import { useHistory } from 'react-router';
import Accordion from './Accordion';
import Button from './Button';
import './styles/Sidebar.css';

const Sidebar = ({ endpoint, setEndpoint, inputMap }) => {
  const history = useHistory()
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
    <div className="sidebar">
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
                <div>
                  <input
                    type={inputItem.type}
                    value={inputItem.value}
                    onChange={(e) => filterHandler(e)}
                  ></input>
                  <label>{inputItem.label}</label>
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
