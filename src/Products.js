import React, { useState, useEffect } from 'react';
import data from './data';
import { addOrder } from './orderManager'; // Import the addOrder function

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name'); // Default to search by product name
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState(data);

  
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders'));
    if (storedOrders) {
      setOrders(storedOrders);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const handleAddToOrder = (productId) => {
    const product = data.find((product) => product.id === productId);
    if (product) {
      const orderDate = new Date();
      const expectedDeliveryDate = new Date(orderDate.getTime() + 5 * 24 * 60 * 60 * 1000); // Adding 5 days to order date
      const order = {
        orderID: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        productDetails: { ...product },
       
        customerName: prompt('Enter customer name'),
        orderDate: orderDate.toLocaleDateString(),
        expectedDeliveryDate: expectedDeliveryDate.toLocaleDateString(), // Adding expected delivery date
        status: 'Pending'
      };

      addOrder(order);
    }
  };

  const handleSearch = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    const filtered = data.filter((product) => {
      if (searchBy === 'name' && product.title) {
        return product.title.toLowerCase().includes(lowerCaseSearchTerm);
      } else if (searchBy === 'category' && product.category) {
        return product.category.toLowerCase().includes(lowerCaseSearchTerm);
      }
      return false;
    });
    setFilteredProducts(filtered);
    setShowAll(false);
  };

  const handleShowAll = () => {
    setSearchTerm('');
    setShowAll(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm(`Are you sure you want to delete product with ID: ${productId}?`)) {
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);

      const updatedOrders = orders.filter((order) => order.productDetails.id !== productId);
      setOrders(updatedOrders);
    }
  };

  const handleEditProduct = (productId) => {
    setProducts(prevProducts =>
      prevProducts.map(product => {
        if (product.id === productId) {
          return { ...product, isEditing: true };
        }
        return product;
      })
    );
  };

  const handleSaveProduct = (productId) => {
    setProducts(prevProducts =>
      prevProducts.map(product => {
        if (product.id === productId) {
          const updatedTitle = document.getElementById(`title-${productId}`).value;
          const updatedStockQuantity = parseInt(document.getElementById(`stock-${productId}`).value);
          const updatedCategory = document.getElementById(`category-${productId}`).value;
          const updatedPrice = parseFloat(document.getElementById(`price-${productId}`).value);
  
          return {
            ...product,
            title: updatedTitle,
            stockquantity: updatedStockQuantity,
            category: updatedCategory,
            price: updatedPrice,
            isEditing: false
          };
        }
        return product;
      })
    );
  };
  
  return (
    <>
      <div className="dashboard">
        <h1>Products</h1>
      </div>
      
      <div className="form-container">
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          <div className="search-row">
            <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
              <option value="name">Product Name</option>
              <option value="category">Category</option>
            </select>
            <input
              type="text"
              name="search"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search by ${searchBy === 'name' ? 'product name' : 'category'}`}
            />
            <button type="submit">Search</button>
            <button type="button" onClick={handleShowAll}>Show All</button>
          </div>
        </form>
      </div>
      <div className="profile-card-container">
        {(showAll ? products : filteredProducts).map((eachProduct) => {
          const { id, title, price, image, category, description, rating, stockquantity, isEditing } = eachProduct;
          return (
            <div key={id} className="profile-card">
              {isEditing ? (
                 <div className='edit-container'>
                 <img src={image} alt={title} />
                 Title:<input type="text" defaultValue={title} id={`title-${id}`} />
                 Stock Quantity:<input type="number" defaultValue={stockquantity} id={`stock-${id}`} />
                 Category:<input type="text" defaultValue={category} id={`category-${id}`} />
                 Price:<input type="number" defaultValue={price} id={`price-${id}`} />
                 Description:<textarea cols="30" // Specify the number of columns
                    rows="5"
                    defaultValue={description} 
                    id={`description-${id}`} />
                  <p><b>Rating:</b> {`${Math.floor(rating?.rate)}/5 (${rating?.count})`}</p>
                 <button className="save-button" onClick={() => handleSaveProduct(id)}>Save</button>
               </div>
              ) : (
                <div>
                  <img src={image} alt={title} />
                  <h2>{title}</h2>
                  <p><b>Price:</b> ${price}</p>
                  <p><b>Description:</b> {description}</p>
                  <p><b>Category:</b> {category}</p>
                  <p><b>Stock Available:</b> {stockquantity}</p>
                  <p><b>Rating:</b> {`${Math.floor(rating?.rate)}/5 (${rating?.count})`}</p>
                  <button className="add-button" onClick={() => handleAddToOrder(id)}>ADD</button>
                  <button className="edit-button" onClick={() => handleEditProduct(id)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteProduct(id)}>Delete</button>
                
                </div>
              )}
            </div>
          );
        })}
      </div>
      
    </>
  );
};

export default Products;
