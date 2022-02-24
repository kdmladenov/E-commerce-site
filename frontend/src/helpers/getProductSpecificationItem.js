import convertPoundToKg from './convertPoundToKg';

import Price from '../components/Price';
import Rating from '../components/Rating';

const getProductSpecificationItem = (spec, product) => {
  const {
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

  return spec === 'price' ? (
    <div className="price">{<Price price={product[spec]} />}</div>
  ) : spec === 'backlitKeyboard' ? (
    product[spec] === 1 ? (
      <i className="fa fa-check" />
    ) : (
      <i className="fa fa-times" />
    )
  ) : spec === 'voiceAssistant' ? (
    product[spec] === 'No' ? (
      <i className="fa fa-times" />
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
    <span>{`${product[spec]?.toFixed(1)} pounds (${convertPoundToKg(product[spec], 1)} kg)`}</span>
  ) : spec === 'displayType' ? (
    <span>{`${screenSize?.toFixed(1)}-inch ${displayType} with ${screenResolution} resolution ${
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
  );
};

export default getProductSpecificationItem;
