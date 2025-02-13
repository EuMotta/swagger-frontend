import React, { useState } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const OrderButton = ({ column }: { column: string }) => {
  const [order, setOrder] = useState<string>('');

  const handleOrderClick = () => {
    let newOrder = '';
    if (order === '') {
      newOrder = 'ASC';
    } else if (order === 'ASC') {
      newOrder = 'DESC';
    } else {
      newOrder = '';
    }

    const params = new URLSearchParams(window.location.search);
    if (newOrder) {
      params.set('order', newOrder);
      params.set('orderBy', column);
    } else {
      params.delete('order');
      params.delete('orderBy');
    }

    setOrder(newOrder);

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`,
    );
  };

  const getIcon = () => {
    if (order === 'ASC') return <FaSortUp />;
    if (order === 'DESC') return <FaSortDown />;
    return <FaSort />;
  };

  return (
    <button
      onClick={handleOrderClick}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {getIcon()}
      <span style={{ marginLeft: '8px' }}>Order</span>
    </button>
  );
};

export default OrderButton;
