import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar.jsx";
import Homepage from "./pages/Homepage.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Connectpage from "./pages/Connectpage.jsx";
import "./App.css";
import CartPage from "./pages/CartPage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import { Toaster } from "react-hot-toast";
import ItemsPage from './pages/Admin/ItemsPage';
import AdditemPage from "./pages/Admin/AdditemPage.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/connect" element={<Connectpage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/additem" element={<AdditemPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
