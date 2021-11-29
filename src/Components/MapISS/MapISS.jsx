import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { Toast } from "../../hooks/useToast";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapISS = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom] = useState(2);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [-6.3707, 39.4762],
      zoom: zoom,
    });
  });

  useEffect(() => {
    map.current.on("load", async () => {
      const geojson = await getLocation();
      map.current.addSource("iss", {
        type: "geojson",
        data: geojson,
      });
      map.current.loadImage(
        "https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-international-space-station-satellite-with-multiples-charging-solar-panel-astronomy-color-tal-revivo.png",
        (error, image) => {
          if (error) throw error;
          map.current.addImage("iss_icon", image);
        }
      );
      map.current.addLayer({
        id: "iss",
        type: "symbol",
        source: "iss",
        layout: {
          "icon-image": "iss_icon",
        },
      });

      map.current.on("mouseenter", "iss", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      map.current.on("mouseleave", "iss", () => {
        map.current.getCanvas().style.cursor = "";
      });

      const updateSource = setInterval(async () => {
        const geojson = await getLocation(updateSource);
        map.current.getSource("iss").setData(geojson);
      }, 2000);

      async function getLocation(updateSource) {
        try {
          const result = await axios.get(
            "https://api.wheretheiss.at/v1/satellites/25544"
          );

          const { latitude, longitude, altitude, velocity, visibility } =
            await result.data;

          map.current.flyTo({
            center: [longitude, latitude],
            speed: 0.5,
            zoom: 5,
          });

          map.current.on("click", "iss", (e) => {
            Toast.fire({
              icon: "info",
              title: "<h3>Estación Espacial Internacional</h3>",
              html: `<b>Altitud: </b> ${altitude.toFixed(2)} km <br/> <br/>
              <b>Velocidad: </b> ${velocity.toFixed(2)} km/h<br/> <br/>
              <b>Visibilidad: </b> ${visibility}`,
            });
          });

          return {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [longitude, latitude],
                },
              },
            ],
          };
        } catch (err) {
          if (updateSource) clearInterval(updateSource);
          throw new Error(err);
        }
      }
    });
  }, []);

  return (
    <section className="map">
      <div ref={mapContainer} className="map-container" />
    </section>
  );
};

export default MapISS;
