// Styles
import "mapbox-gl/dist/mapbox-gl.css";

// React
import { useState, useEffect, useContext } from "react";
// import {useRef, MutableRefObject } from "react";

// MUI
import { Box, CircularProgress } from "@mui/material";

// Third-party components
import { ErrorBoundary } from "react-error-boundary";
import { Layer, Map, Source } from "react-map-gl";
// import { MapRef } from "react-map-gl";
import { ViewState } from "react-map-gl";

// Our components
import CustomMarker from "./CustomMarker";

// Contexts
import BusRoutesContext from "../../context/BusRoutesContext";

// Config
import { MAPBOX_ACCESS_TOKEN } from "../../config/constants";

interface BusRouteMapProps {
  busNumber: number;
}

const BusRouteMap = (props: BusRouteMapProps) => {
  // const stopsContext = useContext(StopsContext);
  const busRoutesContext = useContext(BusRoutesContext);

  const [ready, setReady] = useState(false);
  const [routeGeoJson, setRouteGeoJson] = useState<any>(null);

  // initial state of the map
  const mapInitialViewState: ViewState = {
    latitude: busRoutesContext.data[props.busNumber].stops[0].lat,
    longitude: busRoutesContext.data[props.busNumber].stops[0].lon,
    zoom: 17,
    bearing: 0,
    pitch: 0,
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  };

  // styles
  const mapContainerStyles = {
    height: "62vh",
    width: "100%",
    borderRadius: 13,
  };

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const geoJSON = await busRoutesContext.getGeoJsonForRouteOf(
      props.busNumber,
    );
    setRouteGeoJson(geoJSON);
    setReady(true);
  }

  if (!ready) {
    return (
      <ErrorBoundary fallback={<div></div>}>
        <Box>
          <CircularProgress />
        </Box>
      </ErrorBoundary>
    );
  }

  return (
    <>
      <ErrorBoundary fallback={<div></div>}>
        <Map
          initialViewState={mapInitialViewState}
          style={mapContainerStyles}
          mapStyle={"mapbox://styles/mapbox/outdoors-v12"}
          // @ts-ignore
          projection="globe"
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          renderWorldCopies={false}
          attributionControl={false}
          // @ts-ignore
          // ref={(map) => (mapRef = map)}
        >
          {Object.values(busRoutesContext.data[props.busNumber].stops).map(
            (stop, i) => (
              <CustomMarker key={i} type="stop" lat={stop.lat} lon={stop.lon} />
            ),
          )}

          <Source type="geojson" data={routeGeoJson}>
            <Layer
              type="line"
              paint={{
                "line-color": "#f0f",
                "line-width": 5,
              }}
            />
          </Source>
        </Map>
      </ErrorBoundary>
    </>
  );
};

export default BusRouteMap;
