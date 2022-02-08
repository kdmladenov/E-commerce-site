import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Breadcrumbs.css';

const Breadcrumbs = ({ paths }) => {
  return (
    paths.length >= 1 && (
      <div className="breadcrumbs">
        <ul>
          <li>
            <Link to={`/`}>
              <i className="fa fa-home"/>
            </Link>
          </li>
          {paths.map((item, index) => (
            <li key={item.path}>
              <Link
                onClick={(e) => index === paths.length - 1 && e.preventDefault()}
                to={`${item.path}`}
              >
                <span>{`${item.label}`}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Breadcrumbs;
