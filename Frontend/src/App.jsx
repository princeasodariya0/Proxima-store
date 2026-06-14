import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
import ProductDetails from "./pages/ProductDetails";
import EditProduct from "./pages/EditProduct";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Home />} />
        <Route path="/products/new" element={<CreateProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;