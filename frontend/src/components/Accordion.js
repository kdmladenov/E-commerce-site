import React, { createContext, useContext, useState } from 'react';
import './styles/Accordion.css';
import Tooltip from './Tooltip';

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
  const [toggleShow, setToggleShow] = useState(restProps.open || false);

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
    <div
      className={`accordion_header ${toggleShow ? 'show' : ''}`}
      {...restProps}
      onClick={() => setToggleShow(!toggleShow)}
    >
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
  const { toggleShow } = useContext(ToggleContext);
  return (
    <div className="accordion_button_group" {...restProps}>
      {children ? (
        children
      ) : !toggleShow ? (
        <Tooltip direction="top" text="Open">
          <i class="fa fa-chevron-down"></i>
        </Tooltip>
      ) : (
        <Tooltip direction="top" text="Close">
          <i class="fa fa-chevron-up"></i>
        </Tooltip>
      )}
    </div>
  );
};


// import React, { createContext, useContext, useEffect, useState } from 'react';
// import './styles/Accordion.css';
// import Tooltip from './Tooltip';

// const ToggleContext = createContext();
// const ToggleContextKey = createContext();

// const Accordion = ({ children, ...restProps }) => {
//   const [toggleShowKey, setToggleShowKey] = useState('');

//   return (
//     <ToggleContextKey.Provider value={{ toggleShowKey, setToggleShowKey }}>
//       <ul className="accordion" {...restProps}>
//         {children}
//       </ul>
//     </ToggleContextKey.Provider>
//   );
// };

// export default Accordion;

// Accordion.Item = function AccordionItem({ children, ...restProps }) {
//   const [toggleShow, setToggleShow] = useState(restProps.open || false);
//   // const { toggleShowKey, setToggleShowKey } = useContext(ToggleContextKey);
//   // useEffect(() => {}, [setToggleShowKey]);
//   // console.log(toggleShow, 'item');
//   return (
//     <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
//       <li className={`accordion_item ${toggleShow ? 'show' : ''}`} {...restProps}>
//         {children}
//       </li>
//     </ToggleContext.Provider>
//   );
// };

// Accordion.Header = function AccordionHeader({ children, ...restProps }) {
//   const { toggleShow, setToggleShow } = useContext(ToggleContext);
//   const { toggleShowKey, setToggleShowKey } = useContext(ToggleContextKey);
//   // useEffect(() => {
//   //   if (toggleShow) setToggleShow(false);
//   // }, [toggleShowKey]);
//   // console.log(toggleShowKey, 'toggleShowKey');
//   // console.log(
//   //   restProps.index === toggleShowKey,
//   //   restProps.index,
//   //   toggleShowKey,
//   //   'restProps.index === toggleShowKey'
//   // );
//   const toggleShowHandler = () => {
//     setToggleShow(false);

//     if (restProps.singleopened) {
//       console.log('inside');

//       if (restProps.index === toggleShowKey) {
//         console.log('true');
//         setToggleShowKey('');
//         setToggleShow(false);
//       } else {
//         console.log('else');
//         setToggleShowKey(restProps.index);
//         setToggleShow(true);
//       }
//     } else {
//       // console.log('side');
//       setToggleShow(!toggleShow);
//     }
//   };

//   return (
//     <div
//       className={`accordion_header ${toggleShow ? 'show' : ''}`}
//       {...restProps}
//       onClick={toggleShowHandler}
//     >
//       {children}
//     </div>
//   );
// };

// Accordion.Body = function AccordionBody({ children, ...restProps }) {
//   const { toggleShow } = useContext(ToggleContext);

//   return (
//     <div className={`accordion_body ${toggleShow ? 'show' : ''}`} {...restProps}>
//       {children}
//     </div>
//   );
// };

// Accordion.Title = function AccordionTitle({ children, ...restProps }) {
//   return (
//     <div className="accordion_title" {...restProps}>
//       {children}
//     </div>
//   );
// };

// Accordion.ButtonGroup = function AccordionButtonGroup({ children, ...restProps }) {
//   const { toggleShow } = useContext(ToggleContext);
//   return (
//     <div className="accordion_button_group" {...restProps}>
//       {children ? (
//         children
//       ) : !toggleShow ? (
//         <Tooltip direction="top" text="Open">
//           <i class="fa fa-chevron-down"></i>
//         </Tooltip>
//       ) : (
//         <Tooltip direction="top" text="Close">
//           <i class="fa fa-chevron-up"></i>
//         </Tooltip>
//       )}
//     </div>
//   );
// };