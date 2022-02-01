import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from './Button';
import Price from './Price';
import Rating from './Rating';
import './styles/ProductTile.css';

const ProductTile = ({
  products,
  header,
  itemSubtitleLine1,
  itemSubtitleLine2,
  footer,
  footerLink
}) => {
  const history = useHistory();

  return (
    <div className="product_tile card">
      <h2 className="header">{header}</h2>
      <ul className={`content ${products?.length === 4 ? 'four_items' : ''}`}>
        {products?.map((product, index) => (
          <li key={index} className="card">
            <Link
              to={
                itemSubtitleLine1 === 'brand'
                  ? `/store/${product?.brand}`
                  : `/products/${product?.productId}`
              }
            >
              <img src={product?.image} alt={product?.title} />
              {product?.title && (
                <div className="product_subtitle">
                  {itemSubtitleLine1 && (
                    <div className="subtitle_1">
                      {product[itemSubtitleLine1] || itemSubtitleLine1}
                    </div>
                  )}
                  {itemSubtitleLine2 && (
                    <div className="subtitle_2">
                      {itemSubtitleLine2 === 'price' ? (
                        <Price
                          price={product?.price}
                          size={`${products?.length === 4 ? 'small' : ''}`}
                        />
                      ) : itemSubtitleLine2 === 'rating' ? (
                        <Rating rating={product?.rating} />
                      ) : (
                        product[itemSubtitleLine2] || itemSubtitleLine2
                      )}
                    </div>
                  )}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
      {footer && (
        <div className="footer">
          <Button classes="text" onClick={() => history.push(footerLink)}>
            {footer}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductTile;
