import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
    return (
        <div>
            <Link to="/products">All Products</Link> | 
            <Link to="/category/Men">Category by Men</Link> | 
            <Link to="/category/Women">Category by Women</Link> | 
            <Link to="/addproducts">addproduct</Link> | 
            <Link to="/login">login</Link> | 
        </div>
    );
};

export default App;
