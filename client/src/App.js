// import logo from "./logo.svg";

// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import history from "./customRoutes/history";
// import CustomRouter from "./customRoutes/customRouter";

import "./App.css";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingNavbar from "./components/LandingNavbar";
import CFooter from "./components/CFooter";
import Navbar from "./components/Navbar";

import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import OrdersScreen from "./screens/OrdersScreen";
import AdminScreen from "./screens/AdminScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import Auth from "./screens/Auth";

function App() {
  const pathname = window.location.pathname;
  return (
    <div className="App">
      <div className="container">
        <Router>
          {pathname === "/" && <LandingNavbar />}
          {pathname !== "/" && <Navbar />}
          <div className="app-content">
            <Routes>
              <Route path="/" element={<WelcomeScreen />} />
              <Route path="/menu" element={<HomeScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/orders" element={<OrdersScreen />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin/*" element={<AdminScreen />} />
            </Routes>
          </div>
        </Router>
      </div>
      <CFooter />
    </div>
  );
}

export default App;
