import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Footer.css"; // CSS file you will create

export const Footer = () => {
  return (
    <footer className="uc-footer">
      <div className="footer-container">

        {/* LEFT SIDE */}
        <p className="footer-copy">
          © {new Date().getFullYear()} UniConnect. All Rights Reserved.
        </p>

        {/* RIGHT LINKS */}
        <div className="footer-links">
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/lostFound">Lost & Found</NavLink>
          <NavLink to="/marketplace">Marketplace</NavLink>
          <NavLink to="/register">Sign Up</NavLink>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
