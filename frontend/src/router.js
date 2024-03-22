import * as React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import ProductList from "./Productlist";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />
    },
    {
        path: "/products",
        element: <ProductList />
      },
  ]);

export default router