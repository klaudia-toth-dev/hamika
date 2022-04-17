// import logo from "./logo.svg";
import "./App.css";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import OrdersScreen from "./screens/OrdersScreen";
import AdminScreen from "./screens/AdminScreen";
import ContactScreen from "./screens/ContactScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Router>
          <Routes>
            <Route path="/welcome" element={<WelcomeScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/orders" element={<OrdersScreen />} />
            <Route path="/admin/*" element={<AdminScreen />} />
            <Route path="/contact" element={<ContactScreen />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
