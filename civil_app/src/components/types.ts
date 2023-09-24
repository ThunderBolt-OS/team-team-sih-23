export interface stop {
  name: string;
  estimatedTime: string;
}

export interface BusObject {
  busName: string;
  startStop: stop;
  endStop: stop;
  status: string;
  allStops: Array<stop>;
}
