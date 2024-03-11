// OrderManager.js
let orders = [];

export const addOrder = (order) => {
  orders.push(order);
};

export const getAllOrders = () => {
  return orders;
};

export const deleteOrder = (orderId) => {
  orders = orders.filter(order => order.orderID !== orderId);
};

export const updateOrderStatus = (orderId, newStatus) => {
  orders = orders.map(order => {
    if (order.orderID === orderId) {
      return { ...order, status: newStatus };
    }
    return order;
  });
};
