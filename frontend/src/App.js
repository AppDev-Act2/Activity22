import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
    return (
        <div>
            <Link to="/products">All Products</Link>
            <Link to="/category/Men">Category by Men</Link>
            <Link to="/category/Women">Category by Women</Link>
        </div>
    );
};

export default App;
