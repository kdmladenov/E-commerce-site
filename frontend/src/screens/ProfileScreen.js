import React, { useEffect, useState } from 'react';
import About from '../components/Profile/About';
import Orders from '../components/Orders';
import './styles/ProfileScreen.css';
import Timeline from '../components/Timeline';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrowsingHistory, listBrowsingHistory } from '../actions/browsingHistoryActions';
import ProductCardVertical from '../components/ProductCard/ProductCardVertical';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('browsing_history');

  const dispatch = useDispatch();

  const browsingHistoryList = useSelector((state) => state.browsingHistoryList);
  const { loading: loadingHistory, browsingHistory, error: errorHistory } = browsingHistoryList;

  const browsingHistoryDelete = useSelector((state) => state.browsingHistoryDelete);
  const { success: successDeleteHIstory } = browsingHistoryDelete;

  const deleteHistoryItemHandler = (id) => {
    dispatch(deleteBrowsingHistory(id));
  };

  useEffect(() => {
    dispatch(listBrowsingHistory());
  }, [dispatch, successDeleteHIstory]);

  return (
    <main className="profile_screen">
      <div className="profile_container">
        <div className="header card">
          <button
            className={`tab ${activeTab === 'about' && 'active'}`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
          <button
            className={`tab ${activeTab === 'orders' && 'active'}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button
            className={`tab ${activeTab === 'browsing_history' && 'active'}`}
            onClick={() => setActiveTab('browsing_history')}
          >
            Browsing History
          </button>
          <button
            className={`tab ${activeTab === 'wish_list' && 'active'}`}
            onClick={() => setActiveTab('wish_list')}
          >
            Wish List
          </button>
        </div>
        <section className={`about_container card content ${activeTab === 'about' && 'active'}`}>
          <About />
        </section>
        <section className={`orders_container card content ${activeTab === 'orders' && 'active'}`}>
          <Orders />
        </section>
        <section
          className={`browsing_history_container card content ${
            activeTab === 'browsing_history' && 'active'
          }`}
        >
          {loadingHistory ? (
            <Loader />
          ) : errorHistory ? (
            <Message type="error">{errorHistory}</Message>
          ) : browsingHistory.length === 0 ? (
            <h2>Your Browsing History Is Empty</h2>
          ) : (
            <Timeline title="Your Browsing History">
              {browsingHistory?.map((historyRecord) => (
                <Timeline.Item
                  key={historyRecord.historyId}
                  deleteHistoryItem={deleteHistoryItemHandler}
                  historyRecord={historyRecord}
                >
                  <ProductCardVertical
                    id={historyRecord.productId}
                    title={historyRecord.title}
                    image={historyRecord.image}
                    price={historyRecord.price}
                    rating={historyRecord.rating}
                    stockCount={historyRecord.stockCount}
                  />
                </Timeline.Item>
              ))}
            </Timeline>
          )}
        </section>
        <section
          className={`wish_list_container card content ${activeTab === 'wish_list' && 'active'}`}
        >
          wish content
        </section>
      </div>
    </main>
  );
};

export default ProfileScreen;
