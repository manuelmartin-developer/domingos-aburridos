import React, { useRef, useState, useEffect } from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(-6.3707);
  const [lat] = useState(39.4762);
  const [zoom] = useState(12);

  const [layers, setLayers] = useState(() => [
    "stops-layer",
    "L1-layer",
    "L2-layer",
    "L3-layer",
    "L4-layer",
    "L5-layer",
    "L6-layer",
    "L7-layer",
    "L8-layer",
    "LC-layer",
    "RC-layer",
    "RM-layer",
  ]);

  const handleLayers = (event, newLayers) => {
    setLayers(newLayers);
  };

  const onShowLayer = (layerName) => {
    let visibility = map.current.getLayoutProperty(
      layerName,
      "visibility",
      "none"
    );
    if (visibility === "visible") {
      map.current.setLayoutProperty(layerName, "visibility", "none");
    } else {
      map.current.setLayoutProperty(layerName, "visibility", "visible");
    }
  };

  const addLayer = (layerName, color) => {
    map.current.addLayer({
      id: `${layerName}-layer`,
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
        visibility: "visible",
      },
      paint: {
        "line-color": color,
        "line-width": 6,
        "line-opacity": 0.4,
      },
      filter: ["==", "gtfs_route_shortName", layerName],
    });
  };

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [lng, lat],
      zoom: zoom,
    }).addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
        showAccuracyCircle: false,
      })
    );
    map.current.on("load", () => {
      map.current.addSource("route", {
        type: "geojson",
        data: "http://opendata.caceres.es/GetData/GetData?dataset=gtfs:Trip&format=geojson&geojson=LineString",
      });
      addLayer("L1", "#F94144");
      addLayer("L2", "#F3722C");
      addLayer("L3", "#F8961E");
      addLayer("L4", "#F9C74F");
      addLayer("L5", "#90BE6D");
      addLayer("L6", "#43AA8B");
      addLayer("L7", "#577590");
      addLayer("L8", "#98C1D9");
      addLayer("LC", "#E0FBFC");
      addLayer("RM", "#EE6C4D");
      addLayer("RC", "#293241");

      map.current.addSource("stops", {
        type: "geojson",
        data: "http://opendata.caceres.es/GetData/GetData?dataset=gtfs:Stop&format=geojson&geojson=Point",
      });
      map.current.loadImage(
        "https://img.icons8.com/external-those-icons-lineal-color-those-icons/96/000000/external-bus-stop-marketing-and-advertising-those-icons-lineal-color-those-icons.png",
        (error, image) => {
          if (error) throw error;
          map.current.addImage("bus_stop", image);
          map.current.addLayer({
            id: "stops-layer",
            type: "symbol",
            source: "stops",
            layout: {
              "icon-image": "bus_stop",
              "icon-size": 0.25,
              visibility: "visible",
            },
          });
        }
      );
      map.current.on("click", "stops-layer", (e) => {
        map.current.flyTo({
          center: e.features[0].geometry.coordinates,
          zoom: 16,
        });
        new mapboxgl.Popup()
          .setLngLat(e.features[0].geometry.coordinates)
          .setHTML(`<h3>${e.features[0].properties.foaf_name}</h3>`)
          .addTo(map.current);
      });

      map.current.on("mouseenter", "stops-layer", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      map.current.on("mouseleave", "stops-layer", () => {
        map.current.getCanvas().style.cursor = "";
      });
    });
  });

  return (
    <>
      <section className="map">
        <div ref={mapContainer} className="map-container" />
        <div className="map-menu">
          <ToggleButtonGroup
            value={layers}
            onChange={handleLayers}
            aria-label="layers shows"
            orientation="vertical"
            sx={{backgroundColor: 'RGBA(255, 255, 255, 0.9)'}}
          >
            <ToggleButton
              value="stops-layer"
              aria-label="bold"
              onClick={() => onShowLayer("stops-layer")}
            >
              Paradas
            </ToggleButton>
            <ToggleButton
              value="L1-layer"
              aria-label="bold"
              onClick={() => onShowLayer("L1-layer")}
            >
              Línea 1
            </ToggleButton>
            <ToggleButton
              value="L2-layer"
              aria-label="bold"
              onClick={() => onShowLayer("L2-layer")}
            >
              Línea 2
            </ToggleButton>
            <ToggleButton
              value="L3-layer"
              aria-label="bold"
              onClick={() => onShowLayer("L3-layer")}
            >
              Línea 3
            </ToggleButton>
            <ToggleButton
              value="L4-layer"
              aria-label="bold"
              onClick={() => onShowLayer("L4-layer")}
            >
              Línea 4
            </ToggleButton>
            <ToggleButton
              value="L5-layer"
              aria-label="bold"
              onClick={() => onShowLayer("L5-layer")}
            >
              Línea 5
            </ToggleButton>
            <ToggleButton
              value="L6-layer"
              aria-label="bold"
              onClick={() => onShowLayer("L6-layer")}
            >
              Línea 6
            </ToggleButton>
            <ToggleButton
              value="L7-layer"
              aria-label="bold"
              onClick={() => onShowLayer("L7-layer")}
            >
              Línea 7
            </ToggleButton>
            <ToggleButton
              value="L8-layer"
              aria-label="bold"
              onClick={() => onShowLayer("L8-layer")}
            >
              Línea 8
            </ToggleButton>
            <ToggleButton
              value="LC-layer"
              aria-label="bold"
              onClick={() => onShowLayer("LC-layer")}
            >
              Línea Campus
            </ToggleButton>
            <ToggleButton
              value="RC-layer"
              aria-label="bold"
              onClick={() => onShowLayer("RC-layer")}
            >
              Refuerzo Campus
            </ToggleButton>
            <ToggleButton
              value="RM-layer"
              aria-label="bold"
              onClick={() => onShowLayer("RM-layer")}
            >
              Refuerzo Mejostilla
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </section>
    </>
  );
};

export default Map;
