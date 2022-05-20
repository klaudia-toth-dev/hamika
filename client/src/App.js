import React, { Fragment, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import LandingNavbar from "./components/layout/LandingNavbar";
import CustomRoutes from "./components/routing/CustomRoutes";
import CFooter from "./components/layout/CFooter";
import NotFound from "./components/layout/NotFound";

import MenuScreen from "./screens/MenuScreen";
import CartScreen from "./screens/CartScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

//styles
import "./App.css";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Fragment>
        {pathName === "/" && <LandingNavbar />}
        {pathName !== "/" && <Navbar />}
        <div className="container app-content">
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/menu" element={<MenuScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth/*" element={<CustomRoutes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Fragment>
      <CFooter />
    </Provider>
  );
};

export default App;
