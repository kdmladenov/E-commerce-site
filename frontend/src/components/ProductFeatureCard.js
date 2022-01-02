import React, { useState } from 'react';
import './styles/ProductFeatureCard.css';
import { useDispatch } from 'react-redux';
import EditButtons from './EditButtons';
import Accordion from './Accordion';
import {
  createProductFeature,
  deleteProductFeature,
  updateProductFeature
} from '../actions/productFeaturesActions';

const ProductFeatureCard = ({
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

  console.log(productId, featureId, featureContent, featureTitle, createMode, setCreateMode, role);
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

  const isFormValid = true;

  // rating > PRODUCT.MIN_RATING_VALUE &&
  // rating <= PRODUCT.MIN_RATING_VALUE &&
  // content.length >= REVIEW.MIN_CONTENT_LENGTH &&
  // content.length <= REVIEW.MAX_CONTENT_LENGTH &&
  // title.length >= REVIEW.MIN_TITLE_LENGTH &&
  // title.length <= REVIEW.MAX_TITLE_LENGTH;

  return (
    <Accordion.Item key={featureId} className="product_feature_card">
      <Accordion.Header>
        <Accordion.Title>
          {editMode || createMode ? (
            <input
              type="text"
              placeholder="Your feature title..."
              value={featureTitle}
              onChange={(e) => setFeatureTitle(e.target.value)}
            />
          ) : (
            featureTitle
          )}
        </Accordion.Title>
        <Accordion.ButtonGroup>
          <EditButtons
            createMode={createMode}
            editMode={editMode}
            isUserAuthorized={role === 'admin'}
            handleEditButton={handleEditButton}
            handleCloseButton={handleCloseButton}
            handleDeleteButton={handleDeleteButton}
            handleSaveButton={handleSaveButton}
            disabledSaveButton={!isFormValid}
          />
        </Accordion.ButtonGroup>
      </Accordion.Header>
      <Accordion.Body>
        {editMode || createMode ? (
          <input
            type="textarea"
            value={featureContent}
            placeholder="Your review content..."
            onChange={(e) => setFeatureContent(e.target.value)}
          />
        ) : (
          featureContent
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default ProductFeatureCard;
