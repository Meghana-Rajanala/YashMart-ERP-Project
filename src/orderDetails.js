import React from 'react';
import {  getAllOrders } from './orderManager.js';

const OrderDetails = ({ orderId }) => {
  // Call getOrderDetails to retrieve details of the selected order
  const orderDetails =  getAllOrders(orderId);

  return (
    <div>
      <h2>Order Details</h2>
      <p>Order ID: {orderDetails.orderID}</p>
      <p>Customer Name: {orderDetails.customerName}</p>
      <p>Order Date: {orderDetails.orderDate}</p>
      <p>Status: {orderDetails.status}</p>
      {/* Render other order details as needed */}
    </div>
  );
};

export default OrderDetails;
