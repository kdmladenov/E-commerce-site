import React from 'react';
import { getProductSpecificationItem } from '../constants/inputMaps';
import productSpecificationsEnum from '../constants/product-specifications.enum';
import { scrollTo } from '../constants/utility-functions';
import Button from './Button';
import './styles/ProductSpecificationsMain.css';

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
