// react router
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// layout
import RootLayout from "./layout/RootLayout";
// pages
import Home from "./pages/Home";
import ExploreProduct from "./pages/ExploreProducts";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";

// react toast
import { Toaster } from "react-hot-toast";
import Addproduct from "./component/addproduct/Addproduct";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Profile from "./authentication/Profile";
import Review from "./component/review/Review";
import Editproduct from "./component/product/Editproduct";
import Chatbot from "./component/chatbot/Chatbot";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/explore/:category" element={<ExploreProduct />}></Route>
      <Route path="/product/:productId" element={<Product />}></Route>
      <Route path="/checkout" element={<Checkout />}></Route>
      <Route path="/addproduct" element={<Addproduct />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/reviews" element={<Review />}></Route>
      <Route path="/editproduct/:id" element={<Editproduct />}></Route>
      <Route path="/chatbot" element={<Chatbot />}></Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          style: {
            padding: "16px",
            fontSize: "1.6rem",
          },
        }}
      />
    </>
  );
}

export default App;
