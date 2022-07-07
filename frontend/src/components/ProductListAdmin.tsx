import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import './styles/ProductListAdmin.css';
import { deleteProduct, listProducts, restoreProduct } from '../state/actions/productActions';
import { PRODUCT_CREATE_RESET } from '../state/constants/productConstants';
import defaultEndpoint from '../inputs/defaultEndpoint';
import { adminListPageSizeOptionsMap } from '../inputs/pageSizeOptionsMap';
import { adminProductListSortOptionsMap } from '../inputs/sortDropdownOptionsMaps';
import useTypedSelector from '../hooks/useTypedSelector';

import HeaderControls from './HeaderControls';
import Price from './Price';
import ProductDetails from './ProductDetails';
import Tooltip from './Tooltip';
import Modal from './Modal';
import Loader from './Loader';
import Message from './Message';
import Button from './Button';
import Accordion from './Accordion';
import Pagination from './Pagination';
import ConfirmMessage from './ConfirmMessage';

const ProductListAdmin: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [endpoint, setEndpoint] = useState(defaultEndpoint['productListAdmin']);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalContent, setModalContent] = useState(<></>);

  const { products, loading, error } = useTypedSelector((state) => state.productList);

  const { userInfo } = useTypedSelector((state) => state.userLogin);

  const {
    product: createdProduct,
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate
  } = useTypedSelector((state) => state.productCreate);

  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete
  } = useTypedSelector((state) => state.productDelete);

  const {
    success: successRestore,
    loading: loadingRestore,
    error: errorRestore
  } = useTypedSelector((state) => state.productRestore);

  const deleteProductHandler = (productId: number, isDeleted: boolean) => {
    setIsModalOpen(true);
    setModalContent(
      <ConfirmMessage
        setIsModalOpen={setIsModalOpen}
        message={`Are your sure you want to ${!isDeleted ? 'delete' : 'restore'} this product?`}
        resourceId={productId}
        action={!isDeleted ? deleteProduct : restoreProduct}
      />
    );
  };

  const createProductHandler = () => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    history.push(`/admin/products/create`);
  };

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (userInfo?.role !== 'admin') {
      history.push('/login');
    }
    if (successCreate) {
      history.push(`/admin/products/${createdProduct.productId}/edit/details`);
    } else {
      const { page, pageSize, sort, search, role } = endpoint;
      dispatch(listProducts(`${page}${pageSize}${sort}${search}${role}`));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successRestore,
    successCreate,
    createdProduct,
    endpoint
  ]);

  return (
    <div className="product_list_admin">
      <HeaderControls
        updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
        query={endpoint}
        resource="products"
        pageSizeOptionsMap={adminListPageSizeOptionsMap}
        sortOptionsMap={adminProductListSortOptionsMap}
      />
      {loading || loadingDelete || loadingRestore || loadingCreate ? (
        <Loader />
      ) : error || errorDelete || errorRestore || errorCreate ? (
        <Message type="error">{error || errorDelete || errorRestore || errorCreate}</Message>
      ) : products?.length > 0 ? (
        <>
          <div className="product_title_header">
            {['ID', 'Image', 'Title', 'Price', 'Active'].map((column) => (
              <div key={column}>
                <span>{column}</span>
              </div>
            ))}

            <div className="buttons">
              <Button classes="rounded" onClick={createProductHandler}>
                <i className="fas fa-plus" /> <span>Create</span>
              </Button>
            </div>
          </div>
          <Accordion>
            {products?.map((product) => (
              <Accordion.Item key={product.productId}>
                <Accordion.Header>
                  <Accordion.Title>
                    <div className="product_title">
                      <strong>{product.productId}</strong>
                      <div className="image ">
                        <img src={product.image} alt={product.title} />
                      </div>
                      <div className="title">{product.title}</div>
                      <Price price={product.price} size="small" color="black" />
                      <div className="active">
                        <i
                          className={`fa fa-${!product.isDeleted ? 'check' : 'times'}`}
                          style={{ color: `${!product.isDeleted ? 'green' : 'red'}` }}
                        />
                      </div>
                    </div>
                  </Accordion.Title>
                  <Accordion.ButtonGroup>
                    <div className="button_group">
                      <Link
                        to={`/products/${product.productId}`}
                        onClick={(e) => !!product.isDeleted && e.preventDefault()}
                      >
                        <Tooltip direction="top" text="Details">
                          <Button classes="white rounded" disabled={!!product.isDeleted}>
                            <i className="fa fa-share" />
                            <span>Details</span>
                          </Button>
                        </Tooltip>
                      </Link>
                      <Link to={`/admin/products/${product.productId}/edit/details`}>
                        <Tooltip direction="top" text="Edit">
                          <Button classes="white rounded">
                            <i className="fa fa-edit" />
                            <span>Edit</span>
                          </Button>
                        </Tooltip>
                      </Link>
                      <Tooltip direction="top" text={!product.isDeleted ? 'Delete' : 'Restore'}>
                        <Button
                          classes="white rounded"
                          onClick={() =>
                            deleteProductHandler(product.productId, !!product.isDeleted)
                          }
                        >
                          <i className={`fa fa-${!product.isDeleted ? 'trash' : 'undo'}`} />
                          <span>{!product.isDeleted ? 'Delete' : 'Restore'}</span>
                        </Button>
                      </Tooltip>
                    </div>
                  </Accordion.ButtonGroup>
                </Accordion.Header>
                <Accordion.Body>
                  <section className="product_details">
                    <ProductDetails product={product} productListAdmin={true} />
                  </section>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </>
      ) : (
        <h2>You have no products listed</h2>
      )}
      <div className="footer">
        <Pagination
          updateQuery={(prop, value) => setEndpoint({ ...endpoint, [prop]: value })}
          currentPage={+endpoint.page.slice('page='.length).replace('&', '')}
          pageSize={+endpoint.pageSize.slice('pageSize='.length).replace('&', '')}
          totalItems={products?.[0]?.totalDBItems}
        />
      </div>
      {isModalOpen && (
        <Modal classes="confirm" setIsOpenModal={setIsModalOpen}>
          {modalContent}
        </Modal>
      )}
    </div>
  );
};

export default ProductListAdmin;
