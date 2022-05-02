// import logo from "./logo.svg";
import "./App.css";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingNavbar from "./components/LandingNavbar";
import CFooter from "./components/CFooter";
import Navbar from "./components/Navbar";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import OrdersScreen from "./screens/OrdersScreen";
import AdminScreen from "./screens/AdminScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import Auth from "./screens/Auth";

function App() {
  const pathname = window.location.pathname;
  return (
    <div className="App">
      {pathname === "/" && <LandingNavbar />}
      {pathname !== "/" && <Navbar />}
      <div className="container app-content">
        <Router>
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/menu" element={<HomeScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/orders" element={<OrdersScreen />} />
            <Route path="/admin/*" element={<AdminScreen />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Router>
      </div>
      <CFooter />
    </div>
  );
}

export default App;
