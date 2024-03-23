import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Addproduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productname: '',
        description: '',
        category: '',
        price: '',
        stock: '',
        store: '' // Add store field to formData state
    });
    const [stores, setStores] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        
        const fetchStores = async () => {
            try {
                const response = await axios.get('http://localhost:8000/stores/');
                setStores(response.data);
            } catch (error) {
                console.error('Error fetching stores:', error);
            }
        };

        fetchStores();
    }, []);

    useEffect(() => {
        
        const fetchCategory = async () => {
            try {
                const response = await axios.get('http://localhost:8000/category/');
                setCategory(response.data);
            } catch (error) {
                console.error('Error fetching stores:', error);
            }
        };

        fetchCategory();
    }, []);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/products/', formData);
            // Optionally, you can reset the form after successful submission
            setFormData({
                productname: '',
                description: '',
                category: '',
                price: '',
                stock: '',
                store: '' // Reset store field to empty string
            });
            alert('Product added successfully!');
            navigate('/products');
        } catch (error) {
            console.error('Error adding product:', error);
            alert('An error occurred while adding the product.');
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="productname"
                    placeholder="Product Name"
                    value={formData.productname}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="">Select Category</option>
                    {category.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.category}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleChange}
                />
                
                
                <select
                    name="store"
                    value={formData.store}
                    onChange={handleChange}
                >
                    <option value="">Select Store</option>
                    {stores.map(store => (
                        <option key={store.id} value={store.id}>
                            {store.storename}
                        </option>
                    ))}
                </select>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default Addproduct;