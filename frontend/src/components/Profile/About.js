import React, { useState } from 'react';
import FormComponent from './FormComponent';
import {
  addressInitialInputState,
  overviewInitialInputState
} from '../../constants/inputInitialData';
import './styles/About.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="about">
      <div className="sidebar">
        <h2>About</h2>
        <button
          className={`tab_button ${activeTab === 'overview' && 'active'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab_button ${activeTab === 'address' && 'active'}`}
          onClick={() => setActiveTab('address')}
        >
          Address
        </button>
      </div>
      <div className="about_form">
        <div className={`form ${activeTab === 'overview' ? 'active' : ''}`}>
          <FormComponent inputData={overviewInitialInputState} />
        </div>
        <div className={`form ${activeTab === 'address' ? 'active' : ''}`}>
          <FormComponent inputData={addressInitialInputState} />
        </div>
      </div>
    </div>
  );
};

export default About;
