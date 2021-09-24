import React from 'react';
import './styles/Footer.css';

const Footer = () => {
  return (
    <footer>
      <span>All rights reserved</span>
      <div className="button_group">
        <button>
          <i className="fab fa-github"></i>
        </button>
        <button>
          <i className="fab fa-gitlab"></i>
        </button>
        <button>
          <i className="fab fa-linkedin"></i>
        </button>
        <button>
          <i className="fab fa-facebook"></i>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
