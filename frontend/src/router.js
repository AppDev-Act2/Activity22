import * as React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import ProductList from "./Products/Productlist";
import Productbycatmen from "./Products/Productbycatmen";
import Productbycatwomen from "./Products/Productvbycatwomen";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />
    },
    {
        path: "/products",
        element: <ProductList />
    },
    {
      path: "/category/Men",
      element: <Productbycatmen />
    },
    {
      path: "/category/Women",
      element: <Productbycatwomen />
    },
  ]);

export default router