import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { Link } from 'react-router-dom';
import { getAllOrders } from './orderManager.js'; 

const CalendarView = () => {
    const [orders, setOrders] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData = await getAllOrders();
                setOrders(ordersData);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const filteredOrders = selectedDate ? orders.filter(order => {
        // Convert dates to string for comparison
        const expectedDeliveryDateString = new Date(order.expectedDeliveryDate).toISOString().slice(0, 10);
        const selectedDateString = selectedDate.toISOString().slice(0, 10);
        
        // Compare dates
        return expectedDeliveryDateString === selectedDateString;
    }) : [];

    return (
        <div >
            <div className='dashboard'>
                    <h1>Orders on Calendar</h1>
            </div>
            <div className="calendar">
                <Calendar onChange={handleDateClick} value={selectedDate} className={'calendar'} />
            </div>
            <hr/>
            <div className="orders">
                <h3 className='order'>Orders for {selectedDate && selectedDate.toDateString()}</h3>
                {filteredOrders.map(order => (
                    <div key={order.orderID} className="order">
                        <img src={order.productDetails.image} alt={order.productDetails.title} height={"120px"}/>
                        <p>Order ID: {order.orderID}</p>

                        <p>Product Name: {order.productDetails.title}</p>
                        <Link to="/orders" className="vieworder">View Order</Link> {/* Link to navigate to orders page */}
                        {/* Display more order details as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarView;
