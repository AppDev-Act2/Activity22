import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import http from '../utils/fetchFromApi';

const UserProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await http.get('user/products/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Products</h1>
      <div style={styles.productGrid}>
        {products.map(product => (
          <div key={product.id} style={styles.productBox}>
            <div style={styles.imageWrapper}>
              <img src={product.image} alt={product.product_name} style={styles.image} />
            </div>
            <div style={styles.productContent}>
              <h2 style={styles.productName}>{product.product_name}</h2>
              <p style={styles.productDescription}>Description: {product.description}</p>
              <p style={styles.productPrice}>Price: ${product.price}</p>
              <p style={styles.productStock}>Stock (Small): {product.stock_small_size}</p>
              <p style={styles.productStock}>Stock (Medium): {product.stock_medium_size}</p>
              <p style={styles.productStock}>Stock (Large): {product.stock_large_size}</p>
              <Link to={`/editproduct/${product.id}`} style={styles.editButton}>Edit Product</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: '20px',
    padding: '20px',
    border: '1px solid #ccc',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  productBox: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  productContent: {
    padding: '15px',
  },
  productName: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  productDescription: {
    fontSize: '16px',
    marginBottom: '8px',
  },
  productPrice: {
    fontSize: '18px',
    marginBottom: '8px',
  },
  productStock: {
    fontSize: '16px',
    marginBottom: '6px',
  },
  imageWrapper: {
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  editButton: {
    display: 'block',
    marginTop: '10px',
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    textAlign: 'center',
    cursor: 'pointer',
  },
};

export default UserProductsPage;
