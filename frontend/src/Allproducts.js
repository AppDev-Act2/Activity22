//wala niy pulos hehe

import React from 'react';


const Allproducts = () => {

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
                    {categories.map(category => (
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

export default Allproducts;
