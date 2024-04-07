import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddProduct() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [productData, setProductData] = useState({
    product_name: '',
    description: '',
    category: '',
    price: 0,
    stock_quantity: 0,
    stock_small_size: 0,
    stock_medium_size: 0,
    stock_large_size: 0,
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();

    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleAddProduct = async () => {
    try {
      const userData = await axios.get('http://127.0.0.1:8000/api/v1/auth/users/me', {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      const userId = userData.data.id;

      const productDataWithUserId = {
        ...productData,
        user: userId,
      };

      const response = await axios.post('http://127.0.0.1:8000/api/v1/add_product/', productDataWithUserId, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

      console.log(response.data);
      setProductData({
        product_name: '',
        description: '',
        category: '',
        price: 0,
        stock_quantity: 0,
        stock_small_size: 0,
        stock_medium_size: 0,
        stock_large_size: 0,
      });
    } catch (error) {
      console.error('Error adding product:', error.response.data);
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <h1>Check Products</h1>
      {loggedIn ? (
        <form>
          <label htmlFor="product_name">Product Name:</label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={productData.product_name}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            required
          ></textarea>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.category_name}</option>
            ))}
          </select>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="stock_quantity">Stock Quantity:</label>
          <input
            type="number"
            id="stock_quantity"
            name="stock_quantity"
            value={productData.stock_quantity}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="stock_small_size">Stock Small Size:</label>
          <input
            type="number"
            id="stock_small_size"
            name="stock_small_size"
            value={productData.stock_small_size}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="stock_medium_size">Stock Medium Size:</label>
          <input
            type="number"
            id="stock_medium_size"
            name="stock_medium_size"
            value={productData.stock_medium_size}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="stock_large_size">Stock Large Size:</label>
          <input
            type="number"
            id="stock_large_size"
            name="stock_large_size"
            value={productData.stock_large_size}
            onChange={handleInputChange}
            required
          />
          <button type="button" onClick={handleAddProduct}>Add Product</button>
        </form>
      ) : (
        <p>Please log in to add a product</p>
      )}
    </div>
  );
}
