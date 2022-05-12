import React from 'react';
import ProductType from './ProductType';

export type SliderItemType = React.FC<{
  classes?: string;
  title?: string;
  products?: (ProductType | undefined)[];
  itemSubtitleLine?: keyof ProductType;
  color?: string;
  image?: string;
}>;

type SliderType = React.FC<{
  dots: boolean;
  children: JSX.Element[];
}> & { Item: SliderItemType };

export default SliderType;
