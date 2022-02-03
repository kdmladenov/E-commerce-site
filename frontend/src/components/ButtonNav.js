import React from 'react';
import { useHistory } from 'react-router-dom';
import { buttonNavMap } from '../constants/inputMaps';
import './styles/ButtonNav.css';

const ButtonNav = ({ activeTab, screen, productId, section }) => {
  const history = useHistory();

  const buttonNav = buttonNavMap(productId, section);
  return (
    <nav className={`button_nav_container card ${screen}`}>
      {buttonNav[screen].map((tab, index) => (
        <button
          className={`tab ${activeTab === tab.tabName ? 'active' : ''}`}
          onClick={() => history.push(tab.path)}
          key={index}
          disabled={tab.disabled}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default ButtonNav;
