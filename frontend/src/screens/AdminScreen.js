import React, { useEffect, useState } from 'react';
import UserList from '../components/UserList';
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
        <section
          className={`userlist_container card content ${activeTab === 'userlist' && 'active'}`}
        >
          <UserList />
        </section>
        <section
          className={`orderlist_container card content ${activeTab === 'orderlist' && 'active'}`}
        >
          Order list
        </section>
        <section
          className={`productlist_container card content ${
            activeTab === 'productlist' && 'active'
          }`}
        >
          Product List
        </section>
      </div>
    </main>
  );
};

export default AdminScreen;
