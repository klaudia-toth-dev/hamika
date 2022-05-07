// // import logo from "./logo.svg";

// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import LandingNavbar from "./components/LandingNavbar";
// import CFooter from "./components/CFooter";
// import Navbar from "./components/Navbar";
// import HomeScreen from "./screens/HomeScreen";
// import CartScreen from "./screens/CartScreen";
// import RegisterScreen from "./screens/RegisterScreen";
// import LoginScreen from "./screens/LoginScreen";
// import OrdersScreen from "./screens/OrdersScreen";
// import AdminScreen from "./screens/AdminScreen";
// import ContactScreen from "./screens/ContactScreen";
// import WelcomeScreen from "./screens/WelcomeScreen";

// function App() {
//   const pathname = window.location.pathname;
//   return (
//     <div className="App">
//       {pathname === "/" && <LandingNavbar />}
//       {pathname !== "/" && <Navbar />}
//       <div className="container app-content">
//         <Router>
//           <Routes>
//             <Route path="/" element={<WelcomeScreen />} />
//             <Route path="/menu" element={<HomeScreen />} />
//             <Route path="/cart" element={<CartScreen />} />
//             <Route path="/register" element={<RegisterScreen />} />
//             <Route path="/login" element={<LoginScreen />} />
//             <Route path="/orders" element={<OrdersScreen />} />
//             <Route path="/admin/*" element={<AdminScreen />} />
//             {/* <Route path="/contact" element={<ContactScreen />} /> */}
//           </Routes>
//         </Router>
//       </div>
//       <CFooter />
//     </div>
//   );
// }

import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import CustomRoutes from "./components/routing/CustomRoutes";
import CFooter from "./components/layout/CFooter";

import MenuScreen from "./screens/MenuScreen";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

//styles
import "./App.css";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // const pathName = window.location.pathname;

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* {pathName === "/" && <div>LANDING</div>}
          {pathName !== "/" && <div>OTHER</div>} */}
          <Navbar />
          <div className="container app-content">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/menu" element={<MenuScreen />} />
              <Route path="/auth/*" element={<CustomRoutes />} />
              {/* <Route path="/login" element={<Login />} /> */}
            </Routes>
          </div>
        </Fragment>
      </Router>
      <CFooter />
    </Provider>
  );
};

export default App;
