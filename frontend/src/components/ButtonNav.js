import React from 'react';
import { useHistory } from 'react-router-dom';
import { buttonNavMap } from '../constants/inputMaps';
import './styles/ButtonNav.css';

const ButtonNav = ({ activeTab, screen }) => {
  const history = useHistory();
  return (
    <nav className={`button_nav_container card ${screen}`}>
      {buttonNavMap[screen].map((tab, index) => (
        <button
          className={`tab ${activeTab === tab.tabName ? 'active' : ''}`}
          onClick={() => history.push(tab.path)}
          key={index}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default ButtonNav;
