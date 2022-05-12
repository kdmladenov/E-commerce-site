import React from 'react';
import { useHistory } from 'react-router-dom';

import './styles/ButtonNav.css';
import getButtonNavMap from '../helpers/getButtonNavMap';
import ButtonNavProps from '../models/components/ButtonNavProps';
import TabType from '../models/TabType';

const ButtonNav: React.FC<ButtonNavProps> = ({ activeTab, screen, productId }) => {
  const history = useHistory();

  const buttonNav: {
    [key: string]: TabType[];
  } = getButtonNavMap(productId);

  return (
    <nav className={`button_nav_container card ${screen}`}>
      {buttonNav[screen].map((tab: TabType, index: number) => (
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
