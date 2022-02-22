import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  deleteProductImage,
  listProductImages,
  setImageAsMain,
  uploadProductImage
} from '../state/actions/productActions';
import { BASE_URL } from '../constants/constants';
import Loader from './Loader';
import Message from './Message';
import Button from './Button';
import './styles/ProductImagesEdit.css';
import Tooltip from './Tooltip';

const ProductImagesEdit = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.productId;

  const [image, setImage] = useState('');

  const uploadImage = (e) => {
    dispatch(uploadProductImage(productId, 'file_upload', e));
  };

  const addProductImageUrlHandler = (e) => {
    dispatch(uploadProductImage(productId, 'add_image_url', e, image));
    setImage('');
  };

  const keyPressHandler = (e) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      dispatch(uploadProductImage(productId, 'add_image_url', e, image));
      setImage('');
    }
  };

  const deleteImageHandler = (productImageId) => {
    dispatch(deleteProductImage(productImageId));
  };
  const setImageAsMainHandler = (productImageId) => {
    dispatch(setImageAsMain(productImageId));
  };

  const { productImages, loading, error } = useSelector((state) => state.productImagesList);

  const {
    success: successUpload,
    loading: loadingUpload,
    error: errorUpload
  } = useSelector((state) => state.productImageUpload);

  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete
  } = useSelector((state) => state.productImageDelete);

  const {
    success: successSetMain,
    loading: loadingSetMain,
    error: errorSetMain
  } = useSelector((state) => state.productImageSetMain);

  useEffect(() => {
    dispatch(listProductImages(productId));
  }, [dispatch, successUpload, successDelete, successSetMain, productId]);

  return (
    <div className="product_images_edit">
      {loadingUpload && <Loader />}
      {errorUpload && <Message type="error">{errorUpload}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message type="error">{errorDelete}</Message>}
      {loadingSetMain && <Loader />}
      {errorSetMain && <Message type="error">{errorSetMain}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <div className="product_images_edit_list_form">
          <div className="input_group card">
            <div className="image_url">
              <Button onClick={addProductImageUrlHandler} disabled={!image}>
                Add Image URL
              </Button>
              <input
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                onKeyUp={(e) => keyPressHandler(e)}
              />
            </div>
            or
            <div className="file_upload">
              <Button>
                <label htmlFor="upload">Choose file</label>
                <input id="upload" type="file" onChange={uploadImage} />
              </Button>
            </div>
          </div>
          <div className="images_list card">
            <h2>Product Images</h2>
            {productImages?.length > 0 && (
              <ul>
                {productImages.map((image, index) => (
                  <li key={index}>
                    <img
                      src={
                        image?.image.startsWith('http')
                          ? image?.image
                          : `${BASE_URL}/${image?.image}`
                      }
                      alt=""
                    />
                    <Button
                      classes="icon times"
                      onClick={() => deleteImageHandler(image?.productImageId)}
                    >
                      <Tooltip direction="top" text="Delete">
                        <i className="fa fa-times" />
                      </Tooltip>
                    </Button>
                    {image?.isMain ? (
                      <Button classes="icon star">
                        <Tooltip direction="top" text="Main image">
                          <i className="fas fa-star" />
                        </Tooltip>
                      </Button>
                    ) : (
                      <Button
                        classes="icon star"
                        onClick={() => setImageAsMainHandler(image?.productImageId)}
                      >
                        <Tooltip direction="top" text="Set as main">
                          <i className="far fa-star" />
                        </Tooltip>
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImagesEdit;
