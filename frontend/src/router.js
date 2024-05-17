import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Productbycatmen from "./Products/Productbycatmen";
import Productbycatwomen from "./Products/Productvbycatwomen";

import Login from "./Authentication/Login";
import Profile from "./Authentication/Profile";
import AddProduct from "./Products/AddProduct";
import Cart from "./Products/Cart"; // Import the Cart component
import Register from "./Authentication/Register";
import Sellerproductlist from "./Products/Sellerproductlist";
import Allproducts from "./Products/Allproducts";
import ProductDetails from "./Products/ProductDetails";
import Review from "./Products/Review";
import EditProduct from "./Products/EditProduct";
import Checkout from "./Products/Checkout";
import SellerOrders from "./Products/SellerOrders";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/sellerproducts",
        element: <Sellerproductlist />
    },
    {
        path: "/category/Men",
        element: <Productbycatmen />
    },
    {
        path: "/category/Women",
        element: <Productbycatwomen />
    },
    {
        path: "/addproducts",
        element: <AddProduct />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/cart",
        element: <Cart />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/products",
        element: <Allproducts />
    },
    {
        path: "/products/:productId",
        element: <ProductDetails />
    },
    {
        path: "/write-review/:productId",
        element: <Review />
    },
    {
        path: "/editproduct/:productId",
        element: <EditProduct />
    },
    {
        path: "/checkout",
        element: <Checkout />
    },

    {
        path: "/sellerorders",
        element: <SellerOrders />
    },
]);

export default router;