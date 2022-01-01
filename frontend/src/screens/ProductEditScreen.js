import React, { useEffect, useState } from 'react';
import ProductDetailsEdit from '../components/ProductDetailsEdit';
import ProductFeaturesEdit from '../components/ProductFeaturesEdit';
import ProductImagesEdit from '../components/ProductImagesEdit';
import ProductSpecificationsEdit from '../components/ProductSpecificationsEdit';
import './styles/ProductEditScreen.css';

const ProductEditScreen = ({ match }) => {
  const productId = match.params.productId;

  const [activeTab, setActiveTab] = useState('details');

  return (
    <main className="product_edit_screen">
      <div className="product_edit_container">
        <div className="header card">
          <button
            className={`tab ${activeTab === 'details' && 'active'}`}
            onClick={() => setActiveTab('details')}
          >
            {productId ? `Edit Product` : `Create Product`}
          </button>
          <button
            className={`tab ${activeTab === 'images' && 'active'}`}
            onClick={() => setActiveTab('images')}
            disabled={!productId}
          >
            Add Product Images
          </button>
          <button
            className={`tab ${activeTab === 'specifications' && 'active'}`}
            onClick={() => setActiveTab('specifications')}
            disabled={!productId}
          >
            {productId ? `Edit Product Specifications` : `Add Product Specifications`}
          </button>
          <button
            className={`tab ${activeTab === 'features' && 'active'}`}
            onClick={() => setActiveTab('features')}
            disabled={!productId}
          >
            Add/Edit Product Features
          </button>
        </div>
        <section
          className={`product_details_edit_container content ${
            activeTab === 'details' && 'active'
          }`}
        >
          <ProductDetailsEdit productId={productId} />
        </section>
        {productId && (
          <section
            className={`product_images_edit_container content ${
              activeTab === 'images' && 'active'
            }`}
          >
            <ProductImagesEdit />
          </section>
        )}
        {productId && (
          <section
            className={`product_specifications_edit_container content ${
              activeTab === 'specifications' && 'active'
            }`}
          >
            <ProductSpecificationsEdit />
          </section>
        )}
        {productId && (
          <section
            className={`product_features_edit_container content ${
              activeTab === 'features' && 'active'
            }`}
          >
            <ProductFeaturesEdit productId={productId} />
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductEditScreen;