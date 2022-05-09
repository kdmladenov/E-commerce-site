import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/ProductFeatureCardForm.css';
import {
  createProductFeature,
  deleteProductFeature,
  updateProductFeature
} from '../state/actions/productFeaturesActions';
import { FEATURE } from '../constants/constants';

import EditButtons from './EditButtons';
import ProductFeatureCardFormProps from '../models/components/ProductFeatureCardFormProps';

const ProductFeatureCardForm: React.FC<ProductFeatureCardFormProps> = ({
  productId,
  featureId,
  featureContent: contentInState = '',
  featureTitle: titleInState = '',
  createMode = false,
  setCreateMode
}) => {
  const [editMode, setEditMode] = useState(false);
  const [featureContent, setFeatureContent] = useState(!createMode ? contentInState : '');
  const [featureTitle, setFeatureTitle] = useState(!createMode ? titleInState : '');

  const dispatch = useDispatch();

  const handleEditButton = () => {
    setEditMode(true);
  };

  const handleCloseButton = () => {
    setEditMode(false);
    setCreateMode && setCreateMode(false);
    setFeatureContent(contentInState);
    setFeatureTitle(titleInState);
  };

  const handleDeleteButton = () => {
    dispatch(deleteProductFeature(featureId));
    setEditMode(false);
    createMode && setCreateMode(false);
  };

  const handleSaveButton = () => {
    if (createMode && productId) {
      dispatch(
        createProductFeature(productId, {
          featureTitle: featureTitle,
          featureContent: featureContent
        })
      );
      setCreateMode(false);
    } else if (editMode && featureId) {
      dispatch(
        updateProductFeature(featureId, {
          featureId,
          productId,
          featureTitle: featureTitle,
          featureContent: featureContent
        })
      );
      setEditMode(false);
    }
  };

  const isFormValid =
    featureContent.length >= FEATURE.MIN_FEATURE_CONTENT_LENGTH &&
    featureContent.length <= FEATURE.MAX_FEATURE_CONTENT_LENGTH &&
    featureTitle.length >= FEATURE.MIN_FEATURE_TITLE_LENGTH &&
    featureTitle.length <= FEATURE.MAX_FEATURE_TITLE_LENGTH;

  return (
    <div key={featureId} className="feature_edit_card card">
      <div className="feature_edit_title">
        {editMode || createMode ? (
          <input
            type="textarea"
            placeholder="Feature title..."
            value={featureTitle}
            onChange={(e) => setFeatureTitle(e.target.value)}
          />
        ) : (
          <span>{featureTitle}</span>
        )}

        <EditButtons
          createMode={createMode}
          editMode={editMode}
          isUserAuthorized={true}
          handleEditButton={handleEditButton}
          handleCloseButton={handleCloseButton}
          handleDeleteButton={handleDeleteButton}
          handleSaveButton={handleSaveButton}
          disabledSaveButton={!isFormValid}
        />
      </div>
      <div className="feature_edit_content">
        {editMode || createMode ? (
          <input
            type="textarea"
            value={featureContent}
            placeholder="Feature content..."
            onChange={(e) => setFeatureContent(e.target.value)}
          />
        ) : (
          <span>{featureContent}</span>
        )}
      </div>
    </div>
  );
};

export default ProductFeatureCardForm;
