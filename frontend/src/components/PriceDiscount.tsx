import React from 'react';

import './styles/PriceDiscount.css';
import { FREE_SHIPPING_THRESHOLD } from '../constants/constants';

import Price from './Price';

const PriceDiscount: React.FC<{ price: number; discount: number }> = ({ price, discount }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>Was:</td>
          <td>
            <Price
              price={price * (1 + discount / 100)}
              color="black"
              size="small"
              strikeThrough={true}
            />
          </td>
        </tr>
        <tr>
          <td>With Deal:</td>
          <td>
            <Price price={price} /> {price >= FREE_SHIPPING_THRESHOLD ? '& FREE SHIPPING' : ''}
          </td>
        </tr>
        <tr>
          <td>You Save:</td>
          <td>
            <Price price={price * (discount / 100)} size="small" /> {`(${discount}%)`}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PriceDiscount;
