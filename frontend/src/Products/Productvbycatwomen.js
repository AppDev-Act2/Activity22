import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Productbycatwomen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/products/category/Women/');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map(product => (
                    <div key={product.id}>
                        <li>{product.product_name}</li>
                        <li>{product.description}</li>
                        <li>{product.category}</li>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Productbycatwomen;