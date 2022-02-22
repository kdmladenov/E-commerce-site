import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { deliverOrder, getOrderDetails, payOrder } from '../actions/orderActions';
import Message from '../components/Message';
import { BASE_URL } from '../constants/constants';
import './styles/OrderScreen.css';
import axios from 'axios';
import {
  ORDER_CREATE_RESET,
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET
} from '../constants/orderConstants';
import Button from '../components/Button';
import BreadcrumbsSteps from '../components/BreadcrumbsSteps';
import Rating from '../components/Rating';
import Price from '../components/Price';
import { orderBreadcrumbsSteps } from '../constants/inputMaps';
import Divider from '../components/Divider';
import { getDate } from '../constants/utility-functions';
import { addToCart } from '../actions/cartActions';
import Tooltip from '../components/Tooltip';

const OrderScreen = ({ match, history }) => {
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderId = match.params.orderId;

  const { userInfo } = useSelector((state) => state.userLogin);

  const { user } = useSelector((state) => state.userDetails);

  const { order, loading, error } = useSelector((state) => state.orderDetails);

  const { loading: loadingPay, success: successPay } = useSelector((state) => state.orderPay);

  const { loading: loadingDeliver, success: successDeliver } = useSelector(
    (state) => state.orderDeliver
  );

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const portalRefs = useSelector((state) => state.portalRefs);
  const {
    portalRefsMap: { toast_cart: toastCartRef }
  } = portalRefs;

  const addToCartHandler = (productId, title, image, price) => {
    dispatch(addToCart(productId, 1));
    toastCartRef.current.createToast({ title, image, price, qty: 1 });
  };

  const currentStep = order?.isDelivered
    ? 'Order Complete'
    : order?.isPaid
    ? 'Delivery'
    : 'Pay Order';

  useEffect(() => {
    dispatch({ type: ORDER_CREATE_RESET });
  }, []);

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get(`${BASE_URL}/config/paypal`);
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      // if there is no order or it is paid
      dispatch({ type: ORDER_PAY_RESET }); // prevents infinite loop
      dispatch({ type: ORDER_DELIVER_RESET }); // prevents infinite loop
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order, successPay, successDeliver]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type="error">{error}</Message>
  ) : userInfo?.userId === order?.userId || userInfo?.role === 'admin' ? (
    <main className="order_screen">
      <div className="order_container">
        <div className="order_breadcrumbs card">
          <BreadcrumbsSteps currentStep={currentStep} steps={orderBreadcrumbsSteps} />
        </div>
        <section className="order_details card">
          <div className="order_header">
            <h1>Order Details</h1>
            <p className="subtitles flex">
              <span>{`Ordered on ${getDate(order?.orderDate)}`}</span>
              <Divider vertical />
              <span>{`Order# ${orderId}`}</span>
            </p>
          </div>
          <Divider margin>
            <h2>Order Summary</h2>
          </Divider>
          <div className="order_summary">
            <div className="shipping_address">
              <h3>Shipping Address:</h3>
              <ul>
                <li>{`${user?.fullName}`}</li>
                <address>
                  {`${order?.shippingAddress} ${order?.shippingAddress2}`.toUpperCase()}
                </address>
                <address>
                  {`${order?.shippingCity},${order?.shippingState} ${order?.shippingZip}`.toUpperCase()}
                </address>
                <address>{`${order?.shippingCountry}`.toUpperCase()}</address>
                <li>{`Phone: ${user?.phone}`}</li>
                <li>{`Email: ${user?.email}`}</li>
              </ul>
            </div>
            <div className="payment_method">
              <h3>Payment Method</h3>
              <i className="fa fa-paypal" />
              {order?.paymentMethod}
            </div>
            <div className="order_price">
              <h3>Order total:</h3>
              <table>
                <tr>
                  <td>{`Items (${order?.orderItemsCreated.reduce(
                    (acc, item) => acc + item.qty,
                    0
                  )}):`}</td>
                  <td>
                    <Price price={order?.itemsPrice} size="small" color="black" />
                  </td>
                </tr>
                <tr>
                  <td>Shipping & handling:</td>
                  <td>
                    <Price price={order?.shippingPrice} size="small" color="black" />
                  </td>
                </tr>
                <tr>
                  <td>Total before tax:</td>
                  <td>
                    <Price
                      price={order?.itemsPrice + order?.shippingPrice}
                      size="small"
                      color="black"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Estimated tax:</td>
                  <td>
                    <Price price={order?.taxPrice} size="small" color="black" />
                  </td>
                </tr>
                <tr>
                  <td>Order total:</td>
                  <td>
                    <Price price={order?.totalPrice} />
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <Divider margin>
            <h2>Payment</h2>
          </Divider>
          <div className="payment">
            {order?.isPaid !== 1 ? (
              <div className="payment_btn flex">
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton amount={order?.totalPrice} onSuccess={successPaymentHandler} />
                )}
              </div>
            ) : (
              <Tooltip direction="top" text={`Paid ${getDate(order?.paymentDate)}`}>
                Paid <i className="fa fa-check" />
              </Tooltip>
            )}
          </div>
          {order.isPaid === 1 && (
            <div className="delivery">
              <Divider>
                <h2>Delivery</h2>
              </Divider>
              {userInfo?.role === 'admin' && !order.isDelivered ? (
                <Button onClick={deliverHandler} classes="large">
                  Mark as Delivered
                </Button>
              ) : (
                <Tooltip direction="top" text={`Delivered ${getDate(order?.deliveryDate)}`}>
                  Delivered <i className="fa fa-check" />
                </Tooltip>
              )}
            </div>
          )}
        </section>
        <section className="order_items card">
          <h1>Order Items</h1>
          <ul>
            {order?.orderItemsCreated?.map((item) => (
              <li key={item.id}>
                <div className="order_item">
                  <Link className="image" to={`/products/${item.id}`}>
                    <img src={item.image} alt={item?.title} />
                  </Link>
                  <div className="content">
                    <Link className="title" to={`/products/${item.id}`}>
                      {item.title}
                    </Link>
                    <div className="rating_review">
                      <Rating rating={item.rating}></Rating>
                      <span>{`(${item.reviewCount})`}</span>
                    </div>
                    <div className="brand flex">
                      Sold by:
                      <Link to={`/store/${item.brand}`}>
                        <Button classes="text">{item.brand}</Button>
                      </Link>
                    </div>
                    <Price price={item.price} />
                  </div>
                  {userInfo?.userId === order?.userId && (
                    <div className="button_group">
                      <Button
                        onClick={() =>
                          addToCartHandler(item.productId, item.title, item.image, item.price)
                        }
                        classes={'rounded small'}
                        disabled={item.stockCount === 0}
                      >
                        {item.stockCount === 0 ? (
                          'Out of Stock'
                        ) : (
                          <span>
                            <i className="fa fa-cart-plus" /> Buy it again
                          </span>
                        )}
                      </Button>
                      <Button
                        onClick={() => history.push(`/reviews/${item.productId}`)}
                        classes={'rounded small white'}
                      >
                        Write a review
                      </Button>
                      <Button
                        onClick={() => history.push(`/questions/${item.productId}`)}
                        classes={'rounded small white'}
                      >
                        Ask or answer question
                      </Button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  ) : (
    <span>No order to show</span>
  );
};

export default OrderScreen;
