import React from "react";

export default function CFooter() {
  return (
    <div className="cfooter">
      <div className="social">
        <a href="https://www.facebook.com" rel="noreferrer" target="_blank">
          Facebook
        </a>
        <a href="https://www.instagram.com" rel="noreferrer" target="_blank">
          Instagram
        </a>
        <a href="/" rel="noreferrer" target="_blank">
          Phone
        </a>
        <a href="https://www.gmail.com" rel="noreferrer" target="_blank">
          Mail
        </a>
        <a
          href="https://goo.gl/maps/9AHqSe2E9svsoz3A9"
          rel="noreferrer"
          target="_blank"
        >
          Map
        </a>
      </div>
      <div className="rights">
        <p className="darker-beige">
          ©2022 Hamika Restaurant. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
