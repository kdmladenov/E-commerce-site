import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import './styles/ProductImagesEdit.css';
import {
  deleteProductImage,
  listProductImages,
  setImageAsMain,
  uploadProductImage
} from '../state/actions/productActions';
import { BASE_URL } from '../constants/constants';
import useTypedSelector from '../hooks/useTypedSelector';

import Loader from './Loader';
import Message from './Message';
import Button from './Button';
import Tooltip from './Tooltip';

const ProductImagesEdit: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams<{ productId: string }>();
  const productId = +params.productId;

  const [image, setImage] = useState('');

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(uploadProductImage(productId, 'file_upload', e));
  };

  const addProductImageUrlHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(uploadProductImage(productId, 'add_image_url', e, image));
    setImage('');
  };

  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      dispatch(uploadProductImage(productId, 'add_image_url', e, image));
      setImage('');
    }
  };

  const deleteImageHandler = (productImageId: number) => {
    dispatch(deleteProductImage(productImageId));
  };
  const setImageAsMainHandler = (productImageId: number) => {
    dispatch(setImageAsMain(productImageId));
  };

  const { productImages, loading, error } = useTypedSelector((state) => state.productImagesList);

  const {
    success: successUpload,
    loading: loadingUpload,
    error: errorUpload
  } = useTypedSelector((state) => state.productImageUpload);

  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete
  } = useTypedSelector((state) => state.productImageDelete);

  const {
    success: successSetMain,
    loading: loadingSetMain,
    error: errorSetMain
  } = useTypedSelector((state) => state.productImageSetMain);

  useEffect(() => {
    dispatch(listProductImages(productId));
  }, [dispatch, successUpload, successDelete, successSetMain, productId]);

  return (
    <div className="product_images_edit">
      {loading || loadingUpload || loadingDelete || loadingSetMain ? (
        <Loader />
      ) : error || errorUpload || errorDelete || errorSetMain ? (
        <Message type="error">{error || errorUpload || errorDelete || errorSetMain}</Message>
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

                    <Button
                      classes="icon star"
                      onClick={() => !image?.isMain && setImageAsMainHandler(image?.productImageId)}
                    >
                      <Tooltip direction="top" text={image?.isMain ? 'Main image' : 'Set as main'}>
                        <i className={`${image?.isMain ? 'fas' : 'far'} fa-star`} />
                      </Tooltip>
                    </Button>
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
