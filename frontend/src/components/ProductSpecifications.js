import React from 'react';
import { getProductSpecificationItem } from '../constants/inputMaps';
import productSpecificationsEnum from '../constants/product-specifications.enum';
import specificationsInOrder from '../constants/specificationsInOrder';
import './styles/ProductSpecifications.css';

const ProductSpecifications = ({ product }) => {
  const specificationList = (specifications) =>
    specifications.map((spec, index) => (
      <tr key={index}>
        <td>{productSpecificationsEnum[spec]}</td>
        <td key={product.productId}>{getProductSpecificationItem(spec, product)}</td>
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
