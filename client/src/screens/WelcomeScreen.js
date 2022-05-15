import React, { useEffect, Fragment } from "react";
import { Navigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import welcomeImg1 from "../static/welcome.jpg";
import welcomeImg2 from "../static/welcome2.jpg";
import Map from "../components/Map";

import { getAllItems } from "../actions/itemActions";

import Loading from "../components/Loading";
import Error from "../components/Error";

export default function WelcomeScreen() {
  const userState = useSelector((state) => state.auth);
  const { isAuthenticated, user } = userState;

  const itemsState = useSelector((state) => state.getAllItemsReducer);
  const { items, error, loading } = itemsState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  if (isAuthenticated && !user.isAdmin) {
    return <Navigate to="/menu" />;
  }

  if (isAuthenticated && user.isAdmin) {
    return <Navigate to="/auth/admin" />;
  }

  return (
    <div className="welcomeScreen">
      <div>
        <section className="home-section welcome-section" id="home">
          <img src={welcomeImg1} alt="welcome" className="welcomeImg1" />
          <div className="motto">
            LET'S MEAT! <br />
            HAMIKA
          </div>
          <div className="homeDiv">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              vel semper erat, vitae iaculis odio. In nisi tortor, iaculis sed
              porta elementum, porttitor eget eros.
            </p>
            <a className="btn" href="/menu">
              ORDER ONLINE
            </a>
          </div>
          <img src={welcomeImg2} alt="welcome2" className="welcomeImg2" />
        </section>
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {items && (
          <section className="menu-section welcome-section" id="menu">
            <h1>MENU</h1>
            {items &&
              items.map((item) => {
                return (
                  <Fragment>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </Fragment>
                );
              })}
          </section>
        )}
        <section className="about-section welcome-section" id="about">
          <h1>WHO WE ARE</h1>
          <p>Pictures on the left side of the screen.</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel
            semper erat, vitae iaculis odio. In nisi tortor, iaculis sed porta
            elementum, porttitor eget eros. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Integer vel semper erat, vitae iaculis
            odio. In nisi tortor, iaculis sed porta elementum, porttitor eget
            eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Integer vel semper erat, vitae iaculis odio. In nisi tortor, iaculis
            sed porta elementum, porttitor eget eros. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Integer vel semper erat, vitae
            iaculis odio. In nisi tortor, iaculis sed porta elementum, porttitor
            eget eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Integer vel semper erat, vitae iaculis odio. In nisi tortor, iaculis
            sed porta elementum, porttitor eget eros.
          </p>
        </section>
        <section className="restaurant-section welcome-section" id="restaurant">
          <h1>ABOUT THE RESTAURANT</h1>
          <p>Pictures on the top.</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel
            semper erat, vitae iaculis odio. In nisi tortor, iaculis sed porta
            elementum, porttitor eget eros. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Integer vel semper erat, vitae iaculis
            odio. In nisi tortor, iaculis sed porta elementum, porttitor eget
            eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Integer vel semper erat, vitae iaculis odio. In nisi tortor, iaculis
            sed porta elementum, porttitor eget eros. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Integer vel semper erat, vitae
            iaculis odio. In nisi tortor, iaculis sed porta elementum, porttitor
            eget eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Integer vel semper erat, vitae iaculis odio. In nisi tortor, iaculis
            sed porta elementum, porttitor eget eros.
          </p>
        </section>
        <section className="contact-section welcome-section" id="contact">
          <div className="contact-infos">
            <h1>CONTACT</h1>
            <div className="address info">
              <h3>ADDRESS</h3>
              <p>1 Hegyalja Street</p>
              <p>Lenti, 8960, Hungary</p>
              <p>Hamika Restaurant</p>
            </div>
            <div className="opening info">
              <h3>OPENING HOURS</h3>
              <p>
                <b className="darker-beige">Mon - Fri:</b> 11:00 - 21:00
              </p>
              <p>
                <b className="darker-beige">Sat - Sun:</b> 11:00 - 23:00
              </p>
            </div>
            <div className="phone info">
              <h3>PHONE</h3>
              <p>+36 30 835 44 60</p>
            </div>
            <div className="mail info">
              <h3>MAIL</h3>
              <p>hamikarestaurant@gmail.com</p>
            </div>
          </div>
          <div className="map-div ">
            <Map
              isMarkerShown
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </section>

        {/* <section className="subscribe-section welcome-section" id="subscribe">
            <h1>SUBSCRIBE</h1>
            <p>Form on the picture</p>
          </section> */}
      </div>
    </div>
  );
}
