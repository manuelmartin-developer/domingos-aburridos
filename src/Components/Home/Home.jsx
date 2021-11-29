import React from "react";

// import Map from '../Map';
import MapDeckGl from "../MapDeckGL";

const Home = () => {

  return (

    // Mapa de la red de Autobuses de Cáceres. No funciona en
    // producción al hacer un fetch a una url sin SSL.
    // <Map />
    <MapDeckGl />
  );
};

export default Home;
