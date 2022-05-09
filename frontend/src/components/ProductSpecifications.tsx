import React from 'react';

import './styles/ProductSpecifications.css';
import productSpecificationsEnum from '../constants/product-specifications.enum';
import specificationsInOrder from '../constants/specificationsInOrder';
import getProductSpecificationItem from '../helpers/getProductSpecificationItem';
import ProductType from '../models/ProductType';

const ProductSpecifications: React.FC<{ product: ProductType }> = ({ product }) => {
  const specificationList = (specifications: (keyof ProductType)[]) =>
    specifications.map((spec, index) => (
      <tr key={index}>
        <td>{productSpecificationsEnum[spec]}</td>
        <td key={product?.productId}>{getProductSpecificationItem(spec, product)}</td>
      </tr>
    ));

  return (
    <div className="specification_tables">
      <table className="specification_table_left">
        <tbody>{specificationList(specificationsInOrder.slice(0, 9))}</tbody>
      </table>
      <table className="specification_table_right">
        <tbody>{specificationList(specificationsInOrder.slice(9))}</tbody>
      </table>
    </div>
  );
};

export default ProductSpecifications;
