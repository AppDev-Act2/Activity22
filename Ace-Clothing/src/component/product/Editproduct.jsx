import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EditProduct.css'; // Assuming you have a CSS file for styles

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newStockSmall, setNewStockSmall] = useState('');
    const [newStockMedium, setNewStockMedium] = useState('');
    const [newStockLarge, setNewStockLarge] = useState('');

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/v1/products/${id}/`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }, [id]);

    const handlePatch = () => {
        axios.patch(`http://127.0.0.1:8000/api/v1/products/${id}/`, {
            product_name: newName,
            description: newDescription,
            price: newPrice,
            stock_small_size: newStockSmall,
            stock_medium_size: newStockMedium,
            stock_large_size: newStockLarge,
        })
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error updating product details:', error);
            });
    }

    return (
        <div className="product-details-container">
            {product ? (
                <div className="product-details-card">
                    <h2>{product.product_name}</h2>
                    <img src={product.image} alt={product.product_name} className="product-image" />
                    <p>Description: {product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Stock (Small): {product.stock_small_size}</p>
                    <p>Stock (Medium): {product.stock_medium_size}</p>
                    <p>Stock (Large): {product.stock_large_size}</p>

                    <div className="product-details-form">
                        <input
                            type="text"
                            placeholder="New Product Name"
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                            className="product-details-input"
                        />
                        <input
                            type="text"
                            placeholder="New Description"
                            value={newDescription}
                            onChange={e => setNewDescription(e.target.value)}
                            className="product-details-input"
                        />
                        <input
                            type="number"
                            placeholder="New Price"
                            value={newPrice}
                            onChange={e => setNewPrice(e.target.value)}
                            className="product-details-input"
                        />
                        <input
                            type="number"
                            placeholder="New Stock (Small)"
                            value={newStockSmall}
                            onChange={e => setNewStockSmall(e.target.value)}
                            className="product-details-input"
                        />
                        <input
                            type="number"
                            placeholder="New Stock (Medium)"
                            value={newStockMedium}
                            onChange={e => setNewStockMedium(e.target.value)}
                            className="product-details-input"
                        />
                        <input
                            type="number"
                            placeholder="New Stock (Large)"
                            value={newStockLarge}
                            onChange={e => setNewStockLarge(e.target.value)}
                            className="product-details-input"
                        />
                        <button onClick={handlePatch} className="product-details-button">Update</button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProductDetails;
