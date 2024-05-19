import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import http from '../../utils/fetchFromApi';

export default function AddProduct() {
  const [productData, setProductData] = useState({
    product_name: '',
    description: '',
    category: '',
    price: 0,
    stock_small_size: 0,
    stock_medium_size: 0,
    stock_large_size: 0,
    image: null
  });
  const [categories, setCategories] = useState([]);
  const [successPopup, setSuccessPopup] = useState(false); // State for success pop-up
  const navigate = useNavigate();

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login'); // Redirect to login page if not authenticated
      return;
    }

    const fetchCategories = async () => {
      try {
        const response = await http.get('categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [navigate]);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0]; // Get the selected image file
    setProductData(prevData => ({
      ...prevData,
      image: imageFile
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleAddProduct = async () => {
    try {
      const userData = await http.get('auth/users/me', {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      const userId = userData.data.id;
      const adjustedPrice = parseFloat(productData.price) + 50;

      const formData = new FormData();
      formData.append('product_name', productData.product_name);
      formData.append('description', productData.description);
      formData.append('category', productData.category);
      formData.append('price', adjustedPrice);
      formData.append('stock_small_size', productData.stock_small_size);
      formData.append('stock_medium_size', productData.stock_medium_size);
      formData.append('stock_large_size', productData.stock_large_size);
      formData.append('image', productData.image); // Append the image file
      formData.append('user', userId); // Append the user ID

      const response = await http.post('products/', formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      });

      console.log(response.data);
      setProductData({
        product_name: '',
        description: '',
        category: '',
        price: 0,
        stock_small_size: 0,
        stock_medium_size: 0,
        stock_large_size: 0,
        image: null
      });
      setSuccessPopup(true); // Display success pop-up
    } catch (error) {
      console.error('Error adding product:', error.response.data);
    }
  };

  return (
    <div style={{ margin: '20px auto', maxWidth: '600px', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Add Product</h1>
      {isAuthenticated() ? (
        <form encType="multipart/form-data">
          <label htmlFor="product_name" style={{ fontSize: 18 }}>Product Name:</label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={productData.product_name}
            onChange={handleInputChange}
            style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
            required
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
            required
          ></textarea>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
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
            style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
            required
          />
          <label htmlFor="stock_small_size">Stock Small Size:</label>
          <input
            type="number"
            id="stock_small_size"
            name="stock_small_size"
            value={productData.stock_small_size}
            onChange={handleInputChange}
            style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
            required
          />
          <label htmlFor="stock_medium_size">Stock Medium Size:</label>
          <input
            type="number"
            id="stock_medium_size"
            name="stock_medium_size"
            value={productData.stock_medium_size}
            onChange={handleInputChange}
            style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
            required
          />
          <label htmlFor="stock_large_size">Stock Large Size:</label>
          <input
            type="number"
            id="stock_large_size"
            name="stock_large_size"
            value={productData.stock_large_size}
            onChange={handleInputChange}
            style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
            required
          />
          <label htmlFor="image">Product Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
            required
          />
          <button type="button" onClick={handleAddProduct} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer', width: '100%' }}>Add Product</button>
        </form>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '40px' }}>Please log in to add a product</p>
          <button className="explore-clothing_btn">
            <Link to="/login">Login</Link>
          </button>
        </div>
      )}
      {successPopup && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0, 255, 0, 0.7)', padding: '20px', borderRadius: '5px', zIndex: '9999' }}>
          <p style={{ textAlign: 'center', fontSize: '18px' }}>Product added successfully!</p>
        </div>
      )}
    </div>
  );
}
