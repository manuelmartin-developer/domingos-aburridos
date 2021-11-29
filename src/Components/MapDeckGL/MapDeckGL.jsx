import React, { useState, useContext } from "react";
import { StaticMap, MapContext, NavigationControl } from "react-map-gl";
import DeckGL, { GeoJsonLayer, ArcLayer } from "deck.gl";
import { Toast } from "../../hooks/useToast";
import { titleContext } from "../../Contexts/titleContext";

const MapDeckGL = () => {
  const [sourceLng, setSourceLng] = useState(2.078003349812917);
  const [sourceLat, setSourceLat] = useState(41.30315527974634);
  const { setTitle } = useContext(titleContext);

  setTitle("Aeropuertos");

  const AIR_PORTS =
    "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";

  const INITIAL_VIEW_STATE = {
    latitude: 51.47,
    longitude: 0.45,
    zoom: 3,
    bearing: 0,
    pitch: 30,
    minZoom: 3,
  };

  const MAP_STYLE =
    "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
  const NAV_CONTROL_STYLE = {
    position: "absolute",
    top: 80,
    left: 10,
  };
  const onClick = (info) => {
    if (info.object) {
      setSourceLng(info.object.geometry.coordinates[0]);
      setSourceLat(info.object.geometry.coordinates[1]);
    }

    Toast.fire({
      icon: false,
      title: `<h3>${info.object.properties.name}</h3>`,
      width: "100%",
      html: `<iframe id="inlineFrameExample",,
      width="100%"
      height="400"
      src="${info.object.properties.wikipedia}">
  </iframe>`,
      showCloseButton: true,
      timer: false,
    });
  };

  const layers = [
    new GeoJsonLayer({
      id: "airports",
      data: AIR_PORTS,
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 2000,
      getPointRadius: (feature) => 11 - feature.properties.scalerank,
      getFillColor: [253, 158, 2, 180],
      pickable: true,
      autoHighlight: true,
      onClick,
    }),
    new ArcLayer({
      id: "arcs",
      data: AIR_PORTS,
      dataTransform: (data) =>
        data.features.filter((feature) => feature.properties.scalerank < 4),
      getSourcePosition: () => [sourceLng, sourceLat],
      getTargetPosition: (feature) => feature.geometry.coordinates,
      getSourceColor: [33, 158, 188],
      getTargetColor: [253, 158, 2],
      getWidth: 1,
      updateTriggers: {
        getSourcePosition: [sourceLng, sourceLat],
      },
    }),
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      ContextProvider={MapContext.Provider}
    >
      <StaticMap mapStyle={MAP_STYLE} />
      <NavigationControl style={NAV_CONTROL_STYLE} />
    </DeckGL>
  );
};

export default MapDeckGL;
