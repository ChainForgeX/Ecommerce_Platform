import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import {

    Navigate

} from "react-router-dom";
import Home from "./pages/ecommercehome";
import Login from "./pages/ecommercelogin";
import Register from "./pages/ecommerceregister";
import Cart from "./pages/ecommercecart";
import Orders from "./pages/ecommerceorders";
import ProductDetails from "./pages/ecommerceproductdetails";
import AdminDashboard from "./pages/ecommerceadmindashboard";

function App() {

    return (

        <>

            <Navbar />

            <Routes>

                <Route

    path="/"

    element={<Navigate to="/register" />}

/>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />

                <Route
                    path="/orders"
                    element={<Orders />}
                />

                <Route
                    path="/product/:id"
                    element={<ProductDetails />}
                />

                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />

            </Routes>

        </>

    );

}

export default App;