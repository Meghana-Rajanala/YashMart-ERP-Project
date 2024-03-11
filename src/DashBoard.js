import React from 'react';
import { Link } from 'react-router-dom';
import data  from './data';

import {getAllOrders} from './orderManager';

const DashBoard = () => {
  const orders = getAllOrders();
  
  return (
    <>
      <div className='dashboard'>
                <h1>DASHBOARD</h1>
      </div>
      {/* Two Div tag for summary metrics like number of products and orders placed. */}
      <div className='product-order-container'>
          <div className='div-container'>
                <h2>Number of Products:
                    <br/><strong>{data.length}</strong></h2>
          </div>
          <div className='div-container'>
               <h2>Number of Orders:
                  <br/><b>{orders.length}</b>
                 </h2>
           </div>
      </div>  

      <div className='link-container'>
      <div className='div-container1'>
                <Link to= '/products' >Products</Link>
               
          </div>
          <div className='div-container1'>
          <Link to='/orders'>Orders</Link>
           </div>
      </div>
    
    
    
    
    
    </>
  )
};


export default DashBoard;
