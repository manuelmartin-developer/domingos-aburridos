import React, { useState } from "react";

import { Link } from "react-router-dom";
import { bubble as ReactMenu } from "react-burger-menu";

const Menu = () => {
  const [menuOpenState, setMenuOpenState] = useState(false);

  const handleStateChange = (state) => {
    setMenuOpenState(state.isOpen);
  };
  const closeMenu = () => {
    setMenuOpenState(false);
  };

  return (
    <ReactMenu
      width={"100%"}
      left
      isOpen={menuOpenState}
      onStateChange={(state) => handleStateChange(state)}
    >
      <Link onClick={() => closeMenu()} className="menu-item" to="/">
        Autobuses Cáceres - Mapbox
      </Link>
      <Link onClick={() => closeMenu()} className="menu-item" to="/barcelona">
        Metro Barcelona - Leaflet
      </Link>
      <Link onClick={() => closeMenu()} className="menu-item" to="/iss">
        Estación Espacial Internacional - Mapbox
      </Link>
    </ReactMenu>
  );
};

export default Menu;
