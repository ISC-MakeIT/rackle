import GuideScreen from 'src/screens/GuideScreen';

export interface ToiletMarker {
  id: number;
  name: string;
  floor: string;
  latitude: number;
  longitude: number;
}

export type ElevatorCapacity = 6 | 8 | 12;

export interface ElevatorMarker {
  id: number;
  floor: string;
  name: string;
  size: ElevatorCapacity;
  latitude: number;
  longitude: number;
  useable: number;
}

export interface GuideLine {
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

export interface GuideLines {
  guideLines: GuideLine[];
}

export interface Elevators {
  elevators: ElevatorMarker[];
}

export interface toilets {
  toilets: ToiletMarker;
}

export interface GuideScreenMapState {
  guideLines: GuideLine[];
  elevatorMarkers: ElevatorMarker[];
  toiletMarkers: ToiletMarker[];
}

