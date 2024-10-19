import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar.jsx";
import Homepage from "./pages/Homepage.jsx";
import Connectpage from "./pages/Connectpage.jsx";
import CartPage from "./pages/CartPage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrderConfirmedPage from "./pages/OrderConfirmedPage.jsx";
import WishListPage from "./pages/WishListPage.jsx";
import LoginFormPage from "./pages/LoginFormPage.jsx";
import SignUpFormPage from "./pages/SignUpFormPage.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

import AdditemPage from "./Admin/AdditemPage.jsx";
import ProductListPage from "./Admin/ProductListPage.jsx";
import AdminProfile from "./Admin/AdminProfile.jsx";
import UpdateitemPage from "./Admin/UpdateitemPage.jsx";
import OrderPage from "./Admin/OrderPage.jsx";
import AdminLayout from "./Admin/AdminLayout.jsx";
import { ThemeProvider, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import MenuPage from "./pages/MenuPage.jsx";
import AdminHomePage from "./Admin/AdminHomePage.jsx";

function App() {
  const theme = useTheme();

  const [usertype, setUsertype] = useState("user");
  const [settoken, setToken] = useState("");
  useEffect(() => {
    const intervalValue = setInterval(() => {
      const user = localStorage.getItem("type");
      const token = localStorage.getItem("token");
      if (user) {
        setUsertype(user);
        setToken(token);
      } else {
        setUsertype("user");
      }
    }, 1000);
    return () => {
      clearInterval(intervalValue);
    };
  }, [settoken]);

  return (
    <div className="App">
      <BrowserRouter>
      {
        usertype ==='user' ?( <>
         <NavBar />
        <Routes>
          <Route path="" element={<Homepage />} />
          <Route path="/connect" element={<Connectpage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginFormPage />} />
          <Route path="/signup" element={<SignUpFormPage />} />
          <Route path="/menu" element={<MenuPage/>} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="order-confirmed" element={<OrderConfirmedPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        </>) : usertype ==='admin' ? (
        <>
        <ThemeProvider theme={theme}>
        <Routes>
           <Route path="" element={<AdminLayout />}>
                <Route path="additems" element={<AdditemPage />} />
                <Route path="productlist" element={<ProductListPage />} />
                <Route path="updateitem" element={<UpdateitemPage />} />
                <Route path="orders" element={<OrderPage />} />
                <Route path="adminprofile" element={<AdminProfile />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
          </ThemeProvider>
          </>
      ) :null
      }
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
