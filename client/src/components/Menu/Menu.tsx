import React from "react";
import "./menu.css";
import { motion } from "framer-motion";

function Menu() {
  return (
    <div className="menu__container">
      <motion.div className="menu__items">
        <a href="/" className="menu__link">
          <h3 className="menu__title">Itinerary Creator</h3>
        </a>
      </motion.div>
      <motion.div className="menu__submenu">
        <h4 className="menu__subitem">Login</h4>
        <h4 className="menu__subitem">Sign Up</h4>
      </motion.div>
    </div>
  );
}

export default Menu;
