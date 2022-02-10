import React, { useState } from 'react';
import './styles/ProductFeatureEditCard.css';
import { useDispatch } from 'react-redux';
import EditButtons from './EditButtons';
import {
  createProductFeature,
  deleteProductFeature,
  updateProductFeature
} from '../actions/productFeaturesActions';
import { FEATURE } from '../constants/constants';

const ProductFeatureEditCard = ({
  productId,
  featureId,
  featureContent: contentInState,
  featureTitle: titleInState,
  createMode = false,
  setCreateMode,
  role
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
    if (createMode) {
      dispatch(
        createProductFeature(productId, {
          featureTitle: featureTitle,
          featureContent: featureContent
        })
      );
      setCreateMode(false);
    } else if (editMode) {
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

export default ProductFeatureEditCard;
