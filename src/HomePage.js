/*HomePage.js */
import React from 'react';
const Author =() =>{
  return (
    <div className='author'>
      <h1>DONE BY MEGHANA RAJANALA</h1>
    </div>
  );
};
const HomePage = () => {
  return (
    <>
            <div className="App">
              <img  src={"/grocery-cart.png"}   alt="Grocery-cart" />
                <h1 className='title'>Yash Mart</h1>
                <h2 className='caption'>A PLACE TO BUY ANYTHING </h2>
            </div>
            <Author/>
            </>
  )
}


export default HomePage;
