import React from 'react';
import './styles/Price.css'

function Price({ price, currencySign = '$', superscript=true, color, size}) {
  const decimalNumber = (price % 1).toFixed(2).slice(1);
  const wholeNumber = (price - decimalNumber).toFixed(0)
  return (
    <div
      className={`price_container ${color === 'red' ? 'red' : ''} ${size === 'small' ? 'small' : ''}`}
    >
      <span className={`currency_sign ${!superscript ? 'baseline_script' : ''}`}>
        {currencySign}
      </span>
      <span className="whole_number">{wholeNumber}</span>
      <span className={`decimal_number ${!superscript ? 'baseline_script' : ''}`}>
        {decimalNumber}
      </span>
    </div>
  );
}

export default Price;
