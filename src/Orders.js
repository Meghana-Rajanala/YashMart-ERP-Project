import React, { useState } from 'react';

import { getAllOrders, deleteOrder, updateOrderStatus } from './orderManager.js'; // Import functions for managing orders

const Orders = () => {
  const [selectedOrderId, setSelectedOrderId] = useState(null); // State to track selected order ID
  const [updatedStatus, setUpdatedStatus] = useState(""); // State to track updated status
  const [editingOrderId, setEditingOrderId] = useState(null); // State to track which order is being edited
  const [orders, setOrders] = useState(getAllOrders()); // Retrieve orders data

  const handleProfileCardClick = (orderId) => {
    setSelectedOrderId(orderId); // Set the selected order ID
  };

  // Function to handle deleting an order
  const handleDeleteOrder = (orderId) => {
    if (window.confirm(`Are you sure you want to delete order with ID: ${orderId}?`)) {
      deleteOrder(orderId); // Call deleteOrder function
      setSelectedOrderId(null); // Deselect the order after deletion
      setOrders(prevOrders => prevOrders.filter(order => order.orderID !== orderId)); // Update orders state after deletion
    }
  };

  // Function to handle updating the status of an order
  const handleUpdateOrderStatus = (orderId) => {
    if (updatedStatus !== "") {
      updateOrderStatus(orderId, updatedStatus); // Call updateOrderStatus function
      setUpdatedStatus(""); // Reset the updated status
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderID === orderId ? { ...order, status: updatedStatus } : order
        )
      ); // Update orders state with the updated status
    }
  };

  // Function to handle starting the editing mode of an order
  const handleEditOrder = (orderId) => {
    // Check if the clicked order is the selected order
    if (selectedOrderId === orderId) {
      setEditingOrderId(orderId); // Enable editing for the selected order
    }
  };

  // Function to handle saving the updated order details
  const handleSaveOrder = (orderId) => {
    // Implement the logic to save the updated order details
    // For simplicity, let's assume the fields are not empty
    // Here you can perform additional validation or checks before saving

    // Update the order details in the orders array
    const updatedOrders = orders.map(order => {
      if (order.orderID === orderId) {
        const updatedCustomerName = document.getElementById(`customerName-${orderId}`).value;
        const updatedCategory = document.getElementById(`category-${orderId}`).value;
        const updatedDescription = document.getElementById(`description-${orderId}`).value;

        return {
          ...order,
          customerName: updatedCustomerName,
          productDetails: {
            ...order.productDetails,
            category: updatedCategory,
            description: updatedDescription
          },
          isEditing: false // Assuming there's an isEditing property in the order object
        };
      }
      return order;
    });

    // Update the state with the updated orders array
    setOrders(updatedOrders);
    
    // Finish editing after saving
    setEditingOrderId(null);
  };

  return (
    <div>
      <div className='dashboard'>
        <h1>Orders</h1>
      </div>
      <div className="profile-card-container">
        {orders.map((eachOrder) => {
          const { orderID, productDetails, expectedDeliveryDate } = eachOrder;
          const { title, image } = productDetails;
          const isEditing = editingOrderId === orderID;
          const isSelected = selectedOrderId === orderID;

          return (
            <div key={orderID} onClick={() => handleProfileCardClick(orderID)} style={{ cursor: 'pointer' }} className='profile-card'>
              <img src={image} alt={title} style={{ width: '120px' }}/>
              <p>Product Name: {title}</p>
              {!isSelected && (
                <>
                  <p>Order ID: {orderID}</p>
                  <p>Status: {eachOrder.status}</p>
                  <p>Order Date: {eachOrder.orderDate}</p>
                  <p>Order delivery Date: {expectedDeliveryDate}</p>
                </>
              )}
              {isSelected && (
                <>
                  {!isEditing ? (
                    <div>
                      <h3>Selected Order Details</h3>
                      <p>Order ID: {orderID}</p>
                      <p>Customer Name: {eachOrder.customerName}</p>
                      <p>Category: {productDetails.category}</p>
                      <p>Description: {productDetails.description}</p>
                      <p>Status: {eachOrder.status}</p>
                      <p>Order Date: {eachOrder.orderDate}</p>
                      <p>Order delivery Date: {expectedDeliveryDate}</p>
                      <button className="edit-button" onClick={() => handleEditOrder(orderID)}>Edit</button>
                      <button className="delete-button" onClick={() => handleDeleteOrder(orderID)}>Delete</button>
                      {/* Add dropdown for updating order status */}
                      <select className="dropdown-select" onChange={(e) => setUpdatedStatus(e.target.value)} value={updatedStatus}>
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <button className="update-status-button" onClick={() => handleUpdateOrderStatus(orderID)}>Update Status</button>
                    </div>
                  ) : (
                    <div>
                      <h3>Editing Order Details</h3>
                      <p>Order ID: {orderID}</p>
                      Customer Name:<input type="text" placeholder="Updated Name" defaultValue={eachOrder.customerName} id={`customerName-${orderID}`} />
                      Category:<input type="text" placeholder="Updated Category" defaultValue={productDetails.category} id={`category-${orderID}`} />
                      Description:<textarea
                        placeholder="Updated Description"
                        defaultValue={productDetails.description}
                        id={`description-${orderID}`}
                        cols="30" // Specify the number of columns
                        rows="5" // Specify the number of rows
                      ></textarea><br/>
                      <p>Status: {eachOrder.status}</p><br/>
                      <p>Order Date: {eachOrder.orderDate}</p><br/><br/>
                     
                      <button className='save-button' onClick={() => handleSaveOrder(orderID)}>Save</button>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
