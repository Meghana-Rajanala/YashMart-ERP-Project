import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import DashBoard from './DashBoard';
import HomePage from './HomePage';
import Products from './Products';
import Orders from './Orders';
import CalendarView from './CalendarView';
import './App.css';

const Navigation = () => {
  return (
    <nav className="nav-container">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/dashboard" className="nav-link">Dashboard</Link>
      <Link to="/products" className="nav-link">Products</Link>
      <Link to="/orders" className="nav-link">Orders</Link>
      <Link to="/calendar" className="nav-link">Calendar</Link>
    </nav>
  );
};

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/calendar" element={<CalendarView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
