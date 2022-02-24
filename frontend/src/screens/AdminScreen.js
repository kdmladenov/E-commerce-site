import React, { useEffect, useState } from 'react';

import './styles/AdminScreen.css';

import ButtonNav from '../components/ButtonNav';
import OrderListAdmin from '../components/OrderListAdmin';
import ProductListAdmin from '../components/ProductListAdmin';
import UserListAdmin from '../components/UserListAdmin';

const AdminScreen = ({ match }) => {
  const section = match.params.section;
  const [activeTab, setActiveTab] = useState(section);

  useEffect(() => setActiveTab(section), [section]);

  return (
    <main className="admin_screen">
      <div className="admin_container">
        <ButtonNav activeTab={activeTab} screen="admin" />
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
