import React, { useState } from "react";

import { Link } from "react-scroll";

export default function LandingNavbar() {
  const [activeClass, setActiveClass] = useState("home");

  function handleOnClick(e) {
    setActiveClass(e);
  }

  function handleSetActive(e) {
    setActiveClass(e);
  }

  return (
    <div className="navbar-div sticky">
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/">
          <b>HAMIKA</b>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mr-3">
              <Link
                to="home"
                className={
                  activeClass === "home" ? "nav-link active" : "nav-link"
                }
                spy={true}
                smooth={true}
                offset={-160}
                duration={500}
                delay={500}
                onClick={handleOnClick}
                onSetActive={handleSetActive}
              >
                HOME
              </Link>
            </li>
            <li className="nav-item mr-3">
              <Link
                to="menu"
                className={
                  activeClass === "menu" ? "nav-link active" : "nav-link"
                }
                spy={true}
                smooth={true}
                offset={-160}
                duration={500}
                delay={500}
                onClick={handleOnClick}
                onSetActive={handleSetActive}
              >
                MENU
              </Link>
            </li>
            <li className="nav-item mr-3">
              <Link
                to="about"
                activeClass=""
                className={
                  activeClass === "about" ? "nav-link active" : "nav-link"
                }
                spy={true}
                smooth={true}
                offset={-160}
                duration={500}
                delay={500}
                onClick={handleOnClick}
                onSetActive={handleSetActive}
              >
                ABOUT
              </Link>
            </li>
            <li className="nav-item mr-3">
              <Link
                to="restaurant"
                className={
                  activeClass === "restaurant" ? "nav-link active" : "nav-link"
                }
                spy={true}
                smooth={true}
                offset={-160}
                duration={500}
                delay={500}
                onClick={handleOnClick}
                onSetActive={handleSetActive}
              >
                RESTAURANT
              </Link>
            </li>
            <li className="nav-item mr-3">
              <Link
                to="contact"
                className={
                  activeClass === "contact" ? "nav-link active" : "nav-link "
                }
                spy={true}
                smooth={true}
                offset={-160}
                duration={500}
                delay={500}
                onClick={handleOnClick}
                onSetActive={handleSetActive}
              >
                CONTACT
              </Link>
            </li>
            <li className="nav-item mr-3">
              <a className="nav-link" href="/menu">
                ORDER ONLINE
              </a>
            </li>
            {/* <li className="nav-item mr-3">
              <Link
                to="subscribe"
                className={
                  activeClass === "subscribe" ? "nav-link active" : "nav-link "
                }
                spy={true}
                smooth={true}
                offset={-160}
                duration={500}
                delay={500}
                onClick={handleOnClick}
                onSetActive={handleSetActive}
              >
                SUBSCRIBE
              </Link>
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
}
