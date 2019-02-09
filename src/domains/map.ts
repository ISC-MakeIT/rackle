import { LocationPoint } from './location_point';

export interface ToiletMarker {
  id: number;
  name: string;
  floor: string;
  latitude: number;
  longitude: number;
}

export interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface Elevators {
  elevators: LocationPoint[];
}

export interface toilets {
  toilets: ToiletMarker;
}
