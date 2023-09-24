import axios from "axios";
import {
  lineString as makeLineString,
  FeatureCollection,
  LineString,
  Feature,
  Properties,
} from "@turf/helpers";
import { decode } from "./mapHelper";

export interface DirectionApi {
  routes: Route[];
  waypoints: Waypoint[];
  code: string;
  uuid: string;
}

export interface Route {
  weight_typical: number;
  duration_typical: number;
  weight_name: string;
  weight: number;
  duration: number;
  distance: number;
  legs: Leg[];
  geometry: string;
}

export interface Leg {
  via_waypoints: any[];
  admins: Admin[];
  weight_typical: number;
  duration_typical: number;
  weight: number;
  duration: number;
  steps: any[];
  distance: number;
  summary: string;
}

export interface Admin {
  iso_3166_1_alpha3: string;
  iso_3166_1: string;
}

export interface Waypoint {
  distance: number;
  name: string;
  location: number[];
}

const chargePerKm = 2;

export const getRoute = async (locParam: string) => {
  const routeRes = await axios.get(
    "https://api.mapbox.com/directions/v5/mapbox/driving-traffic/" +
      locParam +
      "?access_token=pk.eyJ1IjoibWJtcGgiLCJhIjoiY2tya2F0OTJvMGk1YjJwbGZ1bDJ1eGU0dCJ9.fLJp01SsIpdhGmWdBzaSnQ",
  );
  return routeRes.data as DirectionApi | undefined;
};

export const getRouteMetrics = (
  apiData: DirectionApi,
  youre_at: number,
  going_to: number,
  bus_at: number,
) => {
  let totalTime = 0;
  let totalDist = 0;
  let totalAmount = 0;
  let busTimeToYou = 0;
  if (
    youre_at != going_to &&
    youre_at != apiData.routes[0].legs.length &&
    going_to != 0
  ) {
    for (let i = youre_at; i < going_to; i++) {
      totalTime += apiData.routes[0].legs[i].duration_typical;
      totalDist += apiData.routes[0].legs[i].distance;
    }
    totalAmount = (totalDist / 1000) * chargePerKm;
  }
  if (
    bus_at < youre_at &&
    youre_at < apiData.routes[0].legs.length &&
    bus_at < apiData.routes[0].legs.length
  ) {
    for (let i = bus_at; i < youre_at; i++) {
      busTimeToYou += apiData.routes[0].legs[i].duration_typical;
    }
  }
  return { totalTime, totalAmount, busTimeToYou };
};

export const createGeoJSON = async (locaArray: number[][]) => {
  "[lat,long]";
  var geojson: Feature<LineString, Properties> | undefined = undefined;
  const formattedCoordinates = locaArray
    .map((subarray) => subarray.reverse())
    .map((coord) => coord.join(","))
    .join(";");
  const apiRes = await getRoute(formattedCoordinates);
  if (apiRes && apiRes.routes[0] && apiRes.routes[0].geometry) {
    geojson = makeLineString(decode(apiRes.routes[0].geometry));
  }
  return geojson;
};
