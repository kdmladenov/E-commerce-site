import React from 'react';
import productSpecificationsEnum from '../constants/product-specifications.enum';
import specificationsInOrder from '../constants/specificationsInOrder';
import { poundToKg } from '../constants/utility-functions';
import Price from './Price';
import Rating from './Rating';
import './styles/ProductSpecifications.css';

const ProductSpecifications = ({ product }) => {
  const {
    productId,
    screenSize,
    displayType,
    touchScreen,
    screenResolution,
    storageCapacity,
    storageType,
    systemMemory,
    graphicsModel,
    graphicsType,
    voiceAssistant,
    reviewCount
  } = product;

  const specificationList = (specifications) =>
    specifications.map((spec, index) => (
      <tr key={index}>
        <td>{productSpecificationsEnum[spec]}</td>
        <td key={productId}>
          {spec === 'price' ? (
            <div className="price">{<Price price={product[spec]} />}</div>
          ) : spec === 'backlitKeyboard' ? (
            product[spec] === 1 ? (
              <i className="fa fa-check"/>
            ) : (
              <i className="fa fa-times"/>
            )
          ) : spec === 'voiceAssistant' ? (
            product[spec] === 'No' ? (
              <i className="fa fa-times"/>
            ) : (
              <span>{`${voiceAssistant}`}</span>
            )
          ) : spec === 'rating' ? (
            reviewCount ? (
              <div className="rating">
                <Rating rating={product[spec]} />({reviewCount})
              </div>
            ) : (
              'Not rated yet'
            )
          ) : spec === 'weight' ? (
            <span>{`${product[spec]?.toFixed(1)} pounds (${poundToKg(product[spec], 1)} kg)`}</span>
          ) : spec === 'displayType' ? (
            <span>{`${screenSize?.toFixed(
              1
            )}-inch ${displayType} with ${screenResolution} resolution ${
              touchScreen ? 'and touchscreen' : ''
            }`}</span>
          ) : spec === 'storageCapacity' ? (
            <span>{`${storageCapacity} GB ${storageType}`}</span>
          ) : spec === 'systemMemory' ? (
            <span>{`${systemMemory} GB`}</span>
          ) : spec === 'graphicsModel' ? (
            `${graphicsModel} (${graphicsType})`
          ) : (
            product[spec]
          )}
        </td>
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
