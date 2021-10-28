import React from 'react';
import productSpecificationsEnum from '../constants/product-specifications.enum';
import specificationsInOrder from '../constants/specificationsInOrder';
import { numberDecimalFix, poundToKg } from '../constants/utility-functions.js/utility-functions';
import Rating from './Rating';
import './styles/ProductSpecifications.css';

const ProductSpecifications = ({ product }) => {
  const specificationListLeft = specificationsInOrder
    ?.slice(0, specificationsInOrder.length / 2)
    ?.map((spec, index) => (
      <tr key={index}>
        <td>{productSpecificationsEnum[spec]}</td>
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
            <span>{`${product[spec]?.toFixed(1)} pounds (${poundToKg(product[spec], 1)} kg)`}</span>
          ) : spec === 'displayType' ? (
            <span>{`${product['screenSize']?.toFixed(1)}-inch ${product['displayType']} with ${
              product['screenResolution']
            } resolution ${product['touchScreen'] ? 'and touchscreen' : ''}`}</span>
          ) : spec === 'storageCapacity' ? (
            <span>{`${product['storageCapacity']} GB ${product['storageType']}`}</span>
          ) : spec === 'systemMemory' ? (
            <span>{`${product['systemMemory']} GB`}</span>
          ) : spec === 'graphicsModel' ? (
            `${product['graphicsModel']} (${product['graphicsType']})`
          ) : (
            product[spec]
          )}
        </td>
      </tr>
    ));

  const specificationListRight = specificationsInOrder
    ?.slice(specificationsInOrder.length / 2)
    ?.map((spec, index) => (
      <tr key={index}>
        <td>{productSpecificationsEnum[spec]}</td>
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
            <span>{`${product[spec]?.toFixed(1)} pounds (${poundToKg(product[spec], 1)} kg)`}</span>
          ) : spec === 'displayType' ? (
            <span>{`${product['screenSize']?.toFixed(1)}-inch ${product['displayType']} with ${
              product['screenResolution']
            } resolution ${product['touchScreen'] ? 'and touchscreen' : ''}`}</span>
          ) : spec === 'storageCapacity' ? (
            <span>{`${product['storageCapacity']} GB ${product['storageType']}`}</span>
          ) : spec === 'systemMemory' ? (
            <span>{`${product['systemMemory']} GB`}</span>
          ) : spec === 'graphicsModel' ? (
            `${product['graphicsModel']} (${product['graphicsType']})`
          ) : (
            product[spec]
          )}
        </td>
      </tr>
    ));

  return (
    <div className="specification_tables">
      <table className="specification_table_left">
        <tbody>{specificationListLeft}</tbody>
      </table>
      <table className="specification_table_right">
        <tbody>{specificationListRight}</tbody>
      </table>
    </div>
  );
};

export default ProductSpecifications;
