import React from 'react';
import { Link } from 'react-router-dom';
import productSpecificationsEnum from '../constants/product-specifications.enum';
import specificationsInOrder from '../constants/specificationsInOrder';
import { numberDecimalFix, poundToKg } from '../constants/utility-functions';
import Rating from './Rating';
import './styles/ComparisonTable.css';

const ComparisonTable = ({ products, currentProductId, sortBy }) => {
  const sortedProducts = [
    ...products.filter((product) => product.productId === currentProductId),
    ...products
      .filter((product) => product.productId !== currentProductId)
      .sort((a, b) => a[sortBy || 'price'] - b[sortBy || 'price'])
  ];

  const specificationList = specificationsInOrder?.map((spec, index) => (
    <tr key={index}>
      <td>{productSpecificationsEnum[spec]}</td>
      {sortedProducts?.map((product) => (
        <td key={product.productId}>
          {spec === 'price' ? (
            <div className="price">${numberDecimalFix(product[spec])}</div>
          ) : spec === 'backlitKeyboard' ? (
            product[spec] === 1 ? (
              <i className="fa fa-check"></i>
            ) : (
              <i className="fa fa-times"></i>
            )
          ) : spec === 'voiceAssistant' ? (
            product[spec] === 'No' ? (
              <i className="fa fa-times"></i>
            ) : (
              <span>{`${product['voiceAssistant']}`}</span>
            )
          ) : spec === 'rating' ? (
            product['reviewCount'] ? (
              <div className="rating">
                <Rating rating={product[spec]} />({product['reviewCount']})
              </div>
            ) : (
              'Not rated yet'
            )
          ) : spec === 'weight' ? (
            <span>{`${product[spec].toFixed(1)} pounds (${poundToKg(product[spec], 1)} kg)`}</span>
          ) : spec === 'displayType' ? (
            <span>{`${product['screenSize'].toFixed(1)}-inch ${product['displayType']} with ${
              product['screenResolution']
            } resolution ${product['touchScreen'] ? 'and touchscreen' : ''}`}</span>
          ) : spec === 'storageCapacity' ? (
            <span>{`${product['storageCapacity']} GB ${product['storageType']}`}</span>
          ) : spec === 'systemMemory' ? (
            <span>{`${product['systemMemory']} GB`}</span>
          ) : spec === 'graphicsModel' ? (
            <p>
              {`${product['graphicsModel']}`}
              <p>{`(${product['graphicsType']})`}</p>
            </p>
          ) : (
            product[spec]
          )}
        </td>
      ))}
    </tr>
  ));

  const headerImage = sortedProducts.map((product) => (
    <th key={product.productId}>
      <img src={product.image} alt={product.modelNumber} className="product_image" />
    </th>
  ));
  const headerInfo = sortedProducts.map((product) => (
    <th key={product.productId}>
      <Link to={`/products/${product.productId}`}>
        <th key={product.productId}>{product.title}</th>
      </Link>
    </th>
  ));

  return (
    <table className="comparison_table">
      <thead>
        <tr>
          <th></th>
          {headerImage}
        </tr>
        <tr>
          <th></th>
          {headerInfo}
        </tr>
      </thead>
      <tbody>{specificationList}</tbody>
    </table>
  );
};

export default ComparisonTable;
