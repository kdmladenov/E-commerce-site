import React, { useState } from 'react';
import Overview from './Overview';
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
          <Overview />
        </div>
        <div className={`form ${activeTab === 'address' ? 'active' : ''}`}>Address</div>
      </div>
    </div>
  );
};

export default About;
