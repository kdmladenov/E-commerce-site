import React, { useEffect, useState } from 'react';
import OrderListAdmin from '../components/OrderListAdmin';
import ProductListAdmin from '../components/ProductListAdmin';
import UserListAdmin from '../components/UserListAdmin';
import './styles/AdminScreen.css';

const AdminScreen = ({ match }) => {
  const section = match.params.section;
  const [activeTab, setActiveTab] = useState(section);

  useEffect(() => setActiveTab(section), [section]);

  return (
    <main className="admin_screen">
      <div className="admin_container">
        <div className="header card">
          <button
            className={`tab ${activeTab === 'userlist' && 'active'}`}
            onClick={() => setActiveTab('userlist')}
          >
            User List
          </button>
          <button
            className={`tab ${activeTab === 'orderlist' && 'active'}`}
            onClick={() => setActiveTab('orderlist')}
          >
            Order List
          </button>
          <button
            className={`tab ${activeTab === 'productlist' && 'active'}`}
            onClick={() => setActiveTab('productlist')}
          >
            Product List
          </button>
        </div>
        <section className={`userlist_container content ${activeTab === 'userlist' && 'active'}`}>
          <UserListAdmin />
        </section>
        <section className={`orderlist_container content ${activeTab === 'orderlist' && 'active'}`}>
          <OrderListAdmin />
        </section>
        <section
          className={`productlist_container content ${activeTab === 'productlist' && 'active'}`}
        >
          <ProductListAdmin />
        </section>
      </div>
    </main>
  );
};

export default AdminScreen;
