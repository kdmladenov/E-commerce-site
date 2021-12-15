import React from 'react';
import productSpecificationsEnum from '../constants/product-specifications.enum';
import { scrollTo } from '../constants/utility-functions';
import Button from './Button';

const ProductSpecificationsMain = ({ product, specsRef }) => {
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
    graphicsType
  } = product;

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
          <td key={productId}>
            {spec === 'displayType' ? (
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
      )
  );
  return (
    <p>
      <table>
        <tbody>{specificationList}</tbody>
      </table>
      <Button classes="text" onClick={() => scrollTo(specsRef)}>
        See full specifications
      </Button>
    </p>
  );
};

export default ProductSpecificationsMain;