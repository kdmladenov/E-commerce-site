import React, { createContext, useContext, useState } from 'react';
import './styles/Accordion.css';

const ToggleContext = createContext();

const Accordion = ({ children, ...restProps }) => {
  return (
    <ul className="accordion" {...restProps}>
      {children}
    </ul>
  );
};

export default Accordion;


Accordion.Item = function AccordionItem({ children, ...restProps }) {
  const [toggleShow, setToggleShow] = useState(false);

  return (
    <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
      <li className={`accordion_item ${toggleShow ? 'show' : ''}`} {...restProps}>
        {children}
      </li>
    </ToggleContext.Provider>
  );
};


Accordion.Header = function AccordionHeader({ children, ...restProps }) {
  const { toggleShow, setToggleShow } = useContext(ToggleContext);

  return (
    <div className="accordion_header" {...restProps} onClick={() => setToggleShow(!toggleShow)}>
      {children}
    </div>
  );
};

Accordion.Body = function AccordionBody({ children, ...restProps }) {
  const { toggleShow } = useContext(ToggleContext);
  
  return (
    <div className={`accordion_body ${toggleShow ? 'show' : ''}`} {...restProps}>
      {children}
    </div>
  );
};

Accordion.Title = function AccordionTitle({ children, ...restProps }) {
  return (
    <div className="accordion_title" {...restProps}>
      {children}
    </div>
  );
};

Accordion.ButtonGroup = function AccordionButtonGroup({ children, ...restProps }) {
  return (
    <div className="accordion_button_group" {...restProps}>
      {children}
    </div>
  );
};