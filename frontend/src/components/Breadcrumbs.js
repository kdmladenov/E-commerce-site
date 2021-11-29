import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import './styles/Breadcrumbs.css';

const Breadcrumbs = () => {
  const history = useHistory();

  const paths = ['/', ...history.location.pathname.slice(1).split('/')];
  console.log(paths);
  return (
    paths.length && (
      <div className="breadcrumbs">
        <ul>
          {paths.map((path, index) => (
            <li key={path}>
              <Link
                onClick={(e) => index === paths.length - 1 && e.preventDefault()}
                to={`/${paths.slice(1, index + 1).join('/')}`}
              >
                {path === '/' ? 'Home' : `${path[0].toUpperCase()}${path.slice(1)}`}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Breadcrumbs;
