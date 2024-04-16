import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function EditProduct() {
  const { productId } = useParams(); // Access route parameters using useParams

  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    product_name: '',
    description: '',
    category: '',
    stock_small_size: 0,
    stock_medium_size: 0,
    stock_large_size: 0,
    price: '',
    image: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/products/${productId}`);
        setProduct(response.data);
        setFormData({
          product_name: response.data.product_name,
          description: response.data.description,
          category: response.data.category,
          stock_small_size: response.data.stock_small_size,
          stock_medium_size: response.data.stock_medium_size,
          stock_large_size: response.data.stock_large_size,
          price: response.data.price,
          // Add image once you decide how to handle it in the form
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Authorization token not found. Please log in again.');
        return;
      }
  
      await axios.put(
        `http://127.0.0.1:8000/api/v1/products/${productId}/update/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };
  
  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input type="text" name="product_name" value={formData.product_name} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </div>
        <div>
          <label>Small Size Stock:</label>
          <input type="number" name="stock_small_size" value={formData.stock_small_size} onChange={handleChange} />
        </div>
        <div>
          <label>Medium Size Stock:</label>
          <input type="number" name="stock_medium_size" value={formData.stock_medium_size} onChange={handleChange} />
        </div>
        <div>
          <label>Large Size Stock:</label>
          <input type="number" name="stock_large_size" value={formData.stock_large_size} onChange={handleChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" name="price" value={formData.price} onChange={handleChange} />
        </div>
        {/* Add image input field once you decide how to handle it */}
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}
