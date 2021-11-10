import React, { useState } from 'react';
import './styles/Orders.css';

const Orders = () => {
  const [activeOrder, setActiveOrder] = useState(1);

  return (
    <div className="orders">
      <div className="sidebar">
        <h2>Orders</h2>
        <button
          className={`tab_button ${activeOrder === 1 && 'active'}`}
          onClick={() => setActiveOrder(1)}
        >
          Order 1
        </button>
        <button
          className={`tab_button ${activeOrder === 2 && 'active'}`}
          onClick={() => setActiveOrder(2)}
        >
          Order 2
        </button>
      </div>
      <div className="orders_list">
        <div className={`order ${activeOrder === 1 ? 'active' : ''}`}>Order 1</div>
        <div className={`order ${activeOrder === 2 ? 'active' : ''}`}>Order 2</div>
      </div>
    </div>
  );
};

export default Orders;
