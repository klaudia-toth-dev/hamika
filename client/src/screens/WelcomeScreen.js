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
              Welcome to Hamika, the restaurant that will always succeed in
              aweing you. Come and visit one of Hungary's top restaurants in
              person, or order online and enjoy luxury being delivered to your
              door.
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
            At Hamika Restaurant our desire is to contribute to the community
            that has so loyally supported us. Our vision is to create a dining
            experience that foremost, feels like a place that you decide to call
            yours, and that you choose to share with your family and friends. We
            feel that we’re living within that vision because in the Summer of
            2016, we were awarded the Andreas Matthew Foundation Award, claiming
            the "Family Friendly Restaurant" title. Thank you! Our promise is to
            continue to be that comfortable environment for you to come and
            break bread with your friends and family. We’re committed to
            excellence in food preparation, flavour and presentation by using
            quality, fresh ingredients. We’re passionate about creating premium
            homemade meals that satiate the appetite, satisfy the taste buds,
            and surprise even the most prepared.
          </p>
        </section>
        <section className="restaurant-section welcome-section" id="restaurant">
          <h1>ABOUT THE RESTAURANT</h1>
          <p>Pictures on the top.</p>
          <p>
            Hamika was opened in 1996 by a young couple. The original location
            of the restaurant was meant to be Budapest, but as the founders fell
            in love with the incredible sights of Lenti, they decided to open
            the restaurant in this picturesque town. Hamika's one of a kind
            building was originally a family house, giving the perfect
            foundation to becoming a restaurant of the edge of this seemingly
            remote but life-filled location. Hamika offers the most mind
            boggling meals you have ever tasted. You can try your favorites with
            a double twist and enjoy the perfect beverage on the side.
            Regardless of what you are drinking we will custom make you
            cocktails that will emphasize your choice of food in ways you have
            not seen before.
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
