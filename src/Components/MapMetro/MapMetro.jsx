import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import {
  Map,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  GeoJSON,
} from "react-leaflet";
import L from "leaflet";
import { titleContext } from "../../Contexts/titleContext";

const MapMetro = () => {
  const APP_ID = process.env.REACT_APP_TMB_ID;
  const APP_KEY = process.env.REACT_APP_TMB_KEY;
  const [lines, setLines] = useState([]);
  const [stations, setStations] = useState([]);
  const { setTitle } = useContext(titleContext);

  setTitle("Metro Barcelona");

  const stationIcon = L.icon({
    iconUrl:
      "https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/000000/external-metro-wayfinding-those-icons-lineal-color-those-icons.png",
  });

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(
          `https://api.tmb.cat/v1/transit/linies/metro?app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        setLines(result.data.features);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(
          `https://api.tmb.cat/v1/transit/estacions?app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        setStations(result.data.features);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Map
      className="map-container"
      center={[41.38, 2.16]}
      zoom={12}
      scrollWheelZoom={true}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="Clásico">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="Blanco y negro">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {lines.map((feature, index) => {
        return (
          <GeoJSON
            key={index}
            data={feature}
            color={`#${feature.properties.COLOR_LINIA}`}
          />
        );
      })}
      {stations.map((point, index) => {
        return (
          <Marker
            key={index}
            position={[
              point.geometry.coordinates[1],
              point.geometry.coordinates[0],
            ]}
            icon={stationIcon}
          >
            <Popup>
              <h3>{point.properties.NOM_ESTACIO}</h3> ({point.properties.PICTO})
            </Popup>
          </Marker>
        );
      })}
    </Map>
  );
};

export default MapMetro;
