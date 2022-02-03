import React, { useEffect, useState } from 'react';
import ButtonNav from '../components/ButtonNav';
import ProductDetailsEdit from '../components/ProductDetailsEdit';
import ProductFeaturesEdit from '../components/ProductFeaturesEdit';
import ProductImagesEdit from '../components/ProductImagesEdit';
import ProductSpecificationsEdit from '../components/ProductSpecificationsEdit';
import './styles/ProductEditScreen.css';

const ProductEditScreen = ({ match }) => {
  console.log(match.params);
  const { productId, section } = match.params;
  console.log(productId, section, 'productId, section');

  const [activeTab, setActiveTab] = useState(section);
  console.log(section);

  useEffect(() => setActiveTab(section || 'details'), [section]);

  return (
    <main className="product_edit_screen">
      <div className="product_edit_container">
        <ButtonNav activeTab={activeTab} screen="product_edit" productId={productId} />
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
