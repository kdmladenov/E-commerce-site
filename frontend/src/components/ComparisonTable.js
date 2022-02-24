import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import './styles/ComparisonTable.css';
import { listProducts } from '../state/actions/productActions';
import getProductSpecificationItem from '../helpers/getProductSpecificationItem';
import productSpecificationsEnum from '../constants/product-specifications.enum';
import specificationsInOrder from '../constants/specificationsInOrder';

import Loader from './Loader';
import Message from './Message';

const ComparisonTable = ({ currentProductId, sortBy, brand }) => {
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector((state) => state.productList);

  const sortedProducts = products && [
    ...products.filter((product) => product.productId === currentProductId),
    ...products
      .filter((product) => product.productId !== currentProductId)
      .sort((a, b) => a[sortBy || 'price'] - b[sortBy || 'price'])
  ];

  const specificationList = specificationsInOrder?.map((spec, index) => (
    <tr key={index}>
      <td>{productSpecificationsEnum[spec]}</td>
      {sortedProducts?.map((product) => (
        <td key={product.productId}>{getProductSpecificationItem(spec, product)}</td>
      ))}
    </tr>
  ));

  const headerImage = sortedProducts?.map((product) => (
    <th key={product.productId}>
      <img src={product.image} alt={product.modelNumber} className="product_image" />
    </th>
  ));
  const headerInfo = sortedProducts?.map((product) => (
    <th key={product.productId}>
      <Link to={`/products/${product.productId}`}>
        <th key={product.productId}>{product.title}</th>
      </Link>
    </th>
  ));

  useEffect(() => {
    dispatch(listProducts(`?searchBy=brand&search=${brand}`));
  }, [dispatch, brand]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type="error">{error}</Message>
  ) : (
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
