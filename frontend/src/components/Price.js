import React from 'react';

import './styles/Price.css';

function Price({
  price,
  currencySign = '$',
  superscript = true,
  strikeThrough = false,
  color = 'red',
  size
}) {
  const decimalNumber = (price % 1).toFixed(2).slice(1);
  const wholeNumber = (price - decimalNumber).toFixed(0);
  const wholeNumberToShow =
    wholeNumber >= 1000
      ? `${Math.floor(wholeNumber / 1000)} ${wholeNumber.toString().slice(-3)}`
      : wholeNumber;
  return (
    <div
      className={`price_container ${color ? color : ''} ${size ? size : ''} ${
        !superscript ? 'baseline_script' : ''
      } ${strikeThrough ? 'strike_through' : ''}`}
    >
      <span className="currency_sign">{currencySign}</span>
      <span className="whole_number">{wholeNumberToShow}</span>
      <span className="decimal_number">{decimalNumber}</span>
    </div>
  );
}

export default Price;
