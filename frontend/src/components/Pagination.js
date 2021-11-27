import React, { useEffect, useState } from 'react';
import Button from './Button';
import './styles/Pagination.css';

const Pagination = ({ updatePagingQuery, page, pageSize, totalItems }) => {
  const [rangePageNumber, setRangePageNumber] = useState([1]);

  useEffect(() => {
    totalItems > 0
      ? setRangePageNumber([...Array(Math.ceil(totalItems / pageSize))].map((_, i) => i + 1))
      : setRangePageNumber([1]);
  }, [totalItems, pageSize]);

  const addStyle = (page, numberLabel) => {
    let style = [];

    if (page === numberLabel && !style.includes('active')) {
      style.push('active');
    }

    if (
      page <= 3 &&
      numberLabel > 5 &&
      !style.includes('hidden')
    ) {
      style.push('hidden');
    }

    if (
      page > 3 && ((page < numberLabel - 2) || (numberLabel < page - 2)) &&
      !style.includes('hidden')
    ) {
      style.push('hidden');
    }
    return style.join([' ']);
  };

  const PageButtonsList = rangePageNumber.map((numberLabel) => {
    return (
      <li key={numberLabel} className={`page-btn ${addStyle(page, numberLabel)}`}>
        <Button
          classes="icon"
          onClick={() => {
            updatePagingQuery('page', `page=${numberLabel}&`);
          }}
        >
          {numberLabel}
        </Button>
      </li>
    );
  });

  const FirstPageBtn = () => {
    return (
      <Button
        onClick={() => {
          updatePagingQuery('page', `page=1&`);
        }}
      >
        <span>&laquo;</span>
        <span>First</span>
      </Button>
    );
  };

  const LastPageBtn = () => {
    return (
      <Button
        onClick={() => {
          updatePagingQuery('page', `page=${rangePageNumber.length}&`);
        }}
      >
        <span>Last</span>
        <span>&raquo;</span>
      </Button>
    );
  };

  return (
    <nav className="pagination">
      <div className="page_link">
        <FirstPageBtn />
      </div>
      <ul>
        <li className={`dots ${page > 3 ? 'visible' : ''} `}>...</li>
        {PageButtonsList}
        <li className={`dots ${page < rangePageNumber.length - 3 ? 'visible' : ''} `}>...</li>
      </ul>
      <div className="page_link">
        <LastPageBtn />
      </div>
    </nav>
  );
};

export default Pagination;
