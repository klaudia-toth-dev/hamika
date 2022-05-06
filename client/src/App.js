// // import logo from "./logo.svg";
// import "./App.css";
// import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap";

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

// export default App;

import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import CustomRoutes from "./components/routing/CustomRoutes";

// import Login from "./components/auth/Login";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth/*" element={<CustomRoutes />} />
            {/* <Route path="/login" element={<Login />} /> */}
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
