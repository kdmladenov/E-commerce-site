import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import './styles/Breadcrumbs.css';

const Breadcrumbs = () => {
  const history = useHistory();

  const paths = ['/', ...history.location.pathname.slice(1).split('/')];

  return (
    paths.length >= 2 && (
      <div className="breadcrumbs">
        <ul>
          {paths.map((path, index) => (
            <li key={path}>
              <Link
                onClick={(e) => index === paths.length - 1 && e.preventDefault()}
                to={`/${paths.slice(1, index + 1).join('/')}`}
              >
                {path === '/' ? (
                  // 'Home'
                  <i className="fa fa-home"></i>
                ) : (
                  `${path?.slice(0, 1)?.toUpperCase()}${path?.slice(1)}`
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Breadcrumbs;
