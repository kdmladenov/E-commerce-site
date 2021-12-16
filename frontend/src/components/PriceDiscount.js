import React from 'react'
import { FREE_SHIPPING_THRESHOLD } from '../constants/constants';
import Price from './Price';
import './styles/PriceDiscount.css';

const PriceDiscount = ({ price , discount}) => {
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

export default PriceDiscount
