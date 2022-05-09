import React from 'react';

import './styles/ProductSpecificationsMain.css';
import productSpecificationsEnum from '../constants/product-specifications.enum';
import getProductSpecificationItem from '../helpers/getProductSpecificationItem';
import scrollTo from '../helpers/scrollTo';

import Button from './Button';
import ProductSpecificationsMainProps from '../models/components/ProductSpecificationsMainProps';
import mainSpecificationsList from '../constants/mainSpecificationsList';

const ProductSpecificationsMain: React.FC<ProductSpecificationsMainProps> = ({
  product,
  specsRef
}) => {
  const specificationList = mainSpecificationsList.map(
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
