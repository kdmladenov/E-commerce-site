import React from 'react';

import './styles/ProductSpecificationsMain.css';
import productSpecificationsEnum from '../constants/product-specifications.enum';
import getProductSpecificationItem from '../helpers/getProductSpecificationItem';
import scrollTo from '../helpers/scrollTo';

import Button from './Button';

const ProductSpecificationsMain = ({ product, specsRef }) => {
  const specificationList = [
    'modelNumber',
    'releaseYear',
    'displayType',
    'processorModelNumber',
    'storageCapacity',
    'systemMemory'
  ].map(
    (spec, index) =>
      product && (
        <tr key={index}>
          <td>{productSpecificationsEnum[spec]}</td>
          <td key={product.productId}>{getProductSpecificationItem(spec, product)}</td>
        </tr>
      )
  );
  return (
    <div>
      <table>
        <tbody>{specificationList}</tbody>
      </table>
      <Button classes="text" onClick={() => specsRef && scrollTo(specsRef)}>
        See full specifications
      </Button>
    </div>
  );
};

export default ProductSpecificationsMain;
